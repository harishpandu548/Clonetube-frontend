import React,{useEffect,useState} from 'react'
import axios from "../axios"
// import axios from "axios"

import Authcontext from "./Authcontext"

function Authprovider({children}) {
    const [user,setuser]=useState(null)
    const [loading,setloading]=useState(true)

    const getCurrentUser=async()=>{
        try{
            // const res=await axios.get("/api/v1/users/current-user",{withCredentials:true})
            const res=await axios.get("/users/current-user",{withCredentials:true})
            setuser(res.data.data)
        }
        catch(error){
            console.log("Not logged in")
            setuser(null)
        }
        finally{
            setloading(false)
        }
    }

    useEffect(()=>{
        getCurrentUser()
    },[])

  return (
   < Authcontext.Provider value={{user,setuser}}>
    {!loading && children}
    </Authcontext.Provider>
  )
}

export default Authprovider