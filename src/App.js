import React, { Component } from 'react';
import './App.css';
import FruitContainer from "./components/FruitContainer"
import fruitList from "./components/Data"

class App extends Component {
  render() {
    return (
      <div className="App">
        <FruitContainer fruits={fruitList}/>
      </div>
    );
  }
}

export default App;
