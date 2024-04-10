# Flask import
from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


# File import
from api.model import db, Users, Estudiantes, Estadisticas, Categorias, Preguntas
from api.services.email_utility import send_recovery_email
from api.services.auth_utility import set_new_password, verify_reset_token, generate_reset_token, register_user, user_login


# blueprint setting
api = Blueprint('api', __name__)


#########################################################
# Categorias

# Get all Categorias
@api.route('/categorias', methods=['GET'])
def get_categorias():
    categorias = Categorias.query.all()
    if not categorias:
        return jsonify({"mensaje": "No se han encontrado categorias"}), 404
    return jsonify({"mensaje": "categorias descargadas", "data": [categoria.serialized() for categoria in categorias]}), 200


#########################################################
# Preguntas

# Get and Delete all Preguntas 
@api.route('/preguntas', methods=['GET', 'DELETE'])
def get_preguntas():
    preguntas = Preguntas.query.all()
    if not preguntas:
        return jsonify({"mensaje": "No se han encontrado preguntas"}), 404
    if request.method == 'GET':
        return jsonify({"mensaje": "Preguntas descargadas", "data": [pregunta.serialized() for pregunta in preguntas]}), 200
    if request.method == 'DELETE':
        db.session.query(Preguntas).delete()
        db.session.commit()
        return jsonify({"mensaje": "Todas las Preguntas borradas!!"})
    
# Get Preguntas by categoria_id
@api.route('/categorias/<int:categoriaid>/preguntas', methods=['GET'])
def preguntas_by_categoria(categoriaid):
    preguntas_by_categoria = Preguntas.query.filter_by(categoria_id=categoriaid).all()
    if not preguntas_by_categoria:
        return jsonify({"mensaje": "No se han encontrado preguntas para esta categoria"}), 404
    if preguntas_by_categoria:
        return jsonify({"mensaje": "Preguntas descargadas", "data": [pregunta.serialized() for pregunta in preguntas_by_categoria]}), 200
    

##########################################################
# Estadisticas
    
# Get all Estadisticas / Post a new one
@api.route('/estadisticas', methods=['GET', 'POST'])
def handle_estadisticas():
    if request.method == 'GET':
        estadisticas = Estadisticas.query.all()
        if not estadisticas:
            return jsonify({"mensaje": "No existen estadísticas aún!"}), 404
        if estadisticas:
            return jsonify({"mensaje": "Estadísticas descargadas", "data": [estadistica.serialized() for estadistica in estadisticas]})
    if request.method == 'POST':
        data = request.json
        required_fields = ['categoriaId', 'estudianteId']
        if not all(field in data for field in required_fields):
            return jsonify({"mensaje": "Datos incompletos. categoriaId y estudianteId son obligatorios"}), 400
        nueva_estadistica = Estadisticas(categoria_id=data['categoriaId'],
                                         estudiante_id=data['estudianteId']
                                        )
        db.session.add(nueva_estadistica)
        db.session.commit()
        return jsonify({"mensaje": "Nueva estadistica creada", "data": nueva_estadistica.serialized()}), 200
        
# Get, Put or Delete a scpecific estadistica
@api.route('/estadisticas/<int:estadisticaid>', methods=['GET', 'PUT', 'DELETE'])
def handle_estadistica(estadisticaid):
    estadistica = Estadisticas.query.get(estadisticaid)
    if not estadistica:
        return jsonify({"mensaje": "No existe esta estadistica"}), 404
    if request.method == 'GET':
        return jsonify({"mensaje": "Estadistica descargada", "data": estadistica.serialized()}), 200
    if request.method == 'PUT':
        data = request.json
        estadistica.categoria_id = data.get('categoriaId', estadistica.categoria_id)
        estadistica.estudiante_id = data.get('estudianteId', estadistica.estudiante_id)
        estadistica.ultimo_examen = data.get('ultimoExamen', estadistica.ultimo_examen)
        estadistica.media_examen = data.get('mediaExamen', estadistica.media_examen)
        estadistica.media_10_examenes = data.get('media10Examenes', estadistica.media_10_examenes)
        estadistica.mejor_racha = data.get('mejorRacha', estadistica.mejor_racha)
        estadistica.porcentaje_aciertos = data.get('porcentajeAciertos', estadistica.porcentaje_aciertos)
        db.session.commit()
        return jsonify({"mensaje": "Estadisticas actualizadas", "data": estadistica.serialized()}), 200
    if request.method == 'DELETE':
        db.session.delete(estadistica)
        db.session.commit()
        return jsonify({"mensaje": "Estadistica borrada!"}), 200
    
# Get and delete all estadisticas by estudiante_id
@api.route('/estudiantes/<int:estudianteid>/estadisticas', methods=['GET', 'DELETE'])
def estadisticas_by_estudiante(estudianteid):
    estadisticas = Estadisticas.query.filter_by(estudiante_id=estudianteid)
    if not estadisticas:
        return jsonify({"mensaje": "No existen estadísticas para el estudiante"}), 404
    if request.method == 'GET':
        return jsonify({"mensaje": "Estadísticas descargadas", "data": [estadistica.serialized() for estadistica in estadisticas]}), 200
    if request.method == 'DELETE':
        for estadistica in estadisticas:
            db.session.delete(estadistica)
        db.session.commit()
        return jsonify({"mensaje": "Estadisticas borradas para este estudiante"}), 200



##########################################################
# Login and authentication


@api.route('/new-password', methods=['PUT'])
def new_password_setting():
    token = request.headers.get('Authorization')
    return set_new_password(token)



@api.route('/verify-reset-token', methods=['POST']) # Used in the 'password setting page': if not valid, no acces to the page
def verify_reset_token_endpoint():
    token = request.json.get('token')
    return verify_reset_token(token)



@api.route('/recovery-email', methods=['POST'])
def send_token_reset_email():
    email = request.json.get('email')
    token, message = generate_reset_token(email)

    if token:
        send_recovery_email(email, token)
        return jsonify({'message': message}), 200
    
    else:
        return jsonify({'message': message}),400



@api.route("/signup", methods=['POST'])
def signup():
    email = request.json.get("email", None) 
    password = request.json.get("password", None)

    success, message = register_user(email, password)
    if success:
        return jsonify({"message": message}), 200
    else:
        return jsonify({"message": message}), 401



@api.route("/login", methods=['POST'])
def login():
    email = request.json.get("email")
    password = request.json.get("password")
    password_bytes = password.encode('utf-8') if password is not None else None #conver string in byte string

    return user_login(email, password_bytes)




@api.route("/authentication", methods=["GET"])
@jwt_required()
def pro_authentication():  
    identity = get_jwt_identity()
    email = identity.get('email')
    if email:
        estudiante = Estudiantes.query.filter_by(email=email).first()
        if estudiante:
            return jsonify(estudiante.serialized())
    
    return jsonify({"message": "Pro not found"}), 404



##########################################################
# ESTUDIANTES

#Get all estudiantes
@api.route("/estudiantes", methods=["GET"])
def get_users():
    # call db table /pro
    users_array = Estudiantes.query.all()

    if users_array:
        # Serializza la lista di utenti in un formato JSON e restituiscila
        users = [{"id": user.id, "email": user.email} for user in users_array]
        return jsonify(users)

    return jsonify({"message": "no users", "data":[]}), 404



##########################################################
##########################################################











