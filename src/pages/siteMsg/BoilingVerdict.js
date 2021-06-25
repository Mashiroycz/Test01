import React from 'react';

class BoilingVerdict extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let m;
    if (this.props.celsius >= 100) {
      m = <p>水沸腾了</p>;
    } else {
      m = <p>水将不会沸腾.</p>;
    }
    return (
      <div>
        <div>{m}</div>
      </div>
    );
  }
}

export default BoilingVerdict;
