import React, { useState, useEffect } from 'react';
import {Image, TextInput, Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import TopBar from '../components/TopBar'
import axios from 'axios';
import Moment from 'moment'
import auth from '@react-native-firebase/auth';

const Rents = props => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  Moment.locale('fr');

  const axios = require('axios');
  const [rents, setRents] = useState([])

  const getRentsFromApiAsync = async () => {
    const response = await axios.get('http://192.168.1.17:8080/rents', {
      params: {
        username: props.route.params.username,
        status: 'ongoing'
      }
    })
    .then((response) => {
      setRents(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    getRentsFromApiAsync();
    const interval = setInterval(() => getRentsFromApiAsync(), 100);
    return () => {
      clearInterval(interval);
      setRents([]);
    };
  }, []);

  if(rents.length > 0) {
    return (
      <View style={styles.container}>
          { rents.map((rent) => (

          <TouchableOpacity key={rent.id} onPress={() => props.navigation.push('RentPage', { 
            username: props.route.params.username, 
            rent_id: rent.id,
            letterbox_id:rent.letterbox.id,
            letterbox_address:rent.letterbox.address,
            letterbox_city:rent.letterbox.city,
            letterbox_country:rent.letterbox.country,
            letterbox_status:rent.letterbox.status,
            letterbox_latitude:rent.letterbox.latitude,
            letterbox_longitude:rent.letterbox.longitude
            })} style={styles.ongoingRent}>

            <Text style={styles.activeRentText}>Location en cours</Text>
            <Text style={styles.buttonsText}>Boîte {rent.letterbox.id}</Text>
            <Text style={styles.buttonsText}>{rent.letterbox.address.toUpperCase()}</Text>
            <Text style={styles.buttonsText}>{rent.letterbox.city.toUpperCase()}, {rent.letterbox.country.toUpperCase()}</Text>
            <Text style={styles.buttonsText}>Depuis le : {Moment(rent.startingDate).format('DD-MM-Y à HH:mm')}</Text>
            <Text style={styles.buttonsText}>Expiration le : {Moment(rent.endingDate).format('DD-MM-Y à HH:mm')}</Text>
          </TouchableOpacity>
          ))}

          <TouchableOpacity onPress={() => props.navigation.push('ExpiredRents', { username: props.route.params.username })} style={styles.TouchableOpacity}>
            <Text style={styles.expiredButtonText}>Expirées</Text>
          </TouchableOpacity>

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

            <TouchableOpacity style={styles.bottomBarButtons}>
              <Image
                source={require('../images/rentsActive.png')}
                resizeMode='contain'
                style={{
                    width: 32,
                    height: 32,
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('Account', { username: props.route.params.username })} style={styles.bottomBarButtons}>
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

  if(rents.length <= 0) {
    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.ongoingRent}>
            <Text style={styles.activeRentTextEmpty}>Aucune location en cours</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => props.navigation.push('ExpiredRents', { username: props.route.params.username })} style={styles.TouchableOpacity}>
            <Text style={styles.expiredButtonText}>Expirées</Text>
          </TouchableOpacity>

          <View style={styles.bottomBarExpired}>
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

            <TouchableOpacity style={styles.bottomBarButtons}>
              <Image
                source={require('../images/rentsActive.png')}
                resizeMode='contain'
                style={{
                    width: 32,
                    height: 32,
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('Account', { username: props.route.params.username })} style={styles.bottomBarButtons}>
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
    bottomBar: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: '30%',
      marginTop: '103%'
    },

    bottomBarExpired: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: '30%',
      marginTop: '131%'
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

    title: {
        marginTop: "7%",
        fontWeight: 'bold',
        fontSize: 16
    },

    activeRentText: {
      color: 'green',
      marginTop: "0.4%",
      marginBottom: "0.4%",
      fontWeight: 'bold',
      marginBottom: "5%"
    },

    expiredRentText: {
      color: 'red',
      marginTop: "0.4%",
      marginBottom: "0.4%",
      fontWeight: 'bold',
      marginBottom: "5%"
    },

    activeRentTextEmpty: {
      color: 'green',
      marginTop: "0.4%",
      marginBottom: "0.4%",
      fontWeight: 'bold'
    },

    buttonsText: {
      color: 'black',
      marginTop: "0.4%",
      marginBottom: "0.4%"
    },

    expiredButtonText: {
        color: 'black',
        fontWeight: 'bold'
    },

    ongoingRent: {
      backgroundColor: 'white',
      paddingTop: "4%",
      paddingRight: "10%",
      paddingBottom: "4%",
      paddingLeft: "10%",
      marginTop: "0%",
      marginBottom: "0%",
      width: "100%",
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 3
    },

    expiredRent: {
      backgroundColor: 'white',
      paddingTop: "4%",
      paddingRight: "10%",
      paddingBottom: "4%",
      paddingLeft: "10%",
      marginTop: "0%",
      marginBottom: "0%",
      width: "100%",
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 3
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

export default Rents;