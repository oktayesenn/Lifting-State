import React from "react"


const FruitFilter = props => (
    <div>
      <label>Filter these Fruits: </label>
      <input type="text" onChange={props.handleFilterChange} name="fruit-filter" /></div>
)

export default FruitFilter