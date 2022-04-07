/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {Button} from 'react-native'
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
        <Screen name='Home' component={Home} options={{ 
          title: 'Accueil', 
          headerBackVisible: false, 
          gestureEnabled: false }} />
        <Screen name='Rents' component={Rents} options={{ title: 'Mes locations', headerBackTitle: 'Retour' }} />
        <Screen name='ExpiredRents' component={ExpiredRents} options={{ title: 'Locations expirées', headerBackTitle: 'Retour' }} />
        <Screen name="RentPage" component={RentPage} options={{ title: 'Détails', headerBackTitle: 'Retour' }} />
      </Navigator>
    </NavigationContainer>
  );
}

export default App;