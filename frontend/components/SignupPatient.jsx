import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Platform, Image, SafeAreaView, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, TextInput, View, Modal } from 'react-native'

//Import des composants
import ButtonRegular from "./buttons/ButtonRegular"
import InputField from "./inputs/InputField";
import DatePickerInput from "./inputs/DatePickerInput";

//Import des éléments de style
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLOR_GREEN, COLOR_PURPLE } from "../data/styleGlobal";


//Import des ressources
import { avatarImages } from "../data/imageSource";
import { URL } from "../data/globalVariables";
import { checkEmail, isMissingInputSignup } from "../modules/checkConnectionInputs";



const formatDate = (date) => {
    if (date < new Date()) {
        let day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
      
        if (day < 10) day = "0" + day;
        return `${day}/${month < 10 ? "0" + month : month}/${year}`;

    } else {
        return 'Date non valide'
    }
  };


export default function SignupPatient() {
    const [currentScreen, setCurrentScreen] = useState(1)

    const [inputs, setInputs] = useState({ firstname: '', name: '', email: '', password: '', passwordConfirmation: '' })


    const [birthdate, setBirthdate] = useState(new Date())
    const [phone, setPhone] = useState('')
    const [therapist, setTherapist] = useState({ name: '', firstname: '', token: '' })



    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [phoneError, setPhoneError] = useState('')

    const [imageIndex, setImageIndex] = useState(1)
    const [isSubmit, setIsSubmit] = useState(false)

    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => { }, [currentScreen])


    const handleMandatory = async () => {
        setIsSubmit(!isSubmit)
        setEmailError('')
        setPasswordError('')

        if (inputs.firstname !== '' || inputs.name !== '' || inputs.email !== '' || inputs.password !== '' || inputs.passwordConfirmation !== '') {
            const resp = await fetch(`${URL}/patients/getByEmail/${inputs.email}`)
            const isUserExisting = await resp.json()

            if (isUserExisting.result) {
                setEmailError('Cet email est déjà utilisé')
            }
            if (inputs.password !== inputs.passwordConfirmation) {
                setPasswordError('Les deux mots de passe sont différents.')
            }

            if (emailError === '' && passwordError === '' && !isUserExisting.result && inputs.password === inputs.passwordConfirmation) {

                setCurrentScreen(currentScreen + 1)
                console.log(currentScreen)
            }

        }

    }

    const handleOptional = () => {
        setCurrentScreen(currentScreen + 1)
        console.log(birthdate)
    }

    const handleReturn = () => {
        if (currentScreen > 1) {
            setCurrentScreen(currentScreen - 1)
        }
    }



    //Gestion des flèches du caroussel d'avatars
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

    const validateSignUp = async () => {
        const newPatient = {
            firstname : inputs.firstname,
            name : inputs.name,
            email : inputs.email,
            password : inputs.password,
        }

        const resp = await fetch(`${URL}/patients/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPatient)
          })
          const data = await resp.json()
          console.log(data)


    }





    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>

                <View>
                    <Text>Logo</Text>
                </View>
                <View>
                    <Text>M'inscrire</Text>
                </View>
                <View>

                    {currentScreen === 1 &&

                        <>
                            <InputField
                                label='Prénom'
                                placeholder='Prénom'
                                onChangeText={(value) => setInputs(prev => ({ ...prev, firstname: value }))}
                                value={inputs.firstname}
                                isSubmitToggle={isSubmit}
                            />
                            <InputField
                                label='Nom'
                                placeholder='Nom'
                                onChangeText={(value) => setInputs(prev => ({ ...prev, name: value }))}
                                value={inputs.name}
                                isSubmitToggle={isSubmit}
                            />
                            <InputField
                                label='Adresse email'
                                placeholder='exemple@exemple.com'
                                inputMode='email'
                                onChangeText={(value) => setInputs(prev => ({ ...prev, email: value }))}
                                value={inputs.email}
                                forcedErrorMessage={emailError}
                                isSubmitToggle={isSubmit}
                            />
                            <InputField
                                label='Mot de passe'
                                placeholder='Votre mot de passe'
                                onChangeText={(value) => setInputs(prev => ({ ...prev, password: value }))}
                                value={inputs.password}
                                isSubmitToggle={isSubmit}
                            />
                            <InputField
                                placeholder='Confirmez votre mot de passe'
                                onChangeText={(value) => setInputs(prev => ({ ...prev, passwordConfirmation: value }))}
                                value={inputs.passwordConfirmation}
                                forcedErrorMessage={passwordError}
                                isSubmitToggle={isSubmit}
                            />
                            <ButtonRegular text='Suivant' onPress={() => setCurrentScreen(currentScreen + 1)} /></>
                    }


                    {currentScreen === 2 && <>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome name='angle-left' size={50} onPress={() => handleLeftArrow()} />
                            <Image source={avatarImages[imageIndex]} style={{ height: 100, width: 100, marginHorizontal: 8 }} />
                            <FontAwesome name='angle-right' size={50} onPress={() => handleRightArrow()} />
                        </View>

                        <InputField
                            label='Téléphone'
                            placeholder='Téléphone'
                            inputMode="tel"
                            value={phone}
                            onChangeText={(value) => setPhone(value)}
                            forcedErrorMessage={phoneError}
                        />

                        <DatePickerInput
                            label="Date de naissance"
                            mode="date"
                            initialDate={birthdate}
                            onDateChange={(date) => setBirthdate(date)}
                        />
                        <ButtonRegular text='Retour' onPress={() => (handleReturn())} type='buttonLittleStroke' />
                        <ButtonRegular text='Passer' onPress={() => (setCurrentScreen(currentScreen + 1))} type='buttonLittleStroke' />
                        <ButtonRegular text='Suivant' onPress={() => (setCurrentScreen(currentScreen + 1))} /></>
                    }

                    {currentScreen === 3 && <>
                        <InputField label='Votre psychologue' placeholder='Cherchez le nom de votre psychologue' />
                        <ButtonRegular text='Retour' onPress={() => (handleReturn())} type='buttonLittleRegular' />
                        <ButtonRegular text='Valider' onPress={() => setIsModalVisible(true)} />
                    </>}

                    <Modal visible={isModalVisible}>
                        <View style={styles.modalcontainer}>
                            <Text>Récapitulatif</Text>
                            <Image source={avatarImages[imageIndex]} style={{ height: 100, width: 100, marginHorizontal: 8 }} />
                            <View style={styles.input}>
                                <Text style={styles.inputText}>Nom : {inputs.name}</Text>
                                <Text style={styles.inputText}>Prénom : {inputs.firstname}</Text>
                                <Text style={styles.inputText}>Adresse email : {inputs.email}</Text>
                            </View>
                            <View style={styles.input}>

                                <Text style={styles.inputText}>Date de naissance : {formatDate(birthdate)}</Text>
                                <Text style={styles.inputText}>Numéro de téléphone : {phone}</Text>
                            </View>





                            <ButtonRegular text='Confirmer inscription' onPress={() => validateSignUp()}/>
                            <ButtonRegular text='Corriger les informations' onPress={() => setIsModalVisible(false)} />
                        </View>
                    </Modal>


                </View>

            </KeyboardAvoidingView>






        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        fontSize: 18,
        color: COLOR_PURPLE[1000],
        borderWidth: 1,
        borderRadius: 8,
        width: "100%",
        padding: 12,
    },
    inputText: {
        fontSize: 16,
        color: COLOR_PURPLE[1000],
    },
})