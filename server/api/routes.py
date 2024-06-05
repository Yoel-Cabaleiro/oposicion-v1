# Flask import
from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


# File import
from api.model import db, Estudiantes, Estadisticas, Categorias, Preguntas, EstadisticasPreguntas
from api.services.email_utility import send_recovery_email
from api.services.auth_utility import verify_jti, set_new_password, verify_reset_token, generate_reset_token, register_user, user_login

# IMPORTAMOS STRIPE
import stripe
from stripe.error import InvalidRequestError
import os

# blueprint setting
api = Blueprint('api', __name__)

# pasamos la key de stripe 
stripe.api_key = "pk_test_51P5vU4IsYGRLwhP6JdUXu3o7FzKTg9bioUvDg6KEudzzDlOMTbe5Sk0wJ6JIsu9YFhCU7c3MHqfLSEaZm4g2dkkx00h8XcipDL"


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
        estadistica.categoria_id = data.get('categoria_id', estadistica.categoria_id)
        estadistica.estudiante_id = data.get('estudiante_id', estadistica.estudiante_id)
        estadistica.ultimo_examen = data.get('ultimo_examen', estadistica.ultimo_examen)
        estadistica.examenes_totales = data.get('examenes_totales', estadistica.examenes_totales)
        estadistica.media_5_examenes = data.get('media_5_examenes', estadistica.media_5_examenes)
        estadistica.mejor_racha = data.get('mejor_racha', estadistica.mejor_racha)
        estadistica.porcentaje_aciertos = data.get('porcentaje_aciertos', estadistica.porcentaje_aciertos)
        nuevos_ultimos_5_examenes = data.get('ultimos_5_examenes')
        estadistica.guardar_ultimos_5_examenes_lista(nuevos_ultimos_5_examenes)
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
# Estadisticas preguntas falladas

# Actualizar los fallos en examen segun array de ids
@api.route('/actualizar_fallos_examen', methods=['PUT'])
def actualizar_fallos_examen():
    data = request.json
    preguntas = data.get('preguntas')
    estadistica_id = data.get('estadisticaId')
    fallos_actualiazdos = []
    for id in preguntas:
        estadistica = EstadisticasPreguntas.query.filter_by(pregunta_id=id, estadistica_id=estadistica_id).first()
        if estadistica:
            estadistica.fallos += 2
            fallos_actualiazdos.append(estadistica.serialized())
        else:
            nueva_estadistica = EstadisticasPreguntas(
                pregunta_id=id,
                estadistica_id=estadistica_id,
                fallos = 2
            )
            db.session.add(nueva_estadistica)
            fallos_actualiazdos.append(nueva_estadistica.serialized())
    db.session.commit()
    return jsonify({'mensaje': 'Estadisticas de fallos actualizadas', 'data': fallos_actualiazdos})

# Actualizar los fallos tras la práctica segun pregunta id
@api.route('actualizar_fallos_practica', methods=['PUT'])
def actualizar_fallos_practica():
    data = request.json
    pregunta_id = data['preguntaId']
    estadistica_id=data['estadisticaId']
    try:
        estadistica_pregunta = EstadisticasPreguntas.query.filter_by(pregunta_id=pregunta_id, estadistica_id=estadistica_id).first()
        if estadistica_pregunta:
            if (estadistica_pregunta.fallos - 1) <= 0:
                db.session.delete(estadistica_pregunta)
            else:
                estadistica_pregunta.fallos -= 1
        db.session.commit()
        return {"mensaje": "Actualización realizada con éxito"}, 200
    except Exception as e:
        db.session.rollback()
        return {"error": str(e)}, 500
    finally:
        db.session.close()

            

            
            

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
    verification_response = verify_jti()
    if verification_response:
        return verification_response
    
    identity = get_jwt_identity()
    email = identity.get('email')
    if email:
        estudiante = Estudiantes.query.filter_by(email=email).first()
        if estudiante:
            return jsonify(estudiante.serialized())
    
    return jsonify({"message": "Pro not found"}), 404


@api.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    current_user = get_jwt_identity()
    estudiante = Estudiantes.query.get(current_user['id'])
    if estudiante:
        estudiante.jti = None
        db.session.commit()
    return jsonify({'message': 'Logout successful'})


##########################################################
# ESTUDIANTES

#Get all estudiantes
@api.route("/estudiantes", methods=["GET"])
def get_users():
    # call db table /pro
    users_array = Estudiantes.query.all()

    if users_array:
        # Serializza la lista di utenti in un formato JSON e restituiscila
        users = [{"id": user.id, "email": user.email, "suscripcion": user.suscripcion} for user in users_array]
        return jsonify(users)

    return jsonify({"message": "no users", "data":[]}), 404

#Get, Put or Delete a specific Estudiante
@api.route('/estudiantes/<int:estudianteid>', methods=['GET', 'PUT', 'DELETE'])
def handle_estudiante(estudianteid):
    estudiante = Estudiantes.query.get(estudianteid)
    if not estudiante:
        return jsonify({"mensaje": "Estudiante no encontrado"}), 404
    if request.method == 'GET':
        return jsonify({"mensaje": "Estudiante descargado", "data": estudiante.serialized()}), 200
    if request.method == 'PUT':
        data = request.json
        estudiante.email = data.get('email', estudiante.email)
        estudiante.suscripcion = data.get('suscripcion', estudiante.suscripcion)
        db.session.commit()
        return jsonify({"mensaje": "Estudiante actualizado con éxito", "data": estudiante.serialized()}), 200
    if request.method == 'DELETE':
        db.session.delete(estudiante)
        db.session.commit()
        return jsonify ({"mensaje": "Estudiante borrado"}), 200




##########################################################
##########################################################

##########################################################
# STRIPE 

@api.route("/create-checkout-session", methods=["POST"])
# Función para crear el formulario de pago
# @jwt_required()
def create_checkout_session():
    try:
        data = request.get_json()
        option = data.get('option')

        # Verifica si la opción es para una categoría
        if option == "oneCategory":
            price_id = 'price_1PGnwWIsYGRLwhP6A0JvHFGk'  # ID del precio de una categoría
        else:
            price_id = 'price_1PGnxEIsYGRLwhP658oSbyRf'  # ID del precio de dos categorías

        # Crea la sesión de pago con el precio correspondiente
        session = stripe.checkout.Session.create(
            ui_mode='embedded',  # para que no se rediriga sino navegue entre nuestra app
            line_items=[
                {
                    'price': price_id,  # ID del precio de la categoría seleccionada
                    'quantity': 1,
                },
            ],
            mode="payment",
            return_url=os.getenv('FRONT_URL') + '/return?session_id={CHECKOUT_SESSION_ID}',
        )

        response_body = {
            "option" : option,
            "session_id" : session.id,
            "clientSecret" : session.client_secret,
        }

    except Exception as e:
        return jsonify(error=str(e)), 500

    return jsonify(response_body), 200


@api.route("/session-status", methods=["GET"])
# Función para crear estado de la trasnaccion y pasarsela al componente return
def session_status():
    try:
        # option = request.args.get('option')
        suscripcion = request.args.get('option')
        session_id = request.args.get('session_id')
        
        if not session_id:
            return jsonify(error='Session ID is required'), 400
        try:
            session = stripe.checkout.Session.retrieve(session_id)
        except stripe.error.InvalidRequestError as e:
            return jsonify(error=str(e)), 400
        except stripe.error.StripeError as e:
            return jsonify(error=str(e)), 500
    
        if not session:
            return jsonify(error='Session not found'), 404
    
        customer_email = session.customer_details.get('email', 'N/A')

        if session.status == 'complete':
            estudiante = Estudiantes.query.filter_by(email=customer_email).first()
            if estudiante:
#                 estudiante.suscripcion = option
                # suscripcion = request.args.get('option')
                estudiante.suscripcion = suscripcion
                db.session.commit()
            # Hay que hacer que llegue la suscripcion a suscripcion, ahora la recibimos como none
            # 
            # 
            print(session.status, session.customer_details.email, suscripcion)
            return jsonify(status=session.status, customer_email=session.customer_details.email)
        else:
            return jsonify(status=session.status, customer_email=session.customer_details.email)
           # return jsonify(error='Estudiante not found'), 404

    except Exception as e:
        return jsonify(error=str(e)), 500









