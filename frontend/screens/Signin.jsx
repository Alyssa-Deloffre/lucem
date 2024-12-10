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


export default function SigninScreen({ navigation }) {

    const navigateToSignup = () => {
        return navigation.navigate('Signup')
    }

    const navigateToSignin = () => {
        return navigation.navigate('Signin')
    }

    function SignIn() {
        const [emailPatient, setEmailPatient] = useState("")
        const [passwordPatient, setPasswordPatient] = useState("")
        const [error, setError] = useState(null)

        //const dispatch = useDispatch()
        //const router = useRouter()

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
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>
                Logo
            </Text>
            <Text>
                Me connecter
            </Text>
            <View>
                <InputField label="Email"/>            
            </View>
            <View>
            <InputField label="Mot de passe"/>            
            </View>
            <View style={styles.button}>
                <ButtonRegular text='Connexion' onPress={() => navigateToSignup()}/>
            </View>
            <View style={styles.button}>
                <ButtonRegular text='Créer mon compte' onPress={() => navigateToSignup()}/>
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 150,
        padding: 20,
    }
})