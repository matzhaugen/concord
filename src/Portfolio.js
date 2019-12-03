import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';


class Portfolio extends Component {
  
  
  render() {
    return(      
      
      <List subheader={<ListSubheader>Portfolio</ListSubheader>} dense={true}>
          {this.props.items.map((e) => (         
              <ListItem key={e}>
                  <ListItemText
                    primary={e}
                  />
                </ListItem>
            ))}
        </List>      
      )
  }
}

export default Portfolio;