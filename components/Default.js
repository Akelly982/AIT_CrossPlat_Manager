
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';


export function Default (props){
    
   
    return(
        
            <View style={xStyles.container}>
                <Text>Email:</Text>
            </View>

    )
}


const xStyles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }, 

})