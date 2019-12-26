import React, { Component } from 'react';
import {XYPlot, DiscreteColorLegend, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';


class Chart extends Component {


	render(){
		let vanilla_lines, basic_lines;
		if (!this.props.vanilla) {
			vanilla_lines = null	
		} else {
			vanilla_lines = <LineSeries data={this.props.vanilla}/>
		}
		if (!this.props.basic) {
			basic_lines = null	
		} else {
			basic_lines = <LineSeries data={this.props.basic} color='gray'/>
		}
		
		return(
			<div>
			  <XYPlot height={400} width={600}  xType='time'>
	          {vanilla_lines}
	          {basic_lines}
	          <VerticalGridLines />
	          <HorizontalGridLines />
	          <XAxis title ="Time" />
	          <YAxis title="Wealth Growth"/>
	          <DiscreteColorLegend 
	          items={[{
	          	title: 'basic', color: 'gray'}, 
	          	{title: 'vanilla'}]}/>
	        </XYPlot>
	        </div>
	        )
	}
}

export default Chart;