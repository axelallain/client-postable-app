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
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Screen name='Home' component={Home} options={{ headerBackVisible: false, gestureEnabled: false }} />
        <Screen name='Rents' component={Rents} />
        <Screen name='OngoingRents' component={OngoingRents} />
        <Screen name='ExpiredRents' component={ExpiredRents} />
      </Navigator>
    </NavigationContainer>
  );
}

export default App;