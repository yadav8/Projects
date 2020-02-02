import React from 'react';
import './Sort-Visualizer.css';


// This component stores the visual representation of each element in the ArrayContainer

// 'PureComponent' allows us to change the state of the ArrayContainer, while ONLY updating
// ArrayBars whose props/state is getting altered. Thus we have maximum of 1-3 ArrayBars being updated
// every frame, instead of all the ArrayBars.
export default class ArrayBar extends React.PureComponent {
	constructor(props) {
		super(props);
		
		this.state = {
			// value: this.props.value,
			// color: this.props.color,
			// width: this.props.width,
		};
		
	}

	// // ArrayBars always change state syncronously with props changes from ArrayContainer
	// static getDerivedStateFromProps(props, state) {
	// 	state = {
	// 				value: props.value,
	// 				color: props.color,
	// 				width: props.width,
	// 			};

	// 	return state;
	// }

	render() {
		//const {value, color, width} = this.state;
		const value = this.props.value;
		const color = this.props.color;
		const width = this.props.width;
		const left = this.props.left;
		const vert_scaling_factor = this.props.scale;
		const height = value * vert_scaling_factor;
		const bottom = 25;

		return (
			<div
				className = "ArrayBar"
				style = {{
					position: 'absolute',
					backgroundColor: color,
					width: width,
		        	height: `${height}px`,
		        	bottom: `${bottom}px`,
		        	left: `${left}px`,
				}}>
			</div>
		);
	}
}