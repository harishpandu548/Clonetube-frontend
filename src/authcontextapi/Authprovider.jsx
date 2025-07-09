import React,{useEffect,useState} from 'react'
import axios from "../axios"
import Authcontext from "./Authcontext"

function Authprovider({children}) {
    const [user,setuser]=useState(null)
    const [loading,setloading]=useState(true)

    useEffect(()=>{
        axios.get("/users/current-user",{withCredentials:true})
        .then((res)=>{
            setuser(res.data.data)
            setloading(false)
        })
        .catch(()=>{
            setuser(null)
            setloading(false)
        })
    },[])

  return (
   < Authcontext.Provider value={{user,setuser}}>
    {!loading && children}
    </Authcontext.Provider>
  )
}

export default Authprovider