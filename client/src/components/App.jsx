import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './Register';
import Home from './Home';
import Users from './Users';
import Checkout from './Checkout';
import { useUser } from '../context/UserContext.js';

export default function App() {
  const { user } = useUser();

  if (user === undefined) return <div>Loading...</div>

  return (
    <Routes>
      <Route path = '/'         element={user ? <Navigate to='/home' replace /> : <Register />}/>
      <Route path = '/home'     element={user ? <Home/> : <Navigate to='/' replace />}/>
      <Route path = '/users'    element={<Users />}/>
      <Route path = '/checkout' element={user ? <Checkout /> : <Navigate to='/' replace /> }/>
    </Routes>
  );
}
