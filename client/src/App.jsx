import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Projects from "./Projects";
import Teams from "./Teams";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/team/:team_id" element={<Teams/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;