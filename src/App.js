import React from 'react';
import './App.css';
import FruitContainer from "./components/FruitContainer"
import fruitList from "./components/Data"

function App() {
  return (
    <div className="App">
      <FruitContainer fruits={fruitList}/>
    </div>
  );
}

export default App;
