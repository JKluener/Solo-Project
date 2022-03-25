import { useEffect, useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const HoverDeleteGame = (props) => {
    const {gameid} = props;
    const [hovered, setHovered] = useState(false);
    const [activeButtonClass, setActiveButtonClass] = useState("");
    const [btnClassOne, setBtnClassOne] =useState("");
    const [btnClassTwo, setBtnClassTwo] =useState("");

    useEffect(()=>{
            setActiveButtonClass("uk-button uk-button-primary uk-button-small");
            setBtnClassOne("uk-button uk-button-primary uk-button-small");
            setBtnClassTwo("uk-button uk-button-danger uk-button-small");
    }, [])

    const toggleHover = () => {
        setHovered(!hovered);
        handleBtnClass(hovered);
    }

    const handleBtnClass = (hovered) => {
        hovered?
            setActiveButtonClass(btnClassOne)
            :setActiveButtonClass(btnClassTwo)
    }

    const deleteGameHandler = (itemId) => {
        axios.delete(`http://localhost:8000/api/games/${itemId}`)
        .then((res) => {
            console.log(res.data);
            navigate('/');
        })
        .catch((err) => {
            console.log(err);
        })
    };

    return (
        <button className={activeButtonClass} onMouseEnter={() => toggleHover()} onMouseLeave={() => toggleHover()} onClick={() => deleteGameHandler(gameid)} >Delete</button>
        )
}

export default HoverDeleteGame;