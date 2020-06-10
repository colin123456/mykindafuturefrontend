import React from 'react';
//import {IStarship} from './starship/models/starship';
import {IStarshipScore} from './starship/models/starshipscore';

import './starship/styles/starship.css';
// import starshipimage1 from './starship/images/starwarsimage1.jpg';


interface Props extends IStarshipScore {
    image: string;
}

const StarShipScore = (props: Props) => {
   
    const {image, player_one, player_two, display_message} = props;
   
    return (
        
        <div className="card">
            <img src={image} alt="starshipimage3"  style={{width: "50%"}} />;
             <h1>{display_message}</h1>
            <p className="title">Game Score</p>
            <p>Player One: {player_one}</p>
            <p>Player Two: {player_two}</p>
        </div>
    )
}

export default StarShipScore