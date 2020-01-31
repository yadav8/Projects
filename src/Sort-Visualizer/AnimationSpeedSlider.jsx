import React from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import './Sort-Visualizer.css';

const MIN_ANIMATION_SPEED = 1;
const MAX_ANIMATION_SPEED = 1000;

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
		
		const textLoc = ((animation_speed * 165)+3000) / 1000;
		const text = (this.state.moving ? '' : animation_speed+"ms");

		return (
				<div style = {{
					 	position: 'absolute',
					 	left: `${this.props.left}px`,
					 	top: `${this.props.top}px`,
					 	width: `200px`,
					 }}>
					 <span className = "SliderName">Animation Speed (ms)</span>
					<span className = "SliderValueLabel" style={{left: `${textLoc}px`,}}>{text}</span>
					<Slider
						value = {animation_speed}
						min = {MIN_ANIMATION_SPEED}
						max = {MAX_ANIMATION_SPEED}
						step = {10}
						onChange = {(value) => this.handleOnChange(value)}
						onChangeStart = {() => this.handleDrag()}
						onChangeComplete = {() => this.handleDrag()}
					/>
					<span className = "SliderLeftLabel">{MIN_ANIMATION_SPEED}</span>
					<span className = "SliderRightLabel">{MAX_ANIMATION_SPEED}</span>
				</div>
			) 
	}
	 
}
