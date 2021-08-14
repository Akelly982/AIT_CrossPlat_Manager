import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { akTheme } from '../akTheme';

export const ErrorMsg = (props) => {
    if (props.msg != null){
        return(
            <Text style={errorMsgStyles.errorMsg}> Error: {props.msg}</Text>
        )
    }else{
        // this does work returning null does not cause an error
        return(
            null
        )
    }
}


const errorMsgStyles = StyleSheet.create({

    errorMsg: {
        textAlign: 'center',
        color: akTheme.red,
        marginTop: 10,
    },

})



