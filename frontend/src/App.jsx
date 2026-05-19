import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GroupRoom from "./pages/GroupRoom";
import Tutors from "./pages/Tutors";
import BecomeTutor from "./pages/BecomeTutor";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/group/:id" element={<ProtectedRoute> <GroupRoom /> </ProtectedRoute>} />
        <Route path="/tutors" element={<ProtectedRoute> <Tutors /> </ProtectedRoute>} />
        <Route path="/become-tutor" element={ <ProtectedRoute> <BecomeTutor /> </ProtectedRoute> }/>
      </Routes>
    <Footer/>
    </BrowserRouter>
  );
};

export default App;
