import React from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import './Sort-Visualizer.css';

const MIN_ARRAY_SIZE = 2;
const MAX_ARRAY_SIZE = 500;

export default class ArraySizeSlider extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
			array_size: this.props.array_size
		}
	}

	componentDidUpdate() {
		if (this.props.overwrite && this.props.overwrite_val!==this.state.array_size) {
			this.setState({array_size: this.props.overwrite_val});
		}
	}

	handleOnChange(value) {
		if(value === this.state.array_size) {return;}
		this.setState({array_size: value});
		this.props.sendArraySize(this.state.array_size);
	}

	render() {
		const {array_size} = this.state;
		const labels = {
			[MIN_ARRAY_SIZE]: [MIN_ARRAY_SIZE],
			[MAX_ARRAY_SIZE]: [MAX_ARRAY_SIZE]
		}

		//console.log(array_size);

		//0 - 180, 2-500
		const textLoc = ((array_size * 165)+2500) / 500;

		return (
			<div className = 'ArraySizeSlider'
				 style = {{
				 	width: `200px`,
				 }}
			>
				<span style={{
					color: 'red',
					position: 'absolute',
					left: `${textLoc}px`,
					bottom: `45px`,
				}}>{array_size}</span>
				<Slider
					value = {array_size}
					min = {MIN_ARRAY_SIZE}
					max = {MAX_ARRAY_SIZE}
					labels = {labels}
					onChange = {(value) => this.handleOnChange(value)}
				/>
			</div>
		)
	}
	 
}