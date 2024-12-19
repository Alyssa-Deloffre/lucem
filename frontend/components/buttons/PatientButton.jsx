import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { COLOR_GREEN, COLOR_PURPLE } from "../../data/styleGlobal";
import FontAwesome from "react-native-vector-icons/FontAwesome";


export default function PatientButton({ avatar, firstname, name, onPress }) {

    return (
        <TouchableOpacity onPress={onPress} style={styles.patientButton}>
            <Image style={styles.avatar} source={avatar} />
            <Text style={styles.buttonTxt}>{firstname} {name}</Text>
            <FontAwesome name='chevron-right' />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    patientButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: COLOR_PURPLE[1000],
        shadowOpacity: 0.2,
        shadowRadius: 5,
        backgroundColor: 'white',
        marginVertical : 12
    },
    avatar: {
        width: 60,
        height: 60,
    },
    buttonTxt: {
        fontFamily: 'Quicksand',
        fontWeight: 'bold',
        fontSize: 20,
    },
})