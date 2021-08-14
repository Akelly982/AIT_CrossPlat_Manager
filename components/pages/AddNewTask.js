
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { akTheme } from '../../akTheme';


// add for auto generate id
//{ id: '131113', task: "myTask", state: 'TODO'}

export function AddNewTask(props) {
    const navigation = useNavigation();

    const [taskName, setTaskName] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)

    


    const newTaskSubmit = () => {
        console.log('newTask :' + taskName)

        let checker = false
        let uploadName = taskName.trim()

        if(uploadName.length <= 0){
            setErrorMsg("Please fill in project name")
            return
        }else if (uploadName.length > 25){
            setErrorMsg("Project name is to long (25)")
            return
        }else{
            checker = true
        }



        if(checker){
            //using add should give it a generated id
            props.db.collection('Users').doc(props.user.uid).collection('Projects').doc(props.parentId).collection('Tasks').add({
                task: taskName,
                state: "TODO"
            })
            .then(() => {
                console.log("Document successfully written!")
                props.handleTaskUpdater(true)
                navigation.goBack()
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        }




    }


    const ErrorMsg = () => {
        if (errorMsg != null){
            return(
                <Text style={addNewTaskStyles.errorMsg}> Error: {errorMsg}</Text>
            )
        }else{
            // this does work returning null does not cause an error
            return(
                null
            )
        }
    }


    return (
        <View style={addNewTaskStyles.bkg} >
            <View style={addNewTaskStyles.container}>
                <Text style={addNewTaskStyles.title}> -- New Task: -- </Text>
                <Text>Task name: </Text>
                <TextInput
                    onChangeText={ (val) => setTaskName(val) }
                    style={addNewTaskStyles.input}
                />
                <TouchableOpacity onPress={newTaskSubmit} style={addNewTaskStyles.submitBtn}>
                    <Text style={addNewTaskStyles.submitText}>Submit</Text>
                </TouchableOpacity>
                <ErrorMsg/>
            </View>
        </View>
    )

    
    
}



const addNewTaskStyles = StyleSheet.create({
    bkg:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: akTheme.bkgDark,
    },
    container:{
        width:300,
        backgroundColor: akTheme.bkgInnerPageContainers,
        paddingHorizontal:20,
        paddingVertical:20,
        borderRadius:20,
    },
    input:{
        backgroundColor: akTheme.textLight,
        borderWidth: 2,
        borderColor: akTheme.inputBorder,
        height: 30,
        paddingHorizontal: 5,
    },

    errorMsgHidden:{
        textAlign: 'center',
        color: akTheme.red,
    },

    errorMsg: {
        textAlign: 'center',
        color: akTheme.red,
        marginTop: 10,
    },

    submitBtn:{
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
        width: 80,
        alignSelf: 'center',
        backgroundColor: akTheme.blue,
    },

    submitText:{
        color: akTheme.textLight,
        textAlign: 'center',
    },

    title:{
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    
})