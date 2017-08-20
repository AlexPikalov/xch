import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateWalet } from './shared/user/userActions';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    loadUserValet: () => { dispatch(updateWalet()); }
  }
};

class App extends Component {
  componentDidMount() {
    this.props.loadUserValet();
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
