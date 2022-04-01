import React from 'react'
import {Image, TextInput, Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import TopBar from '../components/TopBar'

export default class Rents extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <TopBar />
          <Text style={styles.title}>Mes locations</Text>
          <TouchableOpacity style={styles.TouchableOpacity}><Text style={styles.buttonsText}>En cours</Text></TouchableOpacity>
          <TouchableOpacity style={styles.TouchableOpacity}><Text style={styles.buttonsText}>Expirées</Text></TouchableOpacity>
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

    buttonsText: {
        color: 'black',
        fontWeight: 'bold'
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