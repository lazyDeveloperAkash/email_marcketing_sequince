import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Axios from '../utills/Axios';
import { toast } from 'react-toastify';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const checkAuthentication = useCallback(async () => {
        try {
            const { data } = await Axios.get('/user');
            setUser(data?.user);
        } catch (error) {
            // toast.warn(error.response?.data?.message || 'please login');
            setUser(null);
            console.log(error)
        }
    }, []);

    useEffect(() => {
        if (!user) checkAuthentication();
    }, [user, checkAuthentication]);

    // Signup function
    const signup = useCallback(async (userData) => {
        try {
            setLoading(true);
            const { data } = await Axios.post('/signup', userData);
            setUser(data.user);
            toast.success("Signup successfull");
            return true;
        } catch (err) {
            toast.warn(err.response?.data?.message || 'Signup failed');
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    // Login function
    const signin = useCallback(async (userData) => {
        console.log(userData)
        try {
            setLoading(true);
            const { data } = await Axios.post('/signin', userData);
            setUser(data.user);
            toast.success("Signin successfull");
            return true;
        } catch (err) {
            toast.warn(err.response?.data?.message || 'Login failed');
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    // Logout function
    const signout = useCallback(async () => {
        try {
            setLoading(true);
            await Axios.post('/signout');
            setUser(null);
            toast.success("sucessfully signout!")
            // navigate("/signin");
        } catch (err) {
            console.log(err)
            toast.warn("Signout failed!")
        } finally {
            setLoading(false);
        }
    }, []);


    return (
        <UserContext.Provider value={{
            user,
            signup,
            signin,
            signout,
            loading,
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(UserContext);
};