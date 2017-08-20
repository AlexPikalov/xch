import React, { Component } from 'react';

import { RateDropdown } from './RateDropdown';

import './TopPanel.css';

export default class TopPanel extends Component {
  render() {
    return (
      <div className="top-panel-container">
        <button type="button" onClick={this.props.onCancel}>Cancel</button>

        <RateDropdown {...this.props} />

        <button
          type="button"
          disabled={this.props.exchangeDisabled}
          onClick={this.props.onExchange}>
          Exchange
        </button>
      </div>
    );
  }
}
