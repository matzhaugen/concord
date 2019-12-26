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
      portfolio: ["ABC", "VFC", "VIAB", "RSG", "EXPD", "COG", "HES", 
      "AAP", "BAC", "AMZN", 
      "VRSN", "AA", "SNPS", "AON", "TXN", "DXC", 
      "ZION", "XEC", "KSS", "ES", "PBCT", "BA", "ANTM", "HAL", "HAS"],
      availTickers: [],
      timeSeries: null,
      loadChart: false,
      vanilla: null,
      basic: null}
      // data: {'vanilla':[
      //   {x: 0, y: 8},
      //   {x: 1, y: 5},
      //   {x: 2, y: 4},
      //   {x: 3, y: 9},
      //   {x: 4, y: 1},
      //   {x: 5, y: 7},
      //   {x: 6, y: 6},
      //   {x: 7, y: 3},
      //   {x: 8, y: 2},
      //   {x: 9, y: 0}
      // ]}
      
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
    
    if (e.key === 'Enter') {
        if (!this.state.portfolio.includes(tick)) {         
          if (this.state.availTickers.includes(tick)){
            this.setState(prevState => ({
              portfolio: [...prevState.portfolio, tick]}));
          }
        }
      }
    console.log(this.state.portfolio)
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
    const url_vanilla = 'http://0.0.0.0:5000/portfolio/nonlinear_weights/'.concat(tickers)
    fetch(url_vanilla)
      .then(res => res.json())
      .then((promise) => {
        let vanilla_weights = promise['weights_data'].map(a => ([a.date, ...a.value]));
        vanilla_weights = [['date', ...this.state.portfolio], ...vanilla_weights]
        const vanilla_points = JSON.parse(promise['wealth_data']).map(a => ({x: Date.parse(a.date), y: parseFloat(a.value)}));
        this.setState({vanilla: vanilla_points, 
          vanilla_weights: vanilla_weights});
      });
    const url_basic = 'http://0.0.0.0:5000/portfolio/basic_weights/'.concat(tickers)
    fetch(url_basic)
      .then(res => res.json())
      .then((promise) => {
        const basic_points = JSON.parse(promise['wealth_data']).map(a => ({x: Date.parse(a.date), y: parseFloat(a.value)}));
        this.setState({basic: basic_points});
      });
  }

  render() {
    
    return (
      <div className="App">
      <MyAppBar calculatePortfolio={this.calculatePortfolio} 
        availTickers={this.state.availTickers} 
        addToPortfolio={this.addToPortfolio} 
        addToPortfolioClick={this.addToPortfolioClick}
        weights={this.state.vanilla_weights}
        portfolio={this.state.portfolio}/>
        <Grid container direction="row" spacing={4}>
        <Grid item>
          <Paper className="Portfolio">
          <Portfolio className="Portfolio" items={this.state.portfolio} removeTicker={this.removeTicker}/>
          </Paper>
          <Paper className="Portfolios">
          </Paper>
           </Grid>
         <Grid item>
         <Paper className="Chart">
        <Chart basic={this.state.basic} vanilla={this.state.vanilla}/>
        </Paper>
        </Grid>
       
      </Grid>
        
      </div>
    );
  }
}

export default App;