import React from 'react';
import Child from './child';

export default class Father extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: ''
    };
  }

  handleOnChange = (text) => {
    this.setState({ msg: text });
  };

  render() {
    return (
      <div>
        {this.state.msg}
        <Child onChange={this.handleOnChange} />
      </div>
    );
  }
}
