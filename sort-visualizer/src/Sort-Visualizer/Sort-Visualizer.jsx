import React from 'react';
import ReactDOM from 'react-dom'
//import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './Sort-Visualizer.css';
import './../Sort-Algorithms/Sort-Algorithms.js';
//import Math;

// Change this value for the speed of the animations.
//const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const ARRAY_SIZE = 100;

// Formula to keep all bars on one line. Improve this laater
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


	componentDidMount() {
		this.resetArray();
	}


	resetArray() {
		const array = [];
		for (let i = 0; i < ARRAY_SIZE; i++) {
			array.push(randomIntFromInterval(ARRAY_MIN, ARRAY_MAX));
		}

		this.setState({array});
	}


	render() {
		const {array} = this.state;

	    return (
	    	<div className = "ArrayContainer">
	    	{array.map((value, idx) => (
				<ArrayBar value = {value} idx = {idx}/>
		    ))}
		    </div>
	    );
	}
}


class ArrayBar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const value = this.props.value;
		return (
			<div
				className = "ArrayBar"
				key = {this.props.idx}
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