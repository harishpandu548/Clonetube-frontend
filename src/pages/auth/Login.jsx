import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import Authcontext from "../../authcontextapi/Authcontext";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { setuser } = useContext(Authcontext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { email, password };
      const res = await axios.post(
        "https://clonetube-clone-of-yt-backend.onrender.com/api/v1/users/login",
        payload,
        { withCredentials: true }
      );
      setuser(res.data.data.user);
      navigate("/");
    } catch (error) {
      console.log("login error", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black px-4">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white dark:bg-neutral-900">
        <h2 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">
          Sign in to CloneTube
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 text-sm text-black dark:text-white"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
          <input
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 text-sm text-black dark:text-white"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
