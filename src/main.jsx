
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import Authprovider from './authcontextapi/Authprovider.jsx';
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Authprovider>
      <App/>
      </Authprovider>
    </BrowserRouter>
   
 
)
