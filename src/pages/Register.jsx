import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    hobi: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [showInfoBox, setShowInfoBox] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/auth/register",
        form
      );
      setMessage(response.data.status);
      setShowInfoBox(true);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const handleInfoBoxClose = () => {
    setShowInfoBox(false);
    navigate(`/verify-email/${form.email}`);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4">Register</h2>
        {message && <p className="mb-4">{message}</p>}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="hobi"
          placeholder="Hobi"
          value={form.hobi}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Register
        </button>
      </form>
      {showInfoBox && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl mb-4">Registration Successful</h2>
            <p>Please check your email to verify your account.</p>
            <button
              onClick={handleInfoBoxClose}
              className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
            >
              Verify Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
