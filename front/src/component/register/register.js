import { Link, useLocation } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script'; 
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './register.css';


export default function Register(){
    


    const [pseudo, setPseudo] = useState("");
    const navigate = useNavigate();
    const parametre = useLocation();
   
    function ajoutbdd(e){
        
       let email = parametre.state.email
       let image = parametre.state.imageUrl
       axios.get("https://localhost:8000/api/users?mail="+email)
       .then((res)=>{
        if(res.data['hydra:totalItems']  === 0)
        {
            axios.post('https://localhost:8000/api/users',{
              "pseudo": pseudo,
              "mail": email,
              "avatar": image,
              "description": "Ici renseigne t'as description..."
            })  
            .then((res)=>{
                let id_user = res.data.id
                localStorage.setItem('id_user',id_user);
            })
            navigate("/")
        }
       })
    }

    return(
        <div>
            <form> 
                <div className="oui">
                    <input
                        value={pseudo}
                        onChange={(e) => setPseudo(e.target.value)}
                        placeholder="Pseudo.."
                        type="text"
                        name="name"
                        id="name_input"
                        required
                      />
                    <span ><a onClick={(e) => ajoutbdd(e)} href="#"></a></span>
                </div>
            </form>
        </div>
    )
}