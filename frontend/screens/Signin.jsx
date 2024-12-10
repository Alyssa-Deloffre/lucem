import { useState } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet
} from "react-native";
import { useDispatch } from 'react-redux';
import ButtonRegular from "../components/buttons/ButtonRegular";
import InputField from "../components/inputs/InputField"
import { checkEmail } from '../modules/checkConnectionInputs';


const handleSignIn = async () => {
    const error = missingInput(emailPatient, passwordPatient)

    if (error.result === true) {
        setError(error.message)
        return
    }

    const connectPatient = async (emailPatient, passwordPatient) => {
        const resp = await fetch('http://10.9.1.135:3000/patient/signin', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ emailPatient, passwordPatient }),
        })
        return await resp.json()
    }
}

export default function SigninScreen({ navigation }) {

    const [inputs, setInputs] = useState({ email: "", password: "" })

    // Afficher les erreurs des inputs quand on appuie sur le bouton
    const [isSubmitToggle, setIsSubmitToggle] = useState(false)

    const handleChangeEmail = (value) => {
        setInputs(prev => ({ ...prev, email: value }))
    }

    const handleConnected = () => {
        setIsSubmitToggle(!isSubmitToggle)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>
                Logo
            </Text>

            <View>
                <Text>
                    Me connecter
                </Text>
                <View>
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
                </View>
                <ButtonRegular text='Me connecter' onPress={() => handleConnected()} />
            </View>

            <View style={styles.button}>
                <ButtonRegular text='Créer mon compte' onPress={() => navigation.navigate('Signup')} />
            </View>
        </SafeAreaView>
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