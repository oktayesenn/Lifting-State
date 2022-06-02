import React from "react";

const FruitFilter = (props) => {
  return (
    <div>
      <label>Filter these fruits:</label>
        <input type="text" onChange={props.handleFilterChange} name="fruit-filter" />
    </div>
  );
};

export default FruitFilter;