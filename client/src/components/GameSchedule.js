import { navigate } from "@reach/router";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from "./chunks/Navbar";
import HoverButton from "./chunks/HoverButton";
import HoverDeleteGame from "./chunks/HoverDeleteGame";

const GameSchedule = (props) => {
    const [errors, setErrors] = useState({});
    const [games, setGames] = useState([]);
    const [players, setPlayers] = useState([]);
    const [opponent, setOpponent] = useState("");
    const [homeBoolean, setHomeBoolean] = useState(true);
    const [score, setScore] = useState("");
    const [scorers, setScorers] = useState("");
    const [roster, setRoster] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8000/api/games')
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setGames(res.data);
            })
            axios.get('http://localhost:8000/api/players')
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setPlayers(res.data);
                handleRoster();
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])

    const createGameHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/games ', {opponent, homeBoolean, score, scorers, roster})
            .then((res)=>{
                console.log(res.data);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors)
        });
    };

    const handleRoster = (e) => {
        let tempPlayerNames = [];
        let namesString = e.target.value;
        tempPlayerNames = namesString.split(', ');
        setRoster(tempPlayerNames);
    }

    const handleScorers = (e) => {
        let tempPlayerNames = [];
        let namesString = e.target.value;
        tempPlayerNames = namesString.split(', ');
        setScorers(tempPlayerNames);
    }

    return (
        <div className="uk-container">
            <Navbar/>
            <table className="uk-table uk-table-hover uk-table-middle uk-table-small">
                <thead>
                    <tr>
                    <th>Opponent</th>
                    <th>Location</th>
                    <th>Score</th>
                    <th>Scorers</th>
                    <th>GameDay Roster</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                        {
                        games?
                        games.map((game)=>(
                            <tr key={game._id}>
                                <td>{game.opponent}</td>
                                <td>{game.homeBoolean? "Home": "Away"}</td>
                                <td>{game.score}</td>
                                <td>{game.scorers}</td>
                                <td>{game.roster}</td>
                                <HoverDeleteGame gameid={game._id}/>
                            </tr>
                        ))
                        :null
                    }
                </tbody>
            </table>
                <div>
                    <form onSubmit={(e) => createGameHandler(e)}>
                        <fieldset className="uk-fieldset">
                            <div className="uk-margin">
                                <label>Opponent:</label>
                                <input className='uk-input' type='text' name = 'opponent' onChange={(e) => setOpponent(e.target.value)}/>
                            </div>
                            {errors.opponent ? <span style={{color: "red"}}>{errors.name.message}</span> : null} 
                            <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                                <label>Location:</label>
                                <label><input name="Home" className="uk-radio" type='radio' value={true} onChange={(e) => setHomeBoolean(e.target.value)} defaultChecked/>Home</label>
                                <label><input name="Away" className="uk-radio" type='radio' value={false} onChange={(e) => setHomeBoolean(e.target.value)}/>Away</label>
                            </div>
                            {errors.homeBoolean ? <span style={{color: "red"}}>{errors.name.message}</span> : null} 
                            <div className="uk-margin">
                                <label>Score:</label>
                                <input className='uk-input' type='text' name = 'score' onChange={(e) => setScore(e.target.value)}/>
                            </div>
                            <div className="uk-margin">
                                <label>Scorers:</label>
                                <input className='uk-input' type='text' name = 'scorers' onChange={(e) => handleScorers(e)}/>
                            </div>
                            <div className="uk-margin">
                                <label>Roster:</label>
                                <p>*Rostered Players Must Be Typed in Order By Number</p>
                                <input className='uk-input' type='text' name = 'roster' onChange={(e) => handleRoster(e)}/>
                            </div>
                            {errors.roster ? <span style={{color: "red"}}>{errors.name.message}</span> : null} 
                            <button type="submit">Submit</button>
                        </fieldset>
                    </form>
                </div>
            </div>
    )
}
export default GameSchedule;