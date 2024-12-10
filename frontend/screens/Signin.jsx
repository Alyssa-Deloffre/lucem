import { useState } from 'react';
import { 
    Text, 
    View, 
    SafeAreaView, 
    StyleSheet } from "react-native";
import { useDispatch } from 'react-redux';
import ButtonRegular from "../components/buttons/ButtonRegular";
import InputField from "../components/inputs/InputField"

const connectPatient = async(emailPatient, passwordPatient) => {
    const resp = await fetch('http://10.9.1.135:3000/patient/signin', {
        method : 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({emailPatient, passwordPatient}),
    })
    return await resp.json()
}

const navigateToSignin = () => {
    return navigation.navigate('Signin')
}

export default function SigninScreen({ navigation }) {
    const [emailPatient, setEmailPatient] = useState("")
    const [passwordPatient, setPasswordPatient] = useState("")
    const [error, setError] = useState(null)

    //const dispatch = useDispatch()

    const handleSignIn = async () => {
        const error = missingInput(emailPatient, passwordPatient)

        if (error.result === true) {
            setError(error.message)
            return
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
                <InputField label='Adresse email' placeholder='Votre adresse mail' value={emailPatient} onChangeText={(value) =>setEmailPatient(value)} />
                <InputField label='Mot de passe' placeholder='Votre mot de passe' value={passwordPatient} onChangeText={(value) =>setPasswordPatient(value)} />
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
    button:{
        width : 150,
        padding : 20,
    }
})