import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

export default function App() {
  const user = localStorage.getItem('token');
  return (
    <Routes>
      {user && <Route path="/" element={<Home />} />}
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/" element={<Navigate to="/LogIn" />} />
    </Routes>

  );
}