import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import React, {useState,useEffect} from 'react';
import { View,Text, StyleSheet, TouchableOpacity} from 'react-native';
import { firebaseConfig } from './firebaseConfig';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SignUp } from './components/pages/SignUp';
import {Login} from './components/pages/Login';
import { Home } from './components/pages/Home';
import { Tasks } from './components/pages/Tasks';
import { AddNewProject } from './components/pages/AddNewProject';


LogBox.ignoreLogs(['Setting a timer'])

// if not initialized initialize
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}




export default function App() {
  const Stack = createStackNavigator();
  const dbh = firebase.firestore();

  const [user,setUser] = useState()
  const [userAuth,setUserAuth] = useState( false )
  const [parent,setParent] = useState(null)
  const [parentName,setParentName] = useState(null)
  const [homeUpdater,setHomeUpdater] = useState(true)

  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      //console.log(user.uid)
      setUser(user)
      setUserAuth(true);
    }else{
      setUser(null)
      setUserAuth(false);
    }
  })

  const HandleSignUp = (email,password) => {
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


  const HandleLogin = (email,password) =>{
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


  const HandleSignOut = () => {
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


  const HandleParent = (parentId,parentName) => {
    setParent(parentId)
    setParentName(parentName)
  }

  const HandleHomeUpdater = (val) => {
    setHomeUpdater(val)
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">


        {/* initial login pages */}
        <Stack.Screen name="Login" options={{title: "Login"}}>
          { (props) => <Login {...props} handler={HandleLogin} auth={userAuth}/>}
        </Stack.Screen>
        <Stack.Screen name="SignUp" options={{title: "SignUp"}}>
          { (props) => <SignUp {...props} handler={HandleSignUp} auth={userAuth}/>}
        </Stack.Screen>


        {/* Agile Task Manager */}
        <Stack.Screen name="Home" 
          options={{
            headerTitle: "TaskCmd: Home",
            headerRight: () => (
              <TouchableOpacity onPress={ () => HandleSignOut() } style={styles.logoutBtn}> 
                    <Text style={styles.logoutBtnText}>Logout</Text>
              </TouchableOpacity> 
            ),
          }}
          >
            {(props) => <Home {...props} parent={parent} parentName={parentName} handler={HandleParent} handleHomeUpdater={HandleHomeUpdater} homeUpdater={homeUpdater} user={user} db={dbh}/>}
        </Stack.Screen>

        <Stack.Screen name="Tasks" 
          options={{
            headerTitle: "Tasks: " + (parentName != null ? parentName : "error parentName null"),
          }}
          >
            {(props) => <Tasks {...props} parent={parent}/>}
        </Stack.Screen>

        <Stack.Screen name="AddNewProject" 
          options={{
            headerTitle: "Add new project",
          }}
          >
            {(props) => <AddNewProject {...props} user={user} db={dbh} handleHomeUpdater={HandleHomeUpdater} />}
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
