import React, { Component } from 'react';
import moment from 'moment';
import {
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './main.scss';
import { Appointment } from './appointment';
import { AppointmentService } from '../../Services/AppointmentService';
import { AppointmentList } from '../appointment-list/Appointment';

export default class Calendar extends Component {
  weekdayshort = moment.weekdays();

  constructor() {
    super();
    this.state = {
      showCalendar: true,
      showMonth: false,
      date: moment(),
      allmonths: moment.months(),
      showYearNav: false,
      selectedDay: null,
      Appointments: []
    };
  }

  firstDayOfMonth = () => {
    const { date } = this.state;
    const firstDay = moment(date)
      .startOf('month')
      .format('d');

    return firstDay;
  };


  year = () => this.state.date.format('Y');

  currentDay = () => this.state.date.format('D');

  month = () => this.state.date.format('MMMM');

  showMonth = (e, month) => {
    this.setState({
      showMonth: !this.state.showMonth,
      showCalendar: !this.state.showCalendar,
    });
  };

  setMonth = (month) => {
    const monthNo = this.state.allmonths.indexOf(month);
    let date = this.state.date;
    date = moment(date)
      .set('month', monthNo);
    this.setState({
      date,
      showMonth: !this.state.showMonth,
      showCalendar: !this.state.showCalendar,
    });
  };

  MonthList = (props) => {
    const months = [];
    props.data.map((data) => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={(e) => {
            this.setMonth(data);
          }}
        >
          <span>{data}</span>
        </td>,
      );
    });
    const rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i === 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });

    rows.push(cells);

    const monthlist = rows.map((d, i) => <tr>{d}</tr>);

    return (
      <table className="calendar-month">
        <thead>
        <tr>
          <th colSpan="4">Select a Month</th>
        </tr>
        </thead>
        <tbody>{monthlist}</tbody>
      </table>
    );
  };

  onPrev = (e) => {
    let curr = '';
    if (this.state.showMonth === true) {
      curr = 'year';
    } else {
      curr = 'month';
    }
    this.setState({
      date: this.state.date.subtract(1, curr),
    });
  };

  onNext = () => (e) => {
    let curr = '';
    if (this.state.showMonth === true) {
      curr = 'year';
    } else {
      curr = 'month';
    }
    this.setState({
      date: this.state.date.add(1, curr),
    });
  };

  onDayClick = (d) => (e) => {
    this.setState({ selectedDay: d });
    console.log('SELECTED DAY: ', this.state.selectedDay);
  };


  daysinmonth = () => {
    const blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td className="calendar-day empty"/>);
    }
    const daysInMonth = [];
    for (let d = 1; d <= this.state.date.daysInMonth(); d++) {
      const currentDay = d === this.currentDay() ? 'today' : '';
      // let selectedClass = (d === this.state.selectedDay ? " selected-day " : "")
      daysInMonth.push(
        <td key={d} className={`calendar-day ${currentDay}`} onClick={this.onDayClick(d)}>
          <span>
            {d}
            {this.renderList(d)}
          </span>
        </td>,
      );
    }
    const totalSlots = [...blanks, ...daysInMonth];
    const rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        // let insertRow = cells.slice();
        rows.push(cells);
      }
    });

    return rows;
  };

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    this.setState({ Appointments: AppointmentService.getList() });
  };
  renderList = (data) => {
    return <AppointmentList lista={this.state.Appointments.filter(item => item.dia === data)}/>;
  };

  render() {
    return (
      <>
        {this.state.selectedDay !== null &&
        <Appointment
          date={this.state.selectedDay}
          save={(e) => {
            this.setState({ selectedDay: null });
            this.getList();
          }}/>}
        <div className="calendar">
          <div className="calendar-nav">
          <span
            onClick={this.onPrev}
            className="calendar-button button-prev"
          >
            <FontAwesomeIcon icon={faArrowAltCircleLeft}/>
          </span>
            {!this.state.showMonth && (
              <span
                onClick={(e) => {
                  this.showMonth();
                }}
                className="calendar-month"
              >
              {this.month()}
                {' '}
                |
                {' '}
                {this.year()}
            </span>
            )}

            <span
              onClick={this.onNext()}
              className="calendar-button button-next"
            >
            <FontAwesomeIcon icon={faArrowAltCircleRight}/>
          </span>
          </div>
          <div className="calendar-date">
            {this.state.showMonth && <this.MonthList data={moment.months()}/>}
          </div>
          {this.state.showCalendar && (
            <div className="calendar-date">
              <table className="calendar-table">
                <thead>
                <tr>{this.weekdayshort.map((day) => <th key={day}>{day}</th>)}</tr>
                </thead>
                <tbody>
                {this.daysinmonth()
                  .map((d) => <tr>{d}</tr>)}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </>
    );
  }
}
