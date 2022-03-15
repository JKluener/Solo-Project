import React, { useState } from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';
import Navbar from './chunks/Navbar';
import Select from 'react-select';


const AddPlayerForm = (props) => {
    const [errors, setErrors] = useState({});
    const [name, setName] = useState("");
    const [year, setYear] = useState({});
    const [positionGroup, setPositionGroup] = useState({});
    const [preferredPositionOne, setPreferredPositionOne] = useState({});
    const [preferredPositionTwo, setPreferredPositionTwo] = useState({});
    const [preferredPositionThree, setPreferredPositionThree] = useState({});
    const [preferredPositions, setPreferredPositions] = useState([]);
    const [playerImg, setPlayerImg] = useState("");

    const createPlayerHandler = (e) => {
        e.preventDefault();
        setPreferredPositions([preferredPositionOne, preferredPositionTwo, preferredPositionThree]);
        let dataSet = {name, year, positionGroup, preferredPositions, playerImg }
        axios.post('http://localhost:8000/api/players', dataSet)
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

    const yearOptions = [
        {value: 'freshman', label: 'Freshman'},
        {value: 'sophomore', label: 'Sophomore'},
        {value: 'junior', label: 'Junior'},
        {value: 'senior', label: 'Senior'}
    ]

    const positionGroupOptions = [
        {value: 'back', label: 'Back'},
        {value: 'forward', label: "Forward"}
    ]

    const backPositionOptions = [
        {value: 'scrumhalf', label: 'Scrumhalf'},
        {value: 'flyhalf', label: 'Flyhalf'},
        {value: 'center', label: 'Center'},
        {value: 'wing', label: 'Wing'},
        {value: 'fullback', label: 'Fullback'}
    ]

    const forwardPositionOptions = [
        {value: 'prop', label: 'Prop'},
        {value: 'hooker', label: 'Hooker'},
        {value: 'second row', label: 'Second Row'},
        {value: 'flanker', label: 'Flanker'},
        {value: 'Eight man', label: '8 Man'}
    ]
    
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
                    <Select options={yearOptions} placeholder="Select a Year" onChange={setYear} defaultValue={year}/>
                </div>
                    {errors.year ? <span style={{color: "red"}}>{errors.year.message}</span> : null} 
                <div className='uk-margin'>
                    <label>Position Group:</label>
                    <Select options={positionGroupOptions} placeholder="Select a Position Group" onChange={setPositionGroup} defaultValue={positionGroup}/>
                </div>
                {errors.positionGroup ? <span style={{color: "red"}}>{errors.positionGroup.message}</span> : null} 
                <div className='uk-margin'>
                    <label>Preferred Positions:</label>
                        {positionGroup.value === 'back'?
                            <Select options={backPositionOptions} placeholder="Select Applicable Positions" onChange={setPreferredPositions} defaultValue={preferredPositions} isMulti />
                        :
                        <Select options={forwardPositionOptions} placeholder="Select Applicable Positions" onChange={setPreferredPositions} defaultValue={preferredPositions} isMulti />
                    }
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
export default AddPlayerForm;