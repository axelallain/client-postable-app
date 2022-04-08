import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Image, View} from 'react-native'

import Home from '../pages/Home';
import Rents from '../pages/Rents';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator tabBarOptions={{
            showLabel: false
        }}>
            <Tab.Screen name="Home" component={Home} options={{
                headerTitle: 'Accueil',
                tabBarIcon: ({focused}) => (
                    <View>
                        <Image
                            source={require('../images/home.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#66C43E' : 'grey'
                            }}
                        />
                    </View>
                )
            }}
            />

            <Tab.Screen name="Rents" component={Rents} options={{
                headerTitle: 'Mes locations',
                tabBarIcon: ({focused}) => (
                    <View>
                        <Image
                            source={require('../images/rents.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#66C43E' : 'grey'
                            }}
                        />
                    </View>
                )
            }}
            />

            <Tab.Screen name="Account" component={Home} options={{
                headerTitle: 'Mon compte',
                tabBarIcon: ({focused}) => (
                    <View>
                        <Image
                            source={require('../images/account.png')}
                            resizeMode='contain'
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: focused ? '#66C43E' : 'grey'
                            }}
                        />
                    </View>
                )
            }}
            />
        </Tab.Navigator>
    );
}

export default Tabs;