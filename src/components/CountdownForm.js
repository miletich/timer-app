import React, { Component } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';

class CountdownForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    let strSeconds = ReactDOM.findDOMNode(this.seconds).value;

    if (strSeconds.match(/^[0-9]*$/)) {
      ReactDOM.findDOMNode(this.seconds).value = '';
      this.props.onSetCountdown(parseInt(strSeconds, 10));
    }
  }

  render() {
    return (
      <div>
        <form ref="form"
          onSubmit={this.onSubmit}>
          <FormGroup>
            <FormControl type="text"
              bsSize="large"
              ref={(c) => this.seconds=c}
              placeholder="Enter time in seconds..." />
            <Button type="submit"
              bsStyle="primary"
              block>
              Start
            </Button>
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default CountdownForm;
