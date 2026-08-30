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
      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-900 flex items-center justify-center px-4 py-8 sm:py-10">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 w-full max-w-md">

        {/* Heading */}

        <div className="text-center mb-7">

          <p className="text-teal-600 font-semibold uppercase tracking-wider text-sm">
            Student GigSphere
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-2">
  Create Account
</h1>

          <p className="text-slate-500 mt-2">
            Join the student community
          </p>

        </div>


        <form onSubmit={handleSubmit}>

          {/* Name */}

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Full Name
          </label>

          <input
            className="w-full border border-slate-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />


          {/* Email */}

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Email
          </label>

          <input
            className="w-full border border-slate-300 rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />


          {/* Password */}

          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Password
          </label>

          <input
            className="w-full border border-slate-300 rounded-xl p-3 mb-5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Create a password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />


          {/* Role */}

          <h3 className="font-semibold text-slate-700 mb-3">
            Select Role
          </h3>

          <div className="grid grid-cols-2 gap-3 mb-6">

            {/* Student */}

            <button
              type="button"
              onClick={() => setRole("customer")}
              className={`p-4 rounded-xl border font-semibold transition ${
                role === "customer"
                  ? "bg-teal-600 text-white border-teal-600 shadow-md"
                  : "bg-white text-slate-700 border-slate-300 hover:border-teal-400 hover:bg-teal-50"
              }`}
            >
              <span className="text-2xl">
                🎓
              </span>

              <br />

              Student
            </button>


            {/* Provider */}

            <button
              type="button"
              onClick={() => setRole("provider")}
              className={`p-4 rounded-xl border font-semibold transition ${
                role === "provider"
                  ? "bg-teal-600 text-white border-teal-600 shadow-md"
                  : "bg-white text-slate-700 border-slate-300 hover:border-teal-400 hover:bg-teal-50"
              }`}
            >
              <span className="text-2xl">
                💼
              </span>

              <br />

              Provider
            </button>

          </div>


          {/* Register */}

          <button
            type="submit"
            className="w-full bg-teal-600 text-white p-3 rounded-xl font-semibold hover:bg-teal-700 transition shadow-sm"
          >
            Create Account
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;