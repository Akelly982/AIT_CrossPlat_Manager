
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';


export function Home (props){
    
   
    return(
        
            <View style={homeStyles.container}>
                <Text>Home</Text>
            </View>

    )
}


const homeStyles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
        backgroundColor: 'orange',
    }, 

})