import { useState } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet
} from "react-native";
import { useDispatch } from 'react-redux';
import { addUserToken } from '../reducers/user';
import ButtonRegular from "../components/buttons/ButtonRegular";
import InputField from "../components/inputs/InputField"
import { checkEmail } from '../modules/checkConnectionInputs';
import { QUENTIN_URL } from '../data/globalVariables';
import Card from '../components/Card';
import MainContainer from '../components/MainContainer';


const connectPatient = async (email, password) => {
    const resp = await fetch(`${QUENTIN_URL}/patients/signin`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
    })
    const json = await resp.json()
    return json
}

export default function SigninScreen({ navigation }) {

    const dispatch = useDispatch()

    const [inputs, setInputs] = useState({ email: "", password: "" })
    const [globalError, setGlobalError] = useState(false)

    // Afficher les erreurs des inputs quand on appuie sur le bouton
    const [isSubmitToggle, setIsSubmitToggle] = useState(false)

    const handleChangeEmail = (value) => {
        setInputs(prev => ({ ...prev, email: value }))
    }

    const handleConnected = async () => {
        setIsSubmitToggle(!isSubmitToggle)
        if (inputs.email !== "" && inputs.password !== "" && checkEmail(inputs.email)) {
            const response = await connectPatient(inputs.email, inputs.password)
            if (response.result) {
                dispatch(addUserToken(response.token))
                navigation.navigate("PatientTabNavigator")
            } else {
                setGlobalError(true)
            }
        } else {
            setGlobalError(false)
        }
    }

    return (
        <MainContainer>
            <View style={styles.container}>
                <Text>
                    Me connecter
                </Text>
                <Card>
                    <InputField
                        label="Email"
                        placeholder="Votre adresse e-mail"
                        value={inputs.email}
                        onChangeText={(value) => handleChangeEmail(value)}
                        autoComplete="email"
                        inputMode='email'
                        isSubmitToggle={isSubmitToggle}
                    />
                    <InputField
                        label="Mot de passe"
                        placeholder="Votre mot de passe"
                        value={inputs.password}
                        onChangeText={(value) => setInputs(prev => ({ ...prev, password: value }))}
                        secureTextEntry={true}
                        isSubmitToggle={isSubmitToggle}
                    />
                    {globalError && <Text>Mauvaise adresse e-mail ou mot de passe.</Text>}
                    <ButtonRegular text='Me connecter' onPress={() => handleConnected()} />
                </Card>
                <ButtonRegular text='Créer mon compte' type="buttonStroke" onPress={() => navigation.navigate('Signup')} />
            </View>
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: "center"
    },
    button: {
        width: 150,
        padding: 20,
    }
})