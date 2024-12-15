import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLOR_GREEN, COLOR_PURPLE } from "../data/styleGlobal";
import { View, StyleSheet, Text } from "react-native";


export default function DateCheck({
    text,
    check = false,
    select = false
}) {

    let dateCheck = <FontAwesome name='circle-thin' size={40} style={{color : COLOR_GREEN[600]}} />

    if (check && select) {
        dateCheck = <FontAwesome name='check-circle' size={40} style={{color : COLOR_PURPLE[600]}}/>
    } else if (check && !select) {
        dateCheck = <FontAwesome name='check-circle' size={40} style={{color : COLOR_GREEN[600]}}/>
    } else if (!check && select) {
        dateCheck = <FontAwesome name='circle-thin' size={40} style={{color : COLOR_PURPLE[600]}}/>
    }

    return (
        <View>

            {dateCheck}
            <Text style={styles.txt}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    txt: {
        fontWeight: 'bold',
    }
})