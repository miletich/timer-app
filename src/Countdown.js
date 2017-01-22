import React, { Component } from 'react';
import Clock from './components/Clock';
import CountdownForm from './components/CountdownForm';

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    this.handleSetCountdown = this.handleSetCountdown.bind(this);
  }

  handleSetCountdown(seconds) {
    this.setState({
      count: seconds
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
