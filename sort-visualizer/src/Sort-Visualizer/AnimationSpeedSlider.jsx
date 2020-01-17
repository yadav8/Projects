import React from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import './Sort-Visualizer.css';

const MIN_ANIMATION_SPEED = 1;
const MAX_ANIMATION_SPEED = 1000;

export default class AnimationSpeedSlider extends React.Component {
	constructor(props) {
		super(props);

		this.moving = false;
	
		this.state = {
			animation_speed: this.props.animation_speed
		}
	}

	handleOnChange(value) {
		if(value === this.state.animation_speed) {return;}
		this.setState({animation_speed: value});
		this.props.sendAnimationSpeed(this.state.animation_speed);
	}

	handleDrag() {
		//this.moving = this.moving ^ true;
		this.moving = false;
	}

	render() {
		const {animation_speed} = this.state;
		const labels = {
			[MIN_ANIMATION_SPEED]: [MIN_ANIMATION_SPEED],
			[MAX_ANIMATION_SPEED]: [MAX_ANIMATION_SPEED]
		}
		//0 - 180, 1-1000
		const textLoc = ((animation_speed * 165)+5000) / 1000;

		if(!this.moving) {
			return <WhileStationary
						textLoc={textLoc}
						animation_speed={animation_speed}
						labels={labels}
						onChange={(value) => this.handleOnChange(value)}
						onChangeStart={() => this.handleDrag()}
						onChangeComplete={() => this.handleDrag()}
					/> 
		} else {
			return <WhileMoving
						animation_speed={animation_speed}
						labels={labels}
						onChange={(value) => this.handleOnChange(value)}
						onChangeStart={() => this.handleDrag()}
						onChangeComplete={() => this.handleDrag()}
					/>	
		}
	}
	 
}

// Conditional Rendering
function WhileStationary(props) {

	return (
		<div className = 'AnimationSpeedSlider'
			 style = {{
			 	width: `200px`,
			 }}
		>
			<span style={{
				color: 'red',
				position: 'absolute',
				left: `${props.textLoc}px`,
				bottom: `45px`,
			}}>{props.animation_speed}</span>
			<Slider
				value = {props.animation_speed}
				min = {MIN_ANIMATION_SPEED}
				max = {MAX_ANIMATION_SPEED}
				labels = {props.labels}
				onChange = {props.onChange}
				onChangeStart = {props.onChangeStart}
				onChangeComplete = {props.onChangeComplete}
			/>
		</div>
	)

}

function WhileMoving(props) {

	return (
		<div className = 'AnimationSpeedSlider'
			 style = {{
			 	width: `200px`,
			 }}
		>
			<Slider
				value = {props.animation_speed}
				min = {MIN_ANIMATION_SPEED}
				max = {MAX_ANIMATION_SPEED}
				labels = {props.labels}
				onChange = {props.onChange}
				onChangeStart = {props.onChangeStart}
				onChangeComplete = {props.onChangeComplete}
			/>
		</div>
	)

}