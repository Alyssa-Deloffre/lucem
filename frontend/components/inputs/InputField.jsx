import React, { useEffect, useState } from "react";
import { TextInput, View, Text, StyleSheet } from 'react-native'
import { COLOR_GREEN, COLOR_PURPLE, COLOR_RED } from "../../data/styleGlobal";

export default function InputField({
    label,
    placeholder,
    errorMessage = "Merci de compléter ce champ.",
    error = false,
    value,
    onChangeText,
    defaultValue = "",
    inputMode = "text",
    secureTextEntry = false,
    autoComplete,
}) {

    const handleOnChangeText = (value) => {
        onChangeText(value)
    }

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label} >{label}</Text>
            <TextInput
                style={styles.inputNotFocused}
                placeholder={placeholder}
                value={value}
                onChangeText={(value) => handleOnChangeText(value)}
                defaultValue={defaultValue}
                inputMode={inputMode}
                secureTextEntry={secureTextEntry}
                autoComplete={autoComplete}
            />
            {error && errorMessage !== "" && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        gap: 4,
        width: "100%",
    },
    label: {
        fontSize: 14,
        fontWeight: 600
    },
    input: {
        fontSize: 18,
        color: COLOR_PURPLE[1000],
        borderWidth: 1,
        borderRadius: 8,
        width: "100%",
        padding: 12,
    },
    inputNotFocused: {
        borderColor: COLOR_PURPLE[1000],
    },
    inputFocused: {
        borderColor: COLOR_GREEN[600],
    },
    errorMessage: {
        fontSize: 12,
        color: COLOR_RED[600]
    }
})
