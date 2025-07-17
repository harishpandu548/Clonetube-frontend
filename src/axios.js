
// deploment changes

import axios from "axios"

const instance=axios.create({
    baseURL:"https://clonetube-production.up.railway.app/api/v1",
    withCredentials:true
})

export default instance

