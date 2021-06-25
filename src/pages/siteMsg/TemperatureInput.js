import React from 'react';

const scaleNames = {
  c: '摄氏度',
  f: '华氏度'
};

export default class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    // this.state = { temperature: '' };
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
    // this.setState({ temperature: e.target.value });
  }

  render() {
    // const { temperature } = this.state;
    const { scale, temperature } = this.props;
    return (
      <div>
        <span>{`请使用${scaleNames[scale]}输入:`}</span>
        <input value={temperature} onChange={this.handleChange} />
      </div>
    );
  }
}
