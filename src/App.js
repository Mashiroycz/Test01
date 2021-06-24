import React from 'react';
import { Button, Menu } from 'antd';
import { BrowserRouter, Link, Route } from 'react-router-dom';
// 组件引入
import SiteMsg from './pages/siteMsg/siteMsg';
import DeviceManagement from './pages/deviceManagement/deviceManagement';
// 样式信息
import iconTitle from './static/icon-title.png';
import './App.css';

const { SubMenu } = Menu;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <div className='App-header'>
            <div className='title-box'>
              <img src={iconTitle} alt='fe' />
              <span style={{ fontSize: 20, color: '#fff', verticalAlign: 'middle', fontWeight: '600' }}>
                合肥市地表水自动检测综合管理平台
              </span>
            </div>
            <div className='menu-app'>
              <Menu style={{ backgroundColor: '#0099FF' }} mode='horizontal' theme='dark'>
                <Menu.Item key='1'>数据采集</Menu.Item>
                <Menu.Item key='2'>数据管理</Menu.Item>
                <Menu.Item key='3'>质控管理</Menu.Item>
                <Menu.Item key='4'>运行维护</Menu.Item>
                <Menu.Item key='5'>统计分析</Menu.Item>
                <SubMenu key='SubMenu' title='基础配置' style={{ backgroundColor: '#0099FF' }}>
                  <Menu.Item key='setting:1'>
                    <Link to='/siteMsg'>
                      <span>站点信息</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key='setting:2'>
                    <Link to='/deviceManagement'>
                      <span>设备管理</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key='setting:3'>因子管理</Menu.Item>
                </SubMenu>
                <Menu.Item key='6'>知识库</Menu.Item>
              </Menu>
            </div>
          </div>
          <div className='content'>
            {/* 位置信息 */}
            <div>当前位置：</div>
            <Route path='/deviceManagement' component={DeviceManagement} />
            <Route path='/siteMsg' component={SiteMsg} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
