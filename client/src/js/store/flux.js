//////////////////////////////////////////////////
/// FLUX
////////////////////////////////////////////////


const getState = ({getStore, getActions, setStore}) => {
	return {
		store: {
			login: false,
      user: {},
      preguntas: [],
		},
		actions: {

      getUsers : async ()=>{
        const url = process.env.BACK_URL + "/api/users"
        const options = {
          method: 'GET',
          headers: { "Content-Type": "application/json"}
        }

        const response = await fetch(url, options)

        if(response.ok){
          const data = await response.json()
          return {message:"user list downloaded", data};
        }else{
          const errorData = await response.json()
          return {error: errorData.message, data: errorData.data};
        }
      },


      /////////////////////////////
      // AUTHENTICATION AND LOGIN

      login : async (email, password) => {
        const { setToken } = getActions();
        const url = process.env.BACK_URL + "/api/login";
        const options = {
          method: "POST",
          body: JSON.stringify({email, password}),
          headers: { "Content-Type": "application/json"}
        }
        const response = await fetch(url, options);
      
        if (response.ok) {
          const data = await response.json();
          setToken(data.access_token);
          return { message: data.message };
        }else{
          const dataError = await response.json();
          return { error: dataError.message}
        }
      },
      
      setToken: (token) => {
        setStore({ login: true })
        localStorage.setItem("token", token)
      },
      
			logout: () => {
				setStore({login: false})
				localStorage.removeItem("token")
			},

			isLogged: () => {
				if(localStorage.getItem("token")){
					setStore({login: true})
          return true
				}
				else {
					setStore({login: false})
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
          setStore({ login: false, user: {} });
          return {error: 'Pro no authenticated'};
        }
        
        const response = await fetch(url, options);

        if (response.ok) {
          const data = await response.json();
          setStore({ login: true, user: data });
          return {message:"pro authenticated", data};
        } else {
          const data = await response.json();
          setStore({ login: false, user: {} });
          return { error:data }
        }
      },

      

      signup: async (userName, email, password) => {
        const url = process.env.BACK_URL + "/api/signup";
        const options = {
          method: "POST",
          body: JSON.stringify({ userName, email, password }),
          headers: { "Content-Type": "application/json"}
        };
      
        const response = await fetch(url, options)
        
        if(response.ok){
          const data = await response.json()
          console.log(data.message)
          return data
        }
        if(!response.ok){
          const data = await response.json()
          console.log(data.message)
          return null
        }
      },



		}
	};
};


export default getState;