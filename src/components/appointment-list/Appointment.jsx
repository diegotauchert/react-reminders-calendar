import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export class AppointmentList extends Component {
  render() {
    return (
      this.props.lista.length > 0 &&
      <List>
        {this.props.lista.map(item => (
          <ListItem>
            <ListItemText
              primary={item.nome}
            />
          </ListItem>)
        )}
      </List>);
  }
}
