
import React, {useState,useEffect}from 'react';
import { FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';




const tempItems = [
    { id: '457644', desc: "myProjectName", state: 'Todo'},
]

const SHOW_ALL = 'ALL'
const SHOW_SPRINT = 'SPRINT'
const SHOW_TODO = 'TODO'
const SHOW_COMPLETE = 'COMPLETE'

export function Tasks (props){

    const [viewSelected, setViewSelected] = useState(SHOW_ALL) 




    // useEffect(() =>{
    //     console.log("selected view: " + viewSelected)
    // }),[viewSelected]
    
    
    const allPressed = () => {
        //set if not alredy set
        if(viewSelected != SHOW_ALL){
            setViewSelected(SHOW_ALL)
        }
    }

    const todoPressed = () => {
        if(viewSelected != SHOW_TODO){
            setViewSelected(SHOW_TODO)
        }
    }

    const sprintPressed = () => {
        if(viewSelected != SHOW_SPRINT){
            setViewSelected(SHOW_SPRINT)
        }
    }

    const completePressed = () => {
        //set if not alredy set
        if(viewSelected != SHOW_COMPLETE){
            setViewSelected(SHOW_COMPLETE)
        }
    }


    const renderItem = ({item}) => {
        return(
            <Text>I am the Child tasks</Text>
        )
    }




    const NavContainer = () => (
            <View style={taskStyles.navCont}>
                <TouchableOpacity style={ viewSelected == SHOW_ALL  ? taskStyles.navBtnSelected : taskStyles.navBtn  } onPress={allPressed}>
                    <Text>All</Text>
                </TouchableOpacity>

                <Text> - </Text>
                <TouchableOpacity style={ viewSelected == SHOW_SPRINT  ? taskStyles.navBtnSelected : taskStyles.navBtn } onPress={sprintPressed}>
                    <Text>Sprint</Text>
                </TouchableOpacity>

                <Text> - </Text>
                <TouchableOpacity style={ viewSelected == SHOW_TODO  ? taskStyles.navBtnSelected : taskStyles.navBtn } onPress={todoPressed}>
                    <Text>Todo</Text>
                </TouchableOpacity>

                <Text> - </Text>
                <TouchableOpacity style={ viewSelected == SHOW_COMPLETE  ? taskStyles.navBtnSelected : taskStyles.navBtn } onPress={completePressed}>
                    <Text>Complete</Text>
                </TouchableOpacity>
            </View>
    )
   
    return(
            <View style={taskStyles.container}>
                <NavContainer />
                <FlatList
                    style={taskStyles.flist}
                    data={tempItems}
                    renderItem={renderItem} 
                    keyExtractor={item => item.id}
                    // extraData={props.itemSelectedValue}
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

    navCont:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#e8e8e8',
        width: '100%',
        paddingHorizontal: '20%',
    },

    navBtn:{
        paddingVertical: 2,
        paddingHorizontal: 1,
        marginHorizontal: 1,
    },

    navBtnSelected:{
        paddingVertical: 2,
        paddingHorizontal: 10,
        marginHorizontal: 1,

        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 2,
    },

    flist:{
        width: '90%',
        marginVertical: 20,
    },


})