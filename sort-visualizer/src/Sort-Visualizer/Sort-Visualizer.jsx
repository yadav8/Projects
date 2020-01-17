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
			}
		};
	}

	//update immutability
	getSettings(s) {
		this.setState({settings: s});
	}

	render() {
		const settings = this.state.settings;

		return (
		    <div className="SortVisualizer">
		    	<Toolbar sendSettings={(s) => this.getSettings(s)}></Toolbar>
		      	<ArrayContainer settings = {settings}></ArrayContainer>
		    </div>      
  		);
  		
	}

}

