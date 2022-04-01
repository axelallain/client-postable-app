/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import TopBar from './components/TopBar'
import Login from './pages/Login'
import Home from './pages/Home'
import Rents from './pages/Rents'
import OngoingRents from './pages/OngoingRents'
import ExpiredRents from './pages/ExpiredRents'
import RentPage from './pages/RentPage'
import CreateRent from './pages/CreateRent'

export default class App extends React.Component {
  render() {
    return (
      <CreateRent />
    );
  }
}