import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import {
  faClock
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AppointmentService } from '../../Services/AppointmentService';

export class AppointmentList extends Component {

  handleClick = () => {
    AppointmentService.delete();
  };

  render() {
    return (
      this.props.lista.length > 0 &&
      <List className="reminder-card">
        {this.props.lista.map((item, index) => (
          <>
          <ListItem selected={!( index % 2 )} className="reminder">
            <ListItemText>
              <span>{item.name}</span><br />
              <span>{item.city}</span>{' | '}
              <FontAwesomeIcon icon={faClock}/>
              <span>{item.hour}</span>
            </ListItemText>
            <ListItemSecondaryAction className="reminder-actions">
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon size="small" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          </>
          )
        )}
      </List>);
  }
}
