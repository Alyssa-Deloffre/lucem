import { useState } from "react"
import MainContainer from "../../components/MainContainer"
import UserAutocomplete from "../../components/inputs/UserAutocomplete"

export default function TherapistProfileScreen() {

    const [autocomplete, setAutocomplete] = useState({ photo: "", fullname: "", token: "" })

    const testArr = [
        { photo: require("../../assets/avatars/avatar7.png"), fullname: "Mayleen Grandpré", token: "vjkhfhdjhgvjdhbviur" },
        { photo: require("../../assets/avatars/avatar3.png"), fullname: "Alyssa Deloffre", token: "djghiqduhfifnlsmrfuhe" },
        { photo: require("../../assets/avatars/avatar1.png"), fullname: "Quentin Sebire", token: "sjfhjksfsnfnssklufhqsjk" },
    ]

    console.log(autocomplete)

    return (
        <MainContainer>
            <UserAutocomplete
                label="test"
                value={autocomplete}
                onChangeText={(value) => setAutocomplete(value)}
                users={testArr}
            />

        </MainContainer>
    )
}

