import React from 'react';

import './Sort-Visualizer.css';
import {getBubbleSortSequence} from '../Sort-Algorithms/Sort-Algorithms.js';

// Change this value for the speed of the animations.
//const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const ARRAY_SIZE = 5;

// Resizes to fit browser window
let arrayContainerWidth = window.innerWidth - 100;

// Resizes ArrayBars to ArrayContainer
let arrayBarWidth = ((window.innerWidth - 100) / (ARRAY_SIZE)) - 4;

// Change this for Array min value
const ARRAY_MIN = 1;

// Change this for Array max value
const ARRAY_MAX = 700;

// This is the main color of the array bars.
const PRIMARY_COLOR = ['pink']; //,'turquoise','red','green'];

// This is the color of array bars that are being compared throughout the animations.
//const SECONDARY_COLOR = 'red';


export default class SortVisualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		  array: [],
		  color: null,
		  width: arrayContainerWidth,
		};
	}


  	// New array for every reload
	componentDidMount() {
		this.resetArray();
		window.addEventListener('resize', () => this.updateDimensions());
	}


	componentWillUnmount() {
		window.removeEventListener('resize', () => this.updateDimensions());
	}


	// Generates new array
	resetArray() {
		const array = [];
		for (let i = 0; i < ARRAY_SIZE; i++) {
			array.push(randomIntFromInterval(ARRAY_MIN, ARRAY_MAX));
		}

		// Remove or modify for animations
		const color = PRIMARY_COLOR[randomIntFromInterval(0,PRIMARY_COLOR.length-1)];
		const width = arrayContainerWidth;

		this.setState({array, color, width});
	}

	updateDimensions() {
		arrayContainerWidth = window.innerWidth - 100;
		arrayBarWidth = ((window.innerWidth - 100) / (ARRAY_SIZE)) - 4;
		this.setState({width: arrayContainerWidth});
	}


	// Function call when Bubble Sort button is pressed
	bubbleSortButtonPressed() {
		const sequence = getBubbleSortSequence(this.state.array);
		console.log(sequence);
		const arrayBars = document.getElementsByClassName('ArrayBar');
		for (let i = 0; i < sequence.length; i++) {
			let frame = sequence[i];
			if (frame[0] == "compare") {
				arrayBars[frame[1]].setState({color: 'red'});
			}
		}
		this.setState({array: this.state.array});
	}

	render() {
		const array = this.state.array;
		const color = this.state.color;
		const width = this.state.width;

	    return (
	    	<div className = "ArrayContainer" style={{width: width,}}>
		    	{array.map((value, idx) => (
					<ArrayBar
						value={value}
						idx={idx}
						color={color}
						width={arrayBarWidth}
					/>
			    ))}
			    <br/>
			    <button onClick={() => this.resetArray()}>Generate new array!</button>
			    <button onClick={() => this.bubbleSortButtonPressed()}>Bubble Sort</button>
		    </div>
	    );
	}
}



// This component stores the visual representation of each element in the ArrayContainer
// Automatically updates with ArrayContainer
class ArrayBar extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			value: this.props.value,
			idx: this.props.idx,
			color: this.props.color,
			width: this.props.width,
		};
		
	}

	// ArrayBars always change state syncronously with props changes from ArrayContainer
	static getDerivedStateFromProps(props, state) {
		state = {
					value: props.value,
					idx: props.idx,
					color: props.color,
					width: props.width,
				};

		return state;
	}

	render() {
		const {value, idx, color, width} = this.state;

		return (
			<div
				className = "ArrayBar"
				key = {idx}
				style = {{
					backgroundColor: color,
					width: width,
		        	height: `${value}px`,

				}}>
			</div>
		);
	}
}


// // From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);