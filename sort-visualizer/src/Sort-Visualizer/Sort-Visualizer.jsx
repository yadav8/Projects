import React from 'react';
//import ReactDOM from 'react-dom'

import './Sort-Visualizer.css';
import {bubbleSort} from '../Sort-Algorithms/Sort-Algorithms.js';

// Change this value for the speed of the animations.
//const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const ARRAY_SIZE = 100;

// Formula to keep all bars on one line. Improve this later
const ARRAY_BAR_WIDTH = (1100) / ARRAY_SIZE

//Change this for Array min value
const ARRAY_MIN = 1

//Change this for Array max value
const ARRAY_MAX = 700

// This is the main color of the array bars.
const PRIMARY_COLOR = 'pink';

// This is the color of array bars that are being compared throughout the animations.
//const SECONDARY_COLOR = 'red';


export default class SortVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }


  	//New array for every reload
	componentDidMount() {
		this.resetArray();
	}


	//Generates new array
	resetArray() {
		const array = [];
		for (let i = 0; i < ARRAY_SIZE; i++) {
			array.push(randomIntFromInterval(ARRAY_MIN, ARRAY_MAX));
		}

		this.setState({array});
	}

	//Function call when Bubble Sort button is pressed
	bubbleSortButtonPressed() {
		const sortedArray = bubbleSort(this.state.array);
		this.setState({sortedArray});
	}

	render() {
		const {array} = this.state;
		//let newArray = bubbleSort(array);
		let newArray = array;

	    return (
	    	<div className = "ArrayContainer">
		    	{newArray.map((value, idx) => (
					<ArrayBar value={value} idx={idx}/>
			    ))}
			    <button onClick={() => this.resetArray()}>Generate new array!</button>
			    <button onClick={() => this.bubbleSortButtonPressed()}>Bubble Sort</button>
		    </div>
	    );
	}
}

//This component stores the visual representation of each element in the ArrayContainer
//Automatically updates with ArrayContainer
class ArrayBar extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			value: this.props.value,
			idx: this.props.idx,
		};
		
	}

	/*
	Discontinued future support

	UNSAFE_componentWillReceiveProps(props) {
		this.setState({value: this.props.value});
	}
	*/

	//ArrayBars always change state syncronously with props changes from ArrayContainer
	static getDerivedStateFromProps(props, state) {

		state = {
					value: props.value,
					idx: props.idx,
				};

		return state;
	}

	render() {
		const {value, idx} = this.state;
		return (
			<div
				className = "ArrayBar"
				key = {this.idx}
				style = {{
					backgroundColor: PRIMARY_COLOR,
					width: ARRAY_BAR_WIDTH,
		        	height: `${value}px`,

				}}>
			</div>

		);
	}
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}