import { useState, useEffect } from "react";
import PlayerIcon from "./PlayerIcon";
import axios from "axios";

const Lineup = (props) => {
    const {roster} = props;
    // const [playerOne, setPlayerOne] = useState("");
    // const [playerTwo, setPlayerTwo] = useState("");
    // const [playerThree, setPlayerThree] = useState("");
    // const [playerFour, setPlayerFour] = useState("");
    // const [playerFive, setPlayerFive] = useState("");
    // const [playerSix, setPlayerSix] = useState("");
    // const [playerSeven, setPlayerSeven] = useState("");
    // const [playerEight, setPlayerEight] = useState("");
    // const [playerNine, setPlayerNine] = useState("");
    // const [playerTen, setPlayerTen] = useState("");
    // const [playerEleven, setPlayerEleven] = useState("");
    // const [playerTwelve, setPlayerTwelve] = useState("");
    // const [playerThirteen, setPlayerThirteen] = useState("");
    // const [playerFourteen, setPlayerFourteen] = useState("");
    // const [playerFifteen, setPlayerFifteen] = useState("");

    // useEffect(()=>{
    //     axios.get(`http://localhost:8000/api/game/${gameId}`)
    //         .then((res)=>{
    //             console.log(res);
    //             console.log(res.data);
    //             setPlayerOne(res.data.roster[0]);
    //             setPlayerTwo(res.data.roster[1]);
    //             setPlayerThree(res.data.roster[2]);
    //             setPlayerFour(res.data.roster[3]);
    //             setPlayerFive(res.data.roster[4]);
    //             setPlayerSix(res.data.roster[5]);
    //             setPlayerSeven(res.data.roster[6]);
    //             setPlayerEight(res.data.roster[7]);
    //             setPlayerNine(res.data.roster[8]);
    //             setPlayerTen(res.data.roster[9]);
    //             setPlayerEleven(res.data.roster[10]);
    //             setPlayerTwelve(res.data.roster[11]);
    //             setPlayerThirteen(res.data.roster[12]);
    //             setPlayerFourteen(res.data.roster[13]);
    //             setPlayerFifteen(res.data.roster[14]);
    //             console.log(res.data.roster);

    //         })
    //         .catch((err)=>{
    //             console.log(err);
    //         })
    // }, [])


    return (
        <div className="uk-container">
            <div className="uk-child-width-1-3@m" style={{display: 'flex', marginBottom: '25px'}}>
                <PlayerIcon player={roster[0]} playerKey='1' />
                <PlayerIcon player={roster[1]} playerKey='2' />
                <PlayerIcon player={roster[2]} playerKey='3' />
            </div>
            <div className="uk-child-width-1-4@m" style={{display: 'flex', marginBottom: '25px'}}>
                <div></div>
                <PlayerIcon player={roster[3]} playerKey='4' />
                <PlayerIcon player={roster[4]} playerKey='5' />
            </div>
            <div className="uk-child-width-1-3@m" style={{display: 'flex', marginBottom: '25px'}}>
                <PlayerIcon player={roster[5]} playerKey='6' />
                <PlayerIcon player={roster[6]} playerKey='7' />
                <PlayerIcon player={roster[7]} playerKey='8' />
            </div>
            <div className="uk-child-width-1-4@m" style={{display: 'flex', marginBottom: '25px'}}>
                <div></div>
                <PlayerIcon player={roster[8]} playerKey='9' />
                <PlayerIcon player={roster[9]} playerKey='10' />
            </div>
            <div className="uk-child-width-1-2@m" style={{display: 'flex', marginBottom: '25px'}}>
                <PlayerIcon player={roster[10]} playerKey='12' />
                <PlayerIcon player={roster[11]} playerKey='13' />
            </div>
            <div className="uk-child-width-1-3@m" style={{display: 'flex', marginBottom: '25px'}}>
                <PlayerIcon player={roster[12]} playerKey='11' />
                <PlayerIcon player={roster[13]} playerKey='15' />
                <PlayerIcon player={roster[14]} playerKey='14' />
            </div>
        </div>
    )
}

export default Lineup;