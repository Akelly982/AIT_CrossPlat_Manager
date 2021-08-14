import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import React, {useState,useEffect} from 'react';
import { View,Text, StyleSheet, TouchableOpacity} from 'react-native';
import { firebaseConfig } from './firebaseConfig';
import * as firebase from 'firebase';
//import 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { akTheme } from './akTheme';
import { SignUp } from './components/pages/SignUp';
import {Login} from './components/pages/Login';
import { Home } from './components/pages/Home';
import { Tasks } from './components/pages/Tasks';
import { AddNewProject } from './components/pages/AddNewProject';
import { AddNewTask } from './components/pages/AddNewTask';
import { RenameProject } from './components/pages/RenameProject';



LogBox.ignoreLogs(['Setting a timer'])

// if not initialized initialize
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}




export default function App() {
  const Stack = createStackNavigator();
  const dbh = firebase.firestore();

  const [user,setUser] = useState(false)
  const [parentId,setParentId] = useState(null)
  const [parentName,setParentName] = useState(null)
  const [homeUpdater,setHomeUpdater] = useState(true)
  const [taskUpdater,setTaskUpdater] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)

  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      //console.log(user.uid)
      setUser(user)
    }else{
      setUser(false)
    }
  })

  const HandleSignUp = (email,password) => {
    //console.log("Sign Up")

    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((response) => {
      //signed in
      setErrorMsg(null) // reset error msg
      setUser(response) // update user auth()
    })
    .catch((error) => {
      console.log(error.message)
      setErrorMsg(error.message) //to be passed back to user display
    })
  }


  const HandleLogin = (email,password) =>{
    //console.log("Login")

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      // Signed in
      setErrorMsg(null)  
      setUser(user) 
    })
    .catch((error) => {
      //var errorCode = error.code;
      var errorMessage = error.message;
      console.log('ERROR: ' + errorMessage)
      setErrorMsg(errorMessage)  
    });
  }


  const HandleSignOut = () => {
    //console.log("Logout btn")
    
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log("sign out successfull")
      setUser(false)
    }).catch((error) => {
      // An error happened.
      console.log("sign out Error")
    })
  }


  const HandleParent = (parentId,parentName) => {
    setParentId(parentId)
    setParentName(parentName)
  }

  const HandleHomeUpdater = (val) => {
    setHomeUpdater(val)
  }

  const HandleTaskUpdater = (val) => {
    setTaskUpdater(val)
  }

  const HandleErrorMessage = () => {
    setErrorMsg(null)
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">


        {/* initial login pages */}
        <Stack.Screen name="Login" options={{title: "Login", headerStyle: {backgroundColor: akTheme.bkgHeader}, headerTintColor: akTheme.textDark }}>
          { (props) => <Login {...props} handler={HandleLogin} auth={user} errorMsg={errorMsg} handleErrMsg={HandleErrorMessage} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp" options={{title: "SignUp", headerStyle: {backgroundColor: akTheme.bkgHeader}, headerTintColor: akTheme.textDark}}>
          { (props) => <SignUp {...props} handler={HandleSignUp} auth={user} errorMsg={errorMsg} handleErrMsg={HandleErrorMessage}/>}
        </Stack.Screen>


        {/* Agile Task Manager */}
        <Stack.Screen name="Home" 
          options={{
            headerStyle: {backgroundColor: akTheme.bkgHeader}, 
            headerTintColor: akTheme.textDark,
            headerTitle: "Agile-Rex: Home",
            headerRight: () => (
              <TouchableOpacity onPress={ () => HandleSignOut() } style={styles.logoutBtn}> 
                    <Text style={styles.logoutBtnText}>Logout</Text>
              </TouchableOpacity> 
            ),
          }}
          >
            {(props) => <Home {...props} parentId={parentId} parentName={parentName} handleParent={HandleParent} handleHomeUpdater={HandleHomeUpdater} homeUpdater={homeUpdater} auth={user} db={dbh}/>}
        </Stack.Screen>

        <Stack.Screen name="Tasks" 
          options={{
            headerTitle: "Tasks: " + (parentName != null ? parentName : "error parentName null"),
            headerStyle: {backgroundColor: akTheme.bkgHeader}, 
            headerTintColor: akTheme.textDark,
          }}
          >
            {(props) => <Tasks {...props} parentId={parentId} handleTaskUpdater={HandleTaskUpdater} taskUpdater={taskUpdater} db={dbh} auth={user} />}
        </Stack.Screen>


        

        <Stack.Screen name="AddNewProject" 
          options={{
            headerTitle: "Add new project",
            headerStyle: {backgroundColor: akTheme.bkgHeader}, 
            headerTintColor: akTheme.textDark,
          }}
          >
            {(props) => <AddNewProject {...props} user={user} db={dbh} handleHomeUpdater={HandleHomeUpdater} />}
        </Stack.Screen>

        <Stack.Screen name="AddNewTask" 
          options={{
            headerTitle: "Add new Task",
            headerStyle: {backgroundColor: akTheme.bkgHeader}, 
            headerTintColor: akTheme.textDark,
          }}
          >
            {(props) => <AddNewTask {...props} user={user} parentId={parentId} db={dbh} handleTaskUpdater={HandleTaskUpdater} />}
        </Stack.Screen>

        <Stack.Screen name="RenameProject" 
          options={{
            headerStyle: {backgroundColor: akTheme.bkgHeader}, 
            headerTintColor: akTheme.textDark,
            headerTitle: "Rename: " + (parentName != null ? parentName : "error parentName null") ,
          }}
          >
            {(props) => <RenameProject {...props} user={user} db={dbh} handleHomeUpdater={HandleHomeUpdater} parentId={parentId} />}
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

  // the style is set here for logout btn in home screen
  logoutBtn:{
    marginRight: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: akTheme.textDark,

  },

  logoutBtnText:{
    color: akTheme.textLight,
  },

});
