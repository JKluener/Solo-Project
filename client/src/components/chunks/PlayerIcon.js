import player_fallback from './Img/player_fallback.png';

const Player_Icon = (props) => {
    const {player, playerKey} = props;


    return (
        <div className="uk-card uk-card-small">
            <div className="uk-card-media-top">
                <img src={player_fallback} alt="player_fallback" className="uk-border-circle" style={{height: '25px', width:'25px'}}/>
            </div>
            <div>
                <p>{playerKey}</p>
                <p>{player}</p>
            </div>
        </div>
    )
}

export default Player_Icon;