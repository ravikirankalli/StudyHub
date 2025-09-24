import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password });
      navigate("/login");
    } catch (err) {
      alert("Error registering user");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 shadow-lg rounded bg-white">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="flex flex-col space-y-4">
        <input type="text" placeholder="Name" className="border p-2"
          value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" className="border p-2"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="border p-2"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="bg-green-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}

export default Register;
