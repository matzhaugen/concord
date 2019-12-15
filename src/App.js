import React, { Component } from 'react';
import {Grid, Paper} from '@material-ui/core'

import './App.css';
import MyAppBar from './MyAppBar'
import Chart from './Chart'
import Portfolio from './Portfolio'
import '../node_modules/react-vis/dist/style.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.addToPortfolio = this.addToPortfolio.bind(this)
    this.calculatePortfolio = this.calculatePortfolio.bind(this)
    this.addToPortfolioClick = this.addToPortfolioClick.bind(this)
    this.removeTicker = this.removeTicker.bind(this)
    this.state = {
      portfolio: ['ABC', 'VFC'],
      availTickers: [],
      timeSeries: null,
      loadChart: false,
      data: [
        {x: 0, y: 8},
        {x: 1, y: 5},
        {x: 2, y: 4},
        {x: 3, y: 9},
        {x: 4, y: 1},
        {x: 5, y: 7},
        {x: 6, y: 6},
        {x: 7, y: 3},
        {x: 8, y: 2},
        {x: 9, y: 0}
      ]}  
  }

  componentDidMount() {
      // fetch('https://ts8ge9iskf.execute-api.us-west-2.amazonaws.com/dev/tickers')
      fetch('http://0.0.0.0:5000/tickers/')
      .then(res => {
        var a = res.json()
        return a
      })
      .then((promise) => {
        this.setState({ availTickers: promise['data'] })
      })
      .catch(console.log)

    }

  addToPortfolio(e) {    
    const tick = e.target.value
    console.log(tick)
    if (e.key === 'Enter') {
        if (!this.state.portfolio.includes(tick)) {         
          if (this.state.availTickers.includes(tick)){
            this.setState(prevState => ({
              portfolio: [...prevState.portfolio, tick]}));
          }
        }
      }
  }

  addToPortfolioClick(e) {    
    const tick = e.currentTarget.textContent
    console.log(tick)
    
    if (!this.state.portfolio.includes(tick)) {         
      if (this.state.availTickers.includes(tick)){
        this.setState(prevState => ({
          portfolio: [...prevState.portfolio, tick]}));
      }
    }
  
  }

  removeTicker(e) {
    const tick = e.currentTarget.textContent
    if (this.state.portfolio.includes(tick)) {
      var array = [...this.state.portfolio];
      var index = array.indexOf(tick)
      array.splice(index, 1);
      this.setState({portfolio: array});
    }
  }
  
  calculatePortfolio(e) {
    
    const tickers = this.state.portfolio.toString()
    const url = 'http://0.0.0.0:5000/portfolio/vanilla_weights/'.concat(tickers)   
    fetch(url)
      .then(res => {
        return res.json()
      })
      .then((promise) => {
        const points = JSON.parse(promise['data']).map(a => ({x: Date.parse(a.date), y: parseFloat(a.value)}));
        this.setState({data: points});
      })
  }
  
  render() {
    const a = ({color: "secondary"});
    return (
      <div className="App">
      <MyAppBar calculatePortfolio={this.calculatePortfolio} availTickers={this.state.availTickers} 
        addToPortfolio={this.addToPortfolio} addToPortfolioClick={this.addToPortfolioClick}/>
        <Grid container direction="row" spacing={4}>
        <Grid item>
          <Paper className="Portfolio">
          <Portfolio className="Portfolio" items={this.state.portfolio} removeTicker={this.removeTicker}/>
          </Paper>
           </Grid>
         <Grid item>
         <Paper className="Chart">
        <Chart data={this.state.data}/>
        </Paper>
        </Grid>
       
      </Grid>
        
      </div>
    );
  }
}

export default App;