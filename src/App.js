import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './screens/welcome/WelcomeScreen';
import SignUp from './screens/signup/Signup';
import Login from './screens/login/Login';
import Home from './screens/home/Home';
// import Navbar from './components/navbar/Navbar';
function App() {
  return (
    <Router>
      <div className="App">
        {/* Use the Navbar component here */}
        
        {/* Define the routing paths and their corresponding components */}
        <Routes>
          <Route path="/" element={<WelcomeScreen/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
