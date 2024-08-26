import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Homepage() {
  const [theUser, setTheUser] = useState<any>(null);

  useEffect(() => {
    const getUserDetails = async() => {
      try {
        const user = await axios.get("http://localhost:4000/api/users/v1/get-user-info", { withCredentials : true });
        //console.log(user);
        //console.log(user.data);
        console.log(user.data.data.username) //here is where the username is stored.
        setTheUser(user.data.data.username);
      } catch (error : any) {
        if(error.response){
          console.log(error.response.data.message);
        }else{
          console.log(error.message);
        }
      }
    }
    getUserDetails();
  }, [])
  const viewCards = async() => {

  }
  return (
    <div className="container">
      <h1>Homepage</h1>
      <br></br>
      <h2>{theUser ? `Welcome to the Application, ${theUser}!!` : 'Loading...'} </h2>
      <br></br>
      <button
      onClick={viewCards}
      className="p-2 border border-fray-300 rounded-lg mb-4 focus: outline-none focus border-gray-600">Let's Start</button>
    </div>
  )
}
