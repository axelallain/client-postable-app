import React, { useState } from 'react'
import {Image, TextInput, Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import TopBar from '../components/TopBar'
import Slider from '@react-native-community/slider';
import MapView, { Marker } from 'react-native-maps';
import Moment from 'moment';
import 'moment/locale/fr';

const CreateRent = props => {

  Moment.locale('fr');

  const [total, setTotal] = useState({ days: 3, price: 0.20 });
  var currentDate = new Date();
  
  const submitRentCreate = async () => {
    const json = JSON.stringify({ 
      username: props.route.params.username, 
      status: 'ongoing', 
      letterbox_id: props.route.params.letterbox_id, 
      days: total.days 
    });
    const res = await axios.post('http://192.168.1.17:8080/rents', json, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }
    });

    res.data.data; // '{"answer":42}'
    res.data.headers['Content-Type']; // 'application/json',

    props.navigation.navigate('Rents', { username: props.route.params.username });
  }

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

        <Text style={styles.sliderTitle}>Choisir une durée de location :</Text>

        <Slider
          style={styles.slider}
          minimumValue={3}
          maximumValue={7}
          onValueChange={value => setTotal({ days: value, price: value * 0.25 })}
          step={1}
        />
        <Text style={styles.resume}>{total.days} jours pour {total.price} €</Text>
        <Text style={styles.expirationDate}>Soit jusqu'au {Moment(currentDate.setDate(currentDate.getDate() + total.days)).format('DD MMMM YYYY à HH:mm')}</Text>

        { props.route.params.letterbox_available ? 
        <TouchableOpacity onPress={() => submitRentCreate()} style={styles.submitButton}><Text style={styles.submitText}>PAYER ET VALIDER LA LOCATION</Text></TouchableOpacity>
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
      borderWidth: 0.2,
      marginBottom: "10%"
    },

    slider: {
      width: 250,
      height: 40,
      marginBottom: "15%"
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

    sliderTitle: {
      marginBottom: "4%",
      fontSize: 15
    },

    expirationDate: {
      fontSize: 15
    },

    resume: {
      marginBottom: "5%",
      fontWeight: 'bold',
      fontSize: 17
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