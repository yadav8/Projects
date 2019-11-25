import React from 'react';
//import update from 'immutability-helper';

import './Sort-Visualizer.css';
import ArrayBar from './ArrayBar.jsx';
import getBubbleSortSequence from '../Sort-Algorithms/BubbleSort.js';
import getMergeSortSequence from '../Sort-Algorithms/MergeSort.js';

// Change this value for the number of bars (value) in the array.
const ARRAY_SIZE = 50;

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 20; //ARRAY_SIZE/8;

// Resizes to fit browser window
let arrayContainerWidth = window.innerWidth - 200;

// Resizes ArrayBars to ArrayContainer
let arrayBarWidth = ((window.innerWidth - 200) / (ARRAY_SIZE)) - 2.5;

// Change this for Array min value
const ARRAY_MIN = 1;

// Change this for Array max value
const ARRAY_MAX = 700;

// This is the main color of the array bars
const PRIMARY_COLOR = 'pink';

// This is the color of array bars that are being compared throughout the animations
const COMPARISON_COLOR = 'gold';

// This is the color of array bars that are being swapped throughout the animations
const SWAP_COLOR = 'blueviolet';

// This is the final color of the array bars when they won't be compared or swapped again.
const FINAL_COLOR = 'yellowgreen';


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
		window.addEventListener('resize', () => this.handleResize());
	}


	componentWillUnmount() {
		window.removeEventListener('resize', () => this.handleResize());
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

	// Handles updating Component dimensions on window resize
	handleResize() {
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


	// Function call when Merge Sort button is pressed
	mergeSortButtonPressed() {
		// Extract the actual array value from our 'array' to send to BubbleSort
		let value_array = this.state.array.map(arraybar => arraybar[0]);
		const sequence = getMergeSortSequence(value_array);
		console.log(sequence);
		this.executeSequence(sequence);
		
	}

	// Executes compare/swap sequence generated from Sorting
	// Need to add a 'in position' color when a bar reaches designated position
	// RE-FACTOR AND RE-COMMENT THIS
	// POSSIBLY EXTRACT OUTSIDE OF COMPONENT INTO A DIFFERENT FILE USING FUNCTIONAL SETSTATE
	executeSequence(sequence) {
		let array_copy = [...this.state.array];
		for (let i = 0; i < sequence.length; i++) {
			// Our sequence is an array of 'frames', where each frame looks like this:
			// ['sequence_function', index_1, index_2]
			let frame = sequence[i];	
			let sequence_function = frame[0];
			let array_i = frame[1];
			let array_j = frame[2];

			if (sequence_function === "compare") {
				// Change the color property to COMPARISON for the two array indices being compared			
				setTimeout(() => {			
					array_copy[array_i][1] = COMPARISON_COLOR;
					array_copy[array_j][1] = COMPARISON_COLOR;
					this.setState(state => ({array: array_copy}));
				}, i * ANIMATION_SPEED_MS);

				// Change the color back to PRIMARY on the next frame
				let revertColor = true;
				if (i !== sequence.length-1) {
					if (sequence[i+1][0] === "swap") {
						revertColor = false;
					}
				}
				if (revertColor) {
					setTimeout(() => {			
						array_copy[array_i][1] = PRIMARY_COLOR;
						array_copy[array_j][1] = PRIMARY_COLOR;
						this.setState(state => ({array: array_copy}));
					}, (i+1) * ANIMATION_SPEED_MS);
				}
			}
			else if (sequence_function === "swap") {
				// Change the color property to SWAP for the two array indices being swapped
				// Swap values of the two array indices being swapped	
				setTimeout(() => {
					let swapper = array_copy[array_i][0];				
					array_copy[array_i] = [array_copy[array_j][0], SWAP_COLOR];
					array_copy[array_j] = [swapper, SWAP_COLOR];					
					this.setState(state => ({array: array_copy}));
				}, i * ANIMATION_SPEED_MS); 

				// Change the color back to PRIMARY on the next frame
				let revertColor = true;
				if (i !== sequence.length-1) {
					if (sequence[i+1][0] === "final") {
						revertColor = false;
					}
				}
				setTimeout(() => {
					array_copy[array_i][1] = PRIMARY_COLOR;			
					if(revertColor) {array_copy[array_j][1] = PRIMARY_COLOR;}					
					this.setState(state => ({array: array_copy}));
				}, (i+1) * ANIMATION_SPEED_MS);					
			}
			else if (sequence_function === "overwrite") {
				setTimeout(() => {		
					array_copy[array_i] = [array_j, SWAP_COLOR];	
					this.setState(state => ({array: array_copy}));
				}, i * ANIMATION_SPEED_MS);

				let revertColor = true;
				if (i !== sequence.length-1) {
					if (sequence[i+1][1] === array_i) {
						revertColor = false;
					}
				}
				if (revertColor) {
					setTimeout(() => {			
						array_copy[array_i][1] = PRIMARY_COLOR;
						this.setState(state => ({array: array_copy}));
					}, (i+1) * ANIMATION_SPEED_MS);
				}

			}
			else if (sequence_function === "final") {
				// Change the color property to COMPARISON for the two array indices being compared			
				setTimeout(() => {			
					array_copy[array_i][1] = FINAL_COLOR;
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
			    <button onClick={() => this.mergeSortButtonPressed()}>Merge Sort</button>
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