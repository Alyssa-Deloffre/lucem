import { useEffect, useState } from 'react';
import {
    Keyboard,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import InputField from './InputField';
import { COLOR_GREEN, COLOR_PURPLE } from '../../data/styleGlobal';

export default function AutocompleteField({
    label,
    placeholder,
    defaultValue,
    value,
    onChangeText,
    suggestionsArr,
    require = true,
    onlySuggestions = true,
}) {
    // Liste de suggestion pour l'autocomplete
    const [suggestions, setSuggestions] = useState(suggestionsArr);
    // Affichage des suggestion
    const [showSuggestion, setShowSuggestion] = useState(false);
    // Éviter l'affichage des suggestions au chargement
    const [loaded, setLoaded] = useState(false);
    // Error message
    const [forcedErrorMessage, setForcedErrorMessage] = useState('');

    // Afficher les suggestions quand la valeur de l'autocomplete change
    useEffect(() => {
        if (loaded) {
            setShowSuggestion(true);
        }
    }, [value]);

    // Erreur si aucun élément ne correspond à la valeur
    useEffect(() => {
        if (suggestions.length === 0 && onlySuggestions) {
            setForcedErrorMessage('Aucun élément trouvé');
            return;
        }
        setForcedErrorMessage('');
    }, [suggestions, value]);

    // Filtre des suggestions en fonction de la valeur
    const filterSuggestions = (value) => {
        if (value.length > 0) {
            // Retirer les accents dans la valeur de recherche
            const valueWithoutAccent = value
                .normalize('NFD')
                .replace(/\p{Diacritic}/gu, '');
            // Création du pattern
            const pattern = new RegExp(valueWithoutAccent, 'gi');
            // Filtre les suggestions en fonction de la valeur (sans les accents)
            const filterSuggestion = suggestionsArr.filter((suggestion) => {
                const suggestionWithoutAccent = suggestion
                    .normalize('NFD')
                    .replace(/\p{Diacritic}/gu, '');
                return pattern.test(suggestionWithoutAccent);
            });
            setSuggestions(filterSuggestion);
        } else {
            setSuggestions(suggestionsArr);
        }
    };

    // Fonction au changement de la valeur de l'input
    const handleOnChangeText = (changeTextValue) => {
        setLoaded(true);
        // -- Filtrer les suggestions
        filterSuggestions(changeTextValue);
        onChangeText(changeTextValue);
    };

    // Fonction au "press" pour sélectionner l'une des suggestions
    const handleSuggestionPress = async (value) => {
        await onChangeText(value);
        setShowSuggestion(false);
        Keyboard.dismiss();
    };

    const handleFocus = () => {
        filterSuggestions(value);
        setShowSuggestion(true);
    };

    const handleBlur = () => {
        setShowSuggestion(false);
        // Gestion des erreurs quand l'input est désactivé
        if (
            onlySuggestions &&
            !suggestions.some((suggestion) => suggestion === value)
        ) {
            setForcedErrorMessage('La valeur renseignée est invalide.');
            return;
        }
        setForcedErrorMessage('');
    };

    // Affichage des suggestions filtrés ou non
    const suggestionDisplay = suggestions.map((suggestion, i) => {
        return (
            <TouchableOpacity
                key={i}
                onPress={() => handleSuggestionPress(suggestion)}
            >
                <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
        );
    });

    return (
        <View>
            <InputField
                label={label}
                placeholder={placeholder}
                defaultValue={defaultValue}
                value={value}
                onChangeText={(changeTextValue) =>
                    handleOnChangeText(changeTextValue)
                }
                forcedErrorMessage={forcedErrorMessage}
                require={require}
                onFocus={() => handleFocus()}
                onBlur={() => handleBlur()}
            />
            {showSuggestion && suggestions.length > 0 && (
                <View style={styles.suggestions}>{suggestionDisplay}</View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    suggestions: {
        backgroundColor: COLOR_GREEN[100],
        borderRadius: 8,
        padding: 12,
        position: 'absolute',
        width: '100%',
        top: '110%',
        gap: 12,
        shadowColor: COLOR_PURPLE[1000],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    suggestionText: {
        fontSize: 18,
        color: COLOR_PURPLE[1000],
    },
});
