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
        );
    }
}

const styles = StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      height: 100,
      flexDirection: 'row',
      backgroundColor: '#e1e1e1',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 40,
      paddingLeft: 25,
      paddingRight: 25
    },

    text: {
        color: 'black',
        fontWeight: 'bold'
    }
});