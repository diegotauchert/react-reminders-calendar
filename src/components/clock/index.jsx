import React, {Component} from 'react';

let time = new Date().toLocaleTimeString();

class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString()
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: new Date().toLocaleTimeString()
    });
  }
  
  render() {
    return (
      <>
      <div className="clock-widget">
          <span className="clock">{this.state.time}</span>
      </div>
      </>
    );
  }
}
export default Clock;