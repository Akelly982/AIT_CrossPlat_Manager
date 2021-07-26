
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';


// add for auto generate id
//{ id: '131113', name: "myHeroBin", state: 1}

export function AddNewProject(props) {
    const navigation = useNavigation();
    //const db = firebase.getDatabase();
    //const db = getFirestore();

    const [projectName, setProjectName] = useState('')
    const [errorMsg, setErrorMsg] = useState(null)

    


    const newProjectSubmit = () => {
        console.log('new project :' + projectName)

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
                <Text> {props.user.uid }</Text>
                <Text>Project name: </Text>
                <TextInput
                    onChangeText={ (val) => setProjectName(val) }
                    style={addNewProjectStyles.input}
                />
                <TouchableOpacity onPress={newProjectSubmit}>
                    <Text>Submit</Text>
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
        backgroundColor: "#3b3b3b",
    },
    container:{
        width:300,
        backgroundColor: "#fff",
        paddingHorizontal:20,
        paddingVertical:20,
        borderRadius:20,
    },
    input:{
        backgroundColor: '#e8e8e8',
        height: 20,
    },

    errorMsgHidden:{
        textAlign: 'center',
        color: 'red',
    },

    errorMsg: {
        textAlign: 'center',
        color: 'red',
    },
    
})