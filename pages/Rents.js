import React, { useState, useEffect } from 'react';
import {Image, TextInput, Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import TopBar from '../components/TopBar'
import axios from 'axios';
import Moment from 'moment'

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
    });
    setRents(response.data);
    console.log(rents);
  }

  useEffect(() => {
    getRentsFromApiAsync()
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
            letterbox_status:rent.letterbox.status
            })} style={styles.ongoingRent}>

            <Text style={styles.activeRentText}>Location en cours</Text>
            <Text style={styles.buttonsText}>Letterbox {rent.letterbox.id}</Text>
            <Text style={styles.buttonsText}>{rent.letterbox.address}</Text>
            <Text style={styles.buttonsText}>{rent.letterbox.city}, {rent.letterbox.country}</Text>
            <Text style={styles.buttonsText}>Depuis le : {Moment(rent.startingDate).format('DD-MM-Y à hh:mm')}</Text>
            <Text style={styles.buttonsText}>Expiration le : {Moment(rent.endingDate).format('DD-MM-Y à hh:mm')}</Text>
          </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => props.navigation.push('ExpiredRents', { username: props.route.params.username })} style={styles.TouchableOpacity}><Text style={styles.expiredButtonText}>Expirées</Text></TouchableOpacity>
      </View>
    );
  }

  if(rents.length <= 0) {
    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.ongoingRent}>
            <Text style={styles.activeRentTextEmpty}>Aucune location en cours</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.push('ExpiredRents', { username: props.route.params.username })} style={styles.TouchableOpacity}><Text style={styles.expiredButtonText}>Expirées</Text></TouchableOpacity>
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
      marginTop: "8%",
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