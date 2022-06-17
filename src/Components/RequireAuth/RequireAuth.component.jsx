import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth()
    const location = useLocation()

    return (
        auth?.status 
            ? <Outlet /> 
            : <Navigate to="/signin" state={{from: location}} replace />
    )
}

export default RequireAuth;