import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Image, SafeAreaView, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native'
import { checkEmail, isMissingInputSignup } from "../modules/checkConnectionInputs";
import ButtonRegular from "./buttons/ButtonRegular"
import InputField from "./inputs/InputField";
import { current } from "@reduxjs/toolkit";
import { URL } from "../data/globalVariables";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { avatarImages } from "../data/imageSource";




export default function SignupPatient() {
    const [currentScreen, setCurrentScreen] = useState(1)

    const [inputs, setInputs] = useState({ firstname: '', name: '', email: '', password: '', passwordConfirmation: '' })

    const [passwordValidate, setPasswordValidate] = useState(false)
    const [emailValidate, setEmailValidate] = useState(true)

    const [errorInput, setErrorInput] = useState({ firstname: false, name: false, email: false, password: false })
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [imageIndex, setImageIndex] = useState(1)

    const checkEmail = async () => {

    }


    const handleMandatory = async () => {
        // console.log('firstname: ', firstname, '/name : ', name, '/email: ', email, '/password: ', password, '/validate: ', passwordValidate)
        if (firstname !== '' && name !== '' && email !== '' && password !== '' && passwordConfirmation !== '') {

            const EMAIL_REGEX =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!EMAIL_REGEX.test(inputs.email)) {
                setEmailValidate(false)
            }

            const resp = await fetch(`${URL}/patients/getByEmail`)
            const isUserExisting = await resp.json()

            if (isUserExisting.result) {
                setEmailError('Cet email est déjà utilisé')
                setEmailValidate(false)
            }


            if (password === passwordConfirmation) {
                setPasswordValidate(true)
                if (passwordValidate) {
                    setCurrentScreen(currentScreen + 1)
                }
            } else {
                setErrorInput(errorInput.password = true)
                setPasswordError('Les deux mots de passe sont différents.')
            }

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
        <SafeAreaView>
            <View style={styles.container}>
                <View>
                    <Text>Logo</Text>
                </View>
                <View>
                    <Text>M'inscrire</Text>
                </View>

                <View>
                    {currentScreen === 1 && <><InputField label='Prénom' placeholder='Prénom' onChangeText={(value) => setInputs(prev => ({ ...prev, firstname: value }))} value={inputs.firstname} error={errorInput.firstname} />
                        <InputField label='Nom' placeholder='Nom' onChangeText={(value) => setInputs(prev => ({ ...prev, name: value }))} value={inputs.name} error={errorInput.name} />
                        <InputField label='Adresse email' placeholder='exemple@exemple.com' onChangeText={(value) => setInputs(prev => ({ ...prev, email: value }))} value={inputs.email} error={errorInput.email} errorMessage={emailError} />
                        <InputField label='Mot de passe' placeholder='Votre mot de passe' onChangeText={(value) => setInputs(prev => ({ ...prev, password: value }))} value={inputs.password} />
                        <InputField placeholder='Confirmez votre mot de passe' onChangeText={(value) => setInputs(prev => ({ ...prev, passwordConfirmation: value }))} value={inputs.passwordConfirmation} error={errorInput.password} errorMessage={passwordError} />

                        <ButtonRegular text='Suivant' onPress={() => setCurrentScreen(currentScreen + 1)} /></>}
                </View>


                {currentScreen === 2 && <>
                    <View style={{flexDirection : 'row', alignItems :'center'}}>
                        <FontAwesome name='chevron-left' size={30} onPress={() => handleLeftArrow()} />
                        <Image source={avatarImages[imageIndex]} style={{ height: 70, width: 70, marginHorizontal: 8}} />
                        <FontAwesome name='chevron-right' size={30} onPress={() => handleRightArrow()} />
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