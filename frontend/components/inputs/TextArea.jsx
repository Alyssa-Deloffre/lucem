import React, { useEffect, useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { COLOR_GREEN, COLOR_PURPLE, COLOR_RED } from '../../data/styleGlobal';

export default function TextArea({
    label,
    placeholder,
    forcedErrorMessage,
    value,
    onChangeText,
    defaultValue = '',
    require = false,
    isSubmitToggle,
    numberOfLines = 10,
    maxLength,
}) {
    // État de l'input si focus pour le style
    const [isFocused, setIsFocused] = useState(false);
    // Permet de ne pas mettre d'erreur avant que l'utilisateur n'ait commencé à remplir le champ
    const [firstComplete, setFirstComplete] = useState(true);
    // Permet de modifier le message d'erreur en fonction des cas
    const [errorMsg, setErrorMsg] = useState('Merci de compléter ce champ.');
    // Afficher les erreurs ou non
    const [error, setError] = useState(false);

    // Afficher les erreurs quand le bouton submit est joué en activant le firstcomplete
    useEffect(() => {
        setFirstComplete(false);
    }, [isSubmitToggle]);

    // Afficher les erreurs en fonction des cas
    useEffect(() => {
        // Erreur pour les autres champs
        if (!firstComplete && require && value === '') {
            setError(true);
            setErrorMsg('Merci de compléter ce champ.');
            return;
        }

        setError(false);
    }, [value, isSubmitToggle]);

    // Si il existe une erreur forcée ou qu'elle est modifiée, on force l'erreur et on l'affiche
    useEffect(() => {
        if (forcedErrorMessage && forcedErrorMessage !== '') {
            setError(true);
            setErrorMsg(forcedErrorMessage);
        }
    }, [forcedErrorMessage, value, isSubmitToggle]);

    // Quand le champ est modifié, ce n'est pus le first complete et on renvoie la fonction
    const handleOnChangeText = (value) => {
        setFirstComplete(false);
        onChangeText(value);
    };

    // Style variable en fonction de l'état de l'input
    let inputStyle = styles.inputNotFocused;
    if (isFocused) {
        inputStyle = styles.inputFocused;
    }
    if (error) {
        inputStyle = styles.inputError;
    }

    return (
        <View style={styles.inputContainer}>
            <Text style={error ? styles.labelError : styles.label}>
                {label}
            </Text>
            <TextInput
                style={[styles.input, inputStyle]}
                placeholder={placeholder}
                value={value}
                onChangeText={(value) => handleOnChangeText(value)}
                defaultValue={defaultValue}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                multiline={true}
                numberOfLines={numberOfLines}
                maxLength={maxLength}
                inputMode='text'
            />
            {error && <Text style={styles.errorMessage}>{errorMsg}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        gap: 4,
        width: '100%',
    },
    label: {
        fontFamily: 'Quicksand-SemiBold',
        fontSize: 16,
        color: COLOR_PURPLE[1000],
    },
    labelError: {
        fontSize: 14,
        fontWeight: 600,
        color: COLOR_RED[600],
    },
    input: {
        fontSize: 18,
        color: COLOR_PURPLE[1000],
        borderWidth: 1,
        borderRadius: 8,
        width: '100%',
        padding: 12,
        minHeight: 150,
    },
    inputNotFocused: {
        borderColor: COLOR_PURPLE[1000],
    },
    inputFocused: {
        borderColor: COLOR_GREEN[600],
        backgroundColor: COLOR_GREEN[100],
    },
    inputError: {
        borderColor: COLOR_RED[600],
        backgroundColor: COLOR_RED[100],
    },
    errorMessage: {
        fontSize: 12,
        color: COLOR_RED[600],
    },
});
