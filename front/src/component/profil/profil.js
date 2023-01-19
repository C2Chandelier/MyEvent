import axios from "axios"
import { useEffect, useState } from "react"
import Navbar from "../navbar/navbar"
import "./profil.css"

export default function Profil() {
    const id_user = localStorage.getItem("id_user")
    const [info, setInfo] = useState(null)
    const [pseudo, setPseudo] = useState("")
    const [description, setDescription] = useState("")
    const [avatar, setAvatar] = useState("")


    const [modif, setModif] = useState(false)
    console.log(modif)

    useEffect(() => {
        console.log(info)
        axios("https://localhost:8000/api/users/" + id_user)
            .then((response) => {
                setInfo(response.data)
                setPseudo(response.data.pseudo)
                setDescription(response.data.description)
                setAvatar(response.data.avatar)
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
                            <p>.map de ses sorties etc</p>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="infosProfil">
                            <img src={info.avatar} alt="avatar"></img>
                            <div className="pseudoAnddesProfil">
                                <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                                <button onClick={SaveModif}>Sauvegarder</button>
                            </div>
                        </div>
                        <div className="sortiesProfil">
                            <p>.map de ses sorties etc</p>
                        </div>
                    </div>
                : null}
        </div>
    )
}