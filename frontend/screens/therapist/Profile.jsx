import { Text, View } from "react-native"
import AutocompleteField from "../../components/inputs/AutocompleteField"
import { useState } from "react"
import MainContainer from "../../components/MainContainer"

export default function TherapistProfileScreen() {

    const [autocomplete, setAutocomplete] = useState("")

    const test = ["Mayleen Grandpré", "Alyssa Deloffre", "Quentin Sebire"]

    return (
        <MainContainer>
            <AutocompleteField
                label="test"
                value={autocomplete}
                onChangeText={(value) => setAutocomplete(value)}
                suggestionsArr={test}
                require={false}
            />

        </MainContainer>
    )
}

