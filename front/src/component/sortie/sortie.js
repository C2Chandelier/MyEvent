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
    const [message, setMessage] = useState("")
    const [reception, setReception] = useState(null)
    const id_user = localStorage.getItem('id_user')
    const [player,setPlayer] = useState(false)

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
        axios("https://localhost:8000/api/messages?sortie="+id_sortie)
            .then((response)=>{
                setReception(response.data["hydra:member"])
            })
    },[player,message])

    useEffect(() => {    
        if(participants !== null)
        {
            participants.map((item)=>{
                if(item.user_id.id.toString() === id_user){
                    setPlayer(true)
                }
            })
        }
    },[participants])
   
   
    if(object !== null){
        
        if(typeof(object.event_id) !== 'object'){
        object.event_id = JSON.parse(object.event_id)
        }
    }
    function join(){
        if(id_user !== null){
        axios.post("https://localhost:8000/api/sorties_participants", {
            "sortieId": "api/sorties/"+id_sortie,
            "userId": "api/users/"+id_user
          })
          setPlayer(true)
        }
        else{
            alert("Connectez vous pour rejoindre un évenement")
        }
    }
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
                axios("https://localhost:8000/api/sorties_participants?sortie_id="+id_sortie+"&user_id="+id_user)
                    .then((resp)=>{
                        if(resp.data["hydra:totalItems"] === 0){
                        axios.post('https://localhost:8000/api/sorties_participants',{
                            
                                "sortieId": "api/sorties/"+id_sortie,
                                "userId": "api/users/"+id_invite    
                        })
                        alert("Utilisateur invité")
                        setPlayer(true)
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
    function leave(){
       axios.get("https://localhost:8000/api/sorties_participants?sortie_id="+id_sortie+"&user_id="+id_user)
       .then((rep)=>{
        let id_sortie_participants =  rep.data["hydra:member"][0].id
        axios.delete("https://localhost:8000/api/sorties_participants/"+id_sortie_participants)
        setPlayer(false)
       })
    }

    function envoyer(){
        if(message !== null && message !== "" && message !== undefined)
        {
            axios.post("https://localhost:8000/api/messages",{
                "sortie": "api/sorties/"+id_sortie,
                "user": "api/users/"+id_user,
                "messages": message
              })
            setMessage("")
        }
    }

    return(

        <div>
            <Navbar />
            {object !== null  ?
            <div className='containerSortie'>
                <div>
                <h1>{object.event_id.title}</h1>
                {createur === true ? 
                <div>
                    <p>Vous êtes l'organisateur de cet évenement</p>
                    <button className='sortielienspseudo'  onClick={deleteevent}>Supprimer l'evenement</button>
                    <input className='sortielienspseudo' type="text" value={pseudo} onChange={(e)=>setPseudo(e.target.value)} placeholder="Pseudo" ></input>
                    <button className='sortielienspseudo' onClick={inviter}>Inviter</button>
                </div>
                :
                
                player === true ?
                    <button className='sortielienspseudo' onClick={leave}>Quitter l'evenement</button>
                    :
                    <button className='sortielienspseudo' onClick={join}>Rejoindre cet évenement </button>               
                }
                
                    {participants !== null ?
                <div>
                    <h4>Participants: {participants.length}</h4>

                    <ul>
                        {participants.map((item)=> (
                           <li className='sortielienspseudo' key={item.user_id.pseudo}>
                            <img src={item.user_id.avatar} alt='avatar'></img>
                             <Link  to={"/user/"+item.user_id.id}>{item.user_id.pseudo}</Link>
                             </li>
                            ))
                    }
                        
                    </ul>
                </div>
                        :<p>Vous êtes le seul participants</p>}
                </div>
                <GoogleApiWrapper lat={object.event_id.latitude} lng={object.event_id.longitude} />
            </div>
        :null}
        <input className='sortielienspseudo' type="text" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Message.." />
        <button className='sortielienspseudo' onClick={envoyer}>Envoyé</button>
        {reception !== null ? 
        <div className='receptionMessage sortielienspseudo'>
            {reception.map((item)=>(
             item.user.id === parseInt(id_user) ? 
             <div className='singleMessage end'>
                <Link to={"/user/"+item.user.id}>{item.user.pseudo}</Link>
                <p>{item.messages}</p>
            </div>
                :
             <div className='singleMessage start'>
                <Link to={"/user/"+item.user.id}>{item.user.pseudo}</Link>
                <p>{item.messages}</p>
            </div>               
            ))}
        </div>
        :null}
        </div>
    )
}