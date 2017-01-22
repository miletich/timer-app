import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.onStatusChange = this.onStatusChange.bind(this);
  }

  static propTypes = {
    countdownStatus: React.PropTypes.string.isRequired,
    onStatusChange: React.PropTypes.func.isRequired
  }

  onStatusChange(newStatus) {
    return () => {
      this.props.onStatusChange(newStatus);
    }
  }

  render() {
    const { countdownStatus } = this.props;
    const renderStartStopButton = () => {
      if (countdownStatus === 'started') {
        return  <Button onClick={this.onStatusChange('paused')}>Pause</Button>
      } else {
        return <Button bsStyle='primary' onClick={this.onStatusChange('started')}>Start</Button>
      }
    }

    return (
      <div className='controls'>
        {renderStartStopButton()}
        <Button bsStyle="danger"
          onClick={this.onStatusChange('stopped')}>
          Clear
        </Button>
      </div>
    );
  }
}

export default Controls;
