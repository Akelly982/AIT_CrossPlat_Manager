
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { akTheme } from '../../akTheme';


// add for auto generate id
//{ id: '131113', name: "myHeroBin", state: 1}

export function AddNewProject(props) {
    const navigation = useNavigation();

    const [projectName, setProjectName] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)

    


    const newProjectSubmit = () => {
        console.log('newProject :' + projectName)

        let checker = false
        let uploadName = projectName.trim()

        if(uploadName.length <= 0){
            setErrorMsg("Please fill in project name")
            return
        }else if (uploadName.length > 15){
            setErrorMsg("Project name is to long (15)")
            return
        }else{
            checker = true
        }



        if(checker){
            //using add should give it a generated id
            props.db.collection('Users').doc(props.user.uid).collection('Projects').add({
                projectName: projectName,
                state: "ACTIVE"
            })
            .then(() => {
                console.log("Document successfully written!")
                props.handleHomeUpdater(true)
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
                <Text style={addNewProjectStyles.errorMsg}> Error: {errorMsg}</Text>
            )
        }else{
            // this does work returning null does not cause an error
            return(
                null
            )
        }
    }


    return (
        <View style={addNewProjectStyles.bkg} >
            <View style={addNewProjectStyles.container}>
                <ErrorMsg/>
                <Text style={addNewProjectStyles.title}> -- New Project: -- </Text>
                <Text>Project name: </Text>
                <TextInput
                    onChangeText={ (val) => setProjectName(val) }
                    style={addNewProjectStyles.input}
                />
                <TouchableOpacity onPress={newProjectSubmit} style={addNewProjectStyles.submitBtn}>
                    <Text style={addNewProjectStyles.submitText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    
    
}



const addNewProjectStyles = StyleSheet.create({
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