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
            .catch((err)=>{
                console.log(err);
            })
    }, [])

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
        </div>
    )
}
export default ShowPlayer;