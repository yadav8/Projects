import React from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import './Sort-Visualizer.css';

const MIN_ARRAY_SIZE = 5;
const MAX_ARRAY_SIZE = 500;

export default class ArraySizeSlider extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
			array_size: this.props.array_size,
			moving: false
		}
	}

	// Overwrite functionality incase I want sync-ed sliders with automatic movements
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

	handleDrag() {
		let moving_new = this.state.moving ^ true;
		this.setState({moving: moving_new});
	}

	render() {
		const array_size = this.state.array_size;

		// Formula to keep a slider value text above the slider position
		const textLoc = 0.5 + (array_size / (MAX_ARRAY_SIZE - MIN_ARRAY_SIZE))*this.props.width*0.85;
		const text = (this.state.moving ? '' : array_size);

		const fontSize_Label = 14 * this.props.width / 21.6;
		const fontSize_Name = 16 * this.props.width / 21.6;
		const fontSize_Value = 14 * this.props.width / 21.6;

		return (
			<div style = {{
				 	position: 'absolute',
				 	left: `${this.props.left}rem`,
				 	top: `${this.props.top}rem`,
				 	width: `${this.props.width}rem`,
				}}>
				<span className = "SliderName" style={{fontSize: fontSize_Name,}}>Array Size</span>
				<span className = "SliderValueLabel" style={{left: `${textLoc}rem`, fontSize: fontSize_Value,}}>{text}</span>
				<Slider
					value = {array_size}
					min = {MIN_ARRAY_SIZE}
					max = {MAX_ARRAY_SIZE}
					step = {5}
					onChange = {(value) => this.handleOnChange(value)}
					onChangeStart = {() => this.handleDrag()}
					onChangeComplete = {() => this.handleDrag()}
				/>
				<span className = "SliderLeftLabel"
					style = {{fontSize: fontSize_Label,}}>
					{MIN_ARRAY_SIZE}</span>
				<span className = "SliderRightLabel"
					style = {{fontSize: fontSize_Label, left: `${this.props.width - fontSize_Label * 0.15}rem`,}}>
					{MAX_ARRAY_SIZE}</span>				
			</div>
		)
	}
	 
}