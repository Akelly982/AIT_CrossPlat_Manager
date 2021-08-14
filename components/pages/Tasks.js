import { useNavigation } from '@react-navigation/native';
import React, {useState,useEffect}from 'react';
import { FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';
import { akTheme } from '../../akTheme';




const tempItems = [
    { id: '457644', task: "myProjectName", state: 'Todo'},
]

const TASKS_ALL = 'ALL'
const TASKS_SPRINT = 'SPRINT'
const TASKS_TODO = 'TODO'
const TASKS_COMPLETE = 'COMPLETE'



export function Tasks (props){

    const REF_ALL = props.db.collection('Users').doc(props.auth.uid).collection('Projects').doc(props.parentId).collection("Tasks")
    const REF_COMPLETE = props.db.collection('Users').doc(props.auth.uid).collection('Projects').doc(props.parentId).collection("Tasks").where('state', "==", TASKS_COMPLETE)
    const REF_SPRINT = props.db.collection('Users').doc(props.auth.uid).collection('Projects').doc(props.parentId).collection("Tasks").where('state', "==", TASKS_SPRINT)
    const REF_TODO = props.db.collection('Users').doc(props.auth.uid).collection('Projects').doc(props.parentId).collection("Tasks").where('state', "==", TASKS_TODO)


    const navigation = useNavigation()
    const [viewSelected, setViewSelected] = useState(TASKS_ALL) 
    const [taskData, setTaskData] = useState([])
    const [heldTaskSelectedId, setHeldTaskSelectedId] = useState('')

    const [initLoad, setInitLoad] = useState(true) //sometimes list does not update -- this is a support bool


    // Display view slection change
    // useEffect(() =>{
    //     console.log("selected view: " + viewSelected)
    // }),[viewSelected]


    useEffect(() =>{
        if(props.taskUpdater || initLoad){
            //what list do we want to load
            switch(viewSelected) {
                case TASKS_ALL:
                    updateTaskList(REF_ALL)
                    break;
                case TASKS_COMPLETE:
                    updateTaskList(REF_COMPLETE)
                    break;
                case TASKS_SPRINT:
                    updateTaskList(REF_SPRINT)
                    break;
                case TASKS_TODO:
                    updateTaskList(REF_TODO)
                    break;
                default:
                    console.log("ERROR Task Switch: DEFAULT")
            }
        }
        setInitLoad(false)
    }),[props.taskUpdater]
    
    

    //-----------------------------------------------------------------------------------
    //-------------------- Data View Navigation Functions -------------------------------------

    const allViewPressed = () => {
        //set if not alredy set
        if(viewSelected != TASKS_ALL){
            setViewSelected(TASKS_ALL)
            props.handleTaskUpdater(true)
        }
    }

    const todoViewPressed = () => {
        if(viewSelected != TASKS_TODO){
            setViewSelected(TASKS_TODO)
            props.handleTaskUpdater(true)
        }
    }

    const sprintViewPressed = () => {
        if(viewSelected != TASKS_SPRINT){
            setViewSelected(TASKS_SPRINT)
            props.handleTaskUpdater(true)
        }
    }

    const completeViewPressed = () => {
        //set if not alredy set
        if(viewSelected != TASKS_COMPLETE){
            setViewSelected(TASKS_COMPLETE)
            props.handleTaskUpdater(true)
        }
    }


    //---------------------------------------------------------------------
    //-------------------- Get task list by ref type -------------------------------------

    const updateTaskList = (ref) => {
        props.handleTaskUpdater(false) //stops use effect above from looping runs once
        setTaskData([]) //empty before filling

        // observer
        // ref.querySnapshot((querySnapshot) => {
        //     let myData = []
        //     querySnapshot.forEach((doc)=>{
        //         //console.log(doc.id, " => ", doc.data().task, " / ", doc.data().state)
        //         let tempItem = {id: doc.id, task: doc.data().task, state: doc.data().state}
        //         myData.push(tempItem)
        //     })
        //     setTaskData(myData)
        // })

        //get data once
        ref.get()
        .then((querySnapShot) => {
            let myData = []
            querySnapShot.forEach((doc)=>{
                //console.log(doc.id, " => ", doc.data().task, " / ", doc.data().state)
                let tempItem = {id: doc.id, task: doc.data().task, state: doc.data().state}
                myData.push(tempItem)
            })
            setTaskData(myData)
        })
        .catch((error)=>{
            props.handleTaskUpdater(false) //stops use effect above from looping runs once
        })

    }


    //---------------------------------------------------------------------
    //-------------------- FAB (Floating Action Button) Btn -------------------------------------


    const fabBtn = () => {
        console.log("fab pressed")
        navigation.navigate('AddNewTask')
    }

    //---------------------------------------------------------------------
    //-------------------- ITEM Edits -------------------------------------
    
    const deleteItem = (item) => {
        let ref = props.db.collection("Users").doc(props.auth.uid).collection('Projects').doc(props.parentId).collection('Tasks').doc(item.id)
        ref.delete()
        .then(()=>{
            console.log("Delete successfull")
            props.handleTaskUpdater(true) //trigger home data reload
        })  
        .catch((error)=>{
            console.log('ERROR deleteDoc: ' + error)
        })
    }

    const setNewItemState = (item, newState) => {

        let ref = props.db.collection("Users").doc(props.auth.uid).collection('Projects').doc(props.parentId).collection('Tasks').doc(item.id)
        return ref.update({
            state: newState   //set state to inv
        })
        .then(() => {
            console.log("state change successfull")
            console.log("stateChangedTO: " + newState)
            props.handleTaskUpdater(true) //trigger tasklist data reload
        })
        .catch((error) => {
            console.log('ERROR Item state change: ' + error)
        })
    }



    //---------------------------------------------------------------------
    //-------------------- ITEM Render -------------------------------------

    const renderItem = ({item}) => {

        const itemPress = () => {
            //console.log("pressed: " + item.task)
            //if item is already selected deslect it
            if(item.id == heldTaskSelectedId){
                setHeldTaskSelectedId('')
            }else{
                setHeldTaskSelectedId(item.id) 
            }  
        }

        //EDIT ITEM BTNS
        const deletePress = () => {
            console.log("delete: " + item.task)
            deleteItem(item)
        }
        const changeStateCompletePress = () => {
            console.log("setState_Complete: " + item.task)
            setNewItemState(item,TASKS_COMPLETE)
        }
        const changeStateTodoPress = () => {
            console.log("setState_Todo: " + item.task)
            setNewItemState(item,TASKS_TODO)
        }
        const changeStateSprintPress = () => {
            console.log("setState_Sprint: " + item.task)
            setNewItemState(item,TASKS_SPRINT)
        }

        // I dont pass item to this function because it is wihtin scope
        const ItemState = () => {

            // var's to hold our item state text / style data 
            let str
            let bkg

            // this works you can put this is a var
            //let bkg = taskStyles.itemStateBkgComplete

            // var = to my item state
            switch(item.state) {
                case TASKS_COMPLETE:
                    str = "complete"
                    bkg = taskStyles.itemStateBkgComplete
                    break;
                case TASKS_SPRINT:
                    str = "sprint"
                    bkg = taskStyles.itemStateBkgSprint
                    break;
                case TASKS_TODO:
                    str = "todo"
                    bkg = taskStyles.itemStateBkgTodo
                    break;
                default:
                    str = "default"
            }

            return (
                <View style={[taskStyles.itemStateCont , bkg]} >
                    <Text style={taskStyles.itemStateText}> {str} </Text>
                </View>
            )
        }


        const BaseItem = () => (
            <TouchableOpacity
                style={(item.id == heldTaskSelectedId) ? taskStyles.itemBtnSelected : taskStyles.itemBtn}
                onPress={() => itemPress()}       
            >
                <ItemState />
                <Text style={taskStyles.itemText}> {item.task} </Text>
            </TouchableOpacity>
        )

        //RenderItem Returns
        if(item.id != heldTaskSelectedId){
            return(
                <BaseItem />
            )
        }else{
            return(
                <View>
                    <BaseItem />
                    <View style={taskStyles.editCont}>
                        <TouchableOpacity style={taskStyles.editBtnDelete} onPress={deletePress}>
                            <Text style={taskStyles.editText}> delete </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={taskStyles.editBtn} onPress={changeStateCompletePress}>
                            <Text style={taskStyles.editText}> complete </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={taskStyles.editBtn} onPress={changeStateTodoPress}>
                            <Text style={taskStyles.editText}> todo </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={taskStyles.editBtn} onPress={changeStateSprintPress}>
                            <Text style={taskStyles.editText}> sprint </Text>
                        </TouchableOpacity>
                    </View>  
                </View>
            )
        }
        

    }

    const NavContainer = () => (
            <View style={taskStyles.navCont}>
                <TouchableOpacity style={ viewSelected == TASKS_ALL  ? taskStyles.navBtnSelected : taskStyles.navBtn  } onPress={allViewPressed}>
                    <Text>All</Text>
                </TouchableOpacity>

                <Text> - </Text>
                <TouchableOpacity style={ viewSelected == TASKS_SPRINT  ? taskStyles.navBtnSelected : taskStyles.navBtn } onPress={sprintViewPressed}>
                    <Text>Sprint</Text>
                </TouchableOpacity>

                <Text> - </Text>
                <TouchableOpacity style={ viewSelected == TASKS_TODO  ? taskStyles.navBtnSelected : taskStyles.navBtn } onPress={todoViewPressed}>
                    <Text>Todo</Text>
                </TouchableOpacity>

                <Text> - </Text>
                <TouchableOpacity style={ viewSelected == TASKS_COMPLETE  ? taskStyles.navBtnSelected : taskStyles.navBtn } onPress={completeViewPressed}>
                    <Text>Complete</Text>
                </TouchableOpacity>
            </View>
    )



    //---------------------------------------------------------------------
    //-------------------- Page Return -------------------------------------
   
    return(
            <View style={taskStyles.container}>
                <NavContainer />
                <TouchableOpacity style={taskStyles.fab} onPress={fabBtn}>
                    <Text style={taskStyles.fabText}>+</Text>
                </TouchableOpacity>
                <FlatList
                    style={taskStyles.flist}
                    data={taskData}
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
        backgroundColor: akTheme.bkgDark,
    }, 

    navCont:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 50,
        backgroundColor: akTheme.textLight,
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

        //ios   (not sure if this works)
        shadowColor: '#2b2b2b',
        shadowOffset: {
            width: 10,
            height: 10,
        },
        shadowRadius: 4.65,

        //android
        elevation: 2,
    },



    flist:{
        width: '90%',
        marginVertical: 20,
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
        backgroundColor: akTheme.blue,

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
        color: akTheme.textLight,
        fontSize: 40,
    },



    itemBtn:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

        backgroundColor: akTheme.bkgItems,
        marginVertical: 10,
    },

    //removes padding from bottom so that the SelectedItem Container is connected to item container
    itemBtnSelected:{  
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

        backgroundColor: akTheme.bkgItems,
        marginTop: 10,
    },

    itemStateCont: {
        height: 80,
        width: 80, 
        // marginLeft: '5%',

        display: "flex",
        justifyContent: "center",
        alignItems:"center",
    },

    itemStateText: {
        fontWeight: 'bold',
    },

    itemText:{
        marginLeft: '20%',
    },

    itemStateBkgComplete: {
        backgroundColor: akTheme.red,
    },

    itemStateBkgSprint: {
        backgroundColor: akTheme.blue,
    },

    itemStateBkgTodo: {
        backgroundColor: akTheme.green,
    },




    editCont:{
        marginBottom: 10,
        backgroundColor: akTheme.itemEditCont,
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
        backgroundColor: akTheme.red,
        padding: 2,
        borderRadius: 4,
    },

    editBtn:{
        backgroundColor: akTheme.blue,
        padding: 2,
        borderRadius: 4,
    }



    





})