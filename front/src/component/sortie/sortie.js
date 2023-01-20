import { Link, useNavigate, useLocation } from 'react-router-dom'
import './sortie.css'
import Navbar from '../navbar/navbar'
import GoogleApiWrapper from '../carte'
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Sortie() {
    const navigate = useNavigate();
    const [object,setObject] = useState(null);
    const [participants,setParticipants] = useState(null);
    const id_sortie = useLocation().pathname.split("/").pop()
    const [createur,setCreateur]= useState(false);
    const [pseudo,setPseudo] = useState("")
    const id_user = localStorage.getItem('id_user')
    useEffect(() => {
        axios.get('https://localhost:8000/api/sorties/'+id_sortie)
        .then((res)=>{
            setObject(res.data) 
            
            if(id_user === res.data.owner_id.id.toString()){
                
                setCreateur(true)
            }
        })
        axios.get('https://localhost:8000/api/sorties_participants?sortie_id='+id_sortie)
        .then((rep)=>{
            setParticipants(rep.data["hydra:member"])
           
        })
    },[])
    console.log("NOOON",object)
    if(object !== null){
        
        if(typeof(object.event_id) !== 'object'){
        object.event_id = JSON.parse(object.event_id)
        console.log(object.event_id.latitude)
        }
    }
    function join(){

    }
    console.log(participants)
    function deleteevent(){
        if(participants !== null)
        {
            participants.map((item)=>{
                axios.delete("https://localhost:8000/api/sorties_participants/"+item.id)
            })
        }
        
        axios.delete("https://localhost:8000/api/sorties/"+id_sortie)
        .then((res)=>{
           navigate("/profil")
        })
    }
    
    function inviter(){
        axios.get('https://localhost:8000/api/users?pseudo='+pseudo)
        .then((res)=>{
            if(res.data["hydra:totalItems"] === 1)
            {
                let id_invite = res.data["hydra:member"][0].id

                axios("https://localhost:8000/api/sorties_participants?sortie_id="+id_sortie+"?user_id="+id_invite)
                    .then((resp)=>{
                        if(resp.data["hydra;totalItems"] === 0){
                        axios.post('https://localhost:8000/api/sorties_participants',{
                            
                                "sortieId": "api/sorties/"+id_sortie,
                                "userId": "api/users/"+id_invite    
                        })
                        alert("Utilisateur invité")
                    }
                    else{
                        alert("Utilisateur déjà présent")
                    }
                    })
               
            }
            else
            {
                alert("Cet utilisateur existe pas")
            }
           
        })
    }

    
    return(

        <div>
            <Navbar />
            {object !== null  ?
            <div>
                <h1>{object.event_id.title}</h1>
                <GoogleApiWrapper lat={object.event_id.latitude} lng={object.event_id.longitude} />
                {createur === true ? 
                <div>
                    <p>Vous êtes l'organisateur de cet évenement</p>
                    <button className='sortielienspseudo'  onClick={deleteevent}>Supprimer l'evenement</button>
                    <input className='sortielienspseudo' type="text" value={pseudo} onChange={(e)=>setPseudo(e.target.value)} placeholder="Pseudo" ></input>
                    <button className='sortielienspseudo' onClick={inviter}>Inviter</button>
                </div>
                :
                <button onClick={join}>Rejoindre cet évenement </button>
                }
                    {participants !== null ?
                <div>
                    <h4>Participants: {participants.length}</h4>

                    <ul>
                        {participants.map((item)=> (
                           <li className='sortielienspseudo' key={item.user_id.pseudo}> <Link  to={"/user/"+item.user_id.id}>{item.user_id.pseudo}</Link></li>
                            ))
                    }
                        
                    </ul>
                </div>
                        :<p>Vous êtes le seul participants</p>}
            </div>
        :null}
        </div>
    )
}