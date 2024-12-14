import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import InputField from "../components/Signup/InputField";
import ActionButton from "../components/Signup/ActionButton";
import Message from "../components/Signup/Message";
import "./Register.css";

const Register = () => {
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
      await axios.post(
        "http://localhost:8000/api/register/",
        {
          email: input.includes("@") ? input : null,
        }
        // const response = await axios.post("http://localhost:8000/api/register/", {
        //   email: input.includes("@") ? input : null,}
      );

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
      await axios.post("http://localhost:8000/api/verify/", {
        email: input.includes("@") ? input : null,
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
        <h1>Registration</h1>
        {!otpSent ? (
          <>
            <InputField
              value={input}
              onChange={handleInputChange}
              placeholder="Enter Email or Mobile"
              className="register-input"
            />
            <ActionButton
              onClick={handleSendOtp}
              disabled={loading}
              loading={loading}
              label="Send OTP"
              className="send-otp"
            />
          </>
        ) : (
          <>
            <InputField
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter OTP"
              className="register-input"
            />
            <ActionButton
              onClick={handleVerifyOtp}
              disabled={loading}
              loading={loading}
              label="Verify OTP"
              className="verify-otp"
            />
          </>
        )}
        {error && <Message text={error} type="error" />}
        {success && <Message text={success} type="success" />}
      </div>
    </div>
  );
};

export default Register;
