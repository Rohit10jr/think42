// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
import Home from "./pages/Home";
import Logout from "./pages/Logout";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthForm from "./pages/AuthForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={<PublicRoute element={<AuthForm isRegister={true} />} />}
        />
        <Route
          path="/login"
          element={<PublicRoute element={<AuthForm isRegister={false} />} />}
        />
        {/* <Route
          path="/register"
          element={<PublicRoute element={<Register />} />}
        />
        <Route path="/login" element={<PublicRoute element={<Login />} />} /> */}

        <Route path="/logout" element={<Logout />} />

        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />

        {/* <Route path="/verify" element={<VerifyOTP />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
