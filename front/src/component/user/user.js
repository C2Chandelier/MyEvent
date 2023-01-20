import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, Link } from "react-router-dom"
import Navbar from "../navbar/navbar"
import "./user.css"

export default function User() {
    const id_user = useLocation().pathname.split("/").pop()
    const [info, setInfo] = useState(null)
    const [sorties, setSorties] = useState(null)
    const [sortiesbis, setSortiesbis] = useState(null)

    useEffect(() => {
        axios("https://localhost:8000/api/users/" + id_user)
            .then((response) => {
                setInfo(response.data)
            })
        axios("https://localhost:8000/api/sorties?owner_id=api%2Fusers%2F" + id_user)
            .then((res) => {
                setSorties(res.data["hydra:member"])
            })
        axios("https://localhost:8000/api/sorties_participants?user_id=" + id_user)
            .then((response) => {
                console.log(response)
                setSortiesbis(response.data["hydra:member"])
            })
    }, [])

    if (sorties !== null) {
        sorties.map((item) => {
            if (typeof (item.event_id) !== 'object') {
                item.event_id = JSON.parse(item.event_id)
            }
        })
    }
    if (sortiesbis !== null) {
        sortiesbis.map((item) => {
            if (typeof (item.sortie_id.event_id) !== 'object') {
                item.sortie_id.event_id = JSON.parse(item.sortie_id.event_id)
            }
        })
    }


    return (
        <div>
            <Navbar></Navbar>
            {info !== null ?
                <div>
                    <div className="infosUser">
                        <img src={info.avatar} alt="avatar"></img>
                        <div className="pseudoAnddesUser">
                            <h2>{info.pseudo}</h2>
                            <p>{info.description}</p>
                        </div>
                    </div>
                    <div className="sortiesUser">
                        {sorties !== null ?
                            sorties.map((item) => (
                                <div className="SingleSortieUser">
                                    {item.event_id.image !== "" ?
                                        <img src={item.event_id.image} alt="photosortie"></img>
                                        : null}
                                    <div>
                                        <h3>{item.event_id.title}</h3>
                                        {/* <p>{item.user_id.pseudo} est l'organisateur de cet évenement</p> */}
                                        <Link to={"/sortie/" + item.id}>En savoir plus</Link>
                                    </div>
                                </div>
                            ))
                            : null}
                        {sortiesbis !== null ?
                            sortiesbis.map((item) => (
                                <div className="SingleSortieUser">
                                    {item.sortie_id.event_id.image !== "" ?
                                        <img src={item.sortie_id.event_id.image} alt="photosortie"></img>
                                        : null}
                                    <h3>{item.sortie_id.event_id.title}</h3>
                                    <Link to={"/sortie/" + item.sortie_id.id}>En savoir plus</Link>
                                </div>
                            ))
                            : null}
                    </div>
                </div>
                : null}
        </div>
    )
}