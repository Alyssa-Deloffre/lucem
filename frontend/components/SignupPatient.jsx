import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { SafeAreaView, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native'
import { checkEmail, isMissingInputSignup } from "../modules/checkConnectionInputs";
import ButtonRegular from "./buttons/ButtonRegular"
import Input from "./inputs/input";
import { current } from "@reduxjs/toolkit";




export default function SignupPatient() {
    const [currentScreen, setCurrentScreen] = useState(1)

    const [firstname, setFirstname] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [passwordValidated, setPasswordValidate] = useState(false)

    const handleMandatory = () => {
        handlePassword()
        if (firstname, name, email, passwordValidated) {
            setCurrentScreen(currentScreen + 1)
        }

    }

    const handleOptional = () => {

    }

    const handlePassword = () => {
        if (password === passwordConfirmation) {
            setPasswordValidate(true)
        }

    }

    const handleReturn = () => {
        if (currentScreen > 1) {

            setCurrentScreen(currentScreen - 1)
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
        {currentScreen === 1 && <><Input label='Prénom' placeholder='Prénom' />
        <Input label='Nom' placeholder='Nom' />
        <Input label='Adresse email' placeholder='exemple@exemple.com' />
        <Input label='Mot de passe' placeholder='Votre mot de passe' />
        <Input placeholder='Confirmez votre mot de passe' />

        <ButtonRegular text='Suivant' onPress={() => handleMandatory()}/></>}
        </View>


        {currentScreen === 2 && <><Input label='Téléphone' placeholder='Téléphone' />
            <Input label='Date de naissance' placeholder='Date de naissance' />
            <ButtonRegular text='Retour' onPress={() => (handleReturn())} type='buttonLittleRegular'/>
            <ButtonRegular text='Passer' onPress={() => (setCurrentScreen(currentScreen + 1))} type='buttonLittleRegular'/>

            <ButtonRegular text='Suivant' onPress={() => (setCurrentScreen(currentScreen + 1))}/></>
        }

        {currentScreen === 3 && <>
            <Input label='Votre psychologue' placeholder='Cherchez le nom de votre psychologue' />
            <ButtonRegular text='Retour' onPress={() => (handleReturn())} type='buttonLittleRegular'/>

            <ButtonRegular text='Valider' onPress={() => (setCurrentScreen(currentScreen + 1))}/>


        </>}    

                <ButtonRegular text='Créer mon compte patient' onPress={console.log('click')} type='buttonRegular' />

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