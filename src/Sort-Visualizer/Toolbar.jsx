import React from 'react';
//import update from 'immutability-helper';
import ArraySizeSlider from './ArraySizeSlider.jsx';
import AnimationSpeedSlider from './AnimationSpeedSlider.jsx';
import {DEFAULT_ARRAY_SIZE, DEFAULT_ANIMATION_SPEED_MS} from './Sort-Visualizer.jsx';

import './Sort-Visualizer.css';

export default class Toolbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			settings: {
				"array_size": DEFAULT_ARRAY_SIZE,
				"animation_speed": DEFAULT_ANIMATION_SPEED_MS
			},
			disabled: false
		};
	}


	// Disable toolbar when a sort is running
	componentDidUpdate() {
		if (this.props.disabled !== this.state.disabled) {
			this.setState({disabled: this.props.disabled});
		}
	}

	// Gets array_size from slider and calls handleOnChange
	getArraySize(arraySizeFromSlider) {
		// update immutability
		let settings_copy = this.state.settings;
		settings_copy["array_size"] = arraySizeFromSlider;
		this.setState({settings: settings_copy});
		this.handleOnChange();
	}

	// Gets animation_speed from slider and calls handleOnChange
	getAnimationSpeed(speedFromSlider) {
		// update immutability
		let settings_copy = this.state.settings;
		settings_copy["animation_speed"] = speedFromSlider;
		this.setState({settings: settings_copy});
		this.handleOnChange();
	}

	// Whenever a change happens in the toolbar sliders, this function sends it to Parent component
	handleOnChange() {
		this.props.sendSettings(this.state.settings);
	}


	render() {
		const array_size = this.state.settings.array_size;
		const animation_speed = this.state.settings.animation_speed;
		const leftOffset = this.props.left;
		const width = this.props.width;
		const height = this.props.height;
		const disabled = this.state.disabled;
		const ow = false;


		return (
				<div className = "Toolbar"
					 style = {disabled ? {left: leftOffset, width: width, height: height, pointerEvents: "none", opacity: "0.5",}
					 			: {left: leftOffset, width: width, height: height,}}>
					<ArraySizeSlider 
						sendArraySize = {(s) => this.getArraySize(s)}
						array_size = {array_size}
						overwrite = {ow}
						overwrite_val = {50}
						left = {1}
						top = {2}
						width = {width * 0.090}>
					</ArraySizeSlider>
					<AnimationSpeedSlider 
						sendAnimationSpeed = {(s) => this.getAnimationSpeed(s)}
						animation_speed = {animation_speed}
						left = {1}
						top = {18}
						width = {width * 0.090}>
					</AnimationSpeedSlider>
				</div>
			)
	}
}