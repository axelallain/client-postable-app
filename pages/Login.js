import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.logo}>Logo</Text>
          <Text style={styles.name}>NOM</Text>
          <TouchableOpacity style={styles.TouchableOpacity}><Text style={styles.loginText}>Se connecter avec Google</Text></TouchableOpacity>
          <Text style={styles.copyright}>Copyright 2022 - 2023 Nom. All rights reserved.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: '#064A04',
      flexDirection: 'column', // row
      alignItems: 'center',
      justifyContent: 'center', // center, space-around
      paddingTop: 50,
    },

    logo: {
        color: 'white'
    },

    name: {
        color: 'white',
        fontWeight: 'bold',
    },

    copyright: {
        color: 'white',
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
        marginTop: "65%",
        marginBottom: "70%"
    }
});