import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
// import axios from "axios"
import toast,{Toaster} from "react-hot-toast";
import Authcontext from "../../authcontextapi/Authcontext";

function Signup() {
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [fullname, setfullname] = useState("");
  const [password, setpassword] = useState("");
  const [avatar, setavatar] = useState(null);
  const [coverimage, setcoverimage] = useState(null);
  const [loading,setloading]=useState(false)
  const navigate = useNavigate();
  const { setuser } = useContext(Authcontext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true)
    try {
      const playload = new FormData();
      playload.append("email", email);
      playload.append("username", username);
      playload.append("fullname", fullname);
      playload.append("password", password);
      playload.append("avatar", avatar);
      playload.append("coverimage", coverimage);

      const res = await axios.post("/users/register", playload, {
      // const res = await axios.post("/api/v1/users/register", playload, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setuser(res.data.data);
      toast.success("SignUp successfully")
      setTimeout(()=>{
        navigate("/");
      },1000)

    } catch (error) {
      console.log(error, "Signup failed");
      toast.error("SignUp failed")
      alert("Signup failed. Try again.");
    }
    finally{
      setloading(false)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black px-4">
      <div className="w-full max-w-xl p-8 rounded-2xl shadow-xl bg-white dark:bg-neutral-900">
        <h2 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">
          Create your CloneTube account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 text-sm text-black dark:text-white"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            required
          />
          <input
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 text-sm text-black dark:text-white"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
          <input
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 text-sm text-black dark:text-white"
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setfullname(e.target.value)}
            required
          />
          <input
            className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 text-sm text-black dark:text-white"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />
           <label className="text-gray-800  dark:text-gray-100 font-medium">
            Upload AvatarImage:
          </label>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={(e) => setavatar(e.target.files[0])}
            required
            className="block w-full -mt-4 text-sm text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
          <label className="text-gray-800  dark:text-gray-100 font-medium">
            Upload CoverImage:
          </label>
          <input
            type="file"
            name="coverimage"
            accept="image/*"
            onChange={(e) => setcoverimage(e.target.files[0])}
            required
            className="block w-full -mt-4 text-sm text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
          <button
            type="submit"
            className={`bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold transition ${loading?"opacity-50 cursor-not-allowed":""}`}
          >
            Sign up
          </button>
        </form>
      </div>
      <Toaster position="top-right"/>
    </div>
  );
}

export default Signup;
