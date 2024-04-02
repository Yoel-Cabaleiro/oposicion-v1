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
#Categorias

#Get all Categorias
@api.route('/categorias', methods=['GET'])
def get_categorias():
    categorias = Categorias.query.all()
    if not categorias:
        return jsonify({"mensaje": "No se han encontrado categorias"})
    return jsonify({"mensaje": "categorias descargadas", "data": [categoria.serialized() for categoria in categorias]})


#########################################################
#Preguntas

#Get and Delete all Preguntas 
@api.route('/preguntas', methods=['GET', 'DELETE'])
def get_preguntas():
    preguntas = Preguntas.query.all()
    if not preguntas:
        return jsonify({"mensaje": "No se han encontrado preguntas"})
    if request.method == 'GET':
        return jsonify({"mensaje": "Preguntas descargadas", "data": [pregunta.serialized() for pregunta in preguntas]})
    if request.method == 'DELETE':
        db.session.query(Preguntas).delete()
        db.session.commit()
        return jsonify({"mensaje": "Todas las Preguntas borradas!!"})





##########################################################
# End points


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
    user_name = request.json.get("userName", None) 
    email = request.json.get("email", None) 
    password = request.json.get("password", None)

    success, message = register_user(user_name, email, password)
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
        pro = Users.query.filter_by(email=email).first()
        if pro:
            return jsonify(pro.serialized())
    
    return jsonify({"message": "Pro not found"}), 404



@api.route("/users", methods=["GET"])
def get_users():
    # call db table /pro
    users_array = Users.query.all()

    if users_array:
        # Serializza la lista di utenti in un formato JSON e restituiscila
        users = [{"id": user.id, "user_name": user.user_name, "email": user.email} for user in users_array]
        return jsonify(users)

    return jsonify({"message": "no users", "data":[]}), 404



##########################################################
##########################################################











