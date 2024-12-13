import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InputField from "./InputField";
import { COLOR_GREEN, COLOR_PURPLE } from "../../data/styleGlobal";

export default function AutocompleteField({
    label,
    placeholder,
    defaultValue,
    value,
    onChangeText,
    suggestionsArr,
    require
}) {

    const [suggestions, setSuggestions] = useState(suggestionsArr)
    const [showSuggestion, setShowSuggestion] = useState(false)

    useEffect(() => {
        if (value.length > 0) {
            setShowSuggestion(true)
            return
        }
        setShowSuggestion(false)
    }, [value])

    const handleOnChangeText = (value) => {
        // -- Filtrer les suggestions
        const valueWithoutAccent = value.normalize('NFD').replace(/\p{Diacritic}/gu, '')
        const pattern = new RegExp(valueWithoutAccent, "gi")
        const filterSuggestion = suggestionsArr.filter(suggestion => {
            const suggestionWithoutAccent = suggestion.normalize('NFD').replace(/\p{Diacritic}/gu, '')
            return pattern.test(suggestionWithoutAccent)
        })
        setSuggestions(filterSuggestion)


        onChangeText(value)
    }

    const handleSuggestionPress = async (value) => {
        await onChangeText(value)
        setShowSuggestion(false)
    }

    const suggestionDisplay = suggestions.map((suggestion, i) => {
        return (
            <TouchableOpacity key={i} onPress={() => handleSuggestionPress(suggestion)}>
                <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
        )
    })

    return (
        <View>
            <InputField
                label={label}
                placeholder={placeholder}
                defaultValue={defaultValue}
                value={value}
                onChangeText={(value) => handleOnChangeText(value)}
                forcedErrorMessage={suggestions.length === 0 ? "Aucun élément trouvé" : null}
                require={require}
                onBlur={() => setShowSuggestion(false)}
                onFocus={() => setShowSuggestion(true)}
            />
            {showSuggestion && suggestions.length > 0 && (
                <View style={styles.suggestions}>
                    {suggestionDisplay}
                </View>
            )}
        </View>

    )
}

const styles = StyleSheet.create({
    suggestions: {
        backgroundColor: COLOR_GREEN[100],
        borderRadius: 8,
        padding: 12,
        position: "absolute",
        width: "100%",
        top: "110%",
        gap: 12,
        shadowColor: COLOR_PURPLE[1000],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    suggestionText: {
        fontSize: 18,
        color: COLOR_PURPLE[1000],
    }
})