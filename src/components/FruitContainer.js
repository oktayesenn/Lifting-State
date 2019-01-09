import React, {Component} from "react"
import FruitList from "./FruitList"
import FruitFilter from "./FruitFilter"

class FruitContainer extends Component {
    constructor(props) {
      super(props)
      this.state = {
        fruitsToDisplay: props.fruits,
        filterValue: ''
      };
    }
  
    handleFilterChange = (event) => {
      const filterValue = event.target.value
      this.setState((prevState, props) => {
        const filteredFruitList = props.fruits.filter(fruit =>
          fruit.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()))
          return {
            fruitsToDisplay: filteredFruitList,
            filterValue,
          }
      })
    }
    render() {
      return(
        <div>
          <FruitFilter value={this.state.filterValue} onChange={this.handleFilterChange}/>
          <FruitList fruits={this.state.fruitsToDisplay}/>
        </div>
      )
    }
  }

export default FruitContainer