import React from 'react'
import {Image, TextInput, Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import TopBar from '../components/TopBar'

export default class RentPage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
          <TopBar />
          <Text style={styles.title}>Fiche de la location ID</Text>
          <TouchableOpacity style={styles.TouchableOpacity}>
              <Text style={styles.buttonsText}>
              {`Letterbox ID
Adresse
Ville, Pays

Du 01-01-22 au 08-01-22 à 10h10`}
              </Text>
          </TouchableOpacity>
          <Text style={styles.delete}>Supprimer cette location</Text>
          <Image style={styles.map} source={require('../images/map.jpeg')} />
          <TouchableOpacity style={styles.lockButton}><Text style={styles.lockText}>DEVERROUILLER</Text></TouchableOpacity>
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
    },

    delete: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 13,
        marginTop: "8%",
        marginBottom: "7%"
    },

    map: {
        height: "40%",
        width: "80%",
        borderWidth: 0.2
    },

    lockButton: {
        backgroundColor: '#0094FF',
        paddingTop: "5%",
        paddingRight: "25%",
        paddingBottom: "5%",
        paddingLeft: "25%",
        borderRadius: 8,
        marginTop: "8%",
        marginBottom: "0%",
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 3
    },

    lockText: {
        color: 'white',
        fontWeight: 'bold'
    },

});