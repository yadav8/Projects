import React from 'react';
//import update from 'immutability-helper';
import ArraySizeSlider from './ArraySizeSlider.jsx';
import AnimationSpeedSlider from './AnimationSpeedSlider.jsx';
import {DEFAULT_ARRAY_SIZE, DEFAULT_ANIMATION_SPEED_MS} from './Sort-Visualizer.jsx';

import './Sort-Visualizer.css';

// Dimensions of toolbar. Need to resize it on window resize
let ToolbarWidth = 210;
let ToolbarHeight = 600;

export default class Toolbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			width: ToolbarWidth,
			height: ToolbarHeight,
			settings: {
				"array_size": DEFAULT_ARRAY_SIZE,
				"animation_speed": DEFAULT_ANIMATION_SPEED_MS
			},
			disable: false
		};
	}

	//Disable toolbar when a sort is running
	componentDidUpdate() {
		if (this.props.disable !== this.state.disable) {
			this.setState({disable: this.props.disable});
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

	// Whenever a change happens in the toolbar, this function sends it to Parent component
	handleOnChange() {
		this.props.sendSettings(this.state.settings);
	}

	render() {
		const array_size = this.state.settings.array_size;
		const animation_speed = this.state.settings.animation_speed;
		const width = this.state.width;
		const height = this.state.height;
		const disable = this.state.disable;
		const ow = false;

		return (
				<div className = "Toolbar"
					 style = {disable ? {width: width, height: height, pointerEvents: "none", opacity: "0.5",}
					 			: {width: width, height: height,}}>
					<ArraySizeSlider 
						sendArraySize = {(s) => this.getArraySize(s)}
						array_size = {array_size}
						overwrite = {ow}
						overwrite_val = {50}
						left = {5}
						top = {10}>
					</ArraySizeSlider>
					<AnimationSpeedSlider 
						sendAnimationSpeed = {(s) => this.getAnimationSpeed(s)}
						animation_speed = {animation_speed}
						left = {5}
						top = {100}>
					</AnimationSpeedSlider>
				</div>
			)
	}
}