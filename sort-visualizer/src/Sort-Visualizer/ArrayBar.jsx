import React from 'react';

import './Sort-Visualizer.css';

const VERT_SCALING_FACTOR = 1;


// This component stores the visual representation of each element in the ArrayContainer
// Automatically updates with ArrayContainer
export default class ArrayBar extends React.PureComponent {
	constructor(props) {
		super(props);
		
		this.state = {
			value: this.props.value,
			color: this.props.color,
			width: this.props.width,
		};
		
	}

	// ArrayBars always change state syncronously with props changes from ArrayContainer
	static getDerivedStateFromProps(props, state) {
		state = {
					value: props.value,
					color: props.color,
					width: props.width,
				};

		return state;
	}

	render() {
		const {value, color, width} = this.state;
		//console.log("here");

		return (
			<div
				className = "ArrayBar"
				style = {{
					backgroundColor: color,
					width: width,
		        	height: `${value*VERT_SCALING_FACTOR}px`,

				}}>
			</div>
		);
	}
}