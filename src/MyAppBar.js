import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import {AppBar, Toolbar, 
  Button, TextField} from '@material-ui/core'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const useStyles = makeStyles(theme => ({
  Autocomplete: {
    padding: "10px"
  },
  input: {
    flexGrow: 1,
    opacity: 1,
    paddingLeft: "10px",
  },
  TextField: {
    padding: "1px"
  }
}));


export default function MyAppBar(props) {
  const classes = useStyles();
  return (<AppBar className="AppBar" position="static">
          <Toolbar>
            <Autocomplete
            className={classes.Autocomplete}
            options={props.availTickers}
            classes={classes}
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
                className={classes.TextField} color="primary" label="Search ticker symbols from S&P500" 
                variant="standard" fullWidth 
                onKeyPress={props.addToPortfolio}/>
            )}
            />
            <Button padding="20px" variant="contained" onClick={props.calculatePortfolio}>
              Calculate Optimal Portfolio</Button>
          </Toolbar>
        </AppBar>
    
  );
}