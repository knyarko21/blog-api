
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    // ==========================================
    // GET JWT TOKEN
    // ==========================================

    const token = localStorage.getItem("token");


    // ==========================================
    // CHECK AUTHENTICATION
    // ==========================================

    if (!token) {

        return <Navigate to="/login" replace />;

    }


    // ==========================================
    // USER IS AUTHENTICATED
    // ==========================================

    return children;
}

export default ProtectedRoute;