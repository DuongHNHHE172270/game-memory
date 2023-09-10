import { useEffect, useState } from 'react';
import './App.css';
import { cartImges } from './combonents/img';
import SingleCard from './combonents/singleCard/singleCard';

function App() {
  const [ cards, setCards ] = useState([])
  const [ turns, setTurns ] = useState(0)
  const [ choiceOne, setChoiceOne ] = useState(null)
  const [ choiceTwo, setChoiceTwo ] = useState(null)
  const [ disable, setDisable ] = useState(false)

  const shuffleCarts = () => {
    const shuffledCarts = [...cartImges, ...cartImges]
          .sort(() => Math.random() - 0.5)
          .map((card) => ({...card, id: Math.random()}))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCarts)
    setTurns(0)
  }
  // choice a card

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // reset cart
  const resetCart = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prewTurn => prewTurn + 1)
    setDisable(false)
  }

  useEffect(() => {
    if(choiceOne && choiceTwo){
      setDisable(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prewCard => {
          return prewCard.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matches: true}
            }
            else{
              return card
            }
          })
        })
        resetCart()
      }
      else{
        setTimeout(() => {
            resetCart()
        }, 1000)
      }
    }
  }, [choiceOne, choiceTwo])
  
  useEffect(() => {
    shuffleCarts()
  }, [])
  return (
    <div className="App">
      <h1>Magic Game</h1>
      <button onClick={shuffleCarts}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
              key={card.id} 
              card={card} 
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matches}
              disable={disable}
          />
        ))}
      </div>
      <p>Turn: {turns}</p>
    </div>
  );
}

export default App;
