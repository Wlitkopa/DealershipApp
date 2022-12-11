import logo from './logo.svg';
import './App.css';
import React from 'react';


class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  tick() {
    this.setState(state => ({
      seconds: state.seconds + 1
    }));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        Seconds: {this.state.seconds}
      </div>
    );
  }
}
  


class HelloMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
    this.counter_state = {cnt: this.props.cnt }
    // console.log("this.props.cnt: " + this.props.cnt)

    // console.log("this.counter_state.cnt: " + this.counter_state.cnt)
    this.components_len = {comp_len: this.props.comp_len}
        console.log("this.components_len.comp_len: " + this.components_len.comp_len)

  }

  tick() {
    this.setState(counter_state => ({
      seconds: this.counter_state.cnt
    }));
  }

  componentDidMount() {
    let temp = (this.components_len.comp_len - this.counter_state.cnt)
    console.log("this.counter_state.cnt: " + this.counter_state.cnt + " temp: " + temp)
    this.timeout = setTimeout(() => this.tick(), (1000*(temp)))
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return (
      <div>
        Seconds: {this.state.seconds}
      </div>
    );
  }

  // render() {
  //   return <div>Hello {this.props.name}</div>;
  // }
}

 


export default HelloMessage




