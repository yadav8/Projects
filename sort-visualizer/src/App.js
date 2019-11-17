import React from 'react';
//import ReactDOM from 'react-dom'
//import {render} from 'react-dom'
//import logo from './logo.svg';
import './App.css';
import SortVisualizer from './Sort-Visualizer/Sort-Visualizer.jsx'


class App extends React.Component {

	render() {

		return (
		    <div className="App">
		      <SortVisualizer>

		      </SortVisualizer>
		    </div>      
  		);

	}

}

export default App;
