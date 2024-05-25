import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { otp } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying...");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/v1/auth/verify-email/${otp}`
        );
        if (response.data.status === "Success") {
          setIsVerified(true);
          setMessage(
            "Email verified successfully. Redirecting to login page..."
          );
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setMessage("Verification failed. Please try again.");
        }
      } catch (error) {
        setMessage("Verifying...");
      }
    };

    verifyEmail();

    const intervalId = setInterval(() => {
      if (!isVerified) {
        verifyEmail();
      } else {
        clearInterval(intervalId);
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, [otp, navigate, isVerified]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
