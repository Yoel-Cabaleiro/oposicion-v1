//////////////////////////////////////////////////
/// FLUX

////////////////////////////////////////////////


const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      login: false,
      estudiante: {},
      estadisticasEstudiante: [],
      estadisticaSeleccionada: {},
      preguntasSeleccionadas: [],
      categorias: [],
      categoriasSeleccionadas: [],
      clientSecret: "",
      sessionId: "",
    },

    actions: {
      getEstudiantes: async () => {
        const url = process.env.BACK_URL + "/api/estudiantes"
        const options = {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
        }

        const response = await fetch(url, options)

        if (response.ok) {
          const data = await response.json()
          return { message: "Estudiantes list downloaded", data };
        } else {
          const errorData = await response.json()
          return { error: errorData.message, data: errorData.data };
        }
      },

      /////////////////////////////
      // AUTHENTICATION AND LOGIN

      login: async (email, password) => {
        const { setToken } = getActions();
        const url = process.env.BACK_URL + "/api/login";
        const options = {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" }
        }
        const response = await fetch(url, options);

        if (response.ok) {
          const data = await response.json();
          setToken(data.access_token);
          // const store = getStore();
          // console.log(store.estudiante)
          return { message: data.message };
        } else {
          const dataError = await response.json();
          return { error: dataError.message }
        }
      },

      setToken: (token) => {
        setStore({ login: true })
        localStorage.setItem("token", token)
      },

      logout: async () => {
        const token = localStorage.getItem('token');
        const url = process.env.BACK_URL + '/api/logout';
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        if (!token) {
          setStore({ login: false, estudiante: {}, estadisticasEstudiante: [], estadisticaSeleccionada: {}, preguntasSeleccionadas: [], categoriasSeleccionadas: [] });
          return { error: 'Pro no authenticated' };
        }
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json()
          setStore({ login: false, estudiante: {}, estadisticasEstudiante: [], estadisticaSeleccionada: {}, preguntasSeleccionadas: [], categoriasSeleccionadas: [] })
          localStorage.removeItem("token")
          console.log(data)
        }

      },

      isLogged: () => {
        if (localStorage.getItem("token")) {
          setStore({ login: true })
          return true
        }
        else {
          setStore({ login: false })
          return false
        }
      },

      authentication: async () => {
        const token = localStorage.getItem('token');
        const url = process.env.BACK_URL + '/api/authentication';
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        if (!token) {
          setStore({ login: false, estudiante: {} });
          return { error: 'Pro no authenticated' };
        }

        const response = await fetch(url, options);

        if (response.ok) {
          const data = await response.json();
          setStore({ login: true, estudiante: data });
          return { message: "pro authenticated", data };
        } else {
          const data = await response.json();
          setStore({ login: false, estudiante: {} });
          return { error: data }
        }
      },

      signup: async (email, password) => {
        const url = process.env.BACK_URL + "/api/signup";
        const options = {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" }
        };

        const response = await fetch(url, options)

        if (response.ok) {
          const data = await response.json()
          console.log(data.message)

          setStore({ login: true })
          setStore({ estudiante: data.message.estudiante })
          localStorage.setItem("token", data.message.access_token)
          // const store = getStore();
          return data
        }
        if (!response.ok) {
          const data = await response.json()
          console.log(data.message)
          return null
        }
      },

      /////////////////////////////////
      // ESTADISTICAS

      getEstadísticasByEstudiante: async (estudianteId) => {
        const url = process.env.BACK_URL + `/api/estudiantes/${estudianteId}/estadisticas`
        const options = {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
        }
        const response = await fetch(url, options)
        if (response.ok) {
          const data = await response.json()
          setStore({ estadisticasEstudiante: data.data })
          return { mensaje: data.mensaje, data: data.data }
        }
        else {
          const data = await response.json()
          return { error: data.mensaje }
        }
      },

      newEstadistica: async (categoriaId, estudianteId) => {
        const url = process.env.BACK_URL + "/api/estadisticas";
        const options = {
          method: "POST",
          body: JSON.stringify({ categoriaId, estudianteId }),
          headers: { "Content-Type": "application/json" }
        }
        const response = await fetch(url, options)
        // console.log(categoriaId, estudianteId)
        if (response.ok) {
          const data = await response.json()
          return { mensaje: data.mensaje, data: data.data }
        }
        else {
          const data = await response.json()
          return { error: data.mensaje }
        }
      },

      actualizarEstadistica: async (estadistica) => {
        const actions = getActions()
        const url = process.env.BACK_URL + `/api/estadisticas/${estadistica.id}`;
        const options = {
          method: "PUT",
          body: JSON.stringify(estadistica),
          headers: { "Content-Type": "application/json" }
        }
        const response = await fetch(url, options)
        if (response.ok) {
          const data = await response.json()
          const estadisticas = await actions.getEstadísticasByEstudiante(estadistica.estudiante_id)
          return ({ 'mensaje': data.mensaje, 'data': estadisticas.data })
        }
        else {
          return ({ 'error': 'error al actualizar la estadistica' })
        }
      },


      ////////////////////////////
      //Categorias

      getCategorias: async () => {
        const url = process.env.BACK_URL + `/api/categorias`
        const options = {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
        }
        const response = await fetch(url, options)
        if (response.ok) {
          const data = await response.json()
          setStore({ categorias: data.data })
          return { "mensaje": data.mensaje, "data": data.data }
        }
        else {
          const data = await response.json()
          return { "error": data.mensaje }
        }
      },

      setCategoriasSeleccionadas: (categorias) => {
        setStore({ categoriasSeleccionadas: categorias });
        // console.log(categoriasSeleccionadas)
      },

      ////////////////////////////////
      //PREGUNTAS

      getPreguntasByCategoria: async (categoriaId) => {
        const url = process.env.BACK_URL + `/api/categorias/${categoriaId}/preguntas`
        const options = {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
        }
        const response = await fetch(url, options)
        if (response.ok) {
          const data = await response.json()
          setStore({ preguntasSeleccionadas: data.data })
          return { "mensaje": data.mensaje, "data": data.data }
        }
        else {
          const data = await response.json()
          return { "error": data.mensaje }
        }
      },

      getPreguntasFalladas: () => {
        let fallos = localStorage.getItem("fallos")
        const store = getStore()
        if (!fallos) {
          localStorage.setItem("fallos", JSON.stringify([]))
        }
        else {
          setStore({ preguntasFalladas: JSON.parse(fallos) })
        }
      },

      ////////////////////////////////
      //FALLOS

      actualizarFallosExamen: async (listaFallos, estadisticaId, estudianteId) => {
        const url = process.env.BACK_URL + "/api/actualizar_fallos_examen";
        const options = {
          method: "PUT",
          body: JSON.stringify({ 'preguntas': listaFallos, estadisticaId }),
          headers: { "Content-Type": "application/json" }
        }
        const actions = getActions()
        const response = await fetch(url, options)
        if (response.ok) {
          const data = await response.json()
          const estadisticas = await actions.getEstadísticasByEstudiante(estudianteId)
          return { 'mensaje': data.mensaje, 'data': estadisticas.data }
        }
        else {
          return { 'error': 'Error al actualizar fallos' }
        }
      },

      actualizarFallosPractica: async (preguntaId, estadisticaId, estudianteId) => {
        const url = process.env.BACK_URL + "/api/actualizar_fallos_practica";
        const options = {
          method: "PUT",
          body: JSON.stringify({ preguntaId, estadisticaId }),
          headers: { "Content-Type": "application/json" }
        }
        const actions = getActions()
        const response = await fetch(url, options)
        if (response.ok) {
          const data = await response.json()
          const estadisticas = await actions.getEstadísticasByEstudiante(estudianteId)
          estadisticas.data.map(estadistica => {
            if (estadistica.id === estadisticaId) {
              setStore({ estadisticaSeleccionada: estadistica })
            }
          })
          return { 'mensaje': data.mensaje, 'data': estadisticas.data }
        }
        else {
          const data = await response.json()
          return { 'error': data.error }
        }
      },
      ////////////////////////////////
      // SELECCIONAR UN PLAN Y PAGAR
      ////////////////////////////////
      //STRIPE

      selectedPaymentOption: async (option) => {
        // const { setToken } = getActions();
        const url = process.env.BACK_URL + "/api/create-checkout-session";
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "option": option,
          }),
        }
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          // setStore({ estudiante: { ...store.estudiante, suscripcion: option } });
          // console.log(store.estudiante)
          // return { message: data.message };
          // Almacenamos el clientsecret y la session id que nos da stripe en el local storage para pasarsela al formulario
          localStorage.setItem("payment", JSON.stringify({ clientSecret: data.clientSecret, session_id: data.session_id, option: option }))
        } else {
          const dataError = await response.json();
          return { error: dataError.message }
        }
      },

      ////////////////////////////////
      //  ESTUDIANTE
      ////////////////////////////////

      getEstudiante: async (estudianteId) => {
        const url = process.env.BACK_URL + `/api/estudiantes/${estudianteId}`
        const options = {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
        }

        const response = await fetch(url, options)

        if (response.ok) {
          const data = await response.json()
          console.log(data)
          return { message: "Estudiante:", data };
        } else {
          const errorData = await response.json()
          return { error: errorData.message, data: errorData.data };
        }
      },

      updateSuscriptionEstudiante: async (estudianteId, subscription) => {
        const url = process.env.BACK_URL + `/api/estudiantes/${estudianteId}`;
        const actions = getActions()
        const store = getStore();
        const options = {
          method: "PUT",
          body: JSON.stringify({
            "email": store.estudiante.email,
            "suscripcion": subscription
          }),
          headers: { "Content-Type": "application/json" }
        }
        try {
          const response = await fetch(url, options)
          if (response.ok) {
            const data = await response.json()
            console.log(`La suscripcion del usuario ha sido actualizada: ${subscription}`)
            // Volver a traer el estudiante con la informacion de la suscripción actualizada.
            const estudianteData = await actions.getEstudiante(estudianteId);
            if (estudianteData.data) {
              setStore({ estudiante: estudianteData.data.data });
            }
            return { 'mensaje': data.mensaje, 'data': data.data, }
          } else {
            return { 'error': 'Error al actualizar fallos' }
          }
        } catch (error) {
          console.error(`Error en el fetch: ${error.message}`);
          return { 'error': 'Error en el fetch' };
        };
      },
    },
  };
};


export default getState;