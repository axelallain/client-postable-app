import React, { useState, useEffect } from 'react';
import {Image, TextInput, Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import TopBar from '../components/TopBar'

const ExpiredRents = props => {

  const axios = require('axios');
  const [rents, setRents] = useState([])

  const getRentsFromApiAsync = async () => {
    const response = await axios.get('http://localhost:8080/rents', {
      params: {
        username: props.route.params.username,
        status: 'expired'
      }
    });
    setRents(response.data);
    console.log(rents);
  }

  useEffect(() => {
    getRentsFromApiAsync();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Locations expirées</Text>
        { rents.map((rent) => (
          <TouchableOpacity style={styles.TouchableOpacity}>
          <Text style={styles.buttonsText}>{rent.id}</Text>
      </TouchableOpacity>
        ))}
        
    </ScrollView>
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

export default ExpiredRents;