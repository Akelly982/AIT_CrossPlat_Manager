import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { FirebaseConfig } from './FirebaseConfig';
import * as firebase from 'firebase';

import { SignUp } from './components/SignUp';
import {Login} from './components/Login';


const bkgImage = require('./assets/kingsAndSpades128_Darker.png')
//const bkgImage = { URL: "./assets/favicon.png" }


// if not initialized initialize
if(!firebase.apps.length){
  firebase.initializeApp(FirebaseConfig)
}


export default function App() {
  const [signUp,setSignUp] = useState( false )

  const HandelSignUp = (email,password) => {
    console.log(email)
    console.log(password)

    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((response) => {
      console.log(response)
      //signed in
      //HandelLogin(email,password);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const HandelLogin = (email,password) =>{

  }

  const ToggleSignUp = () => {
    if (signUp === true) {
      setSignUp(false)
    }else{
      setSignUp(true)
    }
  }


  if (signUp){
    return (
      <ImageBackground source={bkgImage} resizeMode="repeat" style={styles.bkgImage}>
        <SignUp toggle={ToggleSignUp} handler={HandelSignUp}/>
      </ImageBackground>
    );
  }else{
    return (
      <ImageBackground source={bkgImage} resizeMode="repeat" style={styles.bkgImage}>
        <Login toggle={ToggleSignUp} handler={HandelLogin}/>
      </ImageBackground>
    );
  }

  
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // sv: {
  //   flex: 1,
  //   backgroundColor: 'yellow',
  // },
  // keyAvoidContainer:{
  //   flex:1,
  // },
  bkgImage:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    // position: 'absolute',
    // zIndex: -1,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    
  }
});
