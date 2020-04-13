import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Box from "@material-ui/core/Box";
import ColorPicker from "material-ui-color-picker";

import { AppointmentService } from "../../Services/AppointmentService";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export class Reminder extends Component {
  state = {
    name: "",
    city: "",
    hour: new Date(),
    day: null,
    color: "",
    modalOpen: false,
    id: null,
  };

  componentDidMount() {
    this.setState({
      day: this.props.date,
      modalOpen: true,
    });

    if (this.props.edit) {
      let state = { ...this.state, ...this.props.edit };
      this.setState(state);
    }
  }

  saveAppointment = () => {
    AppointmentService.save(this.state);
    this.props.save(true);
  };

  handleChange = (event) => {
    let state = this.state;
    const { value, name } = event.target;
    state[name] = value;
    this.setState(state);
    //console.table(this.state);
  };
  handleChangeColor = (color) => {
    this.setState({ color: color });
    //console.log(this.state);
  };
  handleChangeHour = (hour) => {
    this.setState({ hour: hour });
    //console.log(this.state);
  };

  handleClose = (event) => {
    this.setState({ modalOpen: false });
    this.props.save(true);
  };

  render() {
    return (
      <>
        <div>
          <Dialog
            onClose={this.handleClose}
            TransitionComponent={Transition}
            keepMounted
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            open={this.state.modalOpen}
          >
            <DialogContent>
              <DialogTitle id="alert-dialog-title">
                {this.state.id === null ? `New ` : `Edit `}
                Reminder{` | `}
                {new Date(this.state.hour).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </DialogTitle>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container>
                  <form>
                    <Grid>
                      <ColorPicker
                        name="color"
                        label={this.state.color ? this.state.color : `Color`}
                        defaultValue={this.state.color}
                        value={this.state.color}
                        id="colorPickerReminder"
                        onChange={this.handleChangeColor}
                      />
                      <label
                        for="colorPickerReminder"
                        className="colorPicker"
                        style={{ backgroundColor: this.state.color }}
                      ></label>
                    </Grid>
                    <Grid>
                      <TextField
                        label="Reminder"
                        inputProps={{ maxLength: 30 }}
                        name="name"
                        onChange={this.handleChange}
                        value={this.state.name}
                      />
                    </Grid>
                    <Grid>
                      <TextField
                        label="City"
                        name="city"
                        inputProps={{ maxLength: 15 }}
                        value={this.state.city}
                        onChange={this.handleChange}
                      />
                    </Grid>
                    <Grid>
                      <KeyboardTimePicker
                        margin="normal"
                        id="time-picker"
                        format="hh:mm"
                        label="Time"
                        clearable
                        value={this.state.hour}
                        onChange={this.handleChangeHour}
                        KeyboardButtonProps={{
                          "aria-label": "change time",
                        }}
                      />
                    </Grid>
                    <Grid>
                      <Box my={2} bgcolor="background.paper">
                        <Button
                          m={10}
                          variant="contained"
                          onClick={this.saveAppointment}
                        >
                          Save
                        </Button>
                      </Box>
                    </Grid>
                  </form>
                </Grid>
              </MuiPickersUtilsProvider>
            </DialogContent>
          </Dialog>
        </div>
      </>
    );
  }
}
