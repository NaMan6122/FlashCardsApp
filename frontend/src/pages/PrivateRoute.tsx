import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
    element: ReactElement;
  }
  
  const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {

        const checkUserRoleandAuth = async() => {
            try {
                setLoading(true);
                const verificationResponse = await axios.get("http://localhost:4000/api/users/v1/authcheck");
                console.log(verificationResponse, "hi");
                setIsAuthenticated(true);
                setIsAdmin(true);
            } catch (error) {
                setIsAdmin(false);
                setIsAuthenticated(false);
                console.log(`Error while validating authentication and role! ${error}`)
            }finally{
                setLoading(false);
            }
        }

        checkUserRoleandAuth();
    }, []); //empty dependency array is passed to make sure the effect only runs when the component is mount.

    if(isLoading){
        return <div>Loading...</div>;
    }

    if(isAuthenticated === false){
        console.log("Not Valid Req, Redirecting...")
        alert("Unauthorized access denied!!");
        return <Navigate to="/login" replace={true} />
    }
    if(isAdmin === false){
        console.log("Not Valid Req, Redirecting!!!")
        alert("Access denied!!");
        return <Navigate to="/homepage" replace={true} />
    }

    return element;
}

export default PrivateRoute;
