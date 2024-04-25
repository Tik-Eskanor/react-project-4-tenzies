import React from "react"

export default function Die(props)
{
    return(
        <div className={props.isHeld ? "die isheld" : "die"} onClick={props.holdDice}>
           <span className="value">{props.value}</span>
        </div>
    )
}