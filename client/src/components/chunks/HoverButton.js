import { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import axios from "axios";

const HoverButton = (props) => {
    const [hovered, setHovered] = useState(false);
    const [activeButtonClass, setActiveButtonClass] = useState("");
    const [btnClassOne, setBtnClassOne] =useState("");
    const [btnClassTwo, setBtnClassTwo] =useState("");
    const {btnversion, itemId} = props;
    const [nav, setNav] = useState("");
    const [btnType, setBtnType] = useState("");
    const [text, setText] = useState("");

    useEffect(() => {
        if (btnversion === "submitPlayer") {
            setActiveButtonClass("uk-button uk-button-secondary uk-button-small");
            setBtnClassOne("uk-button uk-button-secondary uk-button-small");
            setBtnClassTwo("uk-button uk-button-default uk-button-small");
            setBtnType("submit");
            setNav(null);
            setText("Submit");
        }
        else if(btnversion === "navigateEdit") {
            setActiveButtonClass("uk-button uk-button-secondary uk-button-small");
            setBtnClassOne("uk-button uk-button-secondary uk-button-small");
            setBtnClassTwo("uk-button uk-button-default uk-button-small");
            setNav(`players/edit/${itemId}`);
            setText("Edit");
        }
        else if(btnversion === "navigateEditGame") {
            setActiveButtonClass("uk-button uk-button-secondary uk-button-small");
            setBtnClassOne("uk-button uk-button-secondary uk-button-small");
            setBtnClassTwo("uk-button uk-button-default uk-button-small");
            setNav(`players/edit/${itemId}`);
            setText("Edit");
        }
        else if (btnversion === "navigateAddPlayer") {
            setActiveButtonClass("uk-button uk-button-secondary uk-width-1-1");
            setBtnClassOne("uk-button uk-button-secondary uk-width-1-1");
            setBtnClassTwo("uk-button uk-button-default uk-width-1-1");
            setNav(`players/add`);
            setText("Add Player");
        }
        else if (btnversion === "deletePlayer") {
            setActiveButtonClass("uk-button uk-button-primary uk-button-small");
            setBtnClassOne("uk-button uk-button-primary uk-button-small");
            setBtnClassTwo("uk-button uk-button-danger uk-button-small");
            setNav(null);
            setText("Delete");
        }
        else if (btnversion === "deleteGame") {
            setActiveButtonClass("uk-button uk-button-primary uk-button-small");
            setBtnClassOne("uk-button uk-button-primary uk-button-small");
            setBtnClassTwo("uk-button uk-button-danger uk-button-small");
            setNav(null);
            setText("Delete");
        }
    }, [])

    const deletePlayerHandler = (itemId) => {
        axios.delete(`http://localhost:8000/api/players/${itemId}`)
        .then((res) => {
            console.log(res.data);
            navigate('/players');
        })
        .catch((err) => {
            console.log(err);
        })
    };

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

    const toggleHover = () => {
        setHovered(!hovered);
        handleBtnClass(hovered);
    }

    const handleBtnClass = (hovered) => {
        hovered?
            setActiveButtonClass(btnClassOne)
            :setActiveButtonClass(btnClassTwo)
    }

    return (
        <div>
        {(() => {
        switch (btnversion) {
            case 'deletePlayer':
                return <button className={activeButtonClass} btnversion={btnType} onMouseEnter={() => toggleHover()} onMouseLeave={() => toggleHover()} onClick={(itemId) => deletePlayerHandler(itemId)} >{text}</button>;
                case 'deleteGame':
                    return <button className={activeButtonClass} btnversion={btnType} onMouseEnter={() => toggleHover()} onMouseLeave={() => toggleHover()} onClick={(itemId) => deleteGameHandler(itemId)} >{text}</button>;
                case 'submitPlayer':
                return <button className={activeButtonClass} btnversion={btnType} onMouseEnter={() => toggleHover()} onMouseLeave={() => toggleHover()} type="submit" >{text}</button>;
            case 'navigateAddPlayer':
                return <button className={activeButtonClass} btnversion={btnType} onMouseEnter={() => toggleHover()} onMouseLeave={() => toggleHover()} onClick={() => {navigate(nav)}} >{text}</button>;
            case 'navigateEdit':
                return <button className={activeButtonClass} btnversion={btnType} onMouseEnter={() => toggleHover()} onMouseLeave={() => toggleHover()} onClick={() => {navigate(nav)}} >{text}</button>;
                case 'navigateEditGame':
                    return <button className={activeButtonClass} btnversion={btnType} onMouseEnter={() => toggleHover()} onMouseLeave={() => toggleHover()} onClick={() => {navigate(nav)}} >{text}</button>;    
                default:
                return null;
            }
        })()}
        </div>
    )
}
export default HoverButton;