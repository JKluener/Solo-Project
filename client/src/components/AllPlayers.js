import {Link, navigate } from "@reach/router";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from "./chunks/Navbar";

const AllPlayers = (props) => {
    const [players, setPlayers] = useState([]);
    const [hovered, setHovered] = useState(false);
    const [hoveredSmall, setHoveredSmall] = useState(false);
    const [btnClass, setBtnClass] = useState("uk-button uk-button-secondary uk-width-1-1");
    const [btnClassSmall, setBtnClassSmall] = useState("uk-button uk-button-primary uk-button-small");
    const [reloadPage, setReloadPage] = useState(false)

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
    }, [reloadPage])

    const toggleHover = () => {
        setHovered(!hovered);
        handleBtnClass(hovered);
    }

    const toggleHoverSmall = () => {
        setHoveredSmall(!hoveredSmall);
        handleBtnClassSmall(hoveredSmall);
    }

    const handleBtnClass = (hovered) => {
        hovered?
            setBtnClass("uk-button uk-button-secondary uk-width-1-1")
            :setBtnClass("uk-button uk-button-default uk-width-1-1")
    }

    const handleBtnClassSmall = (hoveredSmall) => {
        hovered?
            setBtnClassSmall("uk-button uk-button-secondary uk-button-small")
            :setBtnClassSmall("uk-button uk-button-primary uk-button-small")
    }

    const deleteHandler = (idFromBelow) => {
        axios.delete(`http://localhost:8000/api/players/${idFromBelow}`)
        .then((res) => {
            console.log(res.data);
            navigate('/players');
            setReloadPage(true);
        })
        .catch((err) => {
            console.log(err);
        })
    };

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
                                    <button style={{marginRight: '10px'}} className="uk-button uk-button-primary uk-button-small" onClick={()=>{navigate(`/players/edit/${player._id}`)}}>Edit</button>
                                    <button className="uk-button uk-button-danger uk-button-small" onClick={(e) => deleteHandler(player._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                        :null
                    }
                </tbody>
            </table>
            <div className="uk-container-xsmall uk-align-center">
                <button className={btnClass} onMouseEnter={() => toggleHover()} onMouseLeave={() => toggleHover()} onClick={() => {navigate(`players/add`)}} >Add Player</button>
            </div>
            </div>
    )
}
export default AllPlayers;