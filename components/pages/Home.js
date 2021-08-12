
import { useNavigation } from '@react-navigation/native';
import React, {useState,useEffect}from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';




// const tempProject = [
//     { id: '457644', name: "myProjectName", state: 1},
//     { id: '224543', name: "loremIps", state: 1},
//     { id: '333213', name: "lorHipson", state: 1},
//     { id: '123414', name: "sumLoreSum", state: 1},
//     { id: '543523', name: "myProjectSum", state: 1},
//     { id: '534134', name: "myProj", state: 1},
//     { id: '164313', name: "myHeroDll", state: 1},
//     { id: '431223', name: "myHeroExe", state: 1},
//     { id: '131113', name: "myHeroBin", state: 1},
// ]


const STATE_ACTIVE = "ACTIVE"
const STATE_COMPLETE = "COMPLETE"

export function Home (props){
    const navigation = useNavigation()
    const [heldSelectedId, setHeldSelectedId] = useState('') 
    const [data,setData] = useState([])

    const [initLoad, setInitLoad] = useState(true) //sometimes list does not update -- this is a support bool
    


    useEffect(()=> {
        console.log("Home propsAuth: " + props.auth)
        if(props.auth == false){
            //doing this resets the stack so their is no back button
            navigation.reset({ index: 0, routes: [ {name: "Login"} ]})
        }
    },[props.auth])

    useEffect(() => {
        console.log("heldSelectedId changed: " + heldSelectedId)
    }),[heldSelectedId]

    useEffect(() =>{
        if(props.homeUpdater || initLoad){
            updateHomeList()
        }
        setInitLoad(false)
    }),[props.homeUpdater]


    
    const updateHomeList = () => {
        props.handleHomeUpdater(false)  //stops use effect above from looping runs once
        setData([]) //empty before filling

        //observer 
        // const ref = props.db.collection('Users').doc(props.auth.uid).collection('Projects')
        // ref.onSnapshot((querySnapshot) => {
        //     let myData = []
        //     querySnapshot.forEach((doc)=>{
        //         console.log(doc.id, " => ", doc.data().projectName, " / ", doc.data().state)
        //         let tempItem = {id: doc.id, projectName: doc.data().projectName, state: doc.data().state}
        //         myData.push(tempItem)
        //     })
        //     setData(myData)
        // })

        //get data once
        // NOTE --- when ordering by state we are comparing string values not numbers ACTIVE / COMPLETE  (COMPLETE shows second in this scenario)
        const ref = props.db.collection('Users').doc(props.auth.uid).collection('Projects').orderBy("state")
        ref.get()
        .then((querySnapshot) => {
            let myData = []
            querySnapshot.forEach((doc)=>{
                //console.log(doc.id, " => ", doc.data().projectName, " / ", doc.data().state)
                let tempItem = {id: doc.id, projectName: doc.data().projectName, state: doc.data().state}
                myData.push(tempItem)
            })
            setData(myData)
        })
        .catch((error)=>{
            console.log("UpdateHomeList ERROR: " + error)
        })

    }


    const fabBtn = () => {
        console.log("fab pressed")
        navigation.navigate('AddNewProject')
    }


    //---------------------------------------------------------------------
    //-------------------- ITEM EDITS -------------------------------------

    const invertState = ((item) => {
        //Find what state i am currently (inherently i assume it is STATE_ACTIVE most likely result) 
        let inv = STATE_COMPLETE
        if(item.state == STATE_COMPLETE){     // I can skip the else due to it being pre set the the other result
            inv = STATE_ACTIVE
        }

        let ref = props.db.collection("Users").doc(props.auth.uid).collection('Projects').doc(item.id)
        return ref.update({
            state: inv   //set state to inv
        })
        .then(() => {
            console.log("state change successfull")
            console.log("stateChangedTO: " + inv)
            props.handleHomeUpdater(true) //trigger home data reload
        })
        .catch((error) => {
            console.log('ERROR Item state change: ' + error)
        })
    })

    const deleteDoc = ((item) => {
        let ref = props.db.collection("Users").doc(props.auth.uid).collection('Projects').doc(item.id)
        ref.delete()
        .then(()=>{
            console.log("Delete successfull")
            props.handleHomeUpdater(true) //trigger home data reload
        })  
        .catch((error)=>{
            console.log('ERROR deleteDoc: ' + error)
        })
    })


    //---------------------------------------------------------------------
    //-------------------- ITEM Render -------------------------------------

    const renderItem = ({item}) => {
        const itemPress = () => {
            console.log("pressed: " + item.name)
            props.handleParent(item.id,item.projectName)  //give some data to app.js for child page // parent id and name
            navigation.navigate('Tasks')
            setHeldSelectedId('') //reset selected item
        }
        const itemPressHeld = () => {
            //console.log("held: " + item.projectName)

            //if item is already selected deslect it
            if(item.id == heldSelectedId){
                setHeldSelectedId('')
            }else{
                setHeldSelectedId(item.id) 
            }
        }

        //EDIT ITEM BTNS
        const deletePress = () => {
            //console.log("delete: " + item.projectName)
            if(heldSelectedId == item.id){
                deleteDoc(item)
            }
        }
        const renamePress = () => {
            //console.log("rename: " + item.projectName)
            if(heldSelectedId == item.id){
                props.handleParent(item.id,item.projectName)  //give some data to app.js for child page // parent id and name 
                navigation.navigate('RenameProject')
            }
        }
        const alterStatePress = () => {
            //console.log("alterState: " + item.projectName)
            if(heldSelectedId == item.id){
                invertState(item)
            }
        }


        const BaseItem = () => (
            <TouchableOpacity
                style={(item.id == heldSelectedId) ? homeStyles.itemBtnSelected : homeStyles.itemBtn}
                onPress={() => itemPress()}    
                onLongPress={() => itemPressHeld()}    
            >
                <View style={(item.state == STATE_ACTIVE) ? homeStyles.itemActive : homeStyles.itemComplete}></View>
                <Text style={homeStyles.itemText}> {item.projectName} {(item.state == STATE_COMPLETE) ? "  #Complete" : ""}</Text>
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
    

    //---------------------------------------------------------------------
    //-------------------- page Return -------------------------------------
   
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


        //ios
        shadowColor: '#2b2b2b',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowRadius: 4.65,

        //android
        elevation: 4,
        
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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

        backgroundColor: '#e8e8e8',
        marginVertical: 10,
    },

    //removes padding from bottom so that the SelectedItem Container is connected to item container
    itemBtnSelected:{  
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

        backgroundColor: '#e8e8e8',
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
    },


    itemText:{
        marginLeft:'15%',
    },

    itemActive:{
        height: 80,
        width: 20,
        marginLeft: '10%',
        backgroundColor:"grey",
    },

    itemComplete:{
        height: 80,
        width: 20,
        marginLeft: '10%',
        backgroundColor:"#3b3b3b",
    }


})