import {navigate } from "@reach/router";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from "./chunks/Navbar";

const Main = (props) => {
    const [games, setGames] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8000/api/games')
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setGames(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])

    return (
        <div className="uk-container">
            <Navbar/>
            <table className="uk-table uk-table-hover uk-table-middle">
                <thead>
                    <tr>
                    <th>Opponent</th>
                    <th>Location</th>
                    <th>Score</th>
                    <th>Scorers</th>
                    <th>GameDay Roster</th>
                    </tr>
                </thead>
                <tbody>
                        {
                        games?
                        games.map((game)=>(
                            <tr key={game._id}  onClick = {(e)=> navigate(`/schedule/${game._id}`)}>
                                <td>{game.opponent}</td>
                                <td>{game.homeBoolean? "Home": "Away"}</td>
                                <td>{game.score}</td>
                                <td>{game.scorers}</td>
                                <td>{game.roster}</td>
                            </tr>
                        ))
                        :null
                    }
                </tbody>
            </table>
            </div>
    )
}
export default Main;