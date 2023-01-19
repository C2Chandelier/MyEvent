import './homepage.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'
import Navbar from '../navbar/navbar';
import { useMediaQuery } from 'react-responsive'

function Home() {
  const params = useLocation()
  const [data, setData] = useState(null);
  const [city, setCity] = useState("");
  const [start, setStart] = useState(0);
  const [keywords, setKeywords] = useState("");

  const isMobile = useMediaQuery({ query: '(max-width: 320px)' })
  const isTablet = useMediaQuery({ query: '(min-width: 320px)' })


  useEffect(() => {
    console.log(params)
    console.log(city + "/" + keywords)
    if (params.state !== null) {
      if (params.state.city !== "" && params.state.param !== "") {
        axios("https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-openagenda&q=&sort=updatedat&rows=20&start=" + start + "&facet=keywords_fr&facet=lastdate_begin&facet=location_city&refine.keywords_fr=" + params.state.param + "&refine.lastdate_begin=2023&refine.location_city=" + params.state.city)
          .then((response) => {
            setData(response.data)
            setCity(params.state.city)
            setKeywords(params.state.param)
            params.state = null;
          })
      }
      if (params.state.city !== "" && params.state.param === "") {
        axios("https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-openagenda&q=&sort=updatedat&rows=20&start=" + start + "&facet=lastdate_begin&facet=location_city&refine.lastdate_begin=2023&refine.location_city=" + params.state.city)
          .then((response) => {
            setData(response.data)
            setCity(params.state.city)
            params.state = null;
          })
      }
    
    }
    else {
      if (city === "") {
        navigator.geolocation.getCurrentPosition((position) => {
          const mylat = (position.coords.latitude)
          const mylng = (position.coords.longitude);

          let distancetableau = [];
          let distanceonly = [];

          const points = [
            { name: 'Toulouse', lat: 43.6045, lng: 1.4440 },
            { name: 'Marseille', lat: 43.2964, lng: 5.3700 },
            { name: 'Paris', lat: 48.8566, lng: 2.3522 },
            { name: 'Rennes', lat: 48.1147, lng: -1.6794 },
            { name: 'Grenoble', lat: 45.1715, lng: 5.7224 },
            { name: 'Nantes', lat: 47.2181, lng: -1.5528 },
            { name: 'Montpellier', lat: 43.6119, lng: 3.8772 },
            { name: 'Lyon', lat: 45.7600, lng: 4.8400 },
            { name: 'Rouen', lat: 49.4428, lng: 1.0886 },
            { name: 'Strasbourg', lat: 48.5833, lng: 7.7458 },
            { name: 'Nancy', lat: 48.6936, lng: 6.1846 }
          ];

          points.map((item) => {
            let p = 0.017453292519943295
            let c = Math.cos
            let a = 0.5 - c((mylat - item.lat) * p) / 2 +
              c(item.lat * p) * c(mylat * p) *
              (1 - c((mylng - item.lng) * p)) / 2

            let distance = 12742 * Math.asin(Math.sqrt(a))
            distancetableau.push({ "name": item.name, "distance": distance.toFixed(2) });


          });
          distancetableau.map((value) => {
            distanceonly.push(value.distance);

          })
          let pluspetitedistance = Math.min(...distanceonly);

          let index = -1;

          distancetableau.filter((element) => {
            if (parseFloat(element.distance) === pluspetitedistance) {
              index = distancetableau.indexOf(element)
            }
          })

          let ville = distancetableau[index].name
          setCity(ville)
          if (keywords !== "") {
            axios("https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-openagenda&q=&sort=updatedat&rows=20&start=" + start + "&facet=keywords_fr&facet=lastdate_begin&facet=location_city&refine.keywords_fr=" + keywords + "&refine.lastdate_begin=2023&refine.location_city=" + ville)
              .then((response) => {
                setData(response.data)
              })
          }
          else {
            axios("https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-openagenda&q=&sort=updatedat&rows=20&start=" + start + "&facet=lastdate_begin&facet=location_city&refine.lastdate_begin=2023&refine.location_city=" + ville)
              .then((response) => {
                setData(response.data)
              })
          }


        })
      }
      else {
        if (keywords !== "") {
          axios("https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-openagenda&q=&sort=updatedat&rows=20&start=" + start + "&facet=keywords_fr&facet=lastdate_begin&facet=location_city&refine.keywords_fr=" + keywords + "&refine.lastdate_begin=2023&refine.location_city=" + city)
            .then((response) => {
              setData(response.data)
            })
        }
        else {
          axios("https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-openagenda&q=&sort=updatedat&rows=20&start=" + start + "&facet=lastdate_begin&facet=location_city&refine.lastdate_begin=2023&refine.location_city=" + city)
            .then((response) => {
              setData(response.data)
            })
        }
      }
    }
  }, [start, keywords, city])


  function goback() {
    setStart(start - parseInt(data.parameters.rows))
    window.scrollTo(0,0);
  }
  function goforward() {
    setStart(start + parseInt(data.parameters.rows))
    window.scrollTo(0,0);
  }

  return (
    <div>
      <Navbar />
      <div className='containerHome'>
        <div className='recherche'>
          <select value={keywords} onChange={(e) => { setKeywords(e.target.value); setStart(0) }}>
            <option value="">Catégorie</option>
            <option value="concert">Concert</option>
            <option value="musique">Musique</option>
            <option value="art">Art</option>
            <option value="atelier">Atelier</option>
            <option value="formation">Formation</option>
            <option value="danse">Danse</option>
            <option value="nature">Nature</option>
            <option value="exposition">Exposition</option>
            <option value="spectacle">Spectacle</option>
            <option value="théâtre">Théâtre</option>
            <option value="sport">Sport</option>
            <option value="musée">Musée</option>
            <option value="conférence">Conférence</option>
            <option value="cinéma">Cinéma</option>
          </select>
          <input type="text" placeholder='Entrez une ville' value={city} onChange={(e) => { setCity(e.target.value); setStart(0) }} />
        </div>
        {data === null ?
          <p>Aucun résultat pour votre recherche</p>
          :
          <div className='containeurResult'>
            {data !== null ?
              <div className='listeevenement'>
                {data.records.map((item) => (
                  <div className='OneItem' key={item.recordid}>
                    <h1>{item.fields.title_fr}</h1>
                    <div className='titleandimg'>
                      {item.fields.thumbnail !== undefined ?
                        <img src={item.fields.thumbnail} alt={item.fields.title_fr}></img>
                        : null}
                        {isTablet && item.fields.longdescription_fr !== undefined ?
                        <div dangerouslySetInnerHTML={{ __html: item.fields.longdescription_fr }} />
                        : item.fields.description_fr}
                        {isMobile && item.fields.description_fr}
                      
                    </div>
                    <Link to={"/event"} state={{ data: item, city: city, param: keywords }} className='card' >En savoir plus</Link>
                    <hr></hr>
                  </div>
                ))}
                <div className='pagination'>
                  {data.parameters.start !== 0 ?
                    <button onClick={goback}>-</button>
                    : null}
                  {parseInt(data.nhits) - parseInt(start) > parseInt(data.parameters.rows) ?
                    <button onClick={goforward}>+</button>
                    : null}

                </div>
              </div>
              : null}
          </div>
        }
      </div>
    </div>
  );
}

export default Home;
