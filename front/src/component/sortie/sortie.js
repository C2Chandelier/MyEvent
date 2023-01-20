import { Link, useLocation } from 'react-router-dom'
import './sortie.css'
import Navbar from '../navbar/navbar'
import GoogleApiWrapper from '../carte'
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Sortie() {
    const [object,setObject] = useState(null);
    const id_sortie = useLocation().pathname.split("/").pop()

    useEffect(() => {
        axios.get('https://localhost:8000/api/sorties/'+id_sortie)
        .then((res)=>{
            setObject(res.data)  
        })
    },[])

    if(object !== null){
        
        if(typeof(object.eventId) !== 'object'){
        object.eventId = JSON.parse(object.eventId)
        console.log(object.eventId.latitude)
        }
    }
    return(

        <div>
            <Navbar />
            {object !== null  ?
            <div>
                <h1>{object.eventId.title}</h1>
                <GoogleApiWrapper lat={object.eventId.latitude} lng={object.eventId.longitude} />
                <div>
                    <h4>Participants : 2</h4>
                    <ul>
                        <li>Br</li>
                        <li>Mange</li>
                    </ul>
                </div>
            </div>
        :null}
        </div>
    )
}