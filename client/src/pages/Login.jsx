import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();
     console.log(email);
  console.log(password);

    try {

      const response = await api.post("/auth/login", {
        email,
        password
      });

      // Store JWT token
      localStorage.setItem(
        "token",
        response.data.token
      );
      localStorage.setItem(
  "userId",
  response.data.user._id
);
      localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);
window.dispatchEvent(new Event("userChanged"));
      

      alert(response.data.message);

      setEmail("");
      setPassword("");

      // Redirect to Home page
      if (response.data.user.role === "admin") {

    navigate("/admin");

} else {

    navigate("/");

}



    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-900 flex items-center justify-center px-6 py-12">
  <div className="w-full max-w-md bg-white border border-slate-200 p-8 md:p-10 rounded-2xl shadow-2xl">

      <div className="text-center mb-8">

  <p className="text-teal-600 font-semibold uppercase tracking-wider text-sm">
    Student GigSphere
  </p>

  <h1 className="text-3xl font-bold text-slate-800 mt-2">
    Welcome Back
  </h1>

  <p className="text-slate-500 mt-2">
    Login to continue to your account
  </p>

</div>

      <form onSubmit={handleSubmit}>

        <input
          className="border border-slate-300 w-full p-3 mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          className="border border-slate-300 w-full p-3 mb-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          type="submit"
          className="bg-teal-600 text-white w-full py-3 rounded-xl font-semibold hover:bg-teal-700 transition shadow-sm"
        >
          Login
        </button>

      </form>
      <p className="text-center text-slate-500 mt-6">

  Don't have an account?{" "}

  <button
    type="button"
    onClick={() => navigate("/register")}
    className="text-teal-600 font-semibold hover:text-teal-700"
  >
    Register
  </button>

</p>

    </div>
    </div>

  );

}

export default Login;