import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.formatSeconds = this.formatSeconds.bind(this);
  }

  static defaultProps = {
    totalSeconds: 0
  }

  static propTypes = {
    totalSeconds: React.PropTypes.number
  }

  formatSeconds(totalSeconds) {
    let seconds = totalSeconds % 60;
    let minutes = Math.floor(totalSeconds / 60);

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    return minutes + ':' + seconds;
  }

  render() {
    const {totalSeconds} = this.props;
    return (
      <div className="clock">
        <span className="clock-text">
          {this.formatSeconds(totalSeconds)}
        </span>
      </div>
    );
  }
}

export default Clock;
