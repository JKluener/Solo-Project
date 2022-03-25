import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { navigate } from '@reach/router';
import Navbar from './chunks/Navbar';
import HoverButton from './chunks/HoverButton';
import Select from 'react-select';


const EditPlayerForm = (props) => {
    const [errors, setErrors] = useState({});
    const [name, setName] = useState("");
    const [year, setYear] = useState({});
    const [positionGroup, setPositionGroup] = useState({});
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
                setPreferredPositions(res.data.preferredPositions);
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [])


    const editPlayerHandler = (e) => {
        e.preventDefault();
        let dataSet = {name, year, positionGroup, preferredPositions, playerImg }
        axios.put(`http://localhost:8000/api/players/${props.id}`, dataSet)
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
            <h2>Edit {name}'s Profile</h2>
            <form onSubmit={(e) => editPlayerHandler(e)}>
                <div className='uk-margin'>
                    <label>Name:</label>
                    <input className='uk-input' type='text' name = 'name' value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                    {errors.name ? <span style={{color: "red"}}>{errors.name.message}</span> : null} 
                <div className='uk-margin'>
                    <label>Year:</label>
                    <Select options={yearOptions} placeholder="Select a Year" value = {year.label} onChange={setYear} defaultValue={year}/>
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
export default EditPlayerForm;