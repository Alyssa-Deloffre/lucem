import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLOR_GREEN, COLOR_PURPLE } from "../data/styleGlobal";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { FONTS } from "../data/styleGlobal";


export default function DateCheck({
    text,
    check = 0,
    select = false,
    total = false,
    isLoading = false
}) {

    let dateCheck = <FontAwesome name='circle-o' size={40} style={{ color: COLOR_GREEN[600] }} />

    if (check >= 2 && select) {
        dateCheck = <FontAwesome name='check-circle' size={40} style={{ color: COLOR_PURPLE[600] }} />
    } else if (check >= 2 && !select) {
        dateCheck = <FontAwesome name='check-circle' size={40} style={{ color: COLOR_GREEN[600] }} />
    } else if (check === 0 && select) {
        dateCheck = <FontAwesome name='circle-o' size={40} style={{ color: COLOR_PURPLE[600] }} />
    } else if (check === 1 && select) {
        dateCheck = <FontAwesome name='dot-circle-o' size={40} style={{ color: COLOR_PURPLE[600] }} />

    } else if (check === 1 && !select) {
        dateCheck = <FontAwesome name='dot-circle-o' size={40} style={{ color: COLOR_GREEN[600] }} />

    }
    return (
        <View style={styles.block}>
            {isLoading ? <ActivityIndicator size="large" color={COLOR_GREEN[600]} /> : dateCheck}
            {!isLoading && <Text style={styles.texte}>{text}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        minHeight: 60,
        flex: 1,
        justifyContent: "center"
    },
    texte: {
        fontWeight: 'bold',
    },
    dateLoading: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    }
})