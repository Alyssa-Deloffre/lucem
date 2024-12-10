import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { COLOR_GREEN, COLOR_PURPLE } from "../../data/styleGlobal";



export default function ButtonRegular({ text, onPress, type = 'buttonRegular' }) {


    return (
        <TouchableOpacity onPress={onPress} style={styles[type]}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonRegular: {
        borderColor: COLOR_GREEN[600],
        borderWidth: 1,
    },
    buttonStroke: {
        borderColor: 'red',
        borderWidth: 1
    },
    buttonText : {
        fontFamily: 'MontserratAlternates-Regular',

    }
})