import React from "react";
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import Style from "../../style/Style";

export default function ButtonRegular (text, buttonFunction) {
    return (
        <TouchableOpacity onPress={buttonFunction} style={Style.ButtonRegular}>
        <Text>{text}</Text>
        </TouchableOpacity>
    )
}

