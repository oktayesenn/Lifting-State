import React from "react"

const FruitList = props => {

  const fruits = props.fruits.map(fruit => {
    return <li>{fruit}</li>
  })

  return (
    <div>
     {fruits}
    </div>
  )
}

export default FruitList