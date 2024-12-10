import React, {useState} from "react";
import {TextInput, View, Text, StyleSheet} from 'react-native'

export default function Input ({label, placeholder, errorMessage, value, onChangeText}) {

    const [error, setError] = useState(false)

    if (value === "") {
        setError(true)
    }

    return (
        <View>
            <Text style={styles.textTop} >{label}</Text>
            <TextInput placeholder={placeholder} onChangeText={onChangeText} value={value} style={styles.input} />
            {error && <Text style={styles.textBottom}>{errorMessage}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 8,
        width : 350,
        height : 45,
        fontSize : 18,
        padding : 12,
    },
    textTop: {
        fontSize : 14,
    },
    textBottom: {
        fontSize : 12,
    }
})
