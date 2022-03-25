import { useState,useEffect } from "react";
import Navbar from "./chunks/Navbar";
import axios from "axios";
import player_fallback from './chunks/Img/player_fallback.png';

const ShowPlayer = (props) => {
    const [name, setName] = useState("");
    const [year, setYear] = useState({});
    const [positionGroup, setPositionGroup] = useState({});
    const [preferredPositions, setPreferredPositions] = useState([]);
    const [playerImg, setPlayerImg] = useState("");
    const [filterGames, setFilterGames] = useState([]);


    useEffect(()=>{
        axios.get(`http://localhost:8000/api/players/${props.id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setName(res.data.name);
                setYear(res.data.year);
                setPositionGroup(res.data.positionGroup);
                setPreferredPositions(res.data.preferredPositions);
                setPlayerImg(player_fallback);
            })
            axios.get('http://localhost:8000/api/games')
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                handleGames(res.data.games);
                console.log(filterGames);
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])

    const handleGames = (games) => {
        games.map((game) => {
            game.roster.map((player) => {
                if (player.name == {name}) {
                    let tempGameArray = filterGames;
                    tempGameArray.push(game);
                    setFilterGames(tempGameArray);
                }
            })
        })
    }


    return (
        <div className="uk-container">
            <Navbar/>
            <div>
                <h1>{name}</h1>
            </div>
            <div className="uk-card uk-card-small uk-card-default">
                <h3>Player Details:</h3>
                <ul className="uk-list uk-list-large uk-list-striped">
                    <li>{year.label}</li>
                    <li>{positionGroup.label}</li>
                    <li>
                        {preferredPositions?
                        preferredPositions.map((position) => (
                            <span style={{marginRight: '10px'}}>{position.label}</span>
                        ))
                        :null
                    }
                    </li>
                </ul>
            </div>
            <h2>Games Played:</h2>
            <table className="uk-table uk-table-hover uk-table-middle">
                <thead>
                    <tr>
                    <th>Opponent</th>
                    <th>Location</th>
                    <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            filterGames.map((game)=>(
                                <tr key={game._id}>
                                <td>{game.opponent}</td>
                                <td>{game.homeBoolean? "Home": "Away"}</td>
                                <td>{game.score}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default ShowPlayer;