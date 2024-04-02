from flask_sqlalchemy import SQLAlchemy
import os
from flask_jwt_extended import JWTManager

import jwt

db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(100), unique=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    
    def serialized(self):
        return {
            'id': self.id,
            'user_name': self.user_name,
            'email': self.email
        }
    
    def __repr__(self):
        return f'{self.user_name}'
    

class Estudiantes(db.Model):
    __tablename__ = 'estudiantes'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    suscripcion = db.Column(db.String, nullable=False)

    def serialized(self):
        return {
            'id': self.id,
            'email': self.email,
            'suscripcion': self.suscripcion
        }
    
    def __repr__(self):
        return f'{self.email}'


class Categorias(db.Model):
    __tablename__ = 'categorias'
    id = db.Column(db.Integer, primary_key=True)
    grupo = db.Column(db.String, nullable=False)
    nombre = db.Column(db.String, nullable=False)

    def serialized(self):
        return {
            'id': self.id,
            'grupo': self.grupo,
            'nombre': self.nombre
        }
    
    def __repr__(self):
        return f'{self.nombre}'


class Estadisticas(db.Model):
    __tablename__ = 'estadisticas'
    id = db.Column(db.Integer, primary_key=True)
    ultimo_examen = db.Column(db.Float)
    media_examen = db.Column(db.Float)
    media_10_examenes = db.Column(db.Float)
    mejor_racha = db.Column(db.Integer)
    porcentaje_aciertos = db.Column(db.Float)
    estudiante_id = db.Column(db.ForeignKey("estudiantes.id"), nullable=False)
    categoria_id = db.Column(db.ForeignKey("categorias.id"), nullable=False)
    estudiante = db.relationship("Estudiantes")
    categoria = db.relationship("Categorias")

    def serialized(self):
        return {
            'id': self.id,
            'ultimo_examen': self.ultimo_examen,
            'media_examen': self.media_examen,
            'media_10_examenes': self.media_10_examenes,
            'mejor_racha': self.mejor_racha,
            'porcentaje_aciertos': self.porcentaje_aciertos,
            'estudiante': self.estudiante.email,
            'categoria': self.categoria.nombre,

        }
    
    def __repr__(self):
        return f'{self.estudiante.email}, {self.categoria.nombre}'
    
    
class Preguntas(db.Model): 
    __tablename__ = 'preguntas'
    id = db.Column(db.Integer, primary_key=True)
    numero = db.Column(db.Integer, nullable=False)
    enunciado = db.Column(db.String, nullable=False)
    respuesta_a = db.Column(db.String, nullable=False)
    respuesta_b = db.Column(db.String, nullable=False)
    respuesta_c = db.Column(db.String, nullable=False)
    respuesta_d = db.Column(db.String, nullable=False)
    respuesta_correcta = db.Column(db.String, nullable=False)
    categoria_id = db.Column(db.ForeignKey("categorias.id"), nullable=False)
    categoria = db.relationship("Categorias")

    def serialized(self):
        return {
            str(self.numero): self.enunciado,
            'Respuestas': [
                {"A": self.respuesta_a,
                 "correct": self.respuesta_correcta == "A"},
                {"B": self.respuesta_b,
                 "correct": self.respuesta_correcta == "B"},
                {"C": self.respuesta_c,
                 "correct": self.respuesta_correcta == "C"},
                {"D": self.respuesta_d,
                 "correct": self.respuesta_correcta == "D"},    
            ],
            'categoria': self.categoria.nombre,
            'id': self.id
        }
    
    def __repr__(self):
        return f'{self.numero}, {self.categoria.nombre}'



