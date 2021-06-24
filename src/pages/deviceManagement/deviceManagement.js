import React from 'react';
import { Table, Space, Button, Form, Input, Modal, Row, Col, Checkbox } from 'antd';
import './deviceManagement.css';

const { confirm } = Modal;
class DeviceManagement extends React.Component {
  constructor(props) {
    super(props);
    this.myform = React.createRef();
    this.state = {
      modalTitle: '新增',
      addVisible: false,
      nowDeviceNumber: -1,
      factorAddVisible: false,
      currentFactorList: [],
      tempFactorList: [],
      factorList: [
        {
          key: '1',
          factorName: '因子名称1',
          otherName: '别名1',
          factorCode: '1001',
          chemistrySign: 'Sn',
          factorUnit: 'mol',
          factorAccuracy: '0.01',
          factorType: '类型2',
          factorRange: '1-15',
          isChecked: false
        },
        {
          key: '2',
          factorName: '因子名称2',
          otherName: '别名s1',
          factorCode: '1002',
          chemistrySign: 'Sn',
          factorUnit: 'mol',
          factorAccuracy: '0.01',
          factorType: '类型12',
          factorRange: '1-15',
          isChecked: false
        },
        {
          key: '3',
          factorName: '因子名称24',
          otherName: 's1',
          factorCode: '1003',
          chemistrySign: 'Sn',
          factorUnit: 'mol',
          factorAccuracy: '0.01',
          factorType: '类型33',
          factorRange: '1-15',
          isChecked: false
        }
      ],
      dataSource: [
        {
          key: '1',
          deviceNumber: '21544',
          deviceName: '检测器',
          deviceType: '设备类型1',
          buyDate: '2018-2-10',
          deadDate: '2021-6-28',
          address: '合肥市高新区',
          siteName: '红岸一号',
          factorObjList: [
            {
              key: '3',
              factorName: '因子名称24',
              otherName: 's1',
              factorCode: '1003',
              chemistrySign: 'Sn',
              factorUnit: 'mol',
              factorAccuracy: '0.01',
              factorType: '类型33',
              factorRange: '1-15',
              isChecked: true
            }
          ]
        },
        {
          key: '2',
          deviceNumber: '21344',
          deviceName: '显示器',
          deviceType: '设备类型2',
          buyDate: '2018-2-10',
          deadDate: '2022-6-28',
          address: '合肥市浦口区',
          siteName: '红岸一号',
          factorObjList: []
        },
        {
          key: '3',
          deviceNumber: '21542',
          deviceName: '显示器',
          deviceType: '设备类型2',
          buyDate: '2018-2-10',
          deadDate: '2022-6-28',
          address: '南京市玄武区',
          siteName: '红岸一号',
          factorObjList: []
        },
        {
          key: '4',
          deviceNumber: '20002',
          deviceName: '显示器',
          deviceType: '设备类型2',
          buyDate: '2018-2-10',
          deadDate: '2022-6-28',
          address: '东京市13区',
          siteName: '红岸二号',
          factorObjList: []
        },
        {
          key: '5',
          deviceNumber: '20004',
          deviceName: '显示器',
          deviceType: '设备类型2',
          buyDate: '2018-2-10',
          deadDate: '2022-6-28',
          address: '南京市玄武区',
          siteName: '红岸二号',
          factorObjList: []
        }
      ]
    };
  }

  componentDidMount() {
    const that = this;
    console.log('Mount---------------');
    this.setData((userInfo) => {
      if (userInfo.id === 1) {
        console.log('您好', userInfo.name);
      } else {
        console.log('请登录');
      }
    });
    console.log('Mount---------------');
    this.setState({ factorListCopy: this.deepCopy(that.state.factorList) });
    // this.setState({ currentFactorList: this.deepCopy(arrTemp) });
    // this.setState({ tempFactorList: this.deepCopy(arrTemp) });
  }

  handleAddCancel = () => {
    this.setState({ addVisible: false });
  };

  // 修改新增设备信息的确认事件
  handleAddOK = () => {
    const that = this;
    const { dataSource } = this.state;
    if (this.state.modalTitle === '新增') {
      this.myform.current
        .validateFields()
        .then((values) => {
          console.log(values);
          // 新增的情况添加key，所属区域address，站点名称siteName信息
          that.setState({
            dataSource: [
              ...dataSource,
              {
                ...values,
                key: values.deviceNumber,
                address: '',
                siteName: '',
                factorObjList: that.state.currentFactorList
              }
            ]
          });
        })
        .catch((errorInfo) => {
          console.log(errorInfo);
        });
    }
    if (this.state.modalTitle === '修改') {
      let obj = {};
      let indexObj = -1;
      this.state.dataSource.forEach((item, index) => {
        if (this.state.nowDeviceNumber === item.deviceNumber) {
          obj = { ...item };
          indexObj = index;
        }
      });
      this.myform.current
        .validateFields()
        .then((values) => {
          console.log(values);
          const newData = [...dataSource];
          newData[indexObj] = {
            ...values,
            factorObjList: that.state.currentFactorList,
            key: obj.key,
            address: obj.address,
            siteName: obj.siteName
          };
          // 新增的情况添加key，所属区域address，站点名称siteName信息
          that.setState({
            dataSource: [...newData]
          });
        })
        .catch((errorInfo) => {
          console.log(errorInfo);
        });
    }
    // this.setState({ addVisible: false });
  };

  edit = (index) => (event) => {
    // eslint-disable-next-line react/destructuring-assignment
    const b = this.state.editVisible;
    this.setState({ editVisible: true });
    const a = this.state.editVisible;
    // eslint-disable-next-line react/destructuring-assignment
    console.log(index, this.state.editVisible, b, a);
  };

  deleteItem = (index) => (e) => {
    const that = this;
    confirm({
      title: '确认删除此设备吗?',
      okText: '确认删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        const newData = [...that.state.dataSource];
        newData.splice(index, 1);
        that.setState({ dataSource: newData });
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  addItem = (actionType, deviceNumber) => (e) => {
    // const { form } = Form.useForm();
    // this.form.setFieldsValue({
    //   number: 's12'
    // });
    this.setState({ addVisible: true }, () => {
      if (actionType === 'edit') {
        let obj = {};
        this.state.dataSource.forEach((item) => {
          if (item.deviceNumber === deviceNumber) {
            obj = { ...item };
          }
        });
        this.setState({ nowDeviceNumber: deviceNumber });
        this.myform.current.setFieldsValue(obj);
        // 设置currentList
        console.log(obj, 'obj=');
        this.setState({ currentFactorList: obj.factorObjList });
        this.setState({ modalTitle: '修改' });
      } else {
        this.myform.current.resetFields();
        this.setState({ currentFactorList: [] });
        this.setState({ modalTitle: '新增' });
      }
    });
  };

  chooseFactor = () => {
    const that = this;
    // 写一个初始化false条件，目前加进去的是true。(直接使用原始列表改吗)
    const newList = this.deepCopy(that.state.factorList);
    // 先把所有的copylist的truefalse制成fasle
    this.setState({ factorListCopy: newList });
    console.log(newList, this.state.currentFactorList, '测试');
    this.state.currentFactorList.forEach((item, index) => {
      newList.forEach((item2) => {
        if (item.factorCode === item2.factorCode) {
          item2.isChecked = true;
          console.log(item2, 'item=');
        }
      });
    });
    // 再currentList来调整copyList
    this.setState({ factorListCopy: newList }, () => {
      console.log('执行顺序1', this.state.factorListCopy);
    });
    console.log(this.state.factorListCopy, '测试2');
    this.setState({ factorAddVisible: true });
    this.setState({ tempFactorList: that.state.currentFactorList });
    console.log(this.state.factorAddVisible);
  };

  handleFactorAddOK = () => {
    const that = this;
    this.setState({ currentFactorList: [...that.state.tempFactorList] });
    this.setState({ factorAddVisible: false });
  };

  handleFactorAddCancel = () => {
    this.setState({ factorAddVisible: false });
  };

  setData = (callback) => {
    setTimeout(() => {
      // 假设我们获取到数据info
      const info = {
        id: 1,
        name: '张三'
      }; // 得到数据以后执行函数方法
      callback(info); // 这个就是回调函数，得到用户信息后去验证他的权限
    }, 2000);
  };

  // componentWillMount = () => {
  //   console.log('1');
  // };

  deepCopy = (arr) => JSON.parse(JSON.stringify(arr));

  render() {
    const {
      dataSource,
      factorList,
      nowDeviceNumber,
      factorListCopy,
      modalTitle,
      addVisible,
      factorAddVisible,
      currentFactorList,
      tempFactorList
    } = this.state;
    const layout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    };

    const columns = [
      {
        title: '序号',
        dataIndex: 'number',
        key: 'number',
        align: 'center',
        render: (text, record, index) => (
          <>
            <span>{index + 1}</span>
          </>
        )
      },
      {
        title: '设备编号',
        dataIndex: 'deviceNumber',
        key: 'deviceNumber',
        align: 'center'
      },
      {
        title: '设备名称',
        dataIndex: 'deviceName',
        key: 'deviceName',
        align: 'center'
      },
      {
        title: '设备型号',
        dataIndex: 'deviceType',
        key: 'deviceType',
        align: 'center'
      },
      {
        title: '购买日期',
        dataIndex: 'buyDate',
        key: 'buyDate',
        align: 'center'
      },
      {
        title: '质保期',
        dataIndex: 'deadDate',
        key: 'deadDate',
        align: 'center'
      },
      {
        title: '所属区域',
        dataIndex: 'address',
        key: 'address',
        align: 'center'
      },
      {
        title: '站点名称',
        dataIndex: 'siteName',
        key: 'siteName',
        align: 'center'
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        render: (text, record, index) => (
          <>
            <Space>
              <Button>详情</Button>
              <Button onClick={this.addItem('edit', record.deviceNumber)}>修改</Button>
              <Button onClick={this.deleteItem(index)}>删除</Button>
              <Button>复制</Button>
            </Space>
          </>
        )
      }
    ];
    const columnsFactor = [
      {
        title: '序号',
        dataIndex: 'factorNumber',
        key: 'factorNumber',
        align: 'center',
        render: (text, record, index) => (
          <>
            <div>{index + 1}</div>
          </>
        )
      },
      {
        title: '因子名称',
        dataIndex: 'factorName',
        key: 'factorName',
        align: 'center'
      },
      {
        title: '因子别名',
        dataIndex: 'otherName',
        key: 'otherName',
        align: 'center'
      },
      {
        title: '因子编码',
        dataIndex: 'factorCode',
        key: 'factorCode',
        align: 'center'
      },
      {
        title: '化学符号',
        dataIndex: 'chemistrySign',
        key: 'chemistrySign',
        align: 'center'
      },
      {
        title: '因子单位',
        dataIndex: 'factorUnit',
        key: 'factorUnit',
        align: 'center'
      },
      {
        title: '因子精度',
        dataIndex: 'factorAccuracy',
        key: 'factorAccuracy',
        align: 'center'
      },
      {
        title: '因子类型',
        dataIndex: 'factorType',
        key: 'factorType',
        align: 'center'
      },
      {
        title: '因子量程',
        dataIndex: 'factorRange',
        key: 'factorRange',
        align: 'center'
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        render: (text, record, index) => (
          <>
            <Space>
              <Button
                onClick={() => {
                  console.log(record);
                }}
              >
                详情
              </Button>
              <Button
                onClick={() => {
                  const that = this;
                  const newData = [...that.state.currentFactorList];
                  newData.splice(index, 1);
                  this.setState({ currentFactorList: newData });
                }}
              >
                删除
              </Button>
            </Space>
          </>
        )
      }
    ];
    const columnsFactorTwo = [
      {
        title: '序号',
        dataIndex: 'factorNumber',
        key: 'factorNumber',
        align: 'center',
        render: (text, record, index) => (
          <>
            <div>{index + 1}</div>
          </>
        )
      },
      {
        title: '因子名称',
        dataIndex: 'factorName',
        key: 'factorName',
        align: 'center'
      },
      {
        title: '因子别名',
        dataIndex: 'otherName',
        key: 'otherName',
        align: 'center'
      },
      {
        title: '因子编码',
        dataIndex: 'factorCode',
        key: 'factorCode',
        align: 'center'
      },
      {
        title: '化学符号',
        dataIndex: 'chemistrySign',
        key: 'chemistrySign',
        align: 'center'
      },
      {
        title: '因子单位',
        dataIndex: 'factorUnit',
        key: 'factorUnit',
        align: 'center'
      },
      {
        title: '因子精度',
        dataIndex: 'factorAccuracy',
        key: 'factorAccuracy',
        align: 'center'
      },
      {
        title: '因子类型',
        dataIndex: 'factorType',
        key: 'factorType',
        align: 'center'
      },
      {
        title: '因子量程',
        dataIndex: 'factorRange',
        key: 'factorRange',
        align: 'center'
      },
      {
        title: '选择',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        render: (text, record, index) => (
          <>
            <Checkbox
              value={record}
              checked={record.isChecked}
              onChange={(e) => {
                console.log(record.isChecked, 'checkedNow');
                const newList = [...factorListCopy];
                newList[index].isChecked = !newList[index].isChecked;
                this.setState({ factorListCopy: newList }); // 这步是更新视图，修改因子表选择框内容
                // firstFactorList()[index].isChecked = !firstFactorList()[index].isChecked;
                // console.log(firstFactorList()[index].isChecked);
                if (record.isChecked) {
                  this.setState({ tempFactorList: [...tempFactorList, e.target.value] });
                } else {
                  const newData = [...tempFactorList];
                  newData.forEach((item, indexNewData) => {
                    console.log(record.key, item.key);
                    if (record.key === item.key) {
                      newData.splice(indexNewData, 1);
                    }
                  });
                  console.log(newData);
                  this.setState({ tempFactorList: newData });
                }
                // this.setState({ factorList: newList });
              }}
            />
          </>
        )
      }
    ];
    const columnsFactorThree = [
      {
        title: '序号',
        dataIndex: 'factorNumber',
        key: 'factorNumber',
        align: 'center',
        render: (text, record, index) => (
          <>
            <div>{index + 1}</div>
          </>
        )
      },
      {
        title: '因子名称',
        dataIndex: 'factorName',
        key: 'factorName',
        align: 'center'
      },
      {
        title: '因子别名',
        dataIndex: 'otherName',
        key: 'otherName',
        align: 'center'
      },
      {
        title: '因子编码',
        dataIndex: 'factorCode',
        key: 'factorCode',
        align: 'center'
      },
      {
        title: '化学符号',
        dataIndex: 'chemistrySign',
        key: 'chemistrySign',
        align: 'center'
      },
      {
        title: '因子单位',
        dataIndex: 'factorUnit',
        key: 'factorUnit',
        align: 'center'
      },
      {
        title: '因子精度',
        dataIndex: 'factorAccuracy',
        key: 'factorAccuracy',
        align: 'center'
      },
      {
        title: '因子类型',
        dataIndex: 'factorType',
        key: 'factorType',
        align: 'center'
      },
      {
        title: '因子量程',
        dataIndex: 'factorRange',
        key: 'factorRange',
        align: 'center'
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        render: (text, record, index) => (
          <>
            <Space>
              <Button
                onClick={() => {
                  const newData = [...tempFactorList];
                  // 1.删除此表格中的所选项
                  console.log(record);
                  newData.forEach((item, indexNewData) => {
                    if (item.key === record.key) {
                      newData.splice(indexNewData, 1);
                    }
                  });
                  this.setState({ tempFactorList: newData });
                  // 2.删除上个表格check选项
                  const newList = [...factorListCopy];
                  newList.forEach((item, indexNewList) => {
                    if (item.key === record.key) {
                      item.isChecked = !item.isChecked;
                    }
                  });
                  this.setState({ factorListCopy: newList });
                }}
              >
                移除
              </Button>
            </Space>
          </>
        )
      }
    ];
    const form = (
      <Form name='customized_form_controls' layout='inline'>
        <Form.Item name='deviceNumber' label='设备编号'>
          <Input />
        </Form.Item>
        <Form.Item name='deviceName' label='设备名称'>
          <Input />
        </Form.Item>
        <Form.Item name='deviceType' label='设备型号'>
          <Input />
        </Form.Item>
        <Form.Item name='address' label='所属区域'>
          <Input />
        </Form.Item>
        <Form.Item name='siteName' label='站点名称'>
          <Input />
        </Form.Item>
        <Space>
          <Button type='primary'>
            <span>查询</span>
          </Button>
          <Button type='primary' onClick={this.addItem('add')}>
            <span>新增</span>
          </Button>
        </Space>
      </Form>
    );
    const modalAdd = (
      <Modal
        title={modalTitle}
        visible={addVisible}
        onOk={this.handleAddOK}
        onCancel={this.handleAddCancel}
        okText='确认'
        cancelText='取消'
        width={1000}
      >
        <div className='basicMsg'>
          <span className='basicMsg-title'>基本信息</span>
        </div>
        <Form {...layout} name='add_divice_form' ref={this.myform}>
          <Row>
            <Col span={12}>
              <Form.Item
                name='deviceNumber'
                label='设备编号'
                rules={[{ required: true, message: '不能为空' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='deviceName' label='设备名称' rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item name='deviceType' label='设备型号' rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='buyDate' label='购买日期' rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item name='deadDate' label='质保期(天)'>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='week' label='检测周期(天)'>
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className='basicMsg'>
          <span className='basicMsg-title'>因子信息</span>
          <Button type='link' onClick={this.chooseFactor}>
            选择因子
          </Button>
        </div>
        <div className='table-wrapper'>
          <Table columns={columnsFactor} dataSource={currentFactorList} bordered='true' />
        </div>
        <div className='basicMsg'>
          <span className='basicMsg-title'>站点列表</span>
        </div>
      </Modal>
    );
    const modalFactor = (
      <Modal
        title='修改'
        visible={factorAddVisible}
        onOk={this.handleFactorAddOK}
        onCancel={this.handleFactorAddCancel}
        okText='确认'
        cancelText='取消'
        width={900}
      >
        <div className='factorMsg'>
          <span className='factorMsg-title'>因子信息</span>
        </div>
        <Table columns={columnsFactorTwo} dataSource={factorListCopy} bordered='true' />
        <div className='factorMsg'>
          <span className='factorMsg-title'>因子信息</span>
        </div>
        <Table columns={columnsFactorThree} dataSource={tempFactorList} bordered='true' />
        <div>11</div>
      </Modal>
    );

    return (
      <div className='deviceManagement-model'>
        <div className='action-wrapper'>{form}</div>
        <div className='show-wrapper'>
          <Table dataSource={dataSource} columns={columns} bordered='true' />
          {modalAdd}
        </div>
        {modalFactor}
      </div>
    );
  }
}
export default DeviceManagement;
