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
			array_size: this.props.array_size,
			moving: false
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

	handleDrag() {
		let moving_new = this.state.moving ^ true;
		this.setState({moving: moving_new});
	}

	render() {
		const array_size = this.state.array_size;

		// Formula to keep a slider value text above the slider position
		const textLoc = ((array_size * 165 )+2500) / 500;
		const text = (this.state.moving ? '' : array_size);

		return (
			<div style = {{
				 	position: 'absolute',
				 	left: `${this.props.left}px`,
				 	top: `${this.props.top}px`,
				 	width: `200px`,
				}}>
				<span className = "SliderName">Array Size</span>
				<span className = "SliderValueLabel" style={{left: `${textLoc}px`,}}>{text}</span>
				<Slider
					value = {array_size}
					min = {MIN_ARRAY_SIZE}
					max = {MAX_ARRAY_SIZE}
					step = {5}
					onChange = {(value) => this.handleOnChange(value)}
					onChangeStart = {() => this.handleDrag()}
					onChangeComplete = {() => this.handleDrag()}
				/>
				<span className = "SliderLeftLabel">{MIN_ARRAY_SIZE}</span>
				<span className = "SliderRightLabel">{MAX_ARRAY_SIZE}</span>				
			</div>
		)
	}
	 
}