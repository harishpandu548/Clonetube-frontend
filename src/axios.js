
// deploment changes

import axios from "axios"

const instance=axios.create({
    baseURL:"https://clonetube-clone-of-yt-backend.onrender.com/api/v1",
    withCredentials:true
})

export default instance

//  https://clonetube-clone-of-yt-backend.onrender.com