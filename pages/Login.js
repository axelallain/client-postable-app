import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'

export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.name}>Nom</Text>
          <TouchableOpacity style={styles.TouchableOpacity}><Text style={styles.loginText}>Se connecter avec Google</Text></TouchableOpacity>
          <Text style={styles.copyright}>Copyright 2022 - 2023 Nom. All rights reserved.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: '#f2f2f2',
      flexDirection: 'column', // row
      alignItems: 'center',
      justifyContent: 'center', // center, space-around
      paddingTop: 50,
    },

    name: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 25,
        fontFamily: 'Futura'
    },

    copyright: {
        color: 'black',
        fontSize: 11
    },

    loginText: {
        color: 'black',
        fontWeight: 'bold',
    },

    TouchableOpacity: {
        backgroundColor: 'white',
        paddingTop: 20,
        paddingRight: 40,
        paddingBottom: 20,
        paddingLeft: 40,
        borderRadius: 8,
        marginTop: "70%",
        marginBottom: "80%",
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 3
    }
});