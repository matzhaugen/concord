import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import {AppBar, Toolbar, 
  Button, TextField} from '@material-ui/core'
import { CSVLink } from "react-csv";


const useStyles = makeStyles(theme => ({
  root: {
    marginRight: theme.spacing(2)
  },
  input: {
    opacity: 1,
    paddingLeft: "10px",
    marginRight: theme.spacing(2)
  },
  inputLabel: {
    margin: theme.spacing(.5)
  }
}));


export default function MyAppBar(props) {
  const classes = useStyles();
  let downloadButton;
  if (props.weights) {
    downloadButton = (<Button padding="20px" variant="contained">
                  <CSVLink data={props.weights} 
                  filename={"vanilla_weights.csv"}>
                      Download Portfolio Weights
                  </CSVLink>
                </Button>)
  } else {
    downloadButton = null
  }

  let calculateButton;
  if (props.portfolio.length > 1) {
    calculateButton = (<Button className={classes.input} variant="contained" onClick={props.calculatePortfolio}>
              {"Calculate \n Optimal Portfolio"}</Button>)
  } else {
    calculateButton = null
  }
  
  return (<AppBar className="AppBar" position="static">
          <Toolbar>
            <Autocomplete
            className={classes.input}
            options={props.availTickers}
            getOptionLabel={option => option}
            renderOption={(option, { selected }) => (
              <div onClick={props.addToPortfolioClick}>
                {option}
              </div>
            )}
            renderTags={(value) => (
              <div onKeyPress={props.addToPortfolio}>
                            {value}
                          </div>)}
            style={{ width: 300, height: 50}}
            renderInput={params => (
              <TextField {...params} 
              className={classes.inputLabel}
                color="primary" label="Search ticker symbols from S&P500" 
                variant="standard" fullWidth margin="normal"
                onKeyPress={props.addToPortfolio}/>
            )}
            />
            {calculateButton}
            {downloadButton}
          </Toolbar>
        </AppBar>
    
  );
}