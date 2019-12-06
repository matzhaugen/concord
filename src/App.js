import React, { Component } from 'react';
import {AppBar, Toolbar, IconButton, 
  Button, TextField, Grid, Paper} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';

import './App.css';
import Chart from './Chart'
import Portfolio from './Portfolio'
import '../node_modules/react-vis/dist/style.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.addToPortfolio = this.addToPortfolio.bind(this)
    this.addToPortfolioFromClick = this.addToPortfolioFromClick.bind(this)
    this.calculatePortfolio = this.calculatePortfolio.bind(this)
    this.state = {
      portfolio: [],
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

    if (e.key === 'Enter') {
        if (!this.state.portfolio.includes(tick)) {
          
          if (this.state.availTickers.includes(tick)){
            this.setState(prevState => ({
              portfolio: [...prevState.portfolio, tick]}))
          }
        }
      }
  }

  addToPortfolioFromClick(e) { 
    const tick = e.target.value   
    if (!this.state.portfolio.includes(tick)) {
        this.setState(prevState => ({
          portfolio: [...prevState.portfolio, tick]}))
      
    }
  }
  

  calculatePortfolio(e) {
    const tickers = this.state.portfolio.toString()
    const url = 'http://0.0.0.0:5000/portfolio/vanilla_weights/'.concat(tickers)
    console.log(url)
    fetch(url)
      .then(res => {
        var a = res.json()
        return a
      })
      .then((promise) => {
        const points = JSON.parse(promise['data']).map(a => ({x: Date.parse(a.date), y: parseFloat(a.value)}));
        this.setState({data: points});
      });
  }
  
  render() {
    const a = ({color: "secondary"});
    return (
      <div className="App">
        <AppBar className="AppBar" position="static">
          <Toolbar>
          <Autocomplete
            className="Autocomplete"
            options={this.state.availTickers}
            getOptionLabel={option => option}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} 
                className="TextField" color="secondary" defaultValue="hi" label="Search ticker symbols from S&P500" 
                variant="outlined" fullWidth 
                onKeyPress={this.addToPortfolio}/>
            )}
            />
            <Button padding="20px" variant="contained" onClick={this.calculatePortfolio}>
              Calculate Optimal Portfolio</Button>
            
          </Toolbar>
        </AppBar>
        <Grid container direction="row" spacing={4}>
        <Grid item>
          <Paper className="Portfolio">
          <Portfolio className="Portfolio" items={this.state.portfolio}/>
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