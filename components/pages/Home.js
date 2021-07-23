
import React, {useState,useEffect}from 'react';
import { FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';




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

    const [heldSelectedId, setHeldSelectedId] = useState('') 


    useEffect(() => {
        console.log("heldSelectedId changed: " + heldSelectedId)
    }),[heldSelectedId]


    const renderItem = ({item}) => {

        //kept in scope of item if placed here
        //react to use input
        //ITEM BUTTONS
        const itemPress = () => {
            console.log("pressed: " + item.name)

        }
        const itemPressHeld = () => {
            console.log("held: " + item.name)
            setHeldSelectedId(item.id) 
        }

        //EDIT ITEM BTNS
        const deletePress = () => {
            console.log("delete: " + item.name)
        }
        const renamePress = () => {
            console.log("rename: " + item.name)
        }
        const alterStatePress = () => {
            console.log("alterState: " + item.name)
        }


        const BaseItem = () => (
            <TouchableOpacity
                style={(item.id == heldSelectedId) ? homeStyles.itemBtnSelected :homeStyles.itemBtn}
                onPress={() => itemPress()}    
                onLongPress={() => itemPressHeld()}    
            >
                <Text> {item.name} </Text>
            </TouchableOpacity>
        )


        if(item.id != heldSelectedId){
            return(
                <BaseItem />
            )
        }else{
            return(
                <View>
                    <BaseItem />
                    <View style={homeStyles.editCont}>
                        <TouchableOpacity style={homeStyles.editBtnDelete} onPress={deletePress}>
                            <Text style={homeStyles.editText}> delete </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={homeStyles.editBtn} onPress={renamePress}>
                            <Text style={homeStyles.editText}> rename </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={homeStyles.editBtn} onPress={alterStatePress}>
                            <Text style={homeStyles.editText}> alter state </Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            )
        }
        

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
    },

    itemBtnSelected:{
        backgroundColor: '#e8e8e8',
        paddingVertical: 25,
        marginTop: 10,
    },

    editCont:{
        marginBottom: 10,
        backgroundColor: "#3b3b3b",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 10,
    },

    editText:{
        color: "#e8e8e8",
    },

    editBtnDelete:{
        backgroundColor: 'lightcoral',
        padding: 2,
        borderRadius: 4,
    },

    editBtn:{
        backgroundColor: 'coral',
        padding: 2,
        borderRadius: 4,
    }

})