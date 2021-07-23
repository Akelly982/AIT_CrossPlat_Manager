import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { View,Text, StyleSheet, TouchableOpacity} from 'react-native';
import { firebaseConfig } from './firebaseConfig';
import * as firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SignUp } from './components/pages/SignUp';
import {Login} from './components/pages/Login';
import { Home } from './components/pages/Home';
import { Tasks } from './components/pages/Tasks';



// if not initialized initialize
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}




export default function App() {
  const Stack = createStackNavigator();
  const [userAuth,setUserAuth] = useState( false )
  const [parent,setParent] = useState(null)
  const [parentName,setParentName] = useState(null)

  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      setUserAuth(true);
    }else{
      setUserAuth(false);
    }
  })

  const HandelSignUp = (email,password) => {
    console.log(email)
    console.log(password)

    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((response) => {
      console.log(response)
      //signed in
      setUserAuth(true)
    })
    .catch((error) => {
      console.log(error)
    })
  }


  const HandelLogin = (email,password) =>{
    console.log(email)
    console.log(password)

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      setUserAuth(true)
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }


  const HandelSignOut = () => {
    setParentName(null)
    setParent(null)
    setUserAuth(false)

    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log("sign out successfull")
    }).catch((error) => {
      // An error happened.
      console.log("sign out Error")
    })
  }


  const HandelParent = (parentId,parentName) => {
    setParent(parentId)
    setParentName(parentName)
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">


        {/* initial login pages */}
        <Stack.Screen name="Login" options={{title: "Login"}}>
          { (props) => <Login {...props} handler={HandelLogin} auth={userAuth}/>}
        </Stack.Screen>
        <Stack.Screen name="SignUp" options={{title: "SignUp"}}>
          { (props) => <SignUp {...props} handler={HandelSignUp} auth={userAuth}/>}
        </Stack.Screen>


        {/* Agile Task Manager */}
        <Stack.Screen name="Home" 
          options={{
            headerTitle: "TaskCmd",
            headerRight: () => (
              <TouchableOpacity onPress={ () => HandelSignOut() } style={styles.logoutBtn}> 
                    <Text style={styles.logoutBtnText}>Logout</Text>
              </TouchableOpacity> 
            ),
          }}
          >
            {(props) => <Home {...props} parent={parent} parentName={parentName} handler={HandelParent}/>}
        </Stack.Screen>

        <Stack.Screen name="Tasks" 
          options={{
            headerTitle: "Tasks: " + (parentName != null ? parentName : "error parent name null"),
          }}
          >
            {(props) => <Tasks {...props} parent={parent}/>}
        </Stack.Screen>


      </Stack.Navigator>
    </NavigationContainer>
  );

  
}

const styles = StyleSheet.create({
  // bkgImage:{
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   height: 1000,
  // }

  logoutBtn:{
    marginRight: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#2b2b2b',

  },

  logoutBtnText:{
    color: '#e8e8e8',
  },

});
