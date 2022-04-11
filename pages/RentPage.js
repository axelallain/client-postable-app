import React, { useState, useEffect } from 'react';
import {Image, TextInput, Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import TopBar from '../components/TopBar'
import Moment from 'moment'
import MapView, { Marker } from 'react-native-maps';

const RentPage = props => {

    Moment.locale('fr');

    const axios = require('axios');
    
    const [rent, setRent] = useState({})

    const getRentFromApiAsync = async () => {
        const response = await axios.get('http://192.168.1.17:8080/rents/' + props.route.params.rent_id);
        setRent(response.data);
        console.log(rent);
    }

    const lock = async () => {
        const response = await axios.get('http://192.168.1.29:5000/lock', {
          params: {
            name: props.route.params.username,
            rent_id: props.route.params.rent_id
          }
        }).then((res) => console.log(res));
    }

    const endRent = async () => {
        // Update rent status to expired
        const response = await axios.put('http://192.168.1.17:8080/endrent/' + props.route.params.rent_id);
        console.log(response.data);
        props.navigation.navigate('Home', { username: props.route.params.username })
    }

    const showConfirmDialog = () => {
        return Alert.alert(
        "Mettre fin à cette location ?",
        "La location sera archivée dans les locations expirées.",
        [
            // The "Yes" button
            {
            text: "Confirmer",
            onPress: () => {
                endRent();
            },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
            text: "Annuler",
            },
        ]
        );
    };

    useEffect(() => {
        getRentFromApiAsync();
    }, []);

    if(rent.status == 'expired') {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.expiredLetterbox}>
                    <Text style={styles.buttonsText}>Boîte {props.route.params.letterbox_id}</Text>
                    <Text style={styles.buttonsText}>{props.route.params.letterbox_address.toUpperCase()}</Text>
                    <Text style={styles.buttonsText}>{props.route.params.letterbox_city.toUpperCase()}, {props.route.params.letterbox_country.toUpperCase()}</Text>
                    <Text style={styles.buttonsText}>Louée le : {Moment(rent.startingDate).format('DD-MM-Y à HH:mm')}</Text>
                    <Text style={styles.buttonsText}>Expirée le : {Moment(rent.endingDate).format('DD-MM-Y à HH:mm')}</Text>
                </TouchableOpacity>
                <MapView
                    style={styles.mapExpired}
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
                <TouchableOpacity disabled={true} style={styles.expiredButton}><Text style={styles.lockText}>EXPIRÉE</Text></TouchableOpacity>
            </View>
        );
    }
  
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.ongoingLetterbox}>
                <Text style={styles.buttonsText}>Boîte {props.route.params.letterbox_id}</Text>
                <Text style={styles.buttonsText}>{props.route.params.letterbox_address.toUpperCase()}</Text>
                <Text style={styles.buttonsText}>{props.route.params.letterbox_city.toUpperCase()}, {props.route.params.letterbox_country.toUpperCase()}</Text>
                <Text style={styles.buttonsText}>Depuis le : {Moment(rent.startingDate).format('DD-MM-Y à HH:mm')}</Text>
                <Text style={styles.buttonsText}>Expiration le : {Moment(rent.endingDate).format('DD-MM-Y à HH:mm')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showConfirmDialog()}><Text style={styles.delete}>Mettre fin à cette location</Text></TouchableOpacity>
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
            <TouchableOpacity onPress={() => lock()} style={styles.unlockButton}><Text style={styles.lockText}>DÉVERROUILLER</Text></TouchableOpacity>
        </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
      height: "85%",
      backgroundColor: '#f2f2f2',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: "0%"
    },

    title: {
        marginTop: "7%",
        fontWeight: 'bold',
        fontSize: 16
    },

    buttonsText: {
        color: 'black'
    },

    ongoingLetterbox: {
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

    expiredLetterbox: {
        backgroundColor: 'white',
        paddingTop: "4%",
        paddingRight: "10%",
        paddingBottom: "4%",
        paddingLeft: "10%",
        marginTop: "0%",
        marginBottom: "10%",
        width: "100%",
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

    mapExpired: {
        height: "70%",
        width: "100%",
        borderWidth: 0.2
    },

    map: {
        height: "65%",
        width: "100%",
        borderWidth: 0.2
    },

    unlockButton: {
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

    lockButton: {
        backgroundColor: 'red',
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

    expiredButton: {
        backgroundColor: 'grey',
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

export default RentPage;