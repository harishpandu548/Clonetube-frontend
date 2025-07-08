import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { useContext } from "react";
import Authcontext from "../../authcontextapi/Authcontext";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const {setuser}=useContext(Authcontext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const playload = {
        email: email,
        password: password,
      };
      const res = await axios.post("https://clonetube-clone-of-yt-backend.onrender.com/api/v1/users/login", playload,{
        withCredentials: true,
      });
      setuser(res.data.data.user)
      navigate("/");
    } catch (error) {
      console.log("login error", error);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="p-2 border rounded"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          required
        />
        <input
          className="p-2 border rounded"
          type="password"
          required
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Enter your password"
        />

        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
