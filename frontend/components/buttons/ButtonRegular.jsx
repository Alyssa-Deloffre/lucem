import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { COLOR_GREEN, COLOR_PURPLE } from "../../data/styleGlobal";
import { useFonts, Quicksand } from '@expo-google-fonts/quicksand'

export default function ButtonRegular({ text, onPress, type = 'buttonRegular' }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles[type]}>
            <Text>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonRegular: {
        borderColor: COLOR_GREEN[600],
        borderWidth: 1,
        fontFamily: 'Quicksand'
    },
    buttonStroke: {
        borderColor: 'red',
        borderWidth: 1
    }
})