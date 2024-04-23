//////////////////////////////////////////////////
/// FLUX
////////////////////////////////////////////////


const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      login: false,
      estudiante: {},
      estadisticasEstudiante: [],
      preguntasSeleccionadas: [],
      categorias: [],
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

      logout: () => {
        setStore({ login: false })
        localStorage.removeItem("token")
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
        if (response.ok) {
          const data = await response.json()
          return { mensaje: data.mensaje, data: data.data }
        }
        else {
          const data = await response.json()
          return { error: data.mensaje }
        }
      },

      ////////////////////////////////
      //PREGUNTAS

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

      getPreguntasByCategoria: async (categoriaId) => {
        const url = process.env.BACK_URL + `/api/categoria/${categoriaId}/preguntas`
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

      //////////////////////////////////////////////////////
      // ESTUDIANTES

      updateEstudiante: async (estudiante) => {
        const url = process.env.BACK_URL + `/api/estudiantes/${estudiante.id}`
        const options = {
          method: 'PUT',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(estudiante)
        }
        const response = await fetch(url, options)
        if (response.ok) {
          const data = await response.json()
          setStore({estudiante: data.data})
          return {mensaje: data.mensaje, data: data.data}
        }
        else {
          const data = await response.json()
          return {error: data.mensaje}
        }
      },

      getEstudiante: async (estudianteId) => {
        const url = process.env.BACK_URL + `/api/estudiantes/${estudianteId}`
        const options = {
          method: 'GET',
          headers: {"Content-Type": "application/json"}
        }
        const response = await fetch(url, options)
        if (response.ok) {
          const data = await response.json()
          setStore({estudiante: data.data})
          return {mensaje: data.mensaje, estudiante: data.data}
        }
        else {
          
        }
      }
    }
  };
};


export default getState;