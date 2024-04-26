import React from 'react';
import Die from "./Components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() 
{
  const [diceArray, setDiceArray] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)


  React.useEffect(()=>
  {
    const allHeld = diceArray.every((dice)=>{return dice.isHeld})
    const firstValue = diceArray[0].value
    const allSameValue = diceArray.every((dice)=>{return dice.value === firstValue})

    if(allHeld && allSameValue)
    {
      setTenzies(true)
      console.log("winner")
    }

  },[diceArray])


   let diceElements =  diceArray.map((dice)=>{
       return <Die value={dice.value} isHeld={dice.isHeld} key={dice.id} holdDice={()=>{ return holdDice(dice.id)}} />
   })

   function allNewDice()
   {
     let array = []; 
     for(let i = 1; i <= 10; i++)
     {    
        array.push(
                     {
                       value: Math.round((Math.random() * 5) + 1),
                       isHeld:false,
                       id:nanoid()
                     }
                    )
     }
     return array
   }

   function roll()
   {
     if(tenzies === false)
     {
      setDiceArray((oldDiceArray)=>{

        return(
            oldDiceArray.map((oldDie)=>{
                if(oldDie.isHeld === false)
                {
                  return {
                            value: Math.round((Math.random() * 5) + 1),
                            isHeld:false,
                            id:nanoid()
                          }
                }
                else
                {
                  return oldDie
                }
            })
        )
      })
     }
     else
     {
       setTenzies(false)
       setDiceArray(allNewDice)
     }
 
   }

   function holdDice(id)
   {
      setDiceArray((oldDiceArray)=>{

        return(
             oldDiceArray.map((oldDie)=>{
                if(oldDie.id === id)
                {
                   return {...oldDie,isHeld:!oldDie.isHeld}
                }
                else
                {
                  return oldDie
                }
             })
        )

      })
   }


  return(
     <main>
      <section className='content'>
        {tenzies && <Confetti/>}
        <div className='heading'>
          <h2>Tenzies</h2>
          <p>Roll untill all dice are the same. Click each die to freez it at it's current state</p>
        </div>
        <div className="container">
            {diceElements}
        </div>
        <div className="btn-container">
        <button className="roll" onClick={roll}>{tenzies ? "New game": "Roll"}</button>
        </div>
      </section>
     </main>
   )
}

