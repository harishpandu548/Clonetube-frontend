import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "../../axios"
import Authcontext from '../../authcontextapi/Authcontext'

function Signup() {
  const [email, setemail] = useState("")
  const [username, setusername] = useState("")
  const [fullname, setfullname] = useState("")
  const [password, setpassword] = useState("")
  const [avatar, setavatar] = useState(null)
  const [coverimage, setcoverimage] = useState(null)
  const navigate = useNavigate()
  const { setuser } = useContext(Authcontext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const playload = new FormData()
      playload.append("email", email)
      playload.append("username", username)
      playload.append("fullname", fullname)
      playload.append("password", password)
      playload.append("avatar", avatar)
      playload.append("coverimage", coverimage)

      const res = await axios.post("/users/register", playload, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setuser(res.data.data)
      navigate("/")
    } catch (error) {
      console.log(error, "Signup failed")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Sign up</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
          type="text"
          required
          placeholder="Enter your Username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          className="p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          className="p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
          type="text"
          required
          placeholder="Enter your full name"
          value={fullname}
          onChange={(e) => setfullname(e.target.value)}
        />
        <input
          className="p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
          type="password"
          required
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button className="bg-green-600 text-white py-2 rounded hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
          Sign up
        </button>
        <input
          type="file"
          name="avatar"
          className="p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
          onChange={(e) => setavatar(e.target.files[0])}
          required
          accept="image/*"
        />
        <input
          type="file"
          className="p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
          name="coverimage"
          onChange={(e) => setcoverimage(e.target.files[0])}
          required
          accept="image/*"
        />
      </form>
    </div>
  )
}

export default Signup
