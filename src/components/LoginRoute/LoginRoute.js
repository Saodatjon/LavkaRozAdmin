import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { loginRoutes } from '../../utilis/routes';

function LoginRoute() {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('./login')
        }
    }, [location])
    return (
        <Routes>
            {
                loginRoutes.map((route) => (
                    <Route
                        key={route.id}
                        element={route.component}
                        path={route.path}
                    />
                ))}
        </Routes>
    )
}

export default LoginRoute