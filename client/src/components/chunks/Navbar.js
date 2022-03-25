import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";

const Navbar = (props) => {
    const [players, setPlayers] = useState([]);
    const [games, setGames] = useState([]);

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
    <div className = 'uk-container' uk-navbar="mode: click" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <nav className="uk-navbar-container uk-margin" uk-navbar>
            <div className="uk-navbar-center">
                <ul className="uk-navbar-nav">
                    <li className="uk-parent"><a href="/">Home</a></li>
                    <li className="uk-parent">
                    <Link to="#">Players</Link>
                        <div className="uk-navbar-dropdown">
                            <ul className="uk-nav uk-navbar-dropdown-nav">
                            <li className="uk-active uk-nav-header" ><Link to="/players">All Players</Link></li>
                                {
                                    players?
                                    players.map((player) => (
                                        <li className="uk-active" key={player._id} onClick={() => navigate(`/players/${player._id}`)}>{player.name}</li>
                                    ))
                                :null}
                                <li className="uk-nav-divider"></li>
                                <li className="uk-active uk-nav-header"><Link to="/players/add">Add Player</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li className="uk-parent">
                        <a href="/schedule/edit">Games</a>
                        <div className="uk-navbar-dropdown">
                            <ul className="uk-nav uk-navbar-dropdown-nav">
                                {
                                    games?
                                    games.map((game) => (
                                        <li className="uk-active" key={game._id} onClick = {(e)=> navigate(`/schedule/${game._id}`)}>{game.opponent}</li>
                                    ))
                                :null}
                            </ul>
                        </div>
                    </li>
                    <li className="uk-parent"><Link to="/schedule/edit">Edit Schedule</Link></li>
                    </ul>
            </div>
        </nav>
    </div>
    )
}

export default Navbar;