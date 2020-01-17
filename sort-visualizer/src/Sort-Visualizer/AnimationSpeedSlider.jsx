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
		const {animation_speed} = this.state;
		const labels = {
			[MIN_ANIMATION_SPEED]: [MIN_ANIMATION_SPEED],
			[MAX_ANIMATION_SPEED]: [MAX_ANIMATION_SPEED]
		}
		//0 - 180, 1-1000
		const textLoc = ((animation_speed * 165)+5000) / 1000;
		const text = (this.state.moving ? '' : this.props.animation_speed);

		return (
				<div className = 'AnimationSpeedSlider'
					 style = {{
					 	width: `200px`,
					 }}
				>
					<span style={{
						color: 'red',
						position: 'absolute',
						left: `${textLoc}px`,
						bottom: `45px`,
					}}>{text}</span>
					<Slider
						value = {animation_speed}
						min = {MIN_ANIMATION_SPEED}
						max = {MAX_ANIMATION_SPEED}
						labels = {labels}
						onChange = {(value) => this.handleOnChange(value)}
						onChangeStart = {() => this.handleDrag()}
						onChangeComplete = {() => this.handleDrag()}
					/>
				</div>
			) 
	}
	 
}

// Conditional Rendering
// function WhileStationary(props) {

// 	return (
// 		<div className = 'AnimationSpeedSlider'
// 			 style = {{
// 			 	width: `200px`,
// 			 }}
// 		>
// 			<span style={{
// 				color: 'red',
// 				position: 'absolute',
// 				left: `${props.textLoc}px`,
// 				bottom: `45px`,
// 			}}>{props.text}</span>
// 			<Slider
// 				value = {props.animation_speed}
// 				min = {MIN_ANIMATION_SPEED}
// 				max = {MAX_ANIMATION_SPEED}
// 				labels = {props.labels}
// 				onChange = {props.onChange}
// 				onChangeStart = {props.onChangeStart}
// 				onChangeComplete = {props.onChangeComplete}
// 			/>
// 		</div>
// 	)

// }

// function WhileMoving(props) {

// 	return (
// 		<div className = 'AnimationSpeedSlider'
// 			 style = {{
// 			 	width: `200px`,
// 			 }}
// 		>
// 			<Slider
// 				value = {props.animation_speed}
// 				min = {MIN_ANIMATION_SPEED}
// 				max = {MAX_ANIMATION_SPEED}
// 				labels = {props.labels}
// 				onChange = {props.onChange}
// 				onChangeStart = {props.onChangeStart}
// 				onChangeComplete = {props.onChangeComplete}
// 			/>
// 		</div>
// 	)

// }