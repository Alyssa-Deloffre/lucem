import { useState } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { addUserToken } from '../reducers/user';
import ButtonRegular from "../components/buttons/ButtonRegular";
import InputField from "../components/inputs/InputField"
import { checkEmail } from '../modules/checkConnectionInputs';
import { QUENTIN_URL } from '../data/globalVariables';
import Card from '../components/Card';
import MainContainer from '../components/MainContainer';
import AutocompleteField from '../components/inputs/AutocompleteField';
import { COLOR_RED } from '../data/styleGlobal';


const connectUser = async (email, password, userType) => {
    const routePath = userType === "psy" ? "therapists" : "patients"
    const resp = await fetch(`${QUENTIN_URL}/${routePath}/signin`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
    })
    const json = await resp.json()
    return json
}

export default function SigninScreen({ navigation }) {

    const dispatch = useDispatch()
    const userType = useSelector(state => state.user.type)

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
            const response = await connectUser(inputs.email, inputs.password, userType)
            if (response.result) {
                dispatch(addUserToken(response.token))
                navigation.navigate(userType === "psy" ? "TherapistTabNavigator" : "PatientTabNavigator")
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
                <View>
                    <Text>{userType}</Text>
                </View>
                <Card label="Me connecter">
                    <InputField
                        label="Email"
                        placeholder="Votre adresse e-mail"
                        value={inputs.email}
                        onChangeText={(value) => handleChangeEmail(value)}
                        autoComplete="email"
                        inputMode='email'
                        isSubmitToggle={isSubmitToggle}
                        autoCapitalize="none"
                    />
                    <InputField
                        label="Mot de passe"
                        placeholder="Votre mot de passe"
                        value={inputs.password}
                        onChangeText={(value) => setInputs(prev => ({ ...prev, password: value }))}
                        secureTextEntry={true}
                        isSubmitToggle={isSubmitToggle}
                    />
                    {globalError && <Text style={styles.errorMessage}>Mauvaise adresse e-mail ou mot de passe.</Text>}
                    <ButtonRegular text='Me connecter' onPress={() => handleConnected()} />
                </Card>
                <ButtonRegular
                    text='Créer mon compte'
                    type="buttonStroke"
                    onPress={() => navigation.navigate('Signup')}
                />
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
    errorMessage: {
        fontSize: 14,
        color: COLOR_RED[600]
    }
})