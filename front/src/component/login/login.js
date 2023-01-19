import { Link, useLocation } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script'; 
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';



export default function Login(){
    const clientId = '970311814990-r6dga327njfembiesdldvo53r08iq8d3.apps.googleusercontent.com'; 
    const navigate = useNavigate();
    
    
    useEffect(()=>{
        function start(){
            gapi.client.init({
                clientId: clientId,
                scope: "https://www.googleapis.com/auth/userinfo.profile"
            })
        }
        gapi.load('client:auth2',start);
    })
    const onSuccess = (res) => {
        let email = res.profileObj.email
        axios.get("https://localhost:8000/api/users?mail="+email)
        .then((ress)=>{
            console.log(ress)
         if(ress.data['hydra:totalItems']  > 0){
            console.log("c'est supererior a 0")
            navigate("/")
         }
         else{
             navigate("/register",{state: res.profileObj});
            console.log("tas pas de compte enregistretoi")
         }
        })
        
       
         
        // navigate("/register",{res});
        
       
    }
    const onFailure = (res) => {
        console.log("Connexion echouer ",res);
    }

    return(
        <div id='bouton'>
             <GoogleLogin
                clientId={clientId}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                scope= "https://www.googleapis.com/auth/userinfo.profile"
            />    
        </div>
    )
}