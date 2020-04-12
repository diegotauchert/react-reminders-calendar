import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { AppointmentService } from '../../Services/AppointmentService';

export class Appointment extends Component {

  state = {
    nome: '',
    cidade: '',
    hora: '',
    dia: ''
  };

  componentDidMount() {
    this.setState({ dia: this.props.date });
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
    console.table(this.state);
  };

  render() {
    return (
      <Grid container>
        <form>
          <Grid>
            <span>{this.props.date}</span>
          </Grid>
          <Grid>
            <TextField label="Nome" name='nome' onChange={this.handleChange}/>
          </Grid>
          <Grid>
            <TextField label="Cidade" name='cidade' onChange={this.handleChange}/>
          </Grid>
          <Grid>
            <TextField label="Hora" type='time' name='hora' onChange={this.handleChange}/>
          </Grid>
          <Grid>
            <Button variant="contained" onClick={this.saveAppointment}>Salvar</Button>
          </Grid>
        </form>
      </Grid>
    );
  }
}
