import React, { useState } from 'react'
import {Image, TextInput, Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import TopBar from '../components/TopBar'
import Slider from '@react-native-community/slider';
import MapView, { Marker } from 'react-native-maps';

const CreateRent = props => {

  const [total, setTotal] = useState({ days: 3, price: 0.20 });
  

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.TouchableOpacity}>
            <Text>{props.route.params.letterbox_available ? 'Cette boîte est disponible !' : "Indisponible jusqu'au 31 février."}</Text>
            <Text style={styles.buttonsText}>Boîte {props.route.params.letterbox_id}</Text>
            <Text style={styles.buttonsText}>{props.route.params.letterbox_address.toUpperCase()}</Text>
            <Text style={styles.buttonsText}>{props.route.params.letterbox_city.toUpperCase()}, {props.route.params.letterbox_country.toUpperCase()}</Text>
        </TouchableOpacity>

        <MapView
            style={styles.map}
            region={{
            latitude: parseFloat(props.route.params.letterbox_latitude),
            longitude: parseFloat(props.route.params.letterbox_longitude),
            latitudeDelta: 0.010,
            longitudeDelta: 0.010,
            }}
        >
            <Marker 
                coordinate={{ latitude : parseFloat(props.route.params.letterbox_latitude) , longitude : parseFloat(props.route.params.letterbox_longitude) }} 
            />

        </MapView>

        <Text style={styles.resume}>Choisir une durée de location :</Text>

        <Slider
          style={{ width: 250, height: 40 }}
          minimumValue={3}
          maximumValue={7}
          onValueChange={value => setTotal({ days: value, price: value * 0.25 })}
          step={1}
        />
        <Text style={styles.resume}>{total.days} jours : {total.price} €</Text>

        { props.route.params.letterbox_available ? 
        <TouchableOpacity style={styles.submitButton}><Text style={styles.submitText}>PAYER ET VALIDER LA LOCATION</Text></TouchableOpacity>
        :
        <TouchableOpacity disabled={true} style={styles.submitButtonExpired}><Text style={styles.submitText}>CETTE BOÎTE VIENT D'ÊTRE LOUÉE</Text></TouchableOpacity>
        }
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
    },

    map: {
      height: "40%",
      width: "100%",
      borderWidth: 0.2
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
      marginTop: "0%",
      marginBottom: "0%",
      width: "100%",
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
        paddingRight: "12%",
        paddingBottom: "5%",
        paddingLeft: "12%",
        borderRadius: 8,
        marginTop: "5%",
        marginBottom: "0%",
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 3
    },

    submitButtonExpired: {
      backgroundColor: 'grey',
      paddingTop: "5%",
      paddingRight: "12%",
      paddingBottom: "5%",
      paddingLeft: "12%",
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

export default CreateRent;