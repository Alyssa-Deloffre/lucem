import { useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import Autocomplete from "react-native-autocomplete-input";

export default function AutocompleteField() {
    const [search, setSearch] = useState("")
    const [suggestion, setSuggestion] = useState(["coucou", "salut", "bonjour"])
    let test = ""

    return (
        <Autocomplete
            autoCapitalize="none"
            autoCorrect={false}
            data={suggestion}
            value={search}
            onChangeText={(value) => {
                test = value
                console.log(test)
                // setSearch(value)
            }}
            placeholder="Cherche ton psy"
            flatListProps={{
                keyboardShouldPersistTaps: "always",
                keyExtractor: (_, idx) => idx.toString(),
                renderItem: ({ item }) => {
                    return (
                        <TouchableOpacity key={item} onPress={() => {
                            setSearch(item)
                        }}>
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    )
                },
            }}
        />
    )
}