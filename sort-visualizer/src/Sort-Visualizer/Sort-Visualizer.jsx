import React from 'react';
import ArrayContainer from './ArrayContainer.jsx';
import Toolbar from './Toolbar.jsx';

// Change this value for the number of bars (value) in the array.
export const DEFAULT_ARRAY_SIZE = 100;

// Change this value for the speed of the animations.
export const DEFAULT_ANIMATION_SPEED_MS = 10;

export default class SortVisualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			settings: {
				"array_size": DEFAULT_ARRAY_SIZE,
				"animation_speed": DEFAULT_ANIMATION_SPEED_MS
			},
			toolbar_disabled: false
		};
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

		return (
		    <div className="SortVisualizer">
		    	<Toolbar
		    		disabled = {toolbar_disabled}
		    		sendSettings = {(s) => this.getSettings(s)}>
		    	</Toolbar>
		      	<ArrayContainer
		      		settings = {settings}
		      		disableToolbar = {(disabled) => this.updateToolbar(disabled)}>
		      	</ArrayContainer>
		    </div>      
  		);
  		
	}

}

