import { Link, useLocation } from 'react-router-dom'
import './SingleEvent.css'
import Navbar from '../navbar/navbar'
import GoogleApiWrapper from '../carte'

export default function SingleEvent() {
    const city = useLocation().state.city
    const param = useLocation().state.param
    const data = useLocation().state.data
    const API_KEY = "AIzaSyAaCWELQhD7dVoUAprchvklulWycDsmnyE";

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
                        <button>Organiser une sortie</button>
                    </div>
                    <GoogleApiWrapper lat={data.fields.location_coordinates[0]} lng={data.fields.location_coordinates[1]} />
                </div>
                {data.fields.longdescription_fr !== undefined ?
                    <div dangerouslySetInnerHTML={{ __html: data.fields.longdescription_fr }} />
                    : data.fields.description_fr}
                <Link to={"/"} state={{ city: city, param: param }}>Retour</Link>
            </div>
        </div>
    )
}


