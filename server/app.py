###########################################
# Main Flask Configuration and End Points #
###########################################


import os
from flask import Flask, jsonify, request # Blueprint
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import stripe


# Flask configuration
app = Flask(__name__)


# file link
from api.admin import setup_admin
from api.routes import api
from api.model import db



# flask configurazion
app.config.from_object('api.config')
app.register_blueprint(api, url_prefix='/api') #set route bluepring /api/


# Initializations
port=2001
jwt = JWTManager(app)
db.init_app(app)
migrate = Migrate(app, db)
setup_admin(app)
CORS(app)  # Allow CORS requests to this API

# pasamos la key de stripe
stripe.api_key = "sk_test_51P5vU4IsYGRLwhP6jdVmVpBdOPwArooSaWafkQWmTIOgQsfL174SLJF1knICdirJPhf3GyNWZC2eyaB5AguJLSIw00rvwBdd0s"

# On server launch
if __name__ == "__main__":
    db.create_all()
    app.run(debug=True, port= 4001)


#################################################################




