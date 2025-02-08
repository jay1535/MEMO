import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home'; 
import About from './components/About';
import NoteState from "./context/notes/NoteState";
import Notes from "./components/Notes";
import Alert from "./components/Alert";

function App() {
  return (
    <NoteState>
    <Router>
      <Navbar />
      <Alert message="This is alert message"/>
      <div className="container">
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
      </div>
    </Router>
    </NoteState>
  );
}

export default App;
