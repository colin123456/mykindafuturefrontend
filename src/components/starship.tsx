import React from 'react';
import {IStarship} from './starship/models/starship';
import './starship/styles/starship.css';
// import starshipimage1 from './starship/images/starwarsimage1.jpg';


interface Props extends IStarship {
    image: string;
    onhandleTriggerClick(categoryHighlighted: string): void;
    highlight: string
}

const StarShip =(props: Props) => {
   
    const {image, name, starship_class, max_atmosphering_speed, cost_in_credits, totalFilms, passengers, highlight, onhandleTriggerClick} = props;

    const handleHiglightedButtonChange = (event: any) => {
        onhandleTriggerClick(event.target.value );
        console.log(event.target.value);
        console.log('max_atmosphering_speed');
       
    }
   
    return (
        
        <div className="card">
            <img src={image} alt="starshipimage1"  style={{width: "100%"}} />
             <h1>{name}</h1>
            <p className="title">{starship_class}</p>
            <p><button value="max_atmosphering_speed" onClick={handleHiglightedButtonChange} style={{color:  highlight === 'max_atmosphering_speed' ? 'red' : 'white'}}>Max Speed: {max_atmosphering_speed}</button></p>
            <p><button value="cost_in_credits" onClick={handleHiglightedButtonChange} style={{color:  highlight === 'cost_in_credits' ? 'red' : 'white'}}>Cost in credits: {cost_in_credits}</button></p>
            <p><button value="passengers" onClick={handleHiglightedButtonChange} style={{color:  highlight === 'passengers' ? 'red' : 'white'}}>Number of Passengers: {passengers}</button></p>
            <p><button value="totalFilms" onClick={handleHiglightedButtonChange} style={{color:  highlight === 'totalFilms' ? 'red' : 'white'}}>Total Films: {totalFilms}</button></p>
        </div>
    )
}

export default StarShip