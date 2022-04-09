import React, { useState, useEffect } from 'react';
import {Image, TextInput, Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import TopBar from '../components/TopBar'
import auth from '@react-native-firebase/auth';
import MapView, { Marker } from 'react-native-maps';

const Home = props => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const axios = require('axios');
  const [letterboxes, setLetterboxes] = useState([])

  const getLetterboxesFromApiAsync = async () => {
    const response = await axios.get('http://192.168.1.17:8080/letterboxes', {
      params: {
        available: 'True'
      }
    });
    setLetterboxes(response.data);
    console.log(letterboxes);
  }

  signOutFromGoogle = async () => {
    auth().signOut().then(() => console.log('User signed out!'));
  }

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    getLetterboxesFromApiAsync();
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
          
          <MapView
            style={styles.map}
            region={{
              latitude: 49.593255007450125,
              longitude: -1.6860400241268962,
              latitudeDelta: 0.2,
              longitudeDelta: 0.2,
            }}
          >
              { letterboxes.map((letterbox) => (
              <Marker 
                key={letterbox.id}
                title={'Boîte ' + letterbox.id} 
                description={letterbox.address.toUpperCase() + ", " + letterbox.postalCode + " " + letterbox.city.toUpperCase()} 
                coordinate={{ latitude : parseFloat(letterbox.latitude) , longitude : parseFloat(letterbox.longitude) }} 
              />
              ))}

          </MapView>

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