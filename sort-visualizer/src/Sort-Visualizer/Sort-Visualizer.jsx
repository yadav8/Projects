import React from 'react';
//import update from 'immutability-helper';

import './Sort-Visualizer.css';
import ArrayBar from './ArrayBar.jsx';
import {getBubbleSortSequence} from '../Sort-Algorithms/Sort-Algorithms.js';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 10;

// Change this value for the number of bars (value) in the array.
const ARRAY_SIZE = 150;

// Resizes to fit browser window
let arrayContainerWidth = window.innerWidth - 100;

// Resizes ArrayBars to ArrayContainer
let arrayBarWidth = ((window.innerWidth - 100) / (ARRAY_SIZE)) - 2;

// Change this for Array min value
const ARRAY_MIN = 1;

// Change this for Array max value
const ARRAY_MAX = 700;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'pink'; //,'turquoise','red','green'

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';


export default class SortVisualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		  array: [], // array element: [value, color]
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
		const color = PRIMARY_COLOR;
		const width = arrayContainerWidth;

		for (let i = 0; i < ARRAY_SIZE; i++) {
			array.push([randomIntFromInterval(ARRAY_MIN, ARRAY_MAX),color]);
		}		
		this.setState({array, width});
	}

	updateDimensions() {
		arrayContainerWidth = window.innerWidth - 100;
		arrayBarWidth = ((window.innerWidth - 100) / (ARRAY_SIZE)) - 4;
		this.setState({width: arrayContainerWidth});
	}


	// Function call when Bubble Sort button is pressed
	bubbleSortButtonPressed() {
		// Extract the actual array value from our 'array' to send to BubbleSort
		let value_array = this.state.array.map(arraybar => arraybar[0]);
		const sequence = getBubbleSortSequence(value_array);
		this.executeSequence(sequence);
		
	}

	// Executes compare/swap sequence generated from Sorting
	// Comment this function
	// Need to remove the 'compare' color in next frame after compare
	// Need to add a 'in position' color when a bar reaches designated position
	executeSequence(sequence) {
		let array_copy = [...this.state.array];
		for (let i = 0; i < sequence.length; i++) {
			let frame = sequence[i];
			let sequence_function = frame[0];
			let array_i = frame[1];
			let array_j = frame[2];
			if (sequence_function === "compare") {
							
				setTimeout(() => {			
					array_copy[array_i][1] = SECONDARY_COLOR;
					array_copy[array_j][1] = SECONDARY_COLOR;
					this.setState(state => ({array: array_copy}));
				}, i * ANIMATION_SPEED_MS);
			}
			else if (sequence_function === "swap") {
				setTimeout(() => {
					let temp = array_copy[array_i][0];				
					array_copy[array_i][0] = array_copy[array_j][0];
					array_copy[array_j][0] = temp;
					this.setState(state => ({array: array_copy}));
				}, i * ANIMATION_SPEED_MS); 
			}
		}
	}

	render() {
		const array = this.state.array;
		const width = this.state.width;

	    return (
	    	// NEED TO FIX THE ARRAY.MAP TO ACTUALLY PASS COLOR TO THE ARRAYBARS.
	    	<div className = "ArrayContainer" style={{width: width,}}>
		    	{array.map((value, idx) => (
					<ArrayBar
						value={value[0]}
						idx={idx}
						color={value[1]}
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


// function highlightArrayBarIndices(state, props, i, j) {
// 	return (
// 		array: 
// 	);
// }

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);