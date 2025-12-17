import React,{useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import Home from './components/Home'; 
import About from './components/About';
import NoteState from "./context/notes/NoteState";
import Notes from "./components/Notes";
import Alert from "./components/Alert";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import DashBoard from "./components/DashBoard";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";

import Tasks from "./components/Tasks";

import TaskDashboard from "./components/TaskDashBoard";
import TaskState from "./context/tasks/taskState";


function App() {

  const [alert, setAlert] = useState(null);
  

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 1500);
  }
  return (
    <NoteState>
      <TaskState>
    <Router>
      <Navbar/>
      <Alert alert={alert}/>
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/dashboard" element={<DashBoard showAlert={showAlert} />} />
  <Route path="/about" element={<About />} />
  <Route path="/notes" element={<Notes showAlert={showAlert} />} />
  <Route path="/tasks" element={<Tasks showAlert={showAlert} />} />
  <Route path ="/taskDashboard" element = {<TaskDashboard showAlert={showAlert} />} />
   
  <Route path="/login" element={<Login showAlert={showAlert} />} />
  <Route path="/signup" element={<SignUp showAlert={showAlert} />} />

  {/* ⭐ 404 PAGE ROUTE */}
  <Route path="*" element={<NotFound />} />
</Routes>

      
    </Router>
    </TaskState>
    </NoteState>
  );
}

export default App;
