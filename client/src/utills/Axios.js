import Axios from 'axios'

Axios.defaults.baseURL = "http://localhost:5000/api";
Axios.defaults.withCredentials = true;

// for errors like 401
Axios.interceptors.response.use((response) => {
    return response;
}, async (error) => {

    //save original request
    const originalRequest = error.config;

    if(error.response.status === 401 && originalRequest.url.includes("/access-token")){
        // here we have to logout user because user don't have refresh token
    } else if(error.response.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;
        // call refresh token handler
        return Axios(originalRequest);
    }
    return Promise.reject(error);
})

export default Axios;