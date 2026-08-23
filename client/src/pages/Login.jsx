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

    <div className="max-w-md mx-auto mt-10 border p-6 rounded shadow">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Login
      </h1>

      <form onSubmit={handleSubmit}>

        <input
          className="border w-full p-2 mb-4 rounded"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          className="border w-full p-2 mb-4 rounded"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

      </form>

    </div>

  );

}

export default Login;