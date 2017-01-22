import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import App from './App';
import Timer from './Timer';
import Countdown from './Countdown';
import Clock from './components/Clock';
import CountdownForm from './components/CountdownForm';
import Controls from './components/Controls';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('App', () => {
  it('should properly run tests', () => {
    expect(1).toBe(1);
  });
});

// Clock tests
describe('Clock', () => {
  it('should exist', () => {
    expect(Clock).toExist();
  });

  describe('render', () => {
    it('should render clock to output', () => {
      const clock = TestUtils.renderIntoDocument(<Clock totalSeconds={62}/>);
      const actualText = TestUtils.findRenderedDOMComponentWithClass(clock, 'clock-text').innerHTML;

      expect(actualText).toBe('01:02');
    });
  });

  describe('formatSeconds', () => {
    it('should format seconds', () => {
      const clock = TestUtils.renderIntoDocument(<Clock />);
      const seconds = 615;
      const expected = '10:15';
      const actual = clock.formatSeconds(seconds);

      expect(actual).toBe(expected);
    });

    it('should format seconds when min/sec is less than 10', () => {
      const clock = TestUtils.renderIntoDocument(<Clock />);
      const seconds = 61;
      const expected = '01:01';
      const actual = clock.formatSeconds(seconds);

      expect(actual).toBe(expected);
    });
  });
});

// CountdownForm tests
describe('CountdownForm', () => {
  it('should exist', () => {
    expect(CountdownForm).toExist();
  });

  it('should call onSetCountdown if valid seconds entered', () => {
    const spy = expect.createSpy();
    const countdownForm = TestUtils.renderIntoDocument(<CountdownForm onSetCountdown={spy}/>);
    const form = TestUtils.findRenderedDOMComponentWithTag(countdownForm, 'form');

    ReactDOM.findDOMNode(countdownForm.seconds).value = '109';
    TestUtils.Simulate.submit(form);

    expect(spy).toHaveBeenCalledWith(109);
  });
});

// Timer tests
describe('Timer', () => {
  it('should exist', () => {
    expect(Timer).toExist();
  });

  describe('handleStatusChange', () => {
    it('should set state to started and count up', (done) => {
      const timer = TestUtils.renderIntoDocument(<Timer />);
      timer.handleStatusChange('started');

      expect(timer.state.countStatus).toBe('started');

      setTimeout(() => {
        expect(timer.state.count).toBe(1);
        done();
      }, 1001);
    });

    it('should set state to paused and stop counting', (done) => {
      const timer = TestUtils.renderIntoDocument(<Timer />);
      timer.handleStatusChange('started');

      setTimeout(() => {
        timer.handleStatusChange('paused');
      }, 1001);

      setTimeout(() => {
        expect(timer.state.countStatus).toBe('paused');
        expect(timer.state.count).toBe(1);
        done();
      }, 1001);
    });

    it('should set state to stopped and reset the counter', (done) => {
      const timer = TestUtils.renderIntoDocument(<Timer />);
      timer.handleStatusChange('started');

      setTimeout(() => {
        timer.handleStatusChange('stopped');
        expect(timer.state.countStatus).toBe('stopped');
        expect(timer.state.count).toBe(0);
        done();
      }, 2001);
    });

    it('should not count past 59:59', (done) => {
      const timer = TestUtils.renderIntoDocument(<Timer />);
      timer.state.count = 3599;
      timer.handleStatusChange('started');

      setTimeout(() => {
        expect(timer.state.count).toBe(0);
        done();
      }, 1001);

    });
  });
});

// Countdown tests
describe('Countdown', () => {
  it('should exist', () => {
    expect(Countdown).toExist();
  });

  describe('handleSetCountdown', () => {
    it('should set state to started and count down', (done) => {
      const countdown = TestUtils.renderIntoDocument(<Countdown/>);
      countdown.handleSetCountdown(10);

      expect(countdown.state.count).toBe(10);
      expect(countdown.state.countdownStatus).toBe('started');

      setTimeout(() => {
        expect(countdown.state.count).toBe(9);
        done();
      },1001);
    });

    it('should not count down past 0', (done) => {
      const countdown = TestUtils.renderIntoDocument(<Countdown />);
      countdown.handleSetCountdown(1);

      setTimeout(() => {
        expect(countdown.state.count).toBe(0);
        done();
      }, 3000);
    });

    it('should pause countdown on paused status', (done) => {
      const countdown = TestUtils.renderIntoDocument(<Countdown />);
      countdown.handleSetCountdown(3);
      countdown.handleStatusChange('paused');

      setTimeout(() => {
        expect(countdown.state.count).toBe(3);
        expect(countdown.state.countdownStatus).toBe('paused');
        done();
      }, 1001)
    });

    it('should reset on stopped status', () => {
      const countdown = TestUtils.renderIntoDocument(<Countdown />);
      countdown.handleSetCountdown(3);
      countdown.handleStatusChange('stopped');

      expect(countdown.state.count).toBe(0);
      expect(countdown.state.countdownStatus).toBe('stopped');
    });
  });
});

// Controls tests
describe('Controls', () => {
  it('should exist', () => {
    expect(Controls).toExist();
  });

  describe('render', () => {
    it('should render pause when started', () => {
      const controls = TestUtils.renderIntoDocument(<Controls countdownStatus="started"/>);
      const pause = TestUtils.scryRenderedDOMComponentsWithTag(controls, 'button')[0].innerHTML;

      expect(pause).toBe('Pause');
    });

    it('should render start when paused', () => {
      const controls = TestUtils.renderIntoDocument(<Controls countdownStatus="paused" />);
      const start = TestUtils.scryRenderedDOMComponentsWithTag(controls, 'button')[0].innerHTML;

      expect(start).toBe('Start');
    });
  });
});
