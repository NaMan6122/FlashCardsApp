import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
    element: ReactElement;
  }
  
  const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [Error, setError] = useState(null);

    useEffect(() => {
        console.log("useEffect running");
        const checkUserRoleandAuth = async() => {
            try {
                console.log("HiiI");
                const verificationResponse = await axios.get("http://localhost:4000/api/users/v1/authcheck", { withCredentials : true });
                console.log(verificationResponse.data, "hi");
                console.log("HiiIi");

                setIsAuthenticated(true);
                setIsAdmin(true);
            } catch (error : any) {
                setIsAdmin(false);
                setIsAuthenticated(false);
                console.log(`Error while validating authentication and role! ${error.response.data.message}`);
                //alert(`Error: ${error.verificationResponse.data.message}`);
                setError(error.response.data.message);
            }finally{
                setLoading(false);
            }
        }

        checkUserRoleandAuth();
    }, []); //empty dependency array is passed to make sure the effect only runs when the component is mount.

    if(isLoading){
        return <div>Loading...</div>;
    }else{
        if(!isAuthenticated){
            console.log("Not Valid Req, Redirecting...")
            alert(`Unauthorized access: ${Error}`);
            return <Navigate to="/login" replace={true} />
        }
        if(!isAdmin){
            console.log("Not Valid Req, Redirecting!!!")
            alert(`Access denied!! ${Error}`);
            return <Navigate to="/homepage" replace={true} />
        }
    }
    return element;
}

export default PrivateRoute;
