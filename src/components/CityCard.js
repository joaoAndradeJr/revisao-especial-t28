import React, { Component } from 'react';

export default class CityCard extends Component {
  render() {
    const { city } = this.props;
    return (
      <div>{ city }</div>
    );
  }
}
