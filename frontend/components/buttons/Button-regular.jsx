import React from "react";
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import { COLORGREEN, COLORPURPLE } from "../../data/styleGlobal";
import { useFonts, Quicksand} from '@expo-google-fonts/quicksand'

export default function ButtonRegular (text, buttonEvent, type = 'buttonRegular') {
    return (
        <TouchableOpacity onPress={buttonEvent} style={styles[type]}>
        <Text>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonRegular : {
        borderColor : COLORGREEN[600],
        borderWidth : 1,
        fontFamily : 'Quicksand'
    },
    buttonStroke : {
        borderColor : 'red',
        borderWidth : 1
    }
})