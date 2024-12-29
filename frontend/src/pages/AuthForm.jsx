import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.jsx"; // Axios instance
import InputField from "../components/Signup/InputField";
import ActionButton from "../components/Signup/ActionButton";
import Message from "../components/Signup/Message";
import "./authForm.css";


const AuthForm = ({ isRegister }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setError("");
    setSuccess("");
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setError("");
  };

  const handleSendOtp = async () => {
    if (!input) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);
    const endpoint = isRegister ? "register/" : "login/";

    try {
      await api.post(endpoint, { email: input });

      setOtpSent(true);
      setSuccess("OTP sent successfully! Please check your email.");
      localStorage.setItem("email", input);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("verify/", { email: input, otp });

      const { access, refresh, user_type } = response.data;
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("user_type", user_type)

      setSuccess("OTP verified successfully! Redirecting...");
      setOtpSent(false);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="loginContainer">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="loginTitle">
            <h2>{isRegister ? "Register" : "Login"}</h2>
            <p>{isRegister ? "Sign up with your email" : "Please login with your email"}</p>
          </div>

          {!otpSent ? (
            <div className="inputContainer">
              <input
                type="email"
                value={input}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </div>
          ) : (
            <div className="inputContainer">
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter OTP"
                required
              />
            </div>
          )}

          <button
            type="button"
            onClick={!otpSent ? handleSendOtp : handleVerifyOtp}
            className="loginButton"
            disabled={loading}
          >
            {loading ? "Loading..." : !otpSent ? "Send OTP" : "Verify OTP"}
          </button>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          {!otpSent && (
          isRegister ? (
            <p className="signupText">
              Have an account? <a href="/login">Login</a>
            </p>
          ) : (
            <p className="signupText">
              Don’t have an account? <a href="/register">Sign up</a>
            </p>
          )
        )}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
