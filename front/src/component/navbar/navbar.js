import './navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';




export default function Navbar() {
    const navigate = useNavigate();
    const [pseudo, setPseudo] = useState("");
    const [avatar, setAvatar] = useState("");
    const id_user = localStorage.getItem('id_user');


    useEffect(() => {
         
        
        if (id_user !== null) {
            axios.get('https://localhost:8000/api/users/' + id_user)
                .then((res) => {
                    setPseudo(res.data.pseudo)
                    setAvatar(res.data.avatar) 
                })
        }
    }, [id_user])

    function logout() {
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(
            auth2.disconnect().then(
                localStorage.removeItem('id_user'),
                navigate("/")
                )
            )
            }
            
            function login(credentialResponse) {
       
        console.log(credentialResponse)
        let email = credentialResponse.profileObj.email
        axios.get("https://localhost:8000/api/users?mail=" + email)
            .then((ress) => {
                console.log(ress)
                if (ress.data['hydra:totalItems'] > 0) {
                    console.log(ress.data["hydra:member"][0].id)
                    localStorage.setItem('id_user', ress.data["hydra:member"][0].id)
                    navigate("/")
                    
                }
                else {
                    navigate("/register", { state: credentialResponse.profileObj });
                }
            })
    }

    return (
        <div className='navbarcontainer'>
            <img src="./Mastercard.png" className='logo'/>
            {id_user !== null ?
                <ul className='list'>
                    <li className='listItem'>
                        <img src={avatar} alt="avatar" className='avatar'></img>
                    </li>
                    <li className='listItem'>{pseudo}</li>
                    <li className='listItem'>
                        <img src="./porte.png" id="btnlogout" onClick={logout}/>
                    </li>
                </ul>
                :
                <ul className='list'>
                    <li className='listItem'>
                        <GoogleLogin
                            clientId="970311814990-r6dga327njfembiesdldvo53r08iq8d3.apps.googleusercontent.com"

                            onSuccess={(credentialResponse) => login(credentialResponse)}

                            onError={() => {
                                console.log('Login Failed');
                            }}

                        />
                    </li>
                </ul>
            }

        </div>
    );
}
