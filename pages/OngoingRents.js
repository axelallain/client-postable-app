import React, { useState, useEffect } from 'react';
import {Image, TextInput, Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import TopBar from '../components/TopBar'
import axios from 'axios';

const OngoingRents = props => {

  const axios = require('axios');

  const getRentsFromApiAsync = async () => {
    const response = await axios.get('http://localhost:8080/rents', {
      params: {
        username: props.route.params.username,
        status: 'ongoing'
      }
    });
    console.log(response.data);
  }

  return (
    <View onLayout={() => getRentsFromApiAsync()} style={styles.container}>
        <Text style={styles.title}>Locations en cours</Text>
        <TouchableOpacity style={styles.TouchableOpacity}>
            <Text style={styles.buttonsText}>
            {`Location ID
Adresse
Ville, Pays

Du 01-01-22 au 08-01-22 à 10h10`}
            </Text>
        </TouchableOpacity>
    </View>
  );
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

    buttonsText: {
        color: 'black'
    },

    TouchableOpacity: {
        backgroundColor: 'white',
        paddingTop: "4%",
        paddingRight: "10%",
        paddingBottom: "4%",
        paddingLeft: "10%",
        borderRadius: 8,
        marginTop: "8%",
        marginBottom: "0%",
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 3
    }

});

export default OngoingRents;