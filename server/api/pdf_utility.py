import PyPDF2
import re
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from model import db, Users, Estadisticas, Estudiantes, Categorias, Preguntas
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph

app = Flask(__name__)

# Configura la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db" 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializa la base de datos
db.init_app(app)


def process_pdf_files():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    pdf_folder = 'PDFs'
    pdf_files = [os.path.join(pdf_folder, file) for file in os.listdir(pdf_folder) if file.endswith('.pdf')]
    x = 1
    for pdf_file in pdf_files:
        file_name, file_extension = os.path.splitext(os.path.basename(pdf_file))

        #PDF a texto
        with open(pdf_file, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            all_text = ""
            for page in pdf_reader.pages:
                all_text += page.extract_text()
            # Escaneo de preguntas
            matches = re.findall(r'(\d+)\.\s(.*?)(?:A\)(.*?))(?:B\)(.*?))(?:C\)(.*?))(?:D\)(.*?))Respuesta Correcta:\s([A-D])', all_text, re.DOTALL)
            questions = []
            # Creación de objeto final
            for match in matches:
                question = {
                    "numero": match[0],
                    "enunciado": match[1].strip(),
                    "respuesta_a": match[2].strip(),
                    "respuesta_b": match[3].strip(),
                    "respuesta_c": match[4].strip(),
                    "respuesta_d": match[5].strip(),
                    "respuesta_correcta": match[6],
                }
                
                for key, value in question.items():
                    if isinstance(value, str):
                        # Reemplazar todos los saltos de línea por espacios en blanco
                        question[key] = value.replace('\n', ' ')
                        # Eliminar todas las cadenas que empiecen con "Página" y terminen con "reserva: (\d)"
                        question[key] = re.sub(r'Página.*?reserva: (\d+)', '', question[key])

                questions.append(question)
            for question in questions:
                new_question = Preguntas(
                    numero = question["numero"],
                    enunciado = question["enunciado"],
                    respuesta_a = question["respuesta_a"],
                    respuesta_b = question["respuesta_b"],
                    respuesta_c = question["respuesta_c"],
                    respuesta_d = question["respuesta_d"],
                    respuesta_correcta = question["respuesta_correcta"],
                    categoria_id = x
                )
                db.session.add(new_question)
            db.session.commit()
        x += 1
    print("All questions wirtten!")

# Llama a la función process_pdf_files para procesar los archivos PDF y agregar las preguntas a la base de datos
if __name__ == '__main__':
    with app.app_context():
        process_pdf_files()