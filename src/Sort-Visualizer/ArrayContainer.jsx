import React from 'react';
//import update from 'immutability-helper';

import './Sort-Visualizer.css';
import ArrayBar from './ArrayBar.jsx';
import getBubbleSortSequence from '../Sort-Algorithms/BubbleSort.js';
import getMergeSortSequence from '../Sort-Algorithms/MergeSort.js';
import getQuickSortSequence from '../Sort-Algorithms/QuickSort.js';



// Array min and max possible values
export const DEFAULT_ARRAY_MIN_VALUE = 1;
export const DEFAULT_ARRAY_MAX_VALUE = 20;

//Arraycontainer needs to have a height which is 90% of window height
//Need to linear interpolate array bar heights as a function of arraycontainer height and arraybar value
//so it scales with moving window size.
//Same with height and width of toolbar and all components


// Array bar color constants:
const DEFAULT_COLOR = 'pink';			// Used by all sort functions
const COMPARISON_COLOR = 'turquoise';	// Used by all sort functions
const SWAP_COLOR = 'blueviolet';		// Used by BubbleSort, QuickSort
const PIVOT_COLOR = 'firebrick';		// Used by QuickSort
const FINAL_COLOR = 'yellowgreen';		// Used by all sort functions


export default class ArrayContainer extends React.Component {
	constructor(props) {
		super(props);

		this.arraySize = this.props.settings.array_size;	// Array size variable - changes with props
		this.animation_speed_ms = this.props.settings.animation_speed;	// Animation speed variable - changes with props	

		this.state = {
		  array: [],	// Array of JSON objects  
		  disableButtons: false
		};
	}

  	// New array for every reload
	componentDidMount() {
		this.generateArray();
	}


	componentDidUpdate() {
		if (this.props.settings.array_size !== this.arraySize) {
			this.arraySize = this.props.settings.array_size;
			this.generateArray();
		}

		this.animation_speed_ms = this.props.settings.animation_speed;

		if (this.props.generateArrayPressed) {
			this.count = this.count+1;
			console.log(this.count);
			this.generateArray();
		}	
	}


	// Generates new array
	generateArray() {
		const array = [];
		const width = this.arrayContainerWidth;
		for (let i = 0; i < this.arraySize; i++) {
			array.push(this.createArrayElement(i));
		}		
		this.setState({array, width});
	}

	// Resets color and final/pivot bool values of array
	resetArray() {
		let array_copy = [...this.state.array];
		for (let i = 0; i < array_copy.length; i++) {
			array_copy[i].color = DEFAULT_COLOR;
			array_copy[i].pivot = false;
			array_copy[i].final = false;
		}

		this.setState({array: array_copy});
	}

	// Creates element 'i' of this.state.array as a JSON object
	createArrayElement(i) {
		return {"id"   : i,
		  		"value": randomIntFromInterval(DEFAULT_ARRAY_MIN_VALUE, DEFAULT_ARRAY_MAX_VALUE),
		  		"color": DEFAULT_COLOR,
		  		"pivot": false,
		  		"final": false};
	}


	// Extracts the actual array value from this.state.array to send to Sorting Algorithms
	getValueArray() {
		return this.state.array.map(arrayElement => arrayElement.value);
	}


	render() {
		const array = this.state.array;
		const width = this.props.width;
		const height = this.props.height;
		const leftOffset = this.props.left;
		const arrayBarHeightScale = height / 711;
		const arrayBarWidth = (width / this.arraySize) - .5;

		console.log(height);

	    return (
	    	<div className = "ArrayContainer" style={{left: leftOffset, width: width, height: height,}}>
		    	{array.map((arrayElement) => (
					<ArrayBar
						key = {arrayElement.id}
						id = {arrayElement.id}
						value = {arrayElement.value}
						color = {arrayElement.color}
						width = {arrayBarWidth}
						scale = {arrayBarHeightScale}
					/>
			    ))}
			    <br/>
			    <div style = {this.state.disableButtons ? {pointerEvents: "none", opacity: "0.5",}:{}}>
				    <button onClick={() => this.generateArray()}>Generate new array!</button>
				    <button onClick={() => this.bubbleSortButtonPressed()}>Bubble Sort</button>
				    <button onClick={() => this.mergeSortButtonPressed()}>Merge Sort</button>
				    <button onClick={() => this.quickSortButtonPressed()}>Quick Sort</button>
				</div>
		    </div>
	    );
	}

	// Function call when Bubble Sort button is pressed
	bubbleSortButtonPressed() {
		this.resetArray();
		const sequence = getBubbleSortSequence(this.getValueArray());
		this.executeSequence(sequence);
		
	}

	// Function call when Merge Sort button is pressed
	mergeSortButtonPressed() {
		this.resetArray();
		const sequence = getMergeSortSequence(this.getValueArray());
		this.executeSequence(sequence);
		
	}

	// Function call when Quick Sort button is pressed
	// Need to get Pivot color and Final color working
	quickSortButtonPressed() {
		this.resetArray();
		const sequence = getQuickSortSequence(this.getValueArray());
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
		
		// Disable the toolbar for the duration of the sort, then re-enable
		this.props.disableToolbar(true);
		this.setState({disableButtons: true});
		setTimeout(() => 
			{
				this.props.disableToolbar(false);
				this.setState({disableButtons: false});
			}, sequence.length * this.animation_speed_ms);

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
				// }, i * this.animation_speed_ms);
				// setTimeout(() => {
				// 	this.setState(sequenceCompare2(array_copy, array_i, array_j, i, revertToDefault));
				// }, (i+1) * this.animation_speed_ms);
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
			if (!array[i].pivot) {array[i].color = COMPARISON_COLOR;}
			if (!array[j].pivot) {array[j].color = COMPARISON_COLOR;}
			this.setState(state => ({array: array}));
		}, frameNumber * this.animation_speed_ms);

		// Optimizes animation by not reverting to DEFAULT color if the same index is about 
		// to get some other color state in the very next frame. Otherwise, we revert to default
		// in next frame
		setTimeout(() => {	
			// Only change color to COMPARE if Array element is not already in FINAL color state
			// Array element's [2] denotes FINAL state. Only change color if FINAL state is false
			if (array[i].final === true) {array[i].color = FINAL_COLOR;}
			else if (array[i].pivot === true) {array[i].color = PIVOT_COLOR;}		
			else if (revertToDefault[0]) {array[i].color = DEFAULT_COLOR;}

			if (array[j].final === true) {array[j].color = FINAL_COLOR;}
			else if (array[j].pivot === true) {array[j].color = PIVOT_COLOR;}
			else if (revertToDefault[1]) {array[j].color = DEFAULT_COLOR;}
			this.setState(state => ({array: array}));
		}, (frameNumber+1) * this.animation_speed_ms);
	}


	sequenceSwap(array, i, j, frameNumber, revertToDefault) {
		// Change the color property to SWAP for the two array indices being swapped
		// Swap values of the two array indices being swapped	
		setTimeout(() => {
			let swapper = array[i].value;				
			array[i].value = array[j].value;
			array[i].color = SWAP_COLOR;
			array[j].value = swapper;
			array[j].color = SWAP_COLOR;					
			this.setState(state => ({array: array}));
		}, frameNumber * this.animation_speed_ms); 

		// Optimizes animation by not reverting to DEFAULT color if the same index is about 
		// to get some other color state in the very next frame. Otherwise, we revert to default
		// in next frame
		setTimeout(() => {
			if (array[i].final === true) {array[i].color = FINAL_COLOR;}
			else if (array[i].pivot === true) {array[i].color = PIVOT_COLOR;}
			else if (revertToDefault[0]) {array[i].color = DEFAULT_COLOR;}
			
			if (array[j].final === true) {array[j].color = FINAL_COLOR;}
			else if (array[j].pivot === true) {array[j].color = PIVOT_COLOR;}
			else if (revertToDefault[1]) {array[j].color = DEFAULT_COLOR;}					
			this.setState(state => ({array: array}));
		}, (frameNumber+1) * this.animation_speed_ms);	
	}


	sequenceOverwrite(array, i, newValue, frameNumber, revertToDefault) {
		// Change the color property to SWAP for the Array index whose value is changing
		// Only change color if newValue is not the same as current value.	
		setTimeout(() => {
			if (array[i].value !== newValue) {		
				array[i].value = newValue;
				array[i].color = SWAP_COLOR;
			}	
			this.setState(state => ({array: array}));
		}, frameNumber * this.animation_speed_ms);

		// Optimizes animation by not reverting to DEFAULT color if the same index is about 
		// to get some other color state in the very next frame. Otherwise, we revert to default
		// in next frame
		setTimeout(() => {			
			if (revertToDefault[0]) {array[i].color = DEFAULT_COLOR;}
			this.setState(state => ({array: array}));
		}, (frameNumber+1) * this.animation_speed_ms);
	}


	//TODO: Better comments
	sequencePivot(array, i, pivot, frameNumber, revertToDefault) {
		// If already in FINAL state, don't bother
		if (array[i].final && pivot < 0) {return;}

		// Just adding new pivot
		if (pivot === -1) {
			setTimeout(() => {
				array[i].color = PIVOT_COLOR;
				array[i].pivot = true;	// Set PIVOT color state for array index
				this.setState(state => ({array: array}));
			}, frameNumber * this.animation_speed_ms);

		}

		// Just removing current pivots
		else if (pivot === -2) {
			setTimeout(() => {			
				array[i].color = DEFAULT_COLOR;
				array[i].pivot = false;	// Reset PIVOT color state for array index
				this.setState(state => ({array: array}));
			}, frameNumber * this.animation_speed_ms);
		}

		// Moving pivots
		else {
			setTimeout(() => {			
				array[i].color = DEFAULT_COLOR;
				array[i].pivot = false;	// Reset PIVOT color state for array index

				// If already in FINAL state, don't bother
				if (array[pivot].final === true) {return;}
				array[pivot].color = PIVOT_COLOR;
				array[pivot].pivot = true;
				this.setState(state => ({array: array}));
			}, frameNumber * this.animation_speed_ms);
		}
	}


	sequenceFinal(array, i, frameNumber) {
		// Change the color property to FINAL when ArrayBar has reached its final position			
		setTimeout(() => {			
			array[i].color = FINAL_COLOR;
			array[i].final = true;	// Set FINAL color state for array index
			this.setState(state => ({array: array}));
		}, frameNumber * this.animation_speed_ms);
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
// 	//}, frameNumber * this.animation_speed_ms);
// }

// 	// Optimizes animation by not reverting to DEFAULT color if the same index is about 
// 	// to get some other color state in the very next frame. Otherwise, we revert to default
// 	// in next frame
// function sequenceCompare2(array, i, j, frameNumber, revertToDefault) {
// 	//setTimeout(() => {	
// 		// Only change color to COMPARE if Array element is not already in FINAL color state
// 		// Array element's [2] denotes FINAL state. Only change color if FINAL state is false		
// 		if (array.pivot) {array[i][1] = FINAL_COLOR;}
// 		else if (revertToDefault[0]) {array[i][1] = DEFAULT_COLOR;}
// 		if (array[j][2]) {array[j][1] = FINAL_COLOR;}
// 		else if (revertToDefault[1]) {array[j][1] = DEFAULT_COLOR;}
// 		return({array: array});
// 	//}, (frameNumber+1) * this.animation_speed_ms);
// }
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

