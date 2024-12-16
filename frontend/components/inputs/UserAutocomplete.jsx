import { useEffect, useState } from "react";
import { Image, Keyboard, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InputField from "./InputField";
import { COLOR_GREEN, COLOR_PURPLE } from "../../data/styleGlobal";


export default function UserAutocomplete({
    label,
    placeholder,
    value,
    onChangeText,
    users,
    require = true,
    onlySuggestions = true
}) {



    const [suggestions, setSuggestions] = useState(users)
    const [showSuggestion, setShowSuggestion] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [forcedErrorMessage, setForcedErrorMessage] = useState("")

    useEffect(() => {
        if (loaded) {
            setShowSuggestion(true)
        }
    }, [value])

    useEffect(() => {
        if (suggestions.length === 0 && onlySuggestions) {
            setForcedErrorMessage("Aucun élément trouvé")
            return
        }
        setForcedErrorMessage("")
    }, [suggestions, value])

    const filterSuggestions = (value) => {
        if (value.length > 0) {
            const valueWithoutAccent = value.normalize('NFD').replace(/\p{Diacritic}/gu, '')
            const pattern = new RegExp(valueWithoutAccent, "gi")
            const filterSuggestion = users.filter(suggestion => {
                const suggestionWithoutAccent = suggestion.fullname.normalize('NFD').replace(/\p{Diacritic}/gu, '')
                return pattern.test(suggestionWithoutAccent)
            })
            setSuggestions(filterSuggestion)
        } else {
            setSuggestions(users)
        }
    }

    const handleOnChangeText = (changeTextValue) => {
        setLoaded(true)
        // -- Filtrer les suggestions
        filterSuggestions(changeTextValue)
        onChangeText(changeTextValue)
    }

    const handleSuggestionPress = async (value) => {
        await onChangeText(value)
        setShowSuggestion(false)
        Keyboard.dismiss()
    }

    const handleFocus = () => {
        filterSuggestions(value)
        setShowSuggestion(true)
    }

    const handleBlur = () => {
        setShowSuggestion(false)
        if (onlySuggestions && !suggestions.some(suggestion => suggestion === value)) {
            setForcedErrorMessage("La valeur renseignée est invalide.")
            return
        }
        setForcedErrorMessage("")
    }

    const suggestionDisplay = suggestions.map((suggestion, i) => {
        const { photo, fullname, token } = suggestion
        return (
            <TouchableOpacity key={i} onPress={() => handleSuggestionPress(suggestion)}>
                <View style={styles.user}>
                    <Image source={photo} style={styles.userImage} />
                    <Text style={styles.userName}>{fullname}</Text>
                </View>
            </TouchableOpacity>
        )
    })

    return (
        <View>
            <InputField
                label={label}
                placeholder={placeholder}
                value={value.fullname}
                onChangeText={(changeTextValue) => handleOnChangeText(changeTextValue)}
                forcedErrorMessage={forcedErrorMessage}
                require={require}
                onFocus={() => handleFocus()}
                onBlur={() => handleBlur()}
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
        zIndex: 10000,
        width: "100%",
        top: "110%",
        gap: 12,
        shadowColor: COLOR_PURPLE[1000],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    user: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 1000,
        backgroundColor: "gray"
    },
    userName: {
        fontSize: 18,
        color: COLOR_PURPLE[1000],
    },
})