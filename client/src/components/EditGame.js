import { useEffect, useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import Navbar from "./chunks/Navbar";

const EditGame = (props) => {
    const [errors, setErrors] = useState({});
    const [game, setGame] = useState({});
    const [opponent, setOpponent] = useState("");
    const [homeBoolean, setHomeBoolean] = useState(true);
    const [score, setScore] = useState("");
    const [roster, setRoster] = useState([]);
    const [rosterString, setRosterString] = useState("");
    const [scorersString, setScorersString] = useState("");
    const [scorers, setScorers] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/games/${props.id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setGame(res.data);
                setScorers(res.data.scorers);
                handleUnpackRoster(res.data.roster);
                handleUnpackScorers(res.data.scorers);
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])

    const editGameHandler = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/games ', {opponent, homeBoolean, score, scorers, roster})
            .then((res)=>{
                console.log(res.data);
                navigate('/schedule/edit');
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors)
        });
    };


    const handleUnpackRoster = (roster) => {
        let tempRoster;
        roster.map((player) => (
            tempRoster.concat(', ', player)
        ));
        setRosterString(tempRoster);
    }

    const handleUnpackScorers = (scorers) => {
        let tempScorers;
        scorers.map((player) => (
            tempScorers.concat(', ', player)
        ));
        setScorersString(tempScorers);
    }

    const handleRoster = (e) => {
        let tempPlayerNames = [];
        let namesString = e.target.value;
        tempPlayerNames = namesString.split(',');
        setRoster(tempPlayerNames);
    }

    const handleScorers = (e) => {
        let tempPlayerNames = [];
        let namesString = e.target.value;
        tempPlayerNames = namesString.split(',');
        setScorers(tempPlayerNames);
    }

    return (
        <div className="uk-container">
            <Navbar/>
            <div>
                <form onSubmit={(e) => editGameHandler(e)}>
                    <fieldset className="uk-fieldset">
                            <div className="uk-margin">
                                <label>Opponent:</label>
                                <input className='uk-input' type='text' name = 'opponent' value={game.opponent} onChange={(e) => setOpponent(e.target.value)}/>
                            </div>
                            {errors.opponent ? <span style={{color: "red"}}>{errors.name.message}</span> : null} 
                            <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                                <label>Location:</label>
                                <label><input name="Home" className="uk-radio" type='radio' value={true} onChange={(e) => setHomeBoolean(e.target.value)}/>Home</label>
                                <label><input name="Away" className="uk-radio" type='radio' value={false} onChange={(e) => setHomeBoolean(e.target.value)}/>Away</label>
                            </div>
                            {errors.homeBoolean ? <span style={{color: "red"}}>{errors.name.message}</span> : null} 
                            <div className="uk-margin">
                                <label>Score:</label>
                                <input className='uk-input' type='text' name = 'score' onChange={(e) => setScore(e.target.value)}/>
                            </div>
                            <div className="uk-margin">
                                <label>Scorers:</label>
                                <input className='uk-input' type='text' name = 'scorers' value={scorersString} onChange={(e) => handleScorers(e)}/>
                            </div>
                            <div className="uk-margin">
                                <label>Roster:</label>
                                <p>*Rostered Players Must Be Typed in Order By Number</p>
                                <input className='uk-input' type='text' name = 'roster' value={rosterString} onChange={(e) => handleRoster(e)}/>
                            </div>
                            {errors.roster ? <span style={{color: "red"}}>{errors.name.message}</span> : null} 
                            <button type="submit">Submit</button>
                        </fieldset>
                    </form>
            </div>
        </div>
    )
}

export default EditGame;