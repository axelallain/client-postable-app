import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'

export default class TopBar extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity><Text style={styles.text}>Back</Text></TouchableOpacity>
                <Text style={styles.text}>Logo</Text>
                <TouchableOpacity><Text style={styles.text}>Menu</Text></TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      height: 100,
      flexDirection: 'row', // row
      backgroundColor: '#064A04',
      alignItems: 'center',
      justifyContent: 'space-between', // center, space-around
      paddingTop: 40,
      paddingLeft: 25,
      paddingRight: 25
    },

    text: {
        color: 'white',
        fontWeight: 'bold'
    }
  });