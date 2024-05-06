from flask import jsonify, request
from flask_jwt_extended import create_access_token


import jwt
import os
from api.model import db, Estudiantes
import bcrypt
from time import time



#LOGIN
def user_login(email, password):
    estudiante = Estudiantes.query.filter_by(email=email).first()

    if estudiante and bcrypt.checkpw(password, estudiante.password):
        identity = {
            "id": estudiante.id,
            "email": estudiante.email,
        }
        token = create_access_token(identity=identity)
        return jsonify(access_token=token, message="Estudiante logeado con éxito"), 200
    
    return jsonify(message="Estudiante no encontrado"), 404



# SIGNUP: New User creation
def register_user(email, password):
    password_bytes = password.encode('utf-8')
    hashed_password = bcrypt.hashpw(password_bytes, bcrypt.gensalt())

    existing_estudiante = Estudiantes.query.filter_by(email=email).first()
    if existing_estudiante:
        return False, "El estudiante ya existe."

    if not (email and password):
        return False, "Email o contraseña erróneos"

    if len(password) < 6:
        return False, "La contraseña debe contener al menos 6 carácteres"

    new_estudiante = Estudiantes(email=email, password=hashed_password)
    db.session.add(new_estudiante)
    db.session.commit()
    return True, "Estudiante registrado con éxito"



# PSW TOKEN: Generate reset token
def generate_reset_token(user_email):   
    expires=500
    secret_key = os.getenv('SECRET_KEY_FLASK')
    if secret_key is None:
        raise ValueError("SECRET_KEY_FLASK not set correctly")
    
    user = Estudiantes.query.filter_by(email = user_email).first()
    if user is None:
        return False, "No se ha encontrado ningún estudiante con este email"
    
    if user:
        token = jwt.encode({'email': user.email, 'reset_password': True, 'exp': time() + expires}, key=secret_key)
        return token, "Token Generado"



# PSW TOKEN CHECK: Check if reset toke is still valid and if match en existing user 
def verify_reset_token(token):
    if not token:
        return jsonify({"error": "Missing Token"}), 400

    try:
        payload = jwt.decode(token, key=os.getenv('SECRET_KEY_FLASK'), algorithms=["HS256"])
        user_email = payload.get('email')
        user = Estudiantes.query.filter_by(email=user_email).first()

        if user:
            return jsonify(user.serialized()), 200
        else:
            return jsonify({"error": "Estudiante no encontrado"}), 404

    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expired"}), 400
    except jwt.InvalidTokenError:
        return jsonify({"error": "Token invalid"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500



# UPDATE PSW: Update psw in the user table record
def set_new_password(token):
    if not token:
        return jsonify({"error": "Missing Token"}), 400
    
    token = token.split()[1]

    try:
        payload = jwt.decode(token, key=os.getenv('SECRET_KEY_FLASK'), algorithms=["HS256"])
        user_email = payload.get('email')
        email = request.json.get('email')
        new_password = request.json.get('password')
        new_password_bytes = new_password.encode('utf-8') if new_password is not None else None # Convert string to byte string

        if user_email != email:
            return jsonify({"error": "Email in the token don't match email provided"}), 400

        user = Estudiantes.query.filter_by(email=email).first()
        if user:
            hashed_password = bcrypt.hashpw(new_password_bytes, bcrypt.gensalt())
            user.password = hashed_password
            db.session.commit()
            return jsonify({'message': 'Password updated successfully'}), 200
        else:
            return jsonify({'error': 'User not found'}), 404

    except jwt.ExpiredSignatureError:
        return jsonify({"error": "Token expired"}), 400
    except jwt.InvalidTokenError:
        return jsonify({"error": "Token invalid"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


