import { useNavigation } from '@react-navigation/native';
import React, {useState,useEffect}from 'react';
import { FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';




const tempItems = [
    { id: '457644', task: "myProjectName", state: 'Todo'},
]

const SHOW_ALL = 'ALL'
const SHOW_SPRINT = 'SPRINT'
const SHOW_TODO = 'TODO'
const SHOW_COMPLETE = 'COMPLETE'

export function Tasks (props){
    const navigation = useNavigation()
    const [viewSelected, setViewSelected] = useState(SHOW_ALL) 
    const [taskData, setTaskData] = useState([])
    const [heldTaskSelectedId, setHeldTaskSelectedId] = useState('')

    const [initLoad, setInitLoad] = useState(true) //sometimes list does not update -- this is a support bool



    useEffect(() =>{
        console.log("selected view: " + viewSelected)
    }),[viewSelected]


    useEffect(() =>{
        if(props.taskUpdater || initLoad){
            //what list do we want to load
            switch(viewSelected) {
                case SHOW_ALL:
                    updateTaskListAll()
                    break;
                case SHOW_COMPLETE:
                    updateTaskListComplete()
                    break;
                case SHOW_SPRINT:
                    updateTaskListSprint()
                    break;
                case SHOW_TODO:
                    updateTaskListTodo()
                    break;
                default:
                    console.log("ERROR Task Switch: DEFAULT")
            }
        }
        setInitLoad(false)
    }),[props.taskUpdater]
    
    




    const allPressed = () => {
        //set if not alredy set
        if(viewSelected != SHOW_ALL){
            setViewSelected(SHOW_ALL)
            props.handleTaskUpdater(true)
        }
    }

    const todoPressed = () => {
        if(viewSelected != SHOW_TODO){
            setViewSelected(SHOW_TODO)
            props.handleTaskUpdater(true)
        }
    }

    const sprintPressed = () => {
        if(viewSelected != SHOW_SPRINT){
            setViewSelected(SHOW_SPRINT)
            props.handleTaskUpdater(true)
        }
    }

    const completePressed = () => {
        //set if not alredy set
        if(viewSelected != SHOW_COMPLETE){
            setViewSelected(SHOW_COMPLETE)
            props.handleTaskUpdater(true)
        }
    }


    


    const updateTaskListAll = () => {
        props.handleTaskUpdater(false) //stops use effect above from looping runs once
        setTaskData([]) //empty before filling

        //get data once
        const ref = props.db.collection('Users').doc(props.auth.uid).collection('Projects').doc(props.parentId).collection("Tasks")
        ref.onSnapshot((querySnapshot) => {
            let myData = []
            querySnapshot.forEach((doc)=>{
                //console.log(doc.id, " => ", doc.data().task, " / ", doc.data().state)
                let tempItem = {id: doc.id, task: doc.data().task, state: doc.data().state}
                myData.push(tempItem)
            })
            setTaskData(myData)
        })
    }

    const updateTaskListComplete = () => {
        props.handleTaskUpdater(false) //stops use effect above from looping runs once
        setTaskData([]) //empty before filling

        //get data once
        const ref = props.db.collection('Users').doc(props.auth.uid).collection('Projects').doc(props.parentId).collection("Tasks").where('state', "==", SHOW_COMPLETE)
        ref.onSnapshot((querySnapshot) => {
            let myData = []
            querySnapshot.forEach((doc)=>{
                //console.log(doc.id, " => ", doc.data().task, " / ", doc.data().state)
                let tempItem = {id: doc.id, task: doc.data().task, state: doc.data().state}
                myData.push(tempItem)
            })
            setTaskData(myData)
        })
    }

    const updateTaskListSprint = () => {
        props.handleTaskUpdater(false) //stops use effect above from looping runs once
        setTaskData([]) //empty before filling

        //get data once
        const ref = props.db.collection('Users').doc(props.auth.uid).collection('Projects').doc(props.parentId).collection("Tasks").where('state', "==", SHOW_SPRINT)
        ref.onSnapshot((querySnapshot) => {
            let myData = []
            querySnapshot.forEach((doc)=>{
                //console.log(doc.id, " => ", doc.data().task, " / ", doc.data().state)
                let tempItem = {id: doc.id, task: doc.data().task, state: doc.data().state}
                myData.push(tempItem)
            })
            setTaskData(myData)
        })
    }
    
    const updateTaskListTodo = () => {
        props.handleTaskUpdater(false) //stops use effect above from looping runs once
        setTaskData([]) //empty before filling

        //get data once
        const ref = props.db.collection('Users').doc(props.auth.uid).collection('Projects').doc(props.parentId).collection("Tasks").where('state', "==", SHOW_TODO)
        ref.onSnapshot((querySnapshot) => {
            let myData = []
            querySnapshot.forEach((doc)=>{
                //console.log(doc.id, " => ", doc.data().task, " / ", doc.data().state)
                let tempItem = {id: doc.id, task: doc.data().task, state: doc.data().state}
                myData.push(tempItem)
            })
            setTaskData(myData)
        })
    }







    const fabBtn = () => {
        console.log("fab pressed")
        navigation.navigate('AddNewTask')
    }


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
        }
        const renamePress = () => {
            console.log("rename: " + item.task)
        }
        const alterStatePress = () => {
            console.log("alterState: " + item.task)
        }


        const BaseItem = () => (
            <TouchableOpacity
                style={(item.id == heldTaskSelectedId) ? taskStyles.itemBtnSelected :taskStyles.itemBtn}
                onPress={() => itemPress()}    
                onLongPress={() => itemPressHeld()}    
            >
                <Text> {item.task} </Text>
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
                        <TouchableOpacity style={taskStyles.editBtn} onPress={renamePress}>
                            <Text style={taskStyles.editText}> rename </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={taskStyles.editBtn} onPress={alterStatePress}>
                            <Text style={taskStyles.editText}> alter state </Text>
                        </TouchableOpacity>
                    </View>  
                </View>
            )
        }
        

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