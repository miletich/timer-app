import React, { Component } from 'react';
import Clock from './components/Clock';
import CountdownForm from './components/CountdownForm';

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      countdownStatus: 'stopped',
    };
    this.handleSetCountdown = this.handleSetCountdown.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.countdownStatus !== prevState.countdownStatus) {
      switch (this.state.countdownStatus) {
        case 'started':
          this.startTimer();
          break;
      }
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      const newCount = this.state.count - 1;
      this.setState({
        count: newCount >= 0 ? newCount : 0
      });
    }, 1000);
  }

  handleSetCountdown(seconds) {
    this.setState({
      count: seconds,
      countdownStatus: 'started'
    });
  }

  render() {
    const { count } = this.state;

    return (
      <div>
        <Clock totalSeconds={count} />
        <CountdownForm onSetCountdown={this.handleSetCountdown}/>
      </div>
    )
  }
}

export default Countdown;
