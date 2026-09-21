import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!storedUser) {
        return <Navigate to="/properties" replace />;
    }

    try {
        const user = JSON.parse(storedUser);

        if (user.role !== "admin") {
            return <Navigate to="/properties" replace />;
        }

        return children;

    } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        return <Navigate to="/login" replace />;
    }
}

export default AdminRoute;