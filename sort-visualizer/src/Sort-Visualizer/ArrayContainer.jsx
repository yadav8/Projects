import React from 'react';
//import update from 'immutability-helper';

import './Sort-Visualizer.css';
import ArrayBar from './ArrayBar.jsx';
import getBubbleSortSequence from '../Sort-Algorithms/BubbleSort.js';
import getMergeSortSequence from '../Sort-Algorithms/MergeSort.js';
import getQuickSortSequence from '../Sort-Algorithms/QuickSort.js';

/* ** GENERAL TODOS **

Change this.state.array to JSON for easier reading
Then use immutability helper to stop copying array and just updating it

1. Heap sort
2. Add a display for color legend when a particular sort button is pressed
3. Disable other buttons when animation is taking place. Make disable look obvious.
4. Add user configuration sliders etc.
5. Prettify all buttons and sliders
6. Edit README.md
*/

// *************************************************** //
// TODO: Make these user-configurable

// Change this value for the number of bars (value) in the array.
const ARRAY_SIZE = 50;

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 3; //ARRAY_SIZE/10;

// Change this for Array min value
const ARRAY_MIN = 1;

// Change this for Array max value
const ARRAY_MAX = 700;
// *************************************************** //

// Resizes to fit browser window
let arrayContainerWidth = window.innerWidth - 200;

// Resizes ArrayBars to ArrayContainer
let arrayBarWidth = ((window.innerWidth - 200) / (ARRAY_SIZE)) - .5;

// This is the main color of the array bars
const DEFAULT_COLOR = 'pink';

// This is the color of array bars that are being compared throughout the animations
const COMPARISON_COLOR = 'gold';

// This is the color of array bars that are being swapped throughout the animations
const SWAP_COLOR = 'blueviolet';

const PIVOT_COLOR = 'firebrick';

// This is the final color of the array bars when they won't be compared or swapped again.
const FINAL_COLOR = 'yellowgreen';


export default class ArrayContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
		  array: [], // array element: [value: int, color: string, pivot: bool, final: bool, id: int]
		  width: arrayContainerWidth,
		};
	}


  	// New array for every reload
	componentDidMount() {
		this.generateArray();
		window.addEventListener('resize', () => this.handleResize());
	}


	componentWillUnmount() {
		window.removeEventListener('resize', () => this.handleResize());
	}


	// Generates new array
	generateArray() {
		const array = [];
		const width = arrayContainerWidth;
		for (let i = 0; i < ARRAY_SIZE; i++) {
			//array.push([randomIntFromInterval(ARRAY_MIN, ARRAY_MAX), color, false, false, i]);
			array.push(this.createArrayElement(i));
			//array.push([testArr[i], color, false, false, i]);
		}		
		this.setState({array, width});
	}

	// Resets color and final/pivot bool values of array
	resetArray() {
		let array_copy = [...this.state.array];
		for (let i = 0; i < array_copy.length; i++) {
			array_copy[i]["color"] = DEFAULT_COLOR;
			array_copy[i]["pivot"] = false;
			array_copy[i]["final"] = false;
		}

		this.setState({array: array_copy});
	}

	// Creates element 'i' of this.state.array as a JSON object
	createArrayElement(i) {
		return {"id": i,
		  		"value": randomIntFromInterval(ARRAY_MIN, ARRAY_MAX),
		  		"color": DEFAULT_COLOR,
		  		"pivot": false,
		  		"final": false};
	}

	// Handles updating Component dimensions on window resize
	handleResize() {
		arrayContainerWidth = window.innerWidth - 200;
		arrayBarWidth = ((window.innerWidth - 200) / (ARRAY_SIZE)) - .5;
		this.setState({width: arrayContainerWidth});
	}


	// Function call when Bubble Sort button is pressed
	bubbleSortButtonPressed() {
		this.resetArray();
		// Extract the actual array value from our 'array' to send to BubbleSort
		let value_array = this.state.array.map(arrayElement => arrayElement["value"]);
		const sequence = getBubbleSortSequence(value_array);
		this.executeSequence(sequence);
		
	}

	// Function call when Merge Sort button is pressed
	mergeSortButtonPressed() {
		this.resetArray();
		// Extract the actual array value from our 'array' to send to MergeSort
		let value_array = this.state.array.map(arrayElement => arrayElement["value"]);
		const sequence = getMergeSortSequence(value_array);
		this.executeSequence(sequence);
		
	}

	// Function call when Quick Sort button is pressed
	// Need to get Pivot color and Final color working
	quickSortButtonPressed() {
		this.resetArray();
		// Extract the actual array value from our 'array' to send to QuickSort
		let value_array = this.state.array.map(arrayElement => arrayElement["value"]);
		const sequence = getQuickSortSequence(value_array);
		this.executeSequence(sequence);		
	}

	// Executes sequence generated from Sorting
	// Possible sequence functions:-
	// Bubble Sort: compare, swap, final
	// Merge Sort: compare, overwrite, final
	// Quick Sort: compare, swap, pivot, final
	// Heap Sort: compare, swap, final (TODO)
	executeSequence(sequence) {
		let array_copy = [...this.state.array];
		for (let i = 0; i < sequence.length; i++) {
			// Our sequence is an array of 'frames', where each frame looks like this:
			// ['sequence_function', index_1, index_2]
			let frame = sequence[i];	
			let sequence_function = frame[0];
			let array_i = frame[1];
			let array_j = frame[2];

			// Checks whether next frame will have array bars returning to DEFAULT color
			let revertToDefault = checkDefaultColorRevert(sequence, i);

			// Calls appropriate sequence function logic for the upcoming frame to be rendered
			if (sequence_function === "compare") {
				this.sequenceCompare(array_copy, array_i, array_j, i, revertToDefault);
				//FOR FUNCTIONAL SETSTATE:
				// setTimeout(() => {
				// 	this.setState(sequenceCompare1(array_copy, array_i, array_j, i, revertToDefault));
				// }, i * ANIMATION_SPEED_MS);
				// setTimeout(() => {
				// 	this.setState(sequenceCompare2(array_copy, array_i, array_j, i, revertToDefault));
				// }, (i+1) * ANIMATION_SPEED_MS);
			}
			else if (sequence_function === "swap") {		
				this.sequenceSwap(array_copy, array_i, array_j, i, revertToDefault);				
			}
			else if (sequence_function === "overwrite") {
				this.sequenceOverwrite(array_copy, array_i, array_j, i, revertToDefault);
			}
			else if (sequence_function === "pivot") {
				this.sequencePivot(array_copy, array_i, array_j, i, revertToDefault);
			}
			else if (sequence_function === "final") {
				this.sequenceFinal(array_copy, array_i, i);
			}
		}
	}

	sequenceCompare(array, i, j, frameNumber, revertToDefault) {
		// Change the color property to COMPARISON for the two array indices being compared			
		setTimeout(() => {		
			// Only change color to COMPARE if Array element is not already in PIVOT color state
			// Array element's [2] denotes PIVOT state. Only change color if PIVOT state is false
			if (!array[i]["pivot"]) {array[i]["color"] = COMPARISON_COLOR;}
			if (!array[j]["pivot"]) {array[j]["color"] = COMPARISON_COLOR;}
			this.setState(state => ({array: array}));
		}, frameNumber * ANIMATION_SPEED_MS);

		// Optimizes animation by not reverting to DEFAULT color if the same index is about 
		// to get some other color state in the very next frame. Otherwise, we revert to default
		// in next frame
		setTimeout(() => {	
			// Only change color to COMPARE if Array element is not already in FINAL color state
			// Array element's [2] denotes FINAL state. Only change color if FINAL state is false
			if (array[i]["final"] === true) {array[i]["color"] = FINAL_COLOR;}
			else if (array[i]["pivot"] === true) {array[i]["color"] = PIVOT_COLOR;}		
			else if (revertToDefault[0]) {array[i]["color"] = DEFAULT_COLOR;}

			if (array[j]["final"] === true) {array[j]["color"] = FINAL_COLOR;}
			else if (array[j]["pivot"] === true) {array[j]["color"] = PIVOT_COLOR;}
			else if (revertToDefault[1]) {array[j]["color"] = DEFAULT_COLOR;}
			this.setState(state => ({array: array}));
		}, (frameNumber+1) * ANIMATION_SPEED_MS);
	}


	sequenceSwap(array, i, j, frameNumber, revertToDefault) {
		// Change the color property to SWAP for the two array indices being swapped
		// Swap values of the two array indices being swapped	
		setTimeout(() => {
			let swapper = array[i]["value"];				
			array[i]["value"] = array[j]["value"];
			array[i]["color"] = SWAP_COLOR;
			array[j]["value"] = swapper;
			array[j]["color"] = SWAP_COLOR;					
			this.setState(state => ({array: array}));
		}, frameNumber * ANIMATION_SPEED_MS); 

		// Optimizes animation by not reverting to DEFAULT color if the same index is about 
		// to get some other color state in the very next frame. Otherwise, we revert to default
		// in next frame
		setTimeout(() => {
			if (array[i]["final"] === true) {array[i]["color"] = FINAL_COLOR;}
			else if (array[i]["pivot"] === true) {array[i]["color"] = PIVOT_COLOR;}
			else if (revertToDefault[0]) {array[i]["color"] = DEFAULT_COLOR;}
			
			if (array[j]["final"] === true) {array[j]["color"] = FINAL_COLOR;}
			else if (array[j]["pivot"] === true) {array[j]["color"] = PIVOT_COLOR;}
			else if (revertToDefault[1]) {array[j]["color"] = DEFAULT_COLOR;}					
			this.setState(state => ({array: array}));
		}, (frameNumber+1) * ANIMATION_SPEED_MS);	
	}


	sequenceOverwrite(array, i, newValue, frameNumber, revertToDefault) {
		// Change the color property to SWAP for the Array index whose value is changing
		// Only change color if newValue is not the same as current value.	
		setTimeout(() => {
			if (array[i]["value"] !== newValue) {		
				array[i]["value"] = newValue;
				array[i]["color"] = SWAP_COLOR;
			}	
			this.setState(state => ({array: array}));
		}, frameNumber * ANIMATION_SPEED_MS);

		// Optimizes animation by not reverting to DEFAULT color if the same index is about 
		// to get some other color state in the very next frame. Otherwise, we revert to default
		// in next frame
		setTimeout(() => {			
			if (revertToDefault[0]) {array[i]["color"] = DEFAULT_COLOR;}
			this.setState(state => ({array: array}));
		}, (frameNumber+1) * ANIMATION_SPEED_MS);
	}


	//TODO: Better comments
	sequencePivot(array, i, pivot, frameNumber, revertToDefault) {
		// If already in FINAL state, don't bother
		if (array[i]["final"] === true && pivot < 0) {return;}

		// Just adding new pivot
		if (pivot === -1) {
			setTimeout(() => {
				array[i]["color"] = PIVOT_COLOR;
				array[i]["pivot"] = true;	// Set PIVOT color state for array index
				this.setState(state => ({array: array}));
			}, frameNumber * ANIMATION_SPEED_MS);

		}

		// Just removing current pivots
		else if (pivot === -2) {
			setTimeout(() => {			
				array[i]["color"] = DEFAULT_COLOR;
				array[i]["pivot"] = false;	// Reset PIVOT color state for array index
				this.setState(state => ({array: array}));
			}, frameNumber * ANIMATION_SPEED_MS);
		}

		// Moving pivots
		else {
			setTimeout(() => {			
				array[i]["color"] = DEFAULT_COLOR;
				array[i]["pivot"] = false;	// Reset PIVOT color state for array index

				// If already in FINAL state, don't bother
				if (array[pivot]["final"] === true) {return;}
				array[pivot]["color"] = PIVOT_COLOR;
				array[pivot]["pivot"] = true;
				this.setState(state => ({array: array}));
			}, frameNumber * ANIMATION_SPEED_MS);
		}
	}


	sequenceFinal(array, i, frameNumber) {
		// Change the color property to FINAL when ArrayBar has reached its final position			
		setTimeout(() => {			
			array[i]["color"] = FINAL_COLOR;
			array[i]["final"] = true;	// Set FINAL color state for array index
			this.setState(state => ({array: array}));
		}, frameNumber * ANIMATION_SPEED_MS);
	}


	render() {
		const array = this.state.array;
		const width = this.state.width;

	    return (
	    	<div className = "ArrayContainer" style={{width: width,}}>
		    	{array.map((arrayElement) => (
					<ArrayBar
						key = {arrayElement["id"]}
						value = {arrayElement["value"]}
						color = {arrayElement["color"]}
						width = {arrayBarWidth}
					/>
			    ))}
			    <br/>
			    <button onClick={() => this.generateArray()}>Generate new array!</button>
			    <button onClick={() => this.bubbleSortButtonPressed()}>Bubble Sort</button>
			    <button onClick={() => this.mergeSortButtonPressed()}>Merge Sort</button>
			    <button onClick={() => this.quickSortButtonPressed()}>Quick Sort</button>
		    </div>
	    );
	}
}

// Optimizes animation by not reverting to DEFAULT color if the same index is about 
// to get some other color state in the very next frame. Otherwise, we revert to default
// in next frame. A little hacky right now.
function checkDefaultColorRevert(sequence, i) {
	// Format: [bool, bool] corresponding to revertToDefault values for ArrayBars 1 & 2
	// being compared or swapped.
	let revertToDefault = [true, true];

	if (i !== sequence.length-1) {
		if (sequence[i][1] === sequence[i+1][1]) {
			revertToDefault[0] = false;
		}
		if (sequence[i][2] === sequence[i+1][2]) {
			revertToDefault[1] = false;
		}
	}

	return revertToDefault;			
}


// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);



/*******************************
TEST CODE BELOW FOR EXPERIMENTAL ALTERNATIVE IMPLEMENTATIONS:
*******************************/

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 1. FUNCTIONAL SETSTATE IMPLEMENTATION:
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// function sequenceCompare1(array, i, j, frameNumber, revertToDefault) {
// 	// Change the color property to COMPARISON for the two array indices being compared			
// 	//setTimeout(() => {		
// 		// Only change color to COMPARE if Array element is not already in FINAL color state
// 		// Array element's [2] denotes FINAL state. Only change color if FINAL state is false
// 		array[i][1] = COMPARISON_COLOR;
// 		array[j][1] = COMPARISON_COLOR;
// 		return({array: array});
// 	//}, frameNumber * ANIMATION_SPEED_MS);
// }

// 	// Optimizes animation by not reverting to DEFAULT color if the same index is about 
// 	// to get some other color state in the very next frame. Otherwise, we revert to default
// 	// in next frame
// function sequenceCompare2(array, i, j, frameNumber, revertToDefault) {
// 	//setTimeout(() => {	
// 		// Only change color to COMPARE if Array element is not already in FINAL color state
// 		// Array element's [2] denotes FINAL state. Only change color if FINAL state is false		
// 		if (array["pivot"]) {array[i][1] = FINAL_COLOR;}
// 		else if (revertToDefault[0]) {array[i][1] = DEFAULT_COLOR;}
// 		if (array[j][2]) {array[j][1] = FINAL_COLOR;}
// 		else if (revertToDefault[1]) {array[j][1] = DEFAULT_COLOR;}
// 		return({array: array});
// 	//}, (frameNumber+1) * ANIMATION_SPEED_MS);
// }
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

