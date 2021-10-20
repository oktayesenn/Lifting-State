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
      event.preventDefault()
      const filterValue = event.target.value
      
      const filteredFruitList = this.props.fruits.filter(fruit => {
          return fruit.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
      })

      this.setState({
          fruitsToDisplay: filteredFruitList
      })
  }

    render() {
      return(
        <div>
          <FruitFilter handleFilterChange={this.handleFilterChange}/>
          <FruitList fruits={this.state.fruitsToDisplay}/>
        </div>
      )
    }
  }

export default FruitContainer