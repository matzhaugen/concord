import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    '&:hover': {
       background: "white",
    }
  } 
}));

export default function Portfolio(props) {
  const classes = useStyles();
  return(
    <List subheader={<ListSubheader>Portfolio</ListSubheader>} dense={true}>
        {props.items.map((e) => (         
            <ListItem className={classes.root} key={e} onClick={props.removeTicker}>
                <Tooltip title="Remove">
                <Button>{e}
                </Button>
                 </Tooltip>
              </ListItem>
          ))}
      </List>      
    )
}