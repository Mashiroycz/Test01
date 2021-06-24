import React from 'react';
import './siteMsg.css';
import iconTitle from '../../static/icon-title.png';

class SiteMsg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const numbers = [1, 2, 3, 4, 5];
    const studentList = [
      { name: '张三', age: '16' },
      { name: '周一', age: '18' }
    ];
    studentList.map((item) => {
      item.name = '周文王';
      return item;
    });
    console.log(studentList);
    const testLi = [];
    return (
      <div style={{ color: 'red' }}>
        <ul>{testLi}</ul>
        <div className='wrapper'>
          <div className='box1'>1</div>
          <div className='box2'>
            <img className='boxImg' alt='图片' src={iconTitle} />
          </div>
          <div className='box3'>3</div>
        </div>
      </div>
    );
  }
}
export default SiteMsg;
