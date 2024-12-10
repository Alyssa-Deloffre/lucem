import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Platform, Image, SafeAreaView, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native'
import { checkEmail, isMissingInputSignup } from "../modules/checkConnectionInputs";
import ButtonRegular from "./buttons/ButtonRegular"
import InputField from "./inputs/InputField";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { avatarImages } from "../data/imageSource";
import { URL } from "../data/globalVariables";




export default function SignupPatient() {
    const [currentScreen, setCurrentScreen] = useState(1)

    const [inputs, setInputs] = useState({ firstname: '', name: '', email: '', password: '', passwordConfirmation: '' })

    const [passwordValidate, setPasswordValidate] = useState(false)
    const [emailValidate, setEmailValidate] = useState(true)

    const [errorInput, setErrorInput] = useState({ firstname: false, name: false, email: false, password: false })
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [imageIndex, setImageIndex] = useState(1)




    const handleMandatory = async () => {
        // console.log('firstname: ', firstname, '/name : ', name, '/email: ', email, '/password: ', password, '/validate: ', passwordValidate)
        if (firstname !== '' && name !== '' && email !== '' && password !== '' && passwordConfirmation !== '') {

            const resp = await fetch(`${URL}/patients/getByEmail`)
            const isUserExisting = await resp.json()

            if (isUserExisting.result) {
                setEmailError('Cet email est déjà utilisé')
                setEmailValidate(false)
            }
            if (!checkEmail(inputs.email)) {
                setEmailValidate(false)
            }
            if (password !== passwordConfirmation) {
                setPasswordError('Les deux mots de passe sont différents.')
            }


            setCurrentScreen(currentScreen + 1)
        }

    }







    const handleOptional = () => {
        setCurrentScreen(currentScreen + 1)

    }



    const handleReturn = () => {
        if (currentScreen > 1) {
            setCurrentScreen(currentScreen - 1)
        }
    }

    const handleLeftArrow = () => {
        if (imageIndex > 1) {
            setImageIndex(imageIndex - 1)
        }
        if (imageIndex === 1) {
            setImageIndex(18)
        }
    }

    const handleRightArrow = () => {
        if (imageIndex < 18) {
            setImageIndex(imageIndex + 1)
        }
        if (imageIndex === 18) {
            setImageIndex(1)
        }
    }



    return (
        <SafeAreaView style={styles.container}>

            <View >
                <View>
                    <Text>Logo</Text>
                </View>
                <View>
                    <Text>M'inscrire</Text>
                </View>

                    <View>

                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    {currentScreen === 1 &&                 
                        <><InputField label='Prénom' placeholder='Prénom' onChangeText={(value) => setInputs(prev => ({ ...prev, firstname: value }))} value={inputs.firstname} />
                        <InputField label='Nom' placeholder='Nom' onChangeText={(value) => setInputs(prev => ({ ...prev, name: value }))} value={inputs.name} />
                        <InputField label='Adresse email' placeholder='exemple@exemple.com' inputMode='email' onChangeText={(value) => setInputs(prev => ({ ...prev, email: value }))} value={inputs.email} forcedErrorMessage={emailError} />
                        <InputField label='Mot de passe' placeholder='Votre mot de passe' onChangeText={(value) => setInputs(prev => ({ ...prev, password: value }))} value={inputs.password} />
                        <InputField placeholder='Confirmez votre mot de passe' onChangeText={(value) => setInputs(prev => ({ ...prev, passwordConfirmation: value }))} value={inputs.passwordConfirmation} forcedErrorMessage={passwordError} />

                        <ButtonRegular text='Suivant' onPress={() => handleMandatory()} /></>                 
                    }


                {currentScreen === 2 && <>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FontAwesome name='angle-left' size={50} onPress={() => handleLeftArrow()} />
                        <Image source={avatarImages[imageIndex]} style={{ height: 100, width: 100, marginHorizontal: 8 }} />
                        <FontAwesome name='angle-right' size={50} onPress={() => handleRightArrow()} />
                    </View>

                    <InputField label='Téléphone' placeholder='Téléphone' />
                    <InputField label='Date de naissance' placeholder='Date de naissance' />
                    <ButtonRegular text='Retour' onPress={() => (handleReturn())} type='buttonLittleRegular' />
                    <ButtonRegular text='Passer' onPress={() => (setCurrentScreen(currentScreen + 1))} type='buttonLittleRegular' />

                    <ButtonRegular text='Suivant' onPress={() => (setCurrentScreen(currentScreen + 1))} /></>
                }

                {currentScreen === 3 && <>
                    <InputField label='Votre psychologue' placeholder='Cherchez le nom de votre psychologue' />
                    <ButtonRegular text='Retour' onPress={() => (handleReturn())} type='buttonLittleRegular' />

                    <ButtonRegular text='Valider' onPress={() => (setCurrentScreen(currentScreen + 1))} />


                </>}
            </KeyboardAvoidingView>
                </View>



            </View>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})