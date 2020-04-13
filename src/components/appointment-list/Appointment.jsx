import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Divider from "@material-ui/core/Divider";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppointmentService } from "../../Services/AppointmentService";

export class AppointmentList extends Component {
  handleDelete = (a) => (e) => {
    window.confirm("Are you sure you wish to delete this item?") &&
      AppointmentService.delete(a);
    window.location.reload(false);
  };

  render() {
    return (
      this.props.lista.length > 0 && (
        <List className="reminder-card">
          {this.props.lista.map((item, index) => (
            <div key={`list-${index}`}>
              <ListItem className={`reminder reminder-${item.id}`}>
                <div
                  className="bg-reminder"
                  style={{ backgroundColor: item.color }}
                ></div>
                <ListItemText>
                  <span>{item.name}</span>
                  <br />
                  <FontAwesomeIcon icon={faClock} />{" "}
                  <span>
                    {new Date(item.hour).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {" | "}
                  <span>{item.city}</span>
                </ListItemText>
                <ListItemSecondaryAction className="reminder-actions">
                  <IconButton
                    aria-label="edit"
                    className="edit"
                    onClick={() => this.props.edit(item)}
                  >
                    <EditIcon size="small" />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    className="delete"
                    onClick={this.handleDelete(item.id)}
                  >
                    <DeleteIcon size="small" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )
    );
  }
}
