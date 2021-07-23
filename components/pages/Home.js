
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';



const tempProject = [
    { id: '457644', name: "myProjectName", state: 1},
    { id: '224543', name: "loremIps", state: 1},
    { id: '333213', name: "lorHipson", state: 1},
    { id: '123414', name: "sumLoreSum", state: 1},
    { id: '543523', name: "myProjectSum", state: 1},
    { id: '534134', name: "myProj", state: 1},
    { id: '164313', name: "myHeroDll", state: 1},

]

export function Home (props){

    

    const renderItem = ({item}) => {

        //kept in scope of item if placed here
        const testPress = () => {
            console.log("pressed: " + item.name)

        }

        const testPressHeld = () => {
            console.log("held: " + item.name)
        }

        return (
            <TouchableOpacity
                style={homeStyles.itemBtn}
                onPress={() => testPress()}    
                onLongPress={() => testPressHeld()}    
            >
                <Text> {item.name} </Text>
            </TouchableOpacity>
            
        )

    }
    
   
    return(
        
            <View style={homeStyles.container}>
                <View style={homeStyles.topCont}>
                    <Text>TaskGroups</Text>
                </View>
                <FlatList
                    style={homeStyles.flist}
                    data={tempProject}
                    renderItem={renderItem} 
                    keyExtractor={item => item.id}
                    extraData={props.itemSelectedValue}
                />
            </View>

    )
}


const homeStyles = StyleSheet.create({

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

    itemBtn:{
        backgroundColor: '#e8e8e8',
        paddingVertical: 25,
        marginVertical: 10,
    }

})