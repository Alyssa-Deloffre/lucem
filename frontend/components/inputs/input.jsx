import React, { useEffect, useState } from "react";
import { TextInput, View, Text, StyleSheet } from 'react-native'

export default function Input({
    label,
    placeholder,
    errorMessage = "Merci de compléter ce champ.",
    value,
    onChangeText,
    defaultValue = "",
    inputMode = "text",
    require = true
}) {

    const [error, setError] = useState(false)
    const [firstComplete, setFirstComplete] = useState(true)

    useEffect(() => {
        if (require && !firstComplete && value === "") {
            setError(true)
        }
    }, [value])

    const handleOnChangeText = (value) => {
        if (firstComplete) {
            setFirstComplete(false)
        }
        onChangeText(value)
    }

    return (
        <View>
            <Text style={styles.textTop} >{label}</Text>
            <TextInput
                placeholder={placeholder}
                onChangeText={(value) => handleOnChangeText(value)}
                value={value}
                defaultValue={defaultValue}
                inputMode={inputMode}
                style={styles.input}
            />
            {error && <Text style={styles.textBottom}>{errorMessage}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 8,
        width: 350,
        height: 45,
        fontSize: 18,
        padding: 12,
    },
    textTop: {
        fontSize: 14,
    },
    textBottom: {
        fontSize: 12,
    }
})
