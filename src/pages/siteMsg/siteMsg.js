import React from 'react';
import { Button } from 'antd';
import MyClock from './myClock';
import Calculator from './Calculator';
import Father from './father';
import './siteMsg.css';
import iconTitle from '../../static/icon-title.png';

class SiteMsg extends React.Component {
  constructor(props) {
    super(props);
    this.flag = 0;
    this.state = { student: '请启动', studentList2: ['1', '2', '3', '4', '5', '6'] };
  }

  componentDidMount() {
    console.log('父组件执行顺序');
  }

  handleStart = () => {
    const that = this;
    this.timer = setInterval(() => {
      console.log(`Flag： ${this.flag}`);
      this.setState({ student: that.state.studentList2[this.flag] });
      if (this.flag < this.state.studentList2.length - 1) {
        this.flag += 1;
      } else {
        this.flag = 0;
      }
    }, 1000);
  };

  // 暂停
  handlePause = () => {
    clearInterval(this.timer);
  };

  handleEnd = () => {
    this.flag = 0;
    clearInterval(this.timer);
    this.setState({ student: '请启动' });
  };

  render() {
    const { student } = this.state;
    const numbers = [1, 2, 3, 4, 5];
    const studentList = [
      { name: '张三', age: '16' },
      { name: '周一', age: '18' }
    ];
    const listItems = studentList.map((item) => {
      item.name = '周文王';
      return (
        <li key={item.age}>
          {item.name}
          {item.age}
        </li>
      );
    });
    // console.log(listItems);
    return (
      <div style={{ color: 'red' }}>
        <ul>{listItems}</ul>
        <div>{student}</div>
        <Button onClick={this.handleStart}>启动</Button>
        <Button onClick={this.handlePause}>暂停</Button>
        <Button onClick={this.handleEnd}>终止</Button>
        <MyClock color='green' />
        <Calculator />
        <hr />
        <Father />
      </div>
    );
  }
}
export default SiteMsg;
