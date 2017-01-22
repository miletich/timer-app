import React, { Component } from 'react';
import Clock from './components/Clock';
import Controls from './components/Controls';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      countStatus: 'stopped'
    };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.countStatus !== prevState.countStatus) {
      switch (this.state.countStatus) {
        case 'started':
          this.startTimer();
          break;
        case 'stopped':
          this.setState({count: 0});
        case 'paused':
          clearInterval(this.timer);
          this.timer = undefined;
          break;
      }
    }
  }

  handleStatusChange(newStatus) {
    this.setState({
      countStatus: newStatus
    });
  }

  startTimer() {
    if (this.state.count < 3600) {
      this.timer = setInterval(() => {
        this.setState({count: ++this.state.count});
      }, 1000);
    } else {
      this.setState({countStatus: 'stopped'})
    }
  }

  render() {
    return (
      <div>
        <h1 className="page-title">Timer</h1>
        <Clock totalSeconds={this.state.count} />
        <Controls countdownStatus={this.state.countStatus} onStatusChange={this.handleStatusChange}/>
      </div>
    );
  }
}

export default Timer;
