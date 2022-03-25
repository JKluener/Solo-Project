import {Link, navigate } from "@reach/router";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from "./chunks/Navbar";
import HoverButton from "./chunks/HoverButton";

const AllPlayers = (props) => {
    const [players, setPlayers] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8000/api/players')
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setPlayers(res.data);
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
                        <th>Name</th>
                        <th>Year</th>
                        <th>Position Group</th>
                        <th>Preffered Position(s)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                        {
                        players?
                        players.map((player)=>(
                            <tr key={player._id}>
                                <td>{player.name}</td>
                                <td>{player.year.label}</td>
                                <td>{player.positionGroup.label}</td>
                                <td>
                                    {player.preferredPositions.map((preferredPosition) => (
                                    <>
                                    <span style={{marginRight: '10px'}}>{preferredPosition.label}</span>
                                    </>
                                    ))}
                                </td>
                                <td>
                                    <HoverButton btnversion="navigateEdit" itemId={player._id} />
                                    <HoverButton btnversion="deletePlayer" itemId={player._id}/>
                                </td>
                            </tr>
                        ))
                        :null
                    }
                </tbody>
            </table>
            <div className="uk-container-xsmall uk-align-center">
                <HoverButton btnversion="navigateAddPlayer" itemId=""/>
            </div>
            </div>
    )
}
export default AllPlayers;