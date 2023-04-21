import Register from './Register';
import Home from './Home';
import Users from './Users';
import Checkout from './Checkout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path = '/' element={<Register />}/>
          <Route path = '/home' element={<Home/>}/>
          <Route path = '/users' element={<Users />}/>
          <Route path = '/checkout' element={<Checkout />}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
