import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLOR_GREEN, COLOR_PURPLE } from "../data/styleGlobal";
import { View, StyleSheet, Text } from "react-native";


export default function DateCheck({
    text,
    check = 0,
    select = false,
    total = false,
}) {

    let dateCheck = <FontAwesome name='circle-o' size={40} style={{color : COLOR_GREEN[600]}} />

    if (check >= 2 && select) {
        dateCheck = <FontAwesome name='check-circle' size={40} style={{color : COLOR_PURPLE[600]}}/>
    } else if (check >= 2 && !select) {
        dateCheck = <FontAwesome name='check-circle' size={40} style={{color : COLOR_GREEN[600]}}/>
    } else if (check === 0 && select) {
        dateCheck = <FontAwesome name='circle-o' size={40} style={{color : COLOR_PURPLE[600]}}/>
    } else if(check === 1 && select) {
        dateCheck = <FontAwesome name='dot-circle-o' size={40} style={{color : COLOR_PURPLE[600]}}/>

    } else if (check === 1 && ! select) {
        dateCheck = <FontAwesome name='dot-circle-o' size={40} style={{color : COLOR_GREEN[600]}}/>

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