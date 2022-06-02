# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)  SOFTWARE ENGINEERING IMMERSIVE

# Lifting State Practice

In React applications, data flows from the top down. Why do we care? How does this apply?

When several components in a view need to share `state`, you lift, or **hoist**, the `state` up so that it's available to all the components that need it. Define the state in the highest component you can, so that you can pass it to any components which will need it.

Let's look at a search filter as an example. This app will have two basic components - one that displays a list of data, and one that captures user input to filter the data.

## Practice: Build a fruit filter

Our data will be simple - a list of fruits. The app will end up looking something like this:

![Fruit filter app](./public/filter-example.png)

When building a React app, it's important to take time to define the app's structure before you start writing code. I'm going to define the **components** and the **state** I need before I write the code.

### Components

This app needs two components:
  1. A list component to display the list of fruit. This component needs one piece of data: the array of fruits to display.
  2. An input to capture the filter value from the user. This component needs one piece of data: the current value of the filter.

### State

This app needs to keep track of changes in two items:
  1. The filtered list of fruits
  2. The value of the filter

### Component hierarchy

I have two sibling components (components at the same level of the tree/app) that need to be aware of each other's data. Specifically, the list component needs to only show the fruits that match the filter value. So I need to get data from one sibling to another. Something like this:

![basic data flow needed](./public/fruit-filter-data.png)

How to achieve this, though? Using unidrectional data flow, of course! If I create a container component to hold both the filter value and the filtered list, I can hoist the `state` to the container so it's available to all the children. It will then be simple to display the `state` in the child components. The data will flow like this:

![unidirectional approach](./public/fruit-list-unidirectional.png)

### Child components

Now that I know the components I need, the `state` I need, and where everything needs to be, I can start writing some code. First, I'll create the child components.

```javascript
const FruitList = props => (
  <ul>
     {props.fruits.map(fruit => <li>{fruit}</li>)}
  </ul>
)
```

```js
const FruitFilter = props => (
  <div>
    <label>Filter these Fruits: </label>
    <input type="text" onChange={props.handleFilterChange} name="fruit-filter" />
   </div>
)
```

`FruitList` renders an unordered list (`ul`) which contains an array of `li` elements, each with a single `fruit` string. `FruitList` uses [array map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) to convert the array of fruit strings in our data to an array of fruit `li` elements to render. Using `map` to convert data arrays to arrays of UI elements is a common pattern you will use, and see used, in React.

`FruitFilter` renders a single input. Its value and onChange callbacks will both be set by the container component.

### Container component

My container will have a few methods I'll use to initialize and update the state of the two child components.
I'll first initialize the state:

```javascript
// initialize the fruit list to the full list passed in props
const [fruitsToDisplay, setFruitsToDisplay] = useState(props.fruits)
```

I'll need a method to update the `state` when the filter value changes. This method will store the filter `state`, and filter the list of fruits to display. I'll pass this change handler to the filter component to react to user input.

```javascript
const handleFilterChange = (event) => {
    event.preventDefault()
    const filterValue = event.target.value
    
    const filteredFruitList = props.fruits.filter(fruit => {
        return fruit.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
    })

    setFruitsToDisplay(filteredFruitList)
  }
```

Finally, I need to render my child components.

```javascript
return(
      <div>
        <FruitFilter handleFilterChange={handleFilterChange}/>
        <FruitList fruits={fruitsToDisplay}/>
      </div>
    )
```

The full container component looks like this:

```javascript
import React,{ useState } from "react"
import FruitList from "./FruitList"
import FruitFilter from "./FruitFilter"

const FruitContainer = (props) => {

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
```

All of the data is hoisted to the top of the tree in the container, and I pass
it to the child components.

# More Practice: Also display the fruits that do _not_ match the filter

Once you have your data structured well, it's easier to add features to your
applications or make changes to them. Because all of our data lives at the top
of the tree, we can send it where we want.

- Add another child component to the
`FruitContainer` that displays the fruits that do _not_ match the filter value
(this should be all the items that are not in the `fruitsToDisplay` list).

*Hint: Will you need to have a new state?*

## Solution - Unmatching Filter
Solution code: https://codepen.io/SuperTernary/pen/mMWddo

Here's a solution showing the Fruit list with two lists. One list shows fruits
matching the search term, and below that, the second list shows every other fruit left in
the list. The solution reuses the `<FruitList>` component to display a list of fruits,
except it is passed a different list of fruits.

```html
<div>
 <FruitFilter handleFilterChange={handleFilterChange} />
 <p>Matching fruits:</p>
 <FruitList fruits={fruitsToDisplay} />
 <p>Unmatched fruits:</p>
 <FruitList fruits={unmatchedFruits} />
</div>
```

Now the app maintains two lists
of fruits:
- `fruitsToDisplay` shows all fruits that match the search
term.
- `unmatchedFruits` keeps track of which fruits don't match
the current search term.

Notice that in the container the app initializes the value of `unmatchedFruits` to just an empty list. Within `handleFilterChange`, we now need to update that list.

```js
const filteredFruitList = props.fruits.filter(fruit => {
    return fruit.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
})

const unmatchedFruitsList = props.fruits.filter(fruit => {
    return !fruit.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
})

  const [fruitsToDisplay, setFruitsToDisplay] = useState(props.fruits)
  const [unmatchedFruits, setUnmatchedFruits] = useState([])
```

## Final Thoughts

It's important that you think through your applications before you start writing
code. It's often helpful to sketch out your app, and identify:
- the **components**
you will need
- the **states** you will need
- where those states need to live

Use the
unidirectional data flow pattern - hoist your state toward the top of the
component tree so it's available to the children that need it.
