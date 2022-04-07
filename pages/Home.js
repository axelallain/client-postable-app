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
          <TouchableOpacity onPress={() => signOutFromGoogle()} style={styles.signOutButton}><Text style={styles.rentsText}>Se déconnecter</Text></TouchableOpacity>
          <Text style={styles.name}>Bonjour, {props.route.params.fullname} !</Text>
          <TouchableOpacity onPress={() => props.navigation.push('Rents', { username: props.route.params.username })} style={styles.TouchableOpacity}><Text style={styles.rentsText}>Mes locations</Text></TouchableOpacity>
          <TextInput style={styles.search} placeholder='Rechercher' placeholderTextColor="#777"></TextInput>
          <Image style={styles.map} source={require('../images/map.jpeg')} />
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
      paddingTop: "2%"
    },

    signOutButton: {
      backgroundColor: 'white',
      paddingTop: "4%",
      paddingRight: "12%",
      paddingBottom: "4%",
      paddingLeft: "12%",
      borderRadius: 8,
      marginTop: "8%",
      marginBottom: "2%",
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 3
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
        paddingTop: "4%",
        paddingRight: "12%",
        paddingBottom: "4%",
        paddingLeft: "12%",
        borderRadius: 8,
        marginTop: "8%",
        marginBottom: "10%",
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 3
    },

    search: {
        width: "85%",
        borderBottomWidth: 1,
        paddingBottom: "2%",
        marginBottom: "7%"
    },

    map: {
        height: "54%",
        width: "100%",
        borderWidth: 0.2
    }

});

export default Home;