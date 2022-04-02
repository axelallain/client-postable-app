import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export default class Login extends React.Component {

  googleSigninConfigure = GoogleSignin.configure({
    webClientId: '925413629652-a8u0jtl686lcs643qqckq04tbpqfb2al.apps.googleusercontent.com',
  });

  signInWithGoogle = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);

    user_sign_in.then(re=>{
      console.log(re);
    })

    console.log((await user_sign_in).user.displayName)
  }

  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.name}>Nom</Text>
          <TouchableOpacity title="Google Sign-In" onPress={this.signInWithGoogle} style={styles.TouchableOpacity}><Text style={styles.loginText}>Se connecter avec Google</Text></TouchableOpacity>
          <Text style={styles.copyright}>Copyright 2022 - 2023 Nom. All rights reserved.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      height: "100%",
      backgroundColor: '#f2f2f2',
      flexDirection: 'column', // row
      alignItems: 'center',
      justifyContent: 'center', // center, space-around
      paddingTop: 50,
    },

    name: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 25,
        fontFamily: 'Futura'
    },

    copyright: {
        color: 'black',
        fontSize: 11
    },

    loginText: {
        color: 'black',
        fontWeight: 'bold',
    },

    TouchableOpacity: {
        backgroundColor: 'white',
        paddingTop: 20,
        paddingRight: 40,
        paddingBottom: 20,
        paddingLeft: 40,
        borderRadius: 8,
        marginTop: "70%",
        marginBottom: "80%",
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 3
    }
});