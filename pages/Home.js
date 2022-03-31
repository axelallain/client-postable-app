import React from 'react'
import {Image, TextInput, Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import TopBar from '../components/TopBar'

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <TopBar />
          <Text style={styles.name}>Bonjour, Username !</Text>
          <TouchableOpacity style={styles.TouchableOpacity}><Text style={styles.rentsText}>Mes locations</Text></TouchableOpacity>
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
        marginBottom: "5%"
    },

    map: {
        height: "58%",
        width: "85%",
        borderWidth: 0.2
    }

});