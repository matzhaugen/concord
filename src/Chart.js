import React, { Component } from 'react';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';


class Chart extends Component {


	render(){
		return(
			<div>
				<XYPlot height={300} width={300}  xType='time'>
	          <LineSeries data={this.props.data}/>
	          <VerticalGridLines />
	          <HorizontalGridLines />
	          <XAxis />
	          <YAxis />
	        </XYPlot>
	        </div>
	        )
	}
}

export default Chart;