// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

import { BrowserRouter as Router, Routes, Route,useLocation  } from "react-router-dom";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
import Home from "./pages/Home";
import Logout from "./pages/Logout";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthForm from "./pages/AuthForm";
import ErrorBoundary from "./components/ErrorBoundary";
import UserDashBoard from "./pages/userDash";
import FormikHome from "./pages/formikHome";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetail";
import TrySkillsInput from "./pages/try_SkillsInput";
import TrySkillsInput_1 from "./pages/try_SkillsInput_1";
// import Formik from "./pages/tut_formik";

import ChatBot from "./components/ChatBot/ChatBot.jsx"
import ChatWindow from "./components/ChatBot/ChatWindow.jsx"
import ChatWindow2 from "./components/ChatBot/ChatWindow2.jsx"
// import DashBoard from "./pages/user_dashBoard_try";
// import UserTestJson from "./pages/TestFileJson";
// import UserTestUpload from "./pages/TestFileUpload";
import LandingPage from  "./pages/LandingPage.jsx"
import NotFoundPage from "./pages/404"



// Helper component to conditionally render the ChatBot
const ChatBotWrapper = () => {
  const { pathname } = useLocation();
  // return pathname !== "/chatbot" ? <ChatBot /> : null;
  return !["/chatbot", "/login", "/register", "/chatbot2"].includes(pathname) ? <ChatBot /> : null;
};

const App = () => {
  // const location = useLocation();
  const hideChatBotRoutes = ['/login', '/register'];
  return (
    <>
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
       
        <Route path="/logout" element={<Logout />} />

        <Route path="*" element={<NotFoundPage />} />

        <Route path="/" element={<LandingPage />} />
        
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

        <Route
          path="/dashboard"
          element={
            <ErrorBoundary>
              <UserDashBoard />
            </ErrorBoundary>
          }
        />
        <Route
          path="/formikHome"
          element={
            <ErrorBoundary>
              <FormikHome />
            </ErrorBoundary>
          }
        />

        <Route
          path="/jobs"
          element={
            <ErrorBoundary>
              <JobList />
            </ErrorBoundary>
          }
        />
        <Route path="/jobs/:id" element={<JobDetail />} />

        {/* try out section */}
        <Route
          path="/skillsInput"
          element={
            <ErrorBoundary>
              <TrySkillsInput />
            </ErrorBoundary>
          } />
          <Route path="/chatbot" element={<ChatWindow />} /> {/* Add this route */}
          
          <Route path="/chatbot2" element={<ChatWindow2 />} />
          
        <Route path="/skillsInput_1" element={<TrySkillsInput_1 />} />

        {/* <Route path="/verify" element={<VerifyOTP />} /> */}
      </Routes>

      
    {/* <ChatBot/> */}
    <ChatBotWrapper />
        {/* Conditionally render ChatBot based on the current route */}
        {/* {!hideChatBotRoutes.includes(location.pathname) && <ChatBot />} */}
    </Router>
    </>
  );
};

export default App;
