import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/UserContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth(); // Access user data from UserContext

    // Redirect to login page if user is not authenticated
    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    // Render child components if user is authenticated
    return children;
};

export default ProtectedRoute;
