import React, { useState, useEffect } from 'react';
import {Image, TextInput, Text, View, StyleSheet, TouchableOpacity, Button} from 'react-native'
import TopBar from '../components/TopBar'
import auth from '@react-native-firebase/auth';
import MapView, { Callout, Marker } from 'react-native-maps';
import Moment from 'moment';
import 'moment/locale/fr';

const Home = props => {

  Moment.locale('fr');

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const axios = require('axios');
  const [letterboxes, setLetterboxes] = useState([])

  const getLetterboxesFromApiAsync = async () => {
    const response = await axios.get('http://192.168.1.17:8080/letterboxesall')
    .then((response) => {
      setLetterboxes(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
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
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    getLetterboxesFromApiAsync();
    const interval = setInterval(() => getLetterboxesFromApiAsync(), 100);
    return () => {
      clearInterval(interval);
      setLetterboxes([]);
    };
  }, []);

  if (initializing) return null;

  if(!user) {
    return (
      <View onLayout={props.navigation.navigate('Login')}></View>
    );
  } else {
    return (
      <View style={styles.container}>
          
          <MapView
            style={styles.map}
          >
              { letterboxes.map((letterbox) => (
              <Marker 
                key={letterbox.id}
                title={'Boîte ' + letterbox.id} 
                coordinate={{ latitude : parseFloat(letterbox.latitude) , longitude : parseFloat(letterbox.longitude) }} 
              >
                
                { letterbox.available ?
                <Callout tooltip style={styles.callout}>
                  <Text style={{ color: 'green', fontWeight: 'bold' }}>Cette boîte est disponible !</Text>
                  <Text style={{ paddingTop: 10 }}>{'Boîte ' + letterbox.id}</Text>
                  <Text>{letterbox.address.toUpperCase()}</Text>
                  <Text style={{ paddingBottom: 6 }}>{letterbox.postalCode + " " + letterbox.city.toUpperCase()}</Text>
                  <Button onPress={() => props.navigation.push('CreateRent', { 
                  username: props.route.params.username, 
                  letterbox_id:letterbox.id,
                  letterbox_address:letterbox.address,
                  letterbox_city:letterbox.city,
                  letterbox_country:letterbox.country,
                  letterbox_status:letterbox.status,
                  letterbox_latitude:letterbox.latitude,
                  letterbox_longitude:letterbox.longitude,
                  letterbox_available:letterbox.available
                  })} 
                  title="Louer cette boîte" />
                </Callout>
                :
                <Callout tooltip style={styles.callout}>
                  <Text style={{ color: 'red', fontWeight: 'bold' }}>Indisponible</Text>
                  <Text style={{ paddingTop: 10 }}>{'Boîte ' + letterbox.id}</Text>
                  <Text>{letterbox.address.toUpperCase()}</Text>
                  <Text>{letterbox.postalCode + " " + letterbox.city.toUpperCase()}</Text>
                </Callout>
                }
              </Marker>
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

    callout: {
      backgroundColor: 'white',
      padding: 15,
      borderWidth: 0.4,
      borderRadius: 10
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
        height: "85.6%",
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