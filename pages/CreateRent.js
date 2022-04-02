import React from 'react'
import {Image, TextInput, Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import TopBar from '../components/TopBar'
import { Slider } from "@miblanchard/react-native-slider";

export default class CreateRent extends React.Component {
    state = {
        minValue: 3,
        maxValue: 7
      };

  render() {
    return (
      <View style={styles.container}>
          <TopBar />
          <Text style={styles.title}>Louer la letterbox ID</Text>
          <TouchableOpacity style={styles.TouchableOpacity}>
              <Text style={styles.buttonsText}>
              {`Letterbox ID
Adresse
Ville, Pays

Du 01-01-22 au 08-01-22 à 10h10`}
              </Text>
          </TouchableOpacity>
          <Slider
          minimumValue={this.state.minValue}
          maximumValue={this.state.maxValue}
          value={this.state.minValue}
          onValueChange={value => this.setState({ value })}
        />
          
          <Text style={styles.resume}>{this.state.value} jours : 0.00€</Text>
          <TouchableOpacity style={styles.submitButton}><Text style={styles.submitText}>VALIDER LA LOCATION</Text></TouchableOpacity>
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

    resume: {

    },

    submitButton: {
        backgroundColor: '#42CF02',
        paddingTop: "5%",
        paddingRight: "20%",
        paddingBottom: "5%",
        paddingLeft: "20%",
        borderRadius: 8,
        marginTop: "5%",
        marginBottom: "0%",
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 3
    },

    submitText: {
        color: 'white',
        fontWeight: 'bold'
    }

});