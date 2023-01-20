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
        console.log(id_user)
        if (id_user !== null) {
            axios.get('https://localhost:8000/api/users/' + id_user)
                .then((res) => {
                    setPseudo(res.data.pseudo)
                    setAvatar(res.data.avatar)
                })
        }
    }, [])

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
            <span className='logo'>BR</span>
            {id_user !== null ?
                <ul className='list'>
                    <li className='listItem'>
                        <img src={avatar} alt="avatar" className='avatar'></img>
                    </li>
                    <li className='listItem'>{pseudo}</li>
                    <li className='listItem'>
                        <button onClick={logout}>Logout</button>
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

/* export default function Navbar(){
   
    const navigate = useNavigate();
    const clientId = '970311814990-r6dga327njfembiesdldvo53r08iq8d3.apps.googleusercontent.com'; 
   
    
    useEffect(() => {
        const initClient = () => {
              gapi.client.init({
              clientId: clientId,
              scope: ''
            });
         };
         gapi.load('client:auth2', initClient);
     });
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
        }
        const onFailure = (res) => {
            console.log("Connexion echouer ",res);
        }
    

    
   

     function logout(){
       //  localStorage.removeItem('id_user');
     }
     
    

    
    const [pseudo, setPseudo] = useState("");
    let id_user = localStorage.getItem('id_user');

    console.log(id_user)
   
    if(id_user !== null || id_user !== undefined )
    {
        axios.get('https://localhost:8000/api/users/'+id_user)
        .then((res)=>{
             setPseudo(res.data.pseudo)
        })
    }
   
    return(
        <div className='navbarcontainer'>
            <span className='logo'>BR</span>
           {id_user !== null ? 
                <ul className='list'>
                    <li className='listItem'>
                        <img src="https://lh3.googleusercontent.com/a/AEdFTp4GqltZtpPK3abDauECX2Oih-kwLnHWBmRtgcBh=s96-c" alt="" className='avatar'></img>
                    </li>  
                    <li className='listItem'>{pseudo}</li>
                    <li className='listItem'><GoogleLogout
                clientId={clientId}
                buttonText='Logout'
                onLogoutSuccess={logout}
                
            /></li>
                </ul>
            :
            <ul className='list'>
                <li className='listItem'><GoogleLogin
                clientId={clientId}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                
            />    </li>
            </ul>
            }
           
        </div>
    )
} */




/*   <div className="App">
            <GoogleLogin
                clientId="970311814990-r6dga327njfembiesdldvo53r08iq8d3.apps.googleusercontent.com"

                onSuccess={(credentialResponse) => login(credentialResponse)}

                onError={() => {
                    console.log('Login Failed');
                }}

            />
            <button onClick={logout}>Logout</button>
        </div> */