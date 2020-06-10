import React, {useState, useEffect} from 'react';
import API from "../utils/API";
import {IStarship} from '../components/starship/models/starship';
import {IStarshipScore} from '../components/starship/models/starshipscore';

import StarShip from '../components/starship';
import StarShipScore from '../components/starship-score';
import '../components/starship/styles/starship.css';
import starshipimage1 from '../components/starship/images/starwarsimage1.jpg'
import starshipimage2 from '../components/starship/images/starwarsimage2.jpg'
import starshipimage3 from '../components/starship/images/starwarsimage3.jpg'

const StarShipContainer = ()  => {
  const score: IStarshipScore =  {
    player_one: 0,
    player_two: 0,
    display_message: 'Select a category to start game!'
  };
    const [starshipScore, setStarshipScore] = useState<IStarshipScore | undefined>(score)

    const [starshipOne, setStarshipOne] = useState<IStarship | undefined>(undefined)
    const [initialStarShipDisplay, setInitialStarShipDisplay] = useState(false);

    const [categoryOne, setCategoryOne] = useState<string>()
    const [triggerRequestOne, setTriggerRequestOne] = useState(true)

    const handleTriggerClickOne = (categoryHighlighted: string) => {
        //setTriggerRequestOne(true);
        setCategoryOne(categoryHighlighted)
        handleScoreUpdates(categoryHighlighted);
    }
    useEffect(() => {
        API.get('/starship')
        .then(res => {
            console.log(res.data);
            setStarshipOne(res.data)
        })
        .catch(err => {
            console.log(err)
        })
        
        setTriggerRequestOne(false);
    }, [triggerRequestOne])

    const [starshipTwo, setStarshipTwo] = useState<IStarship | undefined>(undefined)
    const [triggerRequestTwo, setTriggerRequestTwo] = useState(true)

    const handleTriggerClickTwo = () => {
        setTriggerRequestTwo(true);
    }
    useEffect(() => {
        API.get('/starship')
        .then(res => {
          console.log(res.data);
            setStarshipTwo(res.data)
        })
        .catch(err => {
            console.log(err)
        })
        setTriggerRequestTwo(false)
    }, [triggerRequestTwo])

    const handleScoreUpdates = (categoryHighlighted: string) => {

      let playerOne: number =  0;
      let playerTwo: number =  0;
      let displyMessage: string = '';
      switch (categoryHighlighted) {
        case "max_atmosphering_speed":
          const max_atmosphering_speed_PlayerOne: number = starshipOne ? starshipOne.max_atmosphering_speed : 0;
          const max_atmosphering_speed_PlayerTwo: number = starshipTwo ? starshipTwo.max_atmosphering_speed : 0;
          if (max_atmosphering_speed_PlayerOne > max_atmosphering_speed_PlayerTwo) {
            playerOne = 1;
            displyMessage = 'YOU WIN!!'
            setTriggerRequestOne(true);
          } else if (max_atmosphering_speed_PlayerOne < max_atmosphering_speed_PlayerTwo)  {
            playerTwo = 1;
            displyMessage = 'YOU LOST!'
            setTriggerRequestTwo(true);
          } else {
            playerOne = 1;
            playerTwo = 1;
            displyMessage = 'DRAW!'
            setTriggerRequestOne(true);
            setTriggerRequestTwo(true);
          }
          break;
        case "cost_in_credits":
          const cost_in_credits_PlayerOne: number = starshipOne ? starshipOne.cost_in_credits : 0;
          const cost_in_credits_PlayerTwo: number = starshipTwo ? starshipTwo.cost_in_credits : 0;
          if (cost_in_credits_PlayerOne > cost_in_credits_PlayerTwo) {
            playerOne = 1;
            displyMessage = 'YOU WIN!'
            setTriggerRequestOne(true);
          } else if (cost_in_credits_PlayerOne < cost_in_credits_PlayerTwo) {
            playerTwo = 1;
            displyMessage = 'YOU LOST!'
            setTriggerRequestTwo(true);
          } else {
            playerOne = 1;
            playerTwo = 1;
            displyMessage = 'DRAW!'
            setTriggerRequestOne(true);
            setTriggerRequestTwo(true);
          }
          break;
        case "passengers":
          const passengers_PlayerOne: number = starshipOne ? starshipOne.passengers : 0;
          const passengers_PlayerTwo: number = starshipTwo ? starshipTwo.passengers : 0;
          if (passengers_PlayerOne > passengers_PlayerTwo) {
            playerOne = 1;
            displyMessage = 'YOU WIN!'
            setTriggerRequestOne(true);
          }
          else if (passengers_PlayerOne < passengers_PlayerTwo)  {
            playerTwo = 1;
            displyMessage = 'YOU LOST!'
            setTriggerRequestTwo(true);
          } else {
            playerOne = 1;
            playerTwo = 1;
            displyMessage = 'DRAW!'
            setTriggerRequestOne(true);
            setTriggerRequestTwo(true);
          }
          break;
          case "totalFilms":
            const totalFilms_PlayerOne: number = starshipOne ? starshipOne.totalFilms : 0;
            const totalFilms_PlayerTwo: number = starshipTwo ? starshipTwo.totalFilms : 0;
            if (totalFilms_PlayerOne > totalFilms_PlayerTwo) {
              playerOne = 1;
              displyMessage = 'YOU WIN!'
              setTriggerRequestOne(true);
            }
            else if (totalFilms_PlayerOne < totalFilms_PlayerTwo)  {
              playerTwo = 1;
              displyMessage = 'YOU LOST!'
              setTriggerRequestTwo(true);
            } else {
              playerOne = 1;
              playerTwo = 1;
              displyMessage = 'DRAW!'
              setTriggerRequestOne(true);
              setTriggerRequestTwo(true);
            }
            break;
        default:
          console.log(`Sorry, we are out of ${categoryHighlighted}.`);
          
      }
      const score: IStarshipScore =  {
        player_one: starshipScore ? starshipScore.player_one + playerOne : 0,
        player_two: starshipScore ? starshipScore.player_two + playerTwo : 0,
        display_message: displyMessage
      };
      setInitialStarShipDisplay(true);
      setStarshipScore(score);
  }

  return (
     
      <div className="starship-container">
        <StarShip 
          image={starshipimage1} 
          name={starshipOne ? starshipOne.name : ''}
          starship_class={starshipOne ? starshipOne.starship_class : ''}
          cost_in_credits={starshipOne ? starshipOne.cost_in_credits : 0}
          max_atmosphering_speed={starshipOne ? starshipOne.max_atmosphering_speed : 0}
          passengers={starshipOne ? starshipOne.passengers : 0}
          totalFilms={starshipOne ? starshipOne.totalFilms : 0}
          onhandleTriggerClick={handleTriggerClickOne} 
          highlight={categoryOne ? categoryOne : ''}
        />
        {initialStarShipDisplay ?
        <React.Fragment>
          <StarShipScore 
          image={starshipimage3}
          player_one={starshipScore ? starshipScore.player_one : 0}
          player_two={starshipScore ? starshipScore.player_two : 0}
          display_message={starshipScore ? starshipScore.display_message : 'NO SCORE'}
       />
        <StarShip 
          image={starshipimage2} 
          name={starshipTwo ? starshipTwo.name : ''}
          starship_class={starshipTwo ? starshipTwo.starship_class : ''}
          cost_in_credits={starshipTwo ? starshipTwo.cost_in_credits : 0}
          max_atmosphering_speed={starshipTwo ? starshipTwo.max_atmosphering_speed : 0}
          passengers={starshipTwo ? starshipTwo.passengers : 0}
          totalFilms={starshipTwo ? starshipTwo.totalFilms : 0}
          onhandleTriggerClick={handleTriggerClickTwo} 
          highlight={categoryOne ? categoryOne : ''}
        />
       
       </React.Fragment>
        :
          ''}
        {/* <StarShipScore 
          image={starshipimage3}
          player_one={starshipScore ? starshipScore.player_one : 0}
          player_two={starshipScore ? starshipScore.player_two : 0}
          display_message={starshipScore ? starshipScore.display_message : 'NO SCORE'}
        /> */}
        {/* <StarShip 
          image={starshipimage2} 
          name={starshipTwo ? starshipTwo.name : ''}
          starship_class={starshipTwo ? starshipTwo.starship_class : ''}
          cost_in_credits={starshipTwo ? starshipTwo.cost_in_credits : 0}
          max_atmosphering_speed={starshipTwo ? starshipTwo.max_atmosphering_speed : 0}
          passengers={starshipTwo ? starshipTwo.passengers : 0}
          totalFilms={starshipTwo ? starshipTwo.totalFilms : 0}
          onhandleTriggerClick={handleTriggerClickTwo} 
          highlight={categoryOne ? categoryOne : ''}
        /> */}
      </div>
  );
}

export default StarShipContainer;
