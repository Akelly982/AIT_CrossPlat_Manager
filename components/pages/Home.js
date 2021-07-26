
import { useNavigation } from '@react-navigation/native';
import React, {useState,useEffect}from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';




const tempProject = [
    { id: '457644', name: "myProjectName", state: 1},
    { id: '224543', name: "loremIps", state: 1},
    { id: '333213', name: "lorHipson", state: 1},
    { id: '123414', name: "sumLoreSum", state: 1},
    { id: '543523', name: "myProjectSum", state: 1},
    { id: '534134', name: "myProj", state: 1},
    { id: '164313', name: "myHeroDll", state: 1},
    { id: '431223', name: "myHeroExe", state: 1},
    { id: '131113', name: "myHeroBin", state: 1},
]



export function Home (props){
    const navigation = useNavigation()
    const [heldSelectedId, setHeldSelectedId] = useState('') 
    const [data,setData] = useState([])
    

    useEffect(() => {
        console.log("heldSelectedId changed: " + heldSelectedId)
    }),[heldSelectedId]

    useEffect(() =>{
        if(props.homeUpdater){
            updateHomeList()
        }
    }),[props.homeUpdater]

    // useEffect(() => {
    //     console.log('parentId Changed: ' + props.parent)
    //     //if parent changed in App.js
    // }),[props.parent]





    const updateHomeList = () => {
        props.handleHomeUpdater(false)
        setData([]) //empty before filling
        console.log("start Data: " + data.length)

        props.db.collection('Users').doc(props.user.uid).collection('Projects').get()
        .then((querySnapshot) => {
            let tempArray = []
            querySnapshot.forEach(doc => {
                console.log(doc.id, " => ", doc.data().projectName, " / ", doc.data().state)
                let tempItem = {id: doc.id, projectName: doc.data().projectName, state: doc.data().state}
                tempArray.push(tempItem)
            }) 
            setData(tempArray)
        })
        .catch((error) => {
            console.log("Error getting Project collection items:", error);
        })
        .finally(()=>{
            console.log("end Data: " + data.length)
        })

    }


    const fabBtn = () => {
        console.log("fab pressed")
        navigation.navigate('AddNewProject')
    }


    const renderItem = ({item}) => {

        const itemPress = () => {
            console.log("pressed: " + item.name)
            props.handler(item.id,item.projectName)
            navigation.navigate('Tasks')
        }
        const itemPressHeld = () => {
            console.log("held: " + item.projectName)
            setHeldSelectedId(item.id) 
        }

        //EDIT ITEM BTNS
        const deletePress = () => {
            console.log("delete: " + item.projectName)
        }
        const renamePress = () => {
            console.log("rename: " + item.projectName)
        }
        const alterStatePress = () => {
            console.log("alterState: " + item.projectName)
        }


        const BaseItem = () => (
            <TouchableOpacity
                style={(item.id == heldSelectedId) ? homeStyles.itemBtnSelected :homeStyles.itemBtn}
                onPress={() => itemPress()}    
                onLongPress={() => itemPressHeld()}    
            >
                <Text> {item.projectName} </Text>
            </TouchableOpacity>
        )

        //RenderItem Returns
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
                <TouchableOpacity style={homeStyles.fab} onPress={fabBtn}>
                    <Text style={homeStyles.fabText}>+</Text>
                </TouchableOpacity>
                <FlatList
                    style={homeStyles.flist}
                    data={data}
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

    fab:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        zIndex: 99,
        position: 'absolute',
        bottom: 15,
        right: 15,

        width:60,
        height: 60,
        borderRadius: 60,
        backgroundColor: 'orange',
        
    },

    fabText:{
        color: '#e8e8e8',
        fontSize: 40,
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