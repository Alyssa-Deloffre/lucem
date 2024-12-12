import React from "react";
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {COLOR_GREEN} from "../../data/styleGlobal";
import FontAwesome from "react-native-vector-icons/FontAwesome";


export default function FullButton({text, onPress, type, illustration}){

    return(
        <TouchableOpacity onPress={onPress} style={styles[type]}>
            {illustration && <Image style={styles.image} source={illustration}/>}
            <Text style={styles.buttonTxt}>{text}</Text>
            <FontAwesome name='chevron-right'/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    fullButton: {
        backgroundColor: COLOR_GREEN[600],
        borderWidth: 1,
        paddingVertical : 14,
        paddingHorizontal : 24,
        width : '100%',
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
        width : '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
    },
    buttonTxt : {
        fontFamily: 'Quicksand',
        fontWeight : 'bold',
    },
    image : {
            width : 60,
            height : 60,
    },
})