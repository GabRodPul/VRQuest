import React from 'react'
import { useEffect, useState } from 'react';

import { apiCall } from '../../shared/ApiCalls'

function Players() {
    const getPlayers = async () => {
        const res = await fetch("http://localhost:8080/api/players");
        const data = await res.json();
        this.setPlayers(data)
        // fetch("http://localhost:8080/api/players", {
        //     method: "GET",
        //     mode: "no-cors",
        //     headers: {
        //         "Access-Control-Allow-Origin":"*",
        //         "Access-Control-Allow-Credentials":true
        //     }
        // })
        //     .then((response) => response.json())
        //     .then((data) => setPlayers(data))
    };

    const [players, setPlayers] = useState([]);
    useEffect(() => {getPlayers()});

    return (
        <div>{players}</div>
    )
}

export default Players