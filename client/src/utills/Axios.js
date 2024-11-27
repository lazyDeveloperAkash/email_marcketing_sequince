import Axios from 'axios';

Axios.defaults.baseURL = "http://localhost:5000/api";
Axios.defaults.withCredentials = true;

// Add a flag to prevent infinite retries
Axios.interceptors.response.use(
    (response) => {
        return response; // Return the response if no error
    },
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is a 401 and retry logic hasn't been triggered
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark the request as retried

            try {
                // Attempt to refresh the token
                const { data } = await Axios.post('/access-token'); // Adjust the endpoint as needed
                const newAccessToken = data?.accessToken;
                console.log(newAccessToken)
                if (newAccessToken) {
                    // Update the Authorization header with the new token
                    Axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    // Retry the original request
                    return Axios(originalRequest);
                } else {
                    throw new Error("Refresh token failed to return a new access token");
                }
            } catch (refreshError) {
                // Handle the refresh token failure (e.g., log out the user)
                console.error('Refresh token request failed', refreshError);
                // Optionally: Redirect to login or handle logout logic here
                return Promise.reject(refreshError);
            }
        }

        // If it's not a 401 or retry fails, reject the error
        return Promise.reject(error);
    }
);

export default Axios;
