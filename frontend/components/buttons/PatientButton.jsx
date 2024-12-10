import React from "react";
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import { COLOR_GREEN } from "../../data/styleGlobal";
import FontAwesome from "react-native-vector-icons/FontAwesome";



export default function PatientButton({text, onPress, type='patientButton'}){

    return(
        <TouchableOpacity onPress={onPress} style={styles[type]}>
            <Text style={styles.avatar}>avatar</Text>
            <Text style={styles.buttonTxt}>{text}</Text>
            <FontAwesome name='chevron-right'/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    patientButton: {
        borderColor: COLOR_GREEN[600],
        borderWidth: 1,
        paddingVertical : 8,
        paddingHorizontal : 16,
        width : 325,
        height : 73,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
    },
    buttonTxt : {
        fontFamily: 'Quicksand',
        fontWeight : 'bold',
        fontSize : 20,
    },
})