# EASYOP
Tu Compañero Ideal para Preparar Oposiciones del Servicio Canario de Salud.

## Descripción del proyecto
<p>EasyOP es una aplicación web diseñada para ayudar a los aspirantes a oposiciones del Servicio Canario de Salud a practicar y prepararse para sus exámenes modo test.
  El usuario podrá elegir la categoría o categorías dentro de los grupos que vayan a abrir plazas y podrá prácticar tanto en modo preguntas sueltas (sin una nota final, generando medias de todos los fallos y       aciertos) como en modo exámen (Deberá responder las preguntas primero y al finalizar el exámen aparecerá la nota del total simulando así un examen real.
  Para poder disfrutar del servicio contamos con tres suscripciones: 
  - Free Trial (disfruta de forma gratuita de nuestros exámenes, pero tendrás un límite de preguntas).
  - Una categorìa (Único pago de 20€. Podrá prácticar la categoría escogida ilimitadamente).
  - Dos categorías (Único pago de 30€. Podrá escoger dos categorías y prácticar ilimitadamente todos los servicios de éstas).</p>

#Vista Home
![Home](https://github.com/Yoel-Cabaleiro/oposicion-v1/assets/131387591/566f838a-d304-44a6-8f75-7883b480bba1)

#Signup
![Signup](https://github.com/Yoel-Cabaleiro/oposicion-v1/assets/131387591/eee82b24-e8ac-4b9e-a339-ddba5ab0c169)

#Login
![Login](https://github.com/Yoel-Cabaleiro/oposicion-v1/assets/131387591/1ce03773-c2d6-4b98-8ddc-e64e6f736b94)

#Vista del formato de preguntas sueltas.
![ViewOfQuestions](https://github.com/Yoel-Cabaleiro/oposicion-v1/assets/131387591/49316f4f-1240-465f-a01a-743fc87234eb)

#Demostracion en video del dashboard y el modo exámen.
[![EASYOP signup onboarding]([https://img.youtube.com/vi/M9jRrA6IwQk/maxresdefault.jpg)](https://www.youtube.com/watch?v=M9jRrA6IwQk)

#Demostracion en video del onboarding.
[![Demostración de EasyOP](https://www.youtube.com/watch?v=M9jRrA6IwQk)




## Features

**FRONTEND**
- **Node**
- **React**
- **Webapck**
- **Bootstrap**
- **React-Router**
- **Flux**

**BACKEND**
- **Python**
- **Flask**
- **SQLAlchemy**
- **React Router**
- **JWT - auth manager**
- **SQLight DB**
- **Bcrypt - psw hashing**
- **Smtplib - email sender**

**FUNCTIONALITY**
- **Signup**
- **Login/Logout**
- **Dashboard**
- **PSW encryption**
- **Password recovery**



## Getting Started

Follow these steps to set up and start working with the template:

1. **Clone the repository to your local environment**:

```sh
git clone https://github.com/thelore/template-react-python.git
```

2. **Start the client**:
- Navigate to your project's client folder:
  ```
  cd template-react-python/client
  ```
- Install dependencies:
  ```
  npm install
  ```
- Set the global client `.env` file using the `.env.example` template.
- Run the client:
  ```
  npm start
  ```


3. **Start the server**:
- Ensure you have Python 3.12 or above installed on your system (if not, [refer to this installation guide](https://kinsta.com/knowledgebase/install-python/)
).
- Navigate to the project's server folder:
  ```
  cd template-react-python/server
  ```
- Set the global server `.env` file using the `.env.example` template.
- Install dependencies:
  ```
  pipenv install
  ```
- Initialize the database:
  ```
  pipenv run migrate
  pipenv run upgrade
  ```
- Start the server:
  ```
  pipenv run start
  ```

Enjoy exploring the app template!



## Folder Structure

- `client/`: frontend.
  - `src/`
    - `js/`
      - `layout/`: managing all different layout (home, dashboard, singup....)
      - `pages/`: pages archive
      - `router/`: react-router setting 
      - `store/`: flux configuration
  
- `server/`: backend
  - `api/`: .py archive like routes, confic, admin, etc
    - `services/`: backend logic
  - `assets`: html email and other utilities

