import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';
import Navbar from './chunks/Navbar';


const EditPlayerForm = (props) => {
    const [errors, setErrors] = useState({});
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [positionGroup, setPositionGroup] = useState("");
    const [preferredPositionOne, setPreferredPositionOne] = useState("");
    const [preferredPositionTwo, setPreferredPositionTwo] = useState("");
    const [preferredPositionThree, setPreferredPositionThree] = useState("");
    const [preferredPositions, setPreferredPositions] = useState([]);
    const [playerImg, setPlayerImg] = useState("");


    useEffect(()=>{
        axios.get(`http://localhost:8000/api/players/${props.id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setName(res.data.name);
                setYear(res.data.year);
                setPositionGroup(res.data.positionGroup);
                setPreferredPositionOne(res.data.preferredPositions[0]);
                setPreferredPositionTwo(res.data.preferredPositions[1]);
                setPreferredPositionThree(res.data.preferredPositions[2])
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])


    const createPlayerHandler = (e) => {
        e.preventDefault();
        setPreferredPositions([preferredPositionOne, preferredPositionTwo, preferredPositionThree])
        axios.post('http://localhost:8000/api/players', {name, year, positionGroup, preferredPositions, playerImg})
            .then((res)=>{
                console.log(res.data);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors)
        });
    };

    const HandlePreferredPositions = (positionFromBelow) => {
        if (preferredPositionOne === '') {
            setPreferredPositionOne(positionFromBelow);
        }
        else if (preferredPositionTwo === '') {
            setPreferredPositionTwo(positionFromBelow);
        }
        else {
            setPreferredPositionThree(positionFromBelow);
        }
    }

    
    return (
        <div className='uk-container'>
            <Navbar/>
            <h2>Add Player</h2>
            <form onSubmit={(e) => createPlayerHandler(e)}>
                <div className='uk-margin'>
                    <label>Name:</label>
                    <input className='uk-input' type='text' name = 'name' onChange={(e) => setName(e.target.value)}/>
                </div>
                    {errors.name ? <span style={{color: "red"}}>{errors.name.message}</span> : null} 
                <div className='uk-margin'>
                    <label>Year:</label>
                    <select className='uk-select' onChange={(e) => setYear(e.target.value)}>
                        <option name = 'year' value = 'freshman'>Freshman</option>
                        <option name = 'year' value = 'sophomore'>Sophomore</option>
                        <option name = 'year' value = 'junior'>Junior</option>
                        <option name = 'year' value = 'senior'>Senior</option>
                    </select>
                </div>
                    {errors.year ? <span style={{color: "red"}}>{errors.year.message}</span> : null} 
                <div className='uk-margin'>
                    <label>Position Group:</label>
                    <select className='uk-select' onChange={(e) => setPositionGroup(e.target.value)}>
                        <option name = 'position group' value = 'back'>Back</option>
                        <option name = 'position group' value = 'forward'>Forward</option>
                    </select>
                </div>
                {errors.positionGroup ? <span style={{color: "red"}}>{errors.positionGroup.message}</span> : null} 
                <div className='uk-margin'>
                    <label>Preferred Positions:</label>
                    <select className='uk-select' multiple onChange={(e) => HandlePreferredPositions(e.target.value)}>
                        {positionGroup === "back"?
                            <>
                                <option name = 'preferred position' value = 'flyhalf'>Flyhalf</option>
                                <option name = 'preferred position' value = 'scrumhalf'>Scrumhalf</option>
                                <option name = 'preferred position' value = 'center'>Center</option>
                                <option name = 'preferred position' value = 'wing'>Wing</option>
                                <option name = 'preferred position' value = 'fullback'>Fullback</option>
                            </>
                        :
                        <>
                            <option name = 'preferred position' value = 'prop'>Prop</option>
                            <option name = 'preferred position' value = 'hooker'>Hooker</option>
                            <option name = 'preferred position' value = 'second row'>Second Row</option>
                            <option name = 'preferred position' value = 'flanker'>Flanker</option>
                            <option name = 'preferred position' value = 'eight man'>Eight Man</option>
                        </>
                    }
                    </select>
                </div>
                <div className='uk-form-custom'>
                    <label>Player Image:</label>
                    <input type= 'file' onChange={(e) => setPlayerImg(e.target.value)}/>
                </div>
                <button type='submit' >Submit</button>
            </form>
        </div>
    )
}
export default EditPlayerForm;