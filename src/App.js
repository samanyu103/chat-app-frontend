import './App.css';
// import Home from './home';
import Login from './login';
import SignUp from './signup';
import GetData from './getdata';
import Dashboard from './dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/getdata" element={<GetData />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
