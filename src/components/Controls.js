import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class Controls extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    countdownStatus: React.PropTypes.string.isRequired
  }

  render() {
    const { countdownStatus } = this.props;
    function renderStartStopButton(){
      if (countdownStatus === 'started') {
        return  <Button>Pause</Button>
      } else if (countdownStatus === 'paused') {
        return <Button bsStyle='primary'>Start</Button>
      }
    }

    return (
      <div className='controls'>
        {renderStartStopButton()}
        <Button bsStyle="danger">
          Clear
        </Button>
      </div>
    );
  }
}

export default Controls;
