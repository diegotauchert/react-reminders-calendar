import React, { Component } from 'react';

import moment from 'moment';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { 
  MuiPickersUtilsProvider,
  KeyboardTimePicker 
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Box from '@material-ui/core/Box';
import ColorPicker from 'material-ui-color-picker';

import { AppointmentService } from '../../Services/AppointmentService';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export class Reminder extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      city: '',
      hour: null,
      day: null,
      color: null,
    };
  }

  componentDidMount() {
    this.setState({ day: this.props.date });
  }

  saveAppointment = () => {
    AppointmentService.save(this.state);
    this.props.save(true);
  };

  handleChange = (event, data) => {
    let state = this.state;
    const { value, name } = event.target;
    state[name] = value;
    this.setState(state);
    console.table(this.state);
  };

  handleClose = (event) => {
    this.props.save(true);
  };

  render() {
    return (
      <>
      <div>
      <Dialog
        open
        onClose={this.handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogContent>
        <DialogTitle id="alert-dialog-title">New Reminder: {this.props.date}</DialogTitle>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container>
            <form>
              <Grid>
                <ColorPicker
                  name='color'
                  label='Color'
                  name='hour'
                  onChange={
                    color => this.handleChange
                  }
                  value={this.state.color}
                />
              </Grid>
              <Grid>
                <TextField label="Reminder" inputProps={{ maxLength: 30 }} name='name' onChange={this.handleChange}/>
              </Grid>
              <Grid>
                <TextField label="City" name='city' inputProps={{ maxLength: 15 }} onChange={this.handleChange}/>
              </Grid>
              <Grid>
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    format="hh:mm"
                    label="Time"
                    clearable
                    value={moment(new Date(), 'hh:mm')}
                    onChange={date => this.handleChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                  />
              </Grid>
              <Grid>
                <Box my={2} bgcolor="background.paper">
                  <Button m={10} variant="contained" onClick={this.saveAppointment}>Save</Button>
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
