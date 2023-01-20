import { Link, useNavigate, useLocation } from 'react-router-dom'
import './SingleEvent.css'
import Navbar from '../navbar/navbar'
import GoogleApiWrapper from '../carte'
import axios from 'axios';

export default function SingleEvent() {
    const navigate = useNavigate();
    const city = useLocation().state.city
    const param = useLocation().state.param
    const data = useLocation().state.data
    const API_KEY = "AIzaSyAaCWELQhD7dVoUAprchvklulWycDsmnyE";

    const  id_user = localStorage.getItem('id_user')
    
    function create(){
        if(id_user !== undefined && id_user !== null ){

            const titre = data.fields.title_fr
            const latitude = data.fields.location_coordinates[0]
            const  longitude= data.fields.location_coordinates[1]
            
            let image = "";
            if(data.fields.thumbnail !== undefined){
                image = data.fields.thumbnail
            }
            const object = JSON.stringify({"title":titre,"latidude":latitude,"longitude":longitude,"image":image})
    
            axios.post('https://localhost:8000/api/sorties', {
                "visibility": true,
                "eventId": object,
                "ownerId": "api/users/"+id_user
              })
              .then((res)=>{
                const id_sortie = res.data.id
                axios.post('https://localhost:8000/api/sorties_participants', {
                      "sortieId": "api/sorties/"+id_sortie,
                      "userId": "api/users/"+id_user
                })
                navigate("/sortie/"+id_sortie)
            })
        }
        else{
            alert("Connectez-vous pour créer un évenement")
        }

    }

    console.log(city + param)
    return (
        <div>
            <Navbar />
            <div className='SingleItem'>
                <h1>{data.fields.title_fr}</h1>
                <div className='titleandimg'>
                    {data.fields.thumbnail !== undefined ?
                        <img src={data.fields.thumbnail} alt={data.fields.title_fr}></img>
                        : null}
                    <div className='dateandlocate'>
                        <p>{data.fields.location_address}</p>
                        <p>{data.fields.daterange_fr}</p>
                        <button onClick={create}>Organiser une sortie</button>
                    </div>
                    <GoogleApiWrapper lat={data.fields.location_coordinates[0]} lng={data.fields.location_coordinates[1]} />
                </div>
                {data.fields.longdescription_fr !== undefined ?
                    <div dangerouslySetInnerHTML={{ __html: data.fields.longdescription_fr }} />
                    : data.fields.description_fr}
                <Link to={"/"} state={{ city: city, param: param }} id="btn-retour">Retour</Link>
            </div>
        </div>
    )
}


