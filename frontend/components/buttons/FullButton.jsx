import React from "react";
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {COLOR_GREEN} from "../../data/styleGlobal";


export default function FullButton({text, onPress, type='fullButton'}){

    return(
        <TouchableOpacity onPress={onPress} style={styles[type]}>
            <Text style={styles.buttonTxt}>{text}</Text>
            <Text style={styles.buttonTxt2}>{'>'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    fullButton: {
        borderColor: COLOR_GREEN[600],
        backgroundColor: COLOR_GREEN[600],
        borderWidth: 1,
        paddingVertical : 14,
        paddingHorizontal : 24,
        width : 326,
        height : 64,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
    },
    emptyButton: {
        borderColor: COLOR_GREEN[600],
        borderWidth: 1,
        paddingVertical : 14,
        paddingHorizontal : 24,
        width : 326,
        height : 64,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
    },
    buttonTxt : {
        fontFamily: 'Quicksand',
        fontWeight : 'bold',
    },
    buttonTxt2 : {
        fontFamily: 'Quicksand',
        fontWeight : 'bold',
        fontSize : 20,
    }
})