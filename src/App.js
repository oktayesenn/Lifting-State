import React, { Component } from 'react';
import FruitContainer from "./components/FruitContainer"
import fruitList from "./components/Data"

class App extends Component {
  render() {
    return (
      <FruitContainer fruits={fruitList}/>
    );
  }
}

export default App;
