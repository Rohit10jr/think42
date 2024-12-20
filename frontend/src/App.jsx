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
import ErrorBoundary from "./components/ErrorBoundary";
import DashBoard from "./pages/user_dashBoard_try";
import UserDashBoard from "./pages/userDash"
import FormikHome from "./pages/formikHome"

import Formik from "./pages/tut_formik"
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

        <Route
          path="/home"
          element={
            <ProtectedRoute
              element={
                <ErrorBoundary>
                  <Home />
                </ErrorBoundary>
              }
            />
          }
        />

        {/* <Route path="/dashboard" element={<ProtectedRoute element={<DashBoard />} />} /> */}
        {/* <Route path="/dashboard" element={<DashBoard />} /> */}
        <Route path="/dash"  element={
                <ErrorBoundary>
                  <UserDashBoard />
                </ErrorBoundary>
              } />
        <Route path="/formik" element={<Formik/>}/>
        <Route path="/formikHome" element={
           <ErrorBoundary><FormikHome/></ErrorBoundary>}/>

        {/* <Route path="/verify" element={<VerifyOTP />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
