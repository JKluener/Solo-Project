import { navigate } from "@reach/router";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from "./chunks/Navbar";

const GameSchedule = (props) => {
    const [errors, setErrors] = useState({});
    const [games, setGames] = useState([]);
    const [addGameBtnClicked, setAddGameBtnClicked] = useState(false);
    const [opponent, setOpponent] = useState("");
    const [homeBoolean, setHomeBoolean] = useState(true);
    const [score, setScore] = useState("");
    const [scorers, setScorers] = useState("");
    const [roster, setRoster] = useState([]);
    const [hovered, setHovered] = useState(false);
    const [btnClass, setBtnClass] = useState("uk-button uk-button-secondary uk-width-1-1");

    useEffect(()=>{
        axios.get('http://localhost:8000/api/games')
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setGames(res.data);
                setAddGameBtnClicked(false);
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
                navigate('/schedule/edit');
                setAddGameBtnClicked(false);
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors)
        });
    };

    const handleRosterString = (e) => {
        let rosterString = e.target.value;
        setRoster([rosterString.split()])
    };

    const toggleHover = () => {
        setHovered(!hovered);
        handleBtnClass(hovered);
    }

    const handleBtnClass = (hovered) => {
        hovered?
            setBtnClass("uk-button uk-button-secondary uk-width-1-1")
            :setBtnClass("uk-button uk-button-default uk-width-1-1")
        
    }

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
                            <tr key={game._id}>
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
                {addGameBtnClicked? 
                <div>
                    <form onSubmit={(e) => createGameHandler(e)}>
                        <fieldset className="uk-fieldset">
                            <div className="uk-margin">
                                <input className='uk-input' type='text' name = 'opponent' onChange={(e) => setOpponent(e.target.value)}/>
                            </div>
                            <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                                <label typeof="radio" className="uk-radio"><input name="Home" value={true} onChange={(e) => setHomeBoolean(e.target.value)} defaultChecked/></label>
                                <label typeof="radio" className="uk-radio"><input name="Away" value={false} onChange={(e) => setHomeBoolean(e.target.value)}/></label>
                            </div>
                            <div className="uk-margin">
                                <input className='uk-input' type='text' name = 'score' onChange={(e) => setScore(e.target.value)}/>
                            </div>
                            <div className="uk-margin">
                                <input className='uk-input' type='text' name = 'scorers' onChange={(e) => setScorers(e.target.value)}/>
                            </div>
                            <div className="uk-margin">
                                <input className='uk-input' type='text' name = 'roster' onChange={(e) => handleRosterString(e)}/>
                            </div>
                            <button type="submit">Submit</button>
                        </fieldset>
                    </form>
                </div>
                :
                    <div className="uk-container-xsmall uk-align-center">
                            <button className={btnClass} onMouseEnter={() => toggleHover()} onMouseLeave={() => toggleHover()} onClick={setAddGameBtnClicked(true)}>Add Game</button>
                    </div>
                }
            </div>
    )
}
export default GameSchedule;