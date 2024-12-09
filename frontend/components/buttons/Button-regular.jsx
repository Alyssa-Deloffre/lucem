import React from "react";
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import { COLORGREEN, COLORPURPLE } from "../../data/styleGlobal";
import { useFonts, Quicksand} from '@expo-google-fonts/quicksand'


export default function ButtonRegular (text, buttonEvent, type = 'buttonRegular') {
    const [fonts] = useFonts({Quicksand})

    return (
        <TouchableOpacity onPress={buttonEvent} style={styles[type]}>
        <Text style={styles[type]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonRegular : {
        borderColor : COLORGREEN[600],
        borderWidth : 1,
        fontSize : 40,
        fontFamily : 'Quicksand',
    },
    buttonStroke : {
        borderColor : 'red',
        borderWidth : 1
    }
})