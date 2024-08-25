import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import axios from 'axios';


export default function signupPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [button, setButton] = useState(false);

  useEffect(() => {
      if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
          setButton(false);
      }else{
          setButton(true);
      }
  });

  const onSignup = async() => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:4000/api/users/v1/signup", user);
      console.log(`User Signup Successfully!! ${response.data}`);
      alert("User Signup Successsful, Redirecting to Login");
      navigate("/login");
    } catch (error : any) {
      console.log(`Error While User Sign Up, ${error.message}`)
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing...." : "Signup"}</h1>
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

        <label htmlFor="email">email</label>
        <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
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
            onClick={button ? ()=>{} : onSignup}
            className="p-2 border border-fray-300 rounded-lg mb-4 focus: outline-none focus border-gray-600">{button ? "Please Fill All Fields" : "Signup"}</button>
        <Link to="/login">Already a User?</Link>
    </div>
  )
}
