import React from "react"

const FruitList = props => (
    <ul>
      {props.fruits.map(fruit => <li>{fruit}</li>)}
    </ul>
)

export default FruitList