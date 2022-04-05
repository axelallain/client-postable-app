import React, { useState, useEffect } from 'react';
import {Image, TextInput, Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import TopBar from '../components/TopBar'
import Moment from 'moment'

const RentPage = props => {

    Moment.locale('fr');

    const axios = require('axios');
    
    const [rent, setRent] = useState({})

    const getRentFromApiAsync = async () => {
        const response = await axios.get('http://localhost:8080/rents/' + props.route.params.rent_id);
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
        const response = await axios.put('http://localhost:8080/endrent/' + props.route.params.rent_id);
        console.log(response.data);
        props.navigation.pop();
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
                    <Text style={styles.buttonsText}>Letterbox {props.route.params.letterbox_id}</Text>
                    <Text style={styles.buttonsText}>{props.route.params.letterbox_address}</Text>
                    <Text style={styles.buttonsText}>{props.route.params.letterbox_city}, {props.route.params.letterbox_country}</Text>
                    <Text style={styles.buttonsText}>Du {Moment(rent.startingDate).format('DD-MM-Y à hh:mm')} au {Moment(rent.endingDate).format('DD-MM-Y à hh:mm')}</Text>
                </TouchableOpacity>
                <Image style={styles.map} source={require('../images/map.jpeg')} />
                <TouchableOpacity disabled={true} style={styles.expiredButton}><Text style={styles.lockText}>EXPIRÉE</Text></TouchableOpacity>
            </View>
        );
    }
  
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.ongoingLetterbox}>
                <Text style={styles.buttonsText}>Letterbox {props.route.params.letterbox_id}</Text>
                <Text style={styles.buttonsText}>{props.route.params.letterbox_address}</Text>
                <Text style={styles.buttonsText}>{props.route.params.letterbox_city}, {props.route.params.letterbox_country}</Text>
                <Text style={styles.buttonsText}>Depuis le : {Moment(rent.startingDate).format('DD-MM-Y à hh:mm')}</Text>
                <Text style={styles.buttonsText}>Expiration le : {Moment(rent.endingDate).format('DD-MM-Y à hh:mm')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showConfirmDialog()}><Text style={styles.delete}>Mettre fin à cette location</Text></TouchableOpacity>
            <Image style={styles.map} source={require('../images/map.jpeg')} />
            <TouchableOpacity onPress={() => lock()} style={styles.unlockButton}><Text style={styles.lockText}>DÉVERROUILLER</Text></TouchableOpacity>
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

    ongoingLetterbox: {
        backgroundColor: 'white',
        paddingTop: "4%",
        paddingRight: "10%",
        paddingBottom: "4%",
        paddingLeft: "10%",
        marginTop: "8%",
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
        marginTop: "8%",
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

    map: {
        height: "40%",
        width: "80%",
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