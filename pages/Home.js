import React, { useState, useEffect } from 'react';
import {Image, TextInput, Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import TopBar from '../components/TopBar'
import auth from '@react-native-firebase/auth';

const Home = props => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  signOutFromGoogle = async () => {
    auth().signOut().then(() => console.log('User signed out!'));
  }

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if(!user) {
    return (
      <View onLayout={props.navigation.pop()}></View>
    );
  } else {
    return (
      <View style={styles.container}>
          <TextInput style={styles.search} placeholder='Rechercher une boîte sur la carte' placeholderTextColor="#777"></TextInput>
          <Image style={styles.map} source={require('../images/map.jpeg')} />
          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.TouchableOpacity}>
              <Image
                source={require('../images/homeActive.png')}
                resizeMode='contain'
                style={{
                    width: 32,
                    height: 32,
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.push('Rents', { username: props.route.params.username })} style={styles.TouchableOpacity}>
              <Image
                source={require('../images/rents.png')}
                resizeMode='contain'
                style={{
                    width: 32,
                    height: 32,
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.push('Account', { username: props.route.params.username })} style={styles.TouchableOpacity}>
            <Image
                source={require('../images/account.png')}
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
}

const styles = StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: '#f2f2f2',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: "0%"
    },

    name: {
        marginTop: "7%"
    },

    rentsText: {
        color: 'black',
        fontWeight: 'bold',
    },

    TouchableOpacity: {
        backgroundColor: 'white',
        paddingTop: "8%",
        paddingRight: "12%",
        paddingBottom: "4%",
        paddingLeft: "12%",
        width: '35%'
    },

    search: {
        width: "100%",
        paddingTop: "3%",
        paddingBottom: "3%",
        paddingLeft: "2%",
        backgroundColor: "#f2f2f2",
        borderBottomWidth: 0.2,
        borderBottomColor: 'grey'
    },

    map: {
        height: "80%",
        width: "100%"
    },

    bottomBar: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: '100%'
    }

});

export default Home;