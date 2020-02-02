import React from 'react';
import ArrayContainer from './ArrayContainer.jsx';
import Toolbar from './Toolbar.jsx';

// Change this value for the number of bars (value) in the array.
export const DEFAULT_ARRAY_SIZE = 200;

// Change this value for the speed of the animations.
export const DEFAULT_ANIMATION_SPEED_MS = 10;

export default class SortVisualizer extends React.Component {
	constructor(props) {
		super(props);

		// Visualizer dimensions
		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.state = {
			settings: {
				"array_size": DEFAULT_ARRAY_SIZE,
				"animation_speed": DEFAULT_ANIMATION_SPEED_MS
			},
			toolbar_disabled: false,
			width: this.width,
			height: this.height
		};
	}

	// Adds event listener to handle window resizing
	componentDidMount() {
		window.addEventListener('resize', () => this.handleWindowResize());
	}

	// Removes any added event listeners
	componentWillUnmount() {
		window.removeEventListener('resize', () => this.handleWindowResize());
	}


	// Handles updating Component dimensions on window resize
	handleWindowResize() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.setState({width: this.width, height: this.height});
	}

	// Gets settings from Toolbar and sends it to ArrayContainer in the render
	getSettings(s) {
		this.setState({settings: s});
	}


	// Disables and Enables the toolbar based on input from ArrayContainer component
	updateToolbar(disabled) {
		this.setState({toolbar_disabled: disabled});
	}


	render() {
		const settings = this.state.settings;
		const toolbar_disabled = this.state.toolbar_disabled;
		const width = this.state.width;
		const height = this.state.height;

		return (
		    <div className="SortVisualizer" style = {{width: width, height: height, backgroundColor: 'white',}}>
		    	<Toolbar
		    		disabled = {toolbar_disabled}
		    		left = {0.025 * width}
		    		width = {0.15 * width}
		    		height = {0.90 * height}
		    		sendSettings = {(s) => this.getSettings(s)}>
		    	</Toolbar>
		      	<ArrayContainer
		      		settings = {settings}
		      		left = {0.205 * width}
		      		width = {0.72 * width}
		      		height = {0.90 * height}
		      		disableToolbar = {(disabled) => this.updateToolbar(disabled)}>
		      	</ArrayContainer>
		    </div>      
  		);
  		
	}

}

