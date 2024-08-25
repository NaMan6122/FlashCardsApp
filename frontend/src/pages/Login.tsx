import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import axios from 'axios';

export default function loginPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [button, setButton] = useState(false);

    useEffect(() => {
        if(user.username.length > 0  && user.password.length > 0){
            setButton(false);
        }else{
            setButton(true);
        }
    });

    const onLogin = async() => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:4000/api/users/v1/login", user);
            console.log(`User Logged In Successfully!! ${response.data}`);
            alert("User Login Successful!");
            navigate("/homepage")
        } catch (error : any) {
            if(error.response){
                console.log(error.response);
                alert(`Login Failed!?!: ${error.response.data.message || 'Unknown error'}`);
            }else{
                console.log(error.message);
                alert(`Unexpected Error Occured While Logging in! ${error.message}`);
            }
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing...." : "Login"}</h1>
        <hr />

        <label htmlFor="username">username</label>
        <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="username"
        />

        <label htmlFor="password">password</label>
        <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
        />

        <br></br>
        <button
            onClick={button ? ()=>{} : onLogin}
            className="p-2 border border-fray-300 rounded-lg mb-4 focus: outline-none focus border-gray-600">{button ? "Please Fill All Fields" : "Login"}</button>
        <Link to="/signup">New here? Lets Signup</Link>
    </div>
      );
    }
