import React,{ useState } from "react"
import FruitList from "./FruitList"
import FruitFilter from "./FruitFilter"

function FruitContainer(props) {

  const [fruitsToDisplay, setFruitsToDisplay] = useState(props.fruits)

  const handleFilterChange = (event) => {
    event.preventDefault()
    const filterValue = event.target.value
    
    const filteredFruitList = props.fruits.filter(fruit => {
        return fruit.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
    })

    setFruitsToDisplay(filteredFruitList)
  }

    return(
      <div>
        <FruitFilter handleFilterChange={handleFilterChange}/>
        <FruitList fruits={fruitsToDisplay}/>
      </div>
    )
  }

export default FruitContainer