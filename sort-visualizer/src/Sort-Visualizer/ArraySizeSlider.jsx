import React from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import {DEFAULT_ARRAY_SIZE} from './ArrayContainer.jsx';

const MIN_ARRAY_SIZE = 2;
const MAX_ARRAY_SIZE = 300;

export class ArraySizeSlider extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
			arraySize: DEFAULT_ARRAY_SIZE
		}
	}

	handleOnChange(value) {
		if(value === this.state.arraySize) {return;}
		this.setState({arraySize: value});
		this.props.sendArraySize(this.state.arraySize);
	}

	render() {
		const {arraySize} = this.state;
		const labels = {
			[MIN_ARRAY_SIZE]: [MIN_ARRAY_SIZE],
			[MAX_ARRAY_SIZE]: [MAX_ARRAY_SIZE]
		}

		return (
			<div className = 'array-size-slider'
				 style = {{
				 	width: `200px`,
				 }}
			>
				<Slider
					value = {arraySize}
					min = {MIN_ARRAY_SIZE}
					max = {MAX_ARRAY_SIZE}
					labels = {labels}
					onChange = {(value) => this.handleOnChange(value)}
				/>
			</div>
		)
	}
	 
}