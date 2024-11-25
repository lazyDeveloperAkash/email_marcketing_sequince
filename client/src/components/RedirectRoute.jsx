import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/UserContext';
import Loader from './Loader';

const RedirectRoute = ({ children }) => {
    const { user, loading } = useAuth(); // Access user data from UserContext

    if(loading){
        return <Loader/>
    }

    // Redirect to login page if user is not authenticated
    if (user && !loading) {
        return <Navigate to="/dashboard" replace />;
    }

    // Render child components if user is authenticated
    return children;
};

export default RedirectRoute;
