
import React,{useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

// https://firebase.google.com/docs/auth/web/password-auth?authuser=1#web-v8

export function SignUp (props){
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()

    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)

    const HandelEmail = (emailVal) => {
        //validate email

        if( emailVal.indexOf('@') > 0 ){
            //indexOf searches through a string to find char (returns indexPos)
            setValidEmail(true)
        }else{
            setValidEmail(false)
        }

        setEmail(emailVal)
    }

    const HandelPassword = (passwordVal) => {
        //validate password

        if(passwordVal.length >= 8){
            setValidPassword(true)
        }else{
            setValidPassword(false)
        }

        

        setPassword(passwordVal)
    }

    const HandelSubmit = () => { 
        props.handler(email,password)
    } 

    return(
        <View style={SignUpStyles.container}>
            <Text style={SignUpStyles.heading}>-- Sign Up --</Text>
            <Text>Email:</Text>
            <TextInput
                onChangeText={ (val) => HandelEmail(val) }
                style={(validEmail)? SignUpStyles.input : SignUpStyles.invalidInput}
            />
            <Text style={SignUpStyles.spacing}>Password:</Text>
            <TextInput
                onChangeText={ (val) => HandelPassword(val) }
                style={(validPassword)? SignUpStyles.input : SignUpStyles.invalidInput}
                secureTextEntry={true}
            />
            <TouchableOpacity 
                style={[(validEmail && validPassword) ? SignUpStyles.button : SignUpStyles.buttonDisabled, SignUpStyles.spacing ]} 
                onPress={HandelSubmit}
                disabled={(validEmail && validPassword) ? false : true }>
                    <Text style={SignUpStyles.buttonText}> SignUp </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[SignUpStyles.button2, SignUpStyles.spacing ]} 
                onPress={props.toggle}>
                    <Text style={SignUpStyles.buttonText}> Sign in to your account </Text>
            </TouchableOpacity>
        </View>
    )
}


const SignUpStyles = StyleSheet.create({
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
        paddingHorizontal:10,
        fontSize:18,
        borderColor: '#e8e8e8',
        borderWidth: 2,
    },
    invalidInput:{
        paddingHorizontal:10,
        fontSize:18,
        borderColor: 'red',
        borderStyle: 'dashed',
        borderWidth: 2,
    },
    button:{
        backgroundColor: "#2b2b2b",
        padding: 3,
        marginVertical: 5,
        paddingVertical: 5,
        borderRadius:5,
    },
    button2:{
        backgroundColor: "#bbbbbb",
        padding: 3,
        marginVertical: 5,
        paddingVertical: 5,
        borderRadius:5,
    },
    buttonText:{
        textAlign: 'center',
        color: "#e8e8e8",
    },
    buttonDisabled:{
        backgroundColor: "red",
        padding: 3,
        marginVertical: 5,
        paddingVertical: 5,
        borderRadius:5,
    },
    spacing:{
        marginTop: 10,
    }
})