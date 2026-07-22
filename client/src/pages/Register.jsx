import { useState } from "react";
import api from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert(response.data.message);

      setName("");
      setEmail("");
      setPassword("");
      setRole("customer");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center">

      <div className="bg-white rounded-2xl shadow-2xl p-10 w-[420px]">

        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Join GigSphere
        </p>

        <form onSubmit={handleSubmit}>

          <input
            className="w-full border rounded-lg p-3 mb-4"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            className="w-full border rounded-lg p-3 mb-4"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            className="w-full border rounded-lg p-3 mb-4"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <h3 className="font-semibold mb-3">
            Select Role
          </h3>

          <div className="grid grid-cols-2 gap-3 mb-6">

            <button
              type="button"
              onClick={()=>setRole("customer")}
              className={`p-4 rounded-xl border ${
                role==="customer"
                  ? "bg-blue-600 text-white"
                  : "bg-white"
              }`}
            >
              🎓
              <br />
              Student
            </button>

            <button
              type="button"
              onClick={()=>setRole("provider")}
              className={`p-4 rounded-xl border ${
                role==="provider"
                  ? "bg-green-600 text-white"
                  : "bg-white"
              }`}
            >
              💼
              <br />
              Provider
            </button>

            

          </div>

          <button
            className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700"
          >
            Create Account
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;