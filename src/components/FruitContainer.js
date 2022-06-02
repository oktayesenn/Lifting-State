import React,{ useState } from "react"
import fruitList from "./Data"
import FruitList from "./FruitList"
import FruitFilter from "./FruitFilter"

const FruitContainer = (props) => {

  const [fruitsToDisplay, setFruitsToDisplay] = useState(fruitList)
  const [matchedFruits, setMatchedFruits] = useState(fruitList)
  const [unmatchedFruits, setUnmatchedFruits] = useState([])

  const handleFilterChange = (event) => {
    let filteredValue = event.target.value
    

    let filteredFruitList = fruitsToDisplay.filter(fruit => {
      return fruit.toLocaleLowerCase().includes(filteredValue.toLocaleLowerCase())
    })
    let unmatchedFruitList = fruitsToDisplay.filter(fruit => {
      return !fruit.toLocaleLowerCase().includes(filteredValue.toLocaleLowerCase())
    })
    setMatchedFruits(filteredFruitList)
    setUnmatchedFruits(unmatchedFruitList)

  }

    return(
      <div>
        <FruitFilter handleFilterChange={handleFilterChange}/>
        

        <p>Filtered Fruits</p>
       <FruitList fruits={matchedFruits} />

       <p>Unmatched Fruits</p>
       <FruitList fruits={unmatchedFruits} />
      </div>
    )
  }

export default FruitContainer