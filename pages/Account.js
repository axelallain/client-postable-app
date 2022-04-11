import React, { useState, useEffect } from 'react';
import {Image, TextInput, Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import TopBar from '../components/TopBar'
import axios from 'axios';
import Moment from 'moment'
import auth from '@react-native-firebase/auth';

const Account = props => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Removing the async from this function fixed the ForwardRef warning on Login page.
  function signOutFromGoogle() {
    auth().signOut().then(() => console.log('User signed out!'));
    props.navigation.navigate('Login');
  }

  return(
    <View style={styles.container}>
        <TouchableOpacity onPress={() => signOutFromGoogle()} style={styles.TouchableOpacity}><Text style={styles.expiredButtonText}>Se déconnecter</Text></TouchableOpacity>
        <View style={styles.bottomBar}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Home', { username: props.route.params.username })} style={styles.bottomBarButtons}>
              <Image
                source={require('../images/home.png')}
                resizeMode='contain'
                style={{
                    width: 32,
                    height: 32,
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('Rents', { username: props.route.params.username })} style={styles.bottomBarButtons}>
              <Image
                source={require('../images/rents.png')}
                resizeMode='contain'
                style={{
                    width: 32,
                    height: 32,
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.bottomBarButtons}>
            <Image
                source={require('../images/accountActive.png')}
                resizeMode='contain'
                style={{
                    width: 32,
                    height: 32,
                }}
              />
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    bottomBar: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: '30%',
      marginTop: '144.5%'
    },

    bottomBarButtons: {
      backgroundColor: 'white',
      paddingTop: "8%",
      paddingRight: "12%",
      paddingBottom: "4%",
      paddingLeft: "12%",
      width: '35%'
  },

    container: {
      height: "100%",
      backgroundColor: '#f2f2f2',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: "0%"
    },

    TouchableOpacity: {
        backgroundColor: 'white',
        paddingTop: "4%",
        paddingRight: "16%",
        paddingBottom: "4%",
        paddingLeft: "16%",
        borderRadius: 8,
        marginTop: "8%",
        marginBottom: "0%",
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 3
    }

});

export default Account;