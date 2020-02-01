import React from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import './Sort-Visualizer.css';

const MIN_ANIMATION_SPEED = 1;
const MAX_ANIMATION_SPEED = 500;

export default class AnimationSpeedSlider extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
			animation_speed: this.props.animation_speed,
			moving: false
		}
	}

	componentDidUpdate() {
		if (this.props.overwrite && this.props.overwrite_val!==this.state.animation_speed) {
			this.setState({animation_speed: this.props.overwrite_val});
		}
	}

	handleOnChange(value) {
		if(value === this.state.animation_speed) {return;}
		this.setState({animation_speed: value});
		this.props.sendAnimationSpeed(this.state.animation_speed);
	}

	handleDrag() {
		let moving_new = this.state.moving ^ true;
		this.setState({moving: moving_new});
	}


	render() {
		const animation_speed = this.state.animation_speed;
		
		const textLoc = 0.5 + (animation_speed / (MAX_ANIMATION_SPEED - MIN_ANIMATION_SPEED))*this.props.width*0.85;
		const text = (this.state.moving ? '' : animation_speed+"ms");

		const fontSize = 1.4;

		return (
				<div style = {{
					 	position: 'absolute',
					 	left: `${this.props.left}rem`,
					 	top: `${this.props.top}rem`,
					 	width: `${this.props.width}rem`,
					 }}>
					 <span className = "SliderName">Animation Speed (ms)</span>
					<span className = "SliderValueLabel" style={{left: `${textLoc}rem`,}}>{text}</span>
					<Slider
						value = {animation_speed}
						min = {MIN_ANIMATION_SPEED}
						max = {MAX_ANIMATION_SPEED}
						step = {10}
						onChange = {(value) => this.handleOnChange(value)}
						onChangeStart = {() => this.handleDrag()}
						onChangeComplete = {() => this.handleDrag()}
					/>
					<span className = "SliderLeftLabel"
						style = {{fontSize: `${fontSize}rem`,}}>
						{MIN_ANIMATION_SPEED}</span>
					<span className = "SliderRightLabel"
						style = {{fontSize: `${fontSize}rem`, left: `${this.props.width - fontSize * 1.5}rem`,}}>
						{MAX_ANIMATION_SPEED}</span>
				</div>
			) 
	}
	 
}
