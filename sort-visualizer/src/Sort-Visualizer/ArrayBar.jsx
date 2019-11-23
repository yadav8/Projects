import React from 'react';

import './Sort-Visualizer.css';


// This component stores the visual representation of each element in the ArrayContainer
// Automatically updates with ArrayContainer
export default class ArrayBar extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			value: this.props.value,
			idx: this.props.idx,
			color: this.props.color,
			width: this.props.width,
		};
		
	}

	// ArrayBars always change state syncronously with props changes from ArrayContainer
	static getDerivedStateFromProps(props, state) {
		state = {
					value: props.value,
					idx: props.idx,
					color: props.color,
					width: props.width,
				};

		return state;
	}

	render() {
		const {value, idx, color, width} = this.state;

		return (
			<div
				className = "ArrayBar"
				key = {idx}
				style = {{
					backgroundColor: color,
					width: width,
		        	height: `${value}px`,

				}}>
			</div>
		);
	}
}