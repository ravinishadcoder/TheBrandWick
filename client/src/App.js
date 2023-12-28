import './App.css';
import Login from './pages/Login';
import { Routes, Route } from "react-router-dom";
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
       <Routes>
       <Route path="/" element={ <Signup/>} />
        <Route path="/login" element={ <Login/>} />
       </Routes>
    </div>
  );
}

export default App;
