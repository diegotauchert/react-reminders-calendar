import React, { Component } from "react";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./main.scss";
import { Reminder } from "../reminder-modal/Reminder";
import { AppointmentService } from "../../Services/AppointmentService";
import { AppointmentList } from "../appointment-list/Appointment";

export default class Calendar extends Component {
  weekdayshort = moment.weekdays();

  constructor() {
    super();
    this.state = {
      showCalendar: true,
      showMonth: false,
      date: moment(),
      allmonths: moment.months(),
      selectedDay: null,
      Appointments: [],
      edit: null,
    };
  }

  firstDayOfMonth = () => {
    const { date } = this.state;
    const firstDay = moment(date).startOf("month").format("d");

    return firstDay;
  };

  year = () => this.state.date.format("Y");

  currentDay = () => this.state.date.format("DMMY");

  currentDate = () => {
    let today = new Date();
    today =
      today.getDate() +
      String(today.getMonth() + 1).padStart(2, "0") +
      today.getFullYear();

    return today;
  };

  month = () => this.state.date.format("MMMM");

  showMonth = (e, month) => {
    this.setState({
      showMonth: !this.state.showMonth,
      showCalendar: !this.state.showCalendar,
    });
  };

  setMonth = (month) => {
    const monthNo = this.state.allmonths.indexOf(month);
    let date = this.state.date;
    date = moment(date).set("month", monthNo);
    this.setState({
      date,
      showMonth: !this.state.showMonth,
      showCalendar: !this.state.showCalendar,
    });
  };

  MonthList = (props) => {
    const months = [];
    props.data.forEach((data) => {
      months.push(
        <td
          key={data}
          className="calendar-month"
          onClick={(e) => {
            this.setMonth(data);
          }}
        >
          <span>{data}</span>
        </td>
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
    let curr = "";
    if (this.state.showMonth === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      date: this.state.date.subtract(1, curr),
    });
  };

  onNext = () => (e) => {
    let curr = "";
    if (this.state.showMonth === true) {
      curr = "year";
    } else {
      curr = "month";
    }
    this.setState({
      date: this.state.date.add(1, curr),
    });
  };

  onDayClick = (d) => (e) => {
    this.setState({ selectedDay: d });
    //console.log("SELECTED DAY: ", this.state.selectedDay);
  };

  daysinmonth = () => {
    const blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td key={`td-${i}`} className="calendar-day empty" />);
    }
    const daysInMonth = [];
    for (let d = 1; d <= this.state.date.daysInMonth(); d++) {
      const currentFullDate = d + this.state.date.format("MM") + this.year();
      const currentDay = currentFullDate === this.currentDate() ? "today" : "";

      // let selectedClass = (d === this.state.selectedDay ? " selected-day " : "")
      daysInMonth.push(
        <td key={d} className={`calendar-day ${currentDay}`}>
          <span className="day-number">{d}</span>

          {this.renderList(currentFullDate)}
          <div
            className="canvas-day"
            onClick={this.onDayClick(currentFullDate)}
          ></div>
        </td>
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
    const list = this.state.Appointments.filter(
      (item) => parseInt(item.day, 0) === parseInt(data, 0)
    ).sort((a, b) => (new Date(a.hour) > new Date(b.hour) ? 1 : -1));

    //console.log(list);

    if (list.length > 0) {
      return (
        <>
          <div className="delete-all">
            <IconButton
              edge="end"
              aria-label="delete"
              className="delete"
              onClick={this.deleteAll(data)}
            >
              <DeleteIcon size="small" label="" />
              <small>delete all</small>
            </IconButton>
          </div>
          <AppointmentList
            lista={list}
            edit={(item) => {
              this.setState({
                edit: item,
                selectedDay: item.day,
              });
              //console.log(this.state);
            }}
          />
        </>
      );
    }
  };

  render() {
    return (
      <>
        {this.state.selectedDay !== null && (
          <Reminder
            date={this.state.selectedDay}
            edit={this.state.edit}
            save={(e) => {
              this.setState({ selectedDay: null });
              this.getList();
            }}
          />
        )}
        <div className="calendar">
          <div className="calendar-nav">
            <span onClick={this.onPrev} className="calendar-button button-prev">
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />
            </span>
            {!this.state.showMonth && (
              <span
                onClick={(e) => {
                  this.showMonth();
                }}
                className="calendar-month"
              >
                {this.month()} | {this.year()}
              </span>
            )}

            <span
              onClick={this.onNext()}
              className="calendar-button button-next"
            >
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </span>
          </div>
          <div className="calendar-date">
            {this.state.showMonth && <this.MonthList data={moment.months()} />}
          </div>
          {this.state.showCalendar && (
            <div className="calendar-date">
              <table className="calendar-table">
                <thead>
                  <tr>
                    {this.weekdayshort.map((day) => (
                      <th key={day}>{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {this.daysinmonth().map((d, i) => (
                    <tr key={`tr-${i}`}>{d}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </>
    );
  }

  deleteAll = (day) => (event) => {
    window.confirm("Are you sure you wish to delete all itens?") &&
      AppointmentService.deleteAllDay(day);
    window.location.reload(false);
  };
}
