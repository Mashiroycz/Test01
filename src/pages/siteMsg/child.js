import React from 'react';
// import { Button } from 'antd';

export default class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = (e) => {
    this.props.onChange(e.target.value);
  };

  render() {
    return (
      <div>
        <div>
          <span>请输入</span>
          <input type='text' onChange={this.onChange} />
        </div>
      </div>
    );
  }
}
