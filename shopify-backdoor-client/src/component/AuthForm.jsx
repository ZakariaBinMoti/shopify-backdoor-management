import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ type }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = type === "login" ? "/login" : "/register";

    try {
      const res = await axios.post(`http://localhost:5000${endpoint}`, {
        email,
        password,
      });

      alert(res.data.message);
      if (type === "register") navigate("/login");
      else{
        localStorage.setItem("userEmail", email);
        navigate("/"); // example redirect
      } 
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white p-8 rounded shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center capitalize">
        {type} Form
      </h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 mb-4 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 mb-6 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {type === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}
