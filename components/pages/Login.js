
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { akTheme } from '../../akTheme';
import { ErrorMsg } from '../ErrorMsg';


const dHeight = (Dimensions.get('window').height)
const bkgImage = require('../../assets/kingsAndSpades128_Darker.png')





export function Login(props) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)

    const navigation = useNavigation();


    useEffect(()=> {
        //console.log("login propsAuth: " + props.auth)
        if(props.auth){
            //doing this resets the stack so their is no back button
            navigation.reset({ index: 0, routes: [ {name: "Home"} ]})
        }
    },[props.auth])

    useEffect(()=> {
        if(props.errorMsg){
            setErrorMsg(props.errorMsg)
        }
        else{
            setErrorMsg(null)
        }
    },[props.errorMsg])


    const handleLogin = () => {
        //handle error message if it returns an error and display to user
        props.handler(email,password)
    }

    const navigateToSignUp = () => {
        props.handleErrMsg()
        navigation.navigate("SignUp") 
    }

    return (
        <ImageBackground source={bkgImage} resizeMode="repeat" style={LoginStyles.bkgImage} >
            <View style={LoginStyles.container}>
                <Text style={LoginStyles.heading}>-- Login --</Text>
                <Text>Email:</Text>
                <TextInput
                    onChangeText={ (val) => setEmail(val) }
                    style={LoginStyles.input}
                />
                <Text style={LoginStyles.spacing}>Password:</Text>
                <TextInput
                    onChangeText={ (val) => setPassword(val) }
                    style={LoginStyles.input}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={[LoginStyles.button, LoginStyles.spacing]} onPress={ () => handleLogin()}>
                    <Text style={LoginStyles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[LoginStyles.button2, LoginStyles.spacing]} onPress={ () => navigateToSignUp() }>
                    <Text style={LoginStyles.buttonText}>Sign up for an account</Text>
                </TouchableOpacity>

                <ErrorMsg msg={errorMsg}/>
            </View>
        </ImageBackground>
    )
    
}



const LoginStyles = StyleSheet.create({
    bkgImage:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: dHeight,
    },
    container:{
        width:300,
        backgroundColor: akTheme.bkgLoginSignUpCont,
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:20,
    },
    heading: {
        fontSize: 22,
        textAlign: 'center',
        color: akTheme.textDark,
    },
    input: {
        fontSize: 18,
        borderColor: akTheme.inputBorder,
        backgroundColor: akTheme.inputBkg,
        borderWidth: 2,
        paddingHorizontal: 5,
    },
    button: {
        backgroundColor: akTheme.blue,
        padding: 3,
        marginVertical: 5,
        paddingVertical: 5,
        borderRadius: 5,
    },
    button2: {
        backgroundColor: akTheme.red,
        padding: 3,
        marginVertical: 5,
        paddingVertical: 5,
        borderRadius:5,
    },
    buttonText: {
        textAlign: 'center',
        color: akTheme.textLight,
    },
    spacing:{
        marginTop: 10,
    }
})