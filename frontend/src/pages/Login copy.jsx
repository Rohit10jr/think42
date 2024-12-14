import { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
      setError("Please enter your email or mobile number.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        email: input.includes("@") ? input : null,
        // mobile: input.match(/^\d+$/) ? input : null,
      });

      setOtpSent(true);
      setSuccess("OTP sent successfully! Please check your email or mobile.");
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
      const response = await axios.post("http://localhost:8000/api/verify/", {
        email: input.includes("@") ? input : null,
        // mobile: input.match(/^\d+$/) ? input : null,
        otp,
      });

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
    <div className="register-container">
      <div className="register-card">
        <h1>Login</h1>
        {!otpSent ? (
          <div>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Enter Email or Mobile"
              className="register-input"
            />
            <button
              onClick={handleSendOtp}
              className="register-button send-otp"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        ) : (
          <div>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter OTP"
              className="register-input"
            />
            <button
              onClick={handleVerifyOtp}
              className="register-button verify-otp"
              disabled={loading}
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
          </div>
        )}
        {error && <p className="register-error">{error}</p>}
        {success && <p className="register-success">{success}</p>}
      </div>
    </div>
  );
};

export default Login;
