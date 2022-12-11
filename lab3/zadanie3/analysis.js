
import React from 'react';
import ReactDOM from 'react-dom/client';



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
  
  root.render(<Timer />);


  class HelloMessage extends React.Component {
    render() {
      return React.createElement(
        "div",
        null,
        "Hello ",
        this.props.name
      );
    }
  }
  
  root.render(React.createElement(HelloMessage, { name: "Taylor" }));


const container = document.getElementById('root') ;
const root = ReactDOM.createRoot(container);
root.render(<HelloMessage />)


