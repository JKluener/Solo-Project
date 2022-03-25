import Navbar from "./chunks/Navbar";
import Lineup from "./chunks/Lineup";
import { useState, useEffect } from "react";
import axios from "axios";

const ShowGame = (props) => {
    const [game, setGame] = useState({});
    const [scorers, setScorers] = useState([]);
    const [roster, setRoster] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/games/${props.id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setGame(res.data);
                setScorers(res.data.scorers);
                setRoster(res.data.roster);
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])

    return (
    <div className="uk-container">
        <Navbar/>
        <h2>Game vs. {game.opponent}</h2>
        <h3>Final Score: {game.score}</h3>
        <h4> Scores Made By:</h4>
        <p>
        {scorers.map((scorer) => (
            <>| {scorer} |</> 
        ))}
        </p>
        <h2>GameDay Roster:</h2>
        <Lineup roster={roster}/>
    </div>
    )
}

export default ShowGame;