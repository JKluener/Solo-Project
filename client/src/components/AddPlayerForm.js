import React, { useState } from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';
import Navbar from './chunks/Navbar';
import Select from 'react-select';
import HoverButton from './chunks/HoverButton';


const AddPlayerForm = (props) => {
    const [errors, setErrors] = useState({});
    const [name, setName] = useState("");
    const [year, setYear] = useState({});
    const [positionGroup, setPositionGroup] = useState({});
    const [preferredPositions, setPreferredPositions] = useState([]);

    const createPlayerHandler = (e) => {
        e.preventDefault();
        let dataSet = {name, year, positionGroup, preferredPositions}
        axios.post('http://localhost:8000/api/players', dataSet)
            .then((res)=>{
                console.log(res.data);
                navigate('/players');
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors)
        });
    };

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
                <HoverButton btnversion="submitPlayer"/>
            </form>
        </div>
    )
}
export default AddPlayerForm;