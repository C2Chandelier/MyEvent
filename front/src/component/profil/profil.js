import axios from "axios"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import Navbar from "../navbar/navbar"
import "./profil.css"

export default function Profil() {
    const id_user = localStorage.getItem("id_user")
    const [info, setInfo] = useState(null)
    const [pseudo, setPseudo] = useState("")
    const [description, setDescription] = useState("")
    const [avatar, setAvatar] = useState("")
    const [sorties, setSorties] = useState(null)
    const [sortiesbis, setSortiesbis] = useState(null)




    const [modif, setModif] = useState(false)

    useEffect(() => {
        axios("https://localhost:8000/api/users/" + id_user)
            .then((response) => {
                setInfo(response.data)
                setPseudo(response.data.pseudo)
                setDescription(response.data.description)
                setAvatar(response.data.avatar)
            })
        axios("https://localhost:8000/api/sorties?owner_id=api%2Fusers%2F" + id_user)
            .then((res) => {
                setSorties(res.data["hydra:member"])
            })
        axios("https://localhost:8000/api/sorties_participants?user_id=" + id_user)
            .then((response) => {
                setSortiesbis(response.data["hydra:member"])
            })

    }, [modif])

    function Modif() {
        setModif(true)
    }

    function SaveModif() {
        const configuration = { headers: { 'Content-Type': "application/merge-patch+json", Accept: "application/ld+json" } }
        axios.patch("https://localhost:8000/api/users/" + id_user,
            {
                pseudo: pseudo,
                description: description
            }, configuration)

        setModif(false)
        setInfo(null)
    }

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
                modif === false ?
                    <div>
                        <div className="infosProfil">
                            <img src={info.avatar} alt="avatar"></img>
                            <div className="pseudoAnddesProfil">
                                <h2>{info.pseudo}</h2>
                                <p>{info.description}</p>
                                <button onClick={Modif}>Modifier</button>
                            </div>
                        </div>
                        <div className="sortiesProfil">
                            {sorties !== null ?
                                sorties.map((item) => (
                                    <div className="SingleSortieProfil">
                                        {item.event_id.image !== "" ?
                                            <img src={item.event_id.image} alt="photosortie"></img>
                                            : null}
                                            <div>
                                        <h3>{item.event_id.title}</h3>
                                        <p>Vous êtes l'organisteur de cet évenement</p>
                                        <Link to={"/sortie/" + item.id}>En savoir plus</Link>
                                        </div>
                                    </div>
                                ))
                                : null}
                            {sortiesbis !== null ?
                                sortiesbis.map((item) => (
                                    <div className="SingleSortieProfil">
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
                    :
                    <div>
                        <div className="infosProfil">
                            <img src={avatar} alt="avatar"></img>
                            <div className="pseudoAnddesProfil">
                                <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                                <button onClick={SaveModif}>Sauvegarder</button>
                            </div>
                        </div>
                    </div>
                : null}
        </div>
    )
}