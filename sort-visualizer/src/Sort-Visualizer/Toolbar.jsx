import React from 'react';
//import update from 'immutability-helper';
import ArraySizeSlider from './ArraySizeSlider.jsx';
import AnimationSpeedSlider from './AnimationSpeedSlider.jsx';
import {DEFAULT_ARRAY_SIZE, DEFAULT_ANIMATION_SPEED_MS} from './Sort-Visualizer.jsx';

import './Sort-Visualizer.css';

let ToolbarWidth = 210;

export default class Toolbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			width: ToolbarWidth,
			settings: {
				"array_size": DEFAULT_ARRAY_SIZE,
				"animation_speed": DEFAULT_ANIMATION_SPEED_MS
			}
		};
	}

	//update immutability
	getArraySize(arraySizeFromSlider) {
		let settings_copy = this.state.settings;
		settings_copy["array_size"] = arraySizeFromSlider;
		this.setState({settings: settings_copy});
		this.handleOnChange();
	}

	//update immutability
	getAnimationSpeed(speedFromSlider) {
		let settings_copy = this.state.settings;
		settings_copy["animation_speed"] = speedFromSlider;
		this.setState({settings: settings_copy});
		this.handleOnChange();
	}


	handleOnChange() {
		this.props.sendSettings(this.state.settings);
	}

	render() {
		const array_size = this.state.settings.array_size;
		const animation_speed = this.state.settings.animation_speed;
		const width = this.state.width;
		const ow = false;

		return (
				<div className = "Toolbar"
					 style = {{width: width,}} >
					<ArraySizeSlider 
						sendArraySize = {(s) => this.getArraySize(s)}
						array_size = {array_size}
						overwrite = {ow}
						overwrite_val = {50}>
					</ArraySizeSlider>
					<AnimationSpeedSlider 
						sendAnimationSpeed = {(s) => this.getAnimationSpeed(s)}
						animation_speed = {animation_speed}>
					</AnimationSpeedSlider>
				</div>
			)
	}
}