
import React, {useState,useEffect}from 'react';
import { FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';




const tempItems = [
    { id: '457644', desc: "myProjectName", state: 'Todo'},
]

export function Tasks (props){

    const [heldSelectedId, setHeldSelectedId] = useState('') 


    useEffect(() => {
        console.log("heldSelectedId changed: " + heldSelectedId)
    }),[heldSelectedId]


    const renderItem = ({item}) => {
        
        return(
            <Text>I am the Child tasks</Text>
        )

    }
    
   
    return(
        
            <View style={taskStyles.container}>
                <View style={taskStyles.topCont}>
                    <Text>TaskGroups</Text>
                </View>
                <FlatList
                    style={taskStyles.flist}
                    data={tempItems}
                    renderItem={renderItem} 
                    keyExtractor={item => item.id}
                    extraData={props.itemSelectedValue}
                />
            </View>

    )
}


const taskStyles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }, 

    topCont:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 50,
        backgroundColor: 'red',
        width: '100%',
    },

    flist:{
        width: '90%',
        marginVertical: 20,
    },


})