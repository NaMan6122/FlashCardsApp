import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import Admin from './pages/Admin.tsx';
import PrivateRoute from "./pages/PrivateRoute.tsx"
import Homepage from './pages/Homepage.tsx';
function App() {


  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/add-card-admin" element={<PrivateRoute element={<Admin />}/>} />
      <Route path="/homepage" element={<Homepage />} />
    </Routes>
  )
}

export default App
