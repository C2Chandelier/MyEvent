import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Navbar from "../navbar/navbar"
import "./user.css"

export default function User() {
    const id_user = useLocation().pathname.split("/").pop()
    const [info, setInfo] = useState(null)
    useEffect(() => {
        axios("https://localhost:8000/api/users/" + id_user)
            .then((response) => {
                setInfo(response.data)
            })
    }, [])
    return (
        <div>
            <Navbar></Navbar>
            {info !== null ?
                <div>
                    <div className="infosUser">
                        <img src={info.avatar} alt="avatar"></img>
                        <div className="pseudo&desUser">
                            <h2>{info.pseudo}</h2>
                            <p>{info.description}</p>
                        </div>
                    </div>
                    <div className="sortiesUser">
                        <p>.map de ses sorties etc</p>
                    </div>
                </div>

                : null}
        </div>
    )
}