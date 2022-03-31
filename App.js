/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import TopBar from './components/TopBar';
import Login from './pages/Login'

export default class App extends React.Component {
  render() {
    return (
      <Login />
    );
  }
}