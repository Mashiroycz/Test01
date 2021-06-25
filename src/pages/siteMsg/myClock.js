import React from 'react';
import { Button } from 'antd';
import { Divider } from '_antd@4.16.3@antd';

class MyClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nowTime: '' };
  }

  componentDidMount() {
    console.log('子组件执行顺序', this.props);
    this.getNowTime();
    this.timer = setInterval(this.getNowTime, 1000);
    // this.timer = setInterval(this.getNowTime(), 1000);
  }

  handleClick = () => {
    this.timer = setInterval(this.getNowTime, 1000);
  };

  getNowTime = () => {
    const nowDate = new Date();
    const hours = nowDate.getHours().toString();
    const minutes = nowDate.getMinutes().toString();
    const seconds = nowDate.getSeconds().toString();
    const nowTime2 = `当前时间：${hours}:${minutes}:${seconds}`;
    this.setState({ nowTime: nowTime2 });
  };

  render() {
    const { nowTime } = this.state;
    return (
      <div>
        <div style={{ color: this.props.color }}>{nowTime}</div>
        <Button onClick={this.handleClick}>点击</Button>
      </div>
    );
  }
}

export default MyClock;
