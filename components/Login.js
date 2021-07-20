
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

// https://firebase.google.com/docs/auth/web/password-auth?authuser=1#web-v8


export function Login(props) {

    return (
        <View style={LoginStyles.container}>
            <Text style={LoginStyles.heading}>-- Login --</Text>
            <Text>Email:</Text>
            <TextInput
                style={LoginStyles.input}
            />
            <Text style={LoginStyles.spacing}>Password:</Text>
            <TextInput
                style={LoginStyles.input}
                secureTextEntry={true}
            />
            <TouchableOpacity style={[LoginStyles.button, LoginStyles.spacing]}>
                <Text style={LoginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[LoginStyles.button2, LoginStyles.spacing]} onPress={props.toggle}>
                <Text style={LoginStyles.buttonText}>Sign up for an account</Text>
            </TouchableOpacity>
        </View>
    )
}



const LoginStyles = StyleSheet.create({
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