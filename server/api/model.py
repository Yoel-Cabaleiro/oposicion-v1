from flask_sqlalchemy import SQLAlchemy
import os
import json
from flask_jwt_extended import JWTManager

import jwt

db = SQLAlchemy()
    

class Estudiantes(db.Model):
    __tablename__ = 'estudiantes'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    suscripcion = db.Column(db.String)
    jti = db.Column(db.String(36))

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
    examenes_totales = db.Column(db.Integer)
    media_5_examenes = db.Column(db.Float)
    mejor_racha = db.Column(db.Integer)
    porcentaje_aciertos = db.Column(db.Float)
    ultimos_5_examenes = db.Column(db.String)
    estudiante_id = db.Column(db.ForeignKey("estudiantes.id"), nullable=False)
    categoria_id = db.Column(db.ForeignKey("categorias.id"), nullable=False)
    estudiante = db.relationship("Estudiantes")
    categoria = db.relationship("Categorias")
    preguntas_falladas = db.relationship("EstadisticasPreguntas", primaryjoin="Estadisticas.id == EstadisticasPreguntas.estadistica_id")

    def guardar_ultimos_5_examenes_lista(self, lista):
        lista_como_cadena = ','.join(str(valor) for valor in lista)
        self.ultimos_5_examenes = lista_como_cadena

    def obtener_ultimos_5_examenes_lista(self):
        if self.ultimos_5_examenes:
            return [float(valor) for valor in self.ultimos_5_examenes.split(',')]
        else:
            return []

    def serialized(self):
        ultimos_5_examenes_lista = self.obtener_ultimos_5_examenes_lista()
        return {
            'id': self.id,
            'ultimo_examen': self.ultimo_examen,
            'examenes_totales': self.examenes_totales,
            'media_5_examenes': self.media_5_examenes,
            'ultimos_5_examenes': ultimos_5_examenes_lista,
            'mejor_racha': self.mejor_racha,
            'porcentaje_aciertos': self.porcentaje_aciertos,
            'estudiante': self.estudiante.email,
            'estudiante_id': self.estudiante_id,
            'categoria_id': self.categoria_id,
            'categoria': self.categoria.nombre,
            'preguntas_falladas': [pregunta.serialized() for pregunta in self.preguntas_falladas]
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
            'categoria_id': self.categoria_id,
            'id': self.id
        }
    
    def __repr__(self):
        return f'{self.numero}, {self.categoria.nombre}'


class EstadisticasPreguntas(db.Model):
    __tablename__ = "estadisticas_preguntas"
    estadistica_id = db.Column(db.ForeignKey("estadisticas.id"), primary_key=True)
    pregunta_id = db.Column(db.ForeignKey("preguntas.id"), primary_key=True)
    fallos = db.Column(db.Integer)
    pregunta = db.relationship("Preguntas")

    def serialized(self):
        return {
            'estadistica_id': self.estadistica_id,
            'pregunta_id': self.pregunta_id,
            'fallos': self.fallos,
        }
    
    def __repr__(self):
        return f'{self.estadistica_id}, {self.pregunta_id}, {self.fallos}'