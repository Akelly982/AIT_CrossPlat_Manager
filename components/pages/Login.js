
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const dHeight = (Dimensions.get('window').height)
const bkgImage = require('../../assets/kingsAndSpades128_Darker.png')





export function Login(props) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigation = useNavigation();


    useEffect(()=> {
        if(props.auth){
            //doing this resets the stack so their is no back button
            navigation.reset({ index: 0, routes: [ {name: "Home"} ]})
        }
    },[props.auth])



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
                <TouchableOpacity style={[LoginStyles.button, LoginStyles.spacing]} onPress={ () => props.handler(email,password)}>
                    <Text style={LoginStyles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[LoginStyles.button2, LoginStyles.spacing]} onPress={ () => navigation.navigate("SignUp") }>
                    <Text style={LoginStyles.buttonText}>Sign up for an account</Text>
                </TouchableOpacity>
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
        backgroundColor: "#fff",
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:20,
    },
    heading: {
        fontSize: 22,
        textAlign: 'center',
        color: "#3b3b3b",
    },
    input: {
        fontSize: 18,
        borderColor: '#e8e8e8',
        borderWidth: 2,
    },
    button: {
        backgroundColor: "#2b2b2b",
        padding: 3,
        marginVertical: 5,
        paddingVertical: 5,
        borderRadius: 5,
    },
    button2: {
        backgroundColor: "#bbbbbb",
        padding: 3,
        marginVertical: 5,
        paddingVertical: 5,
        borderRadius:5,
    },
    buttonText: {
        textAlign: 'center',
        color: "#e8e8e8",
    },
    spacing:{
        marginTop: 10,
    }
})