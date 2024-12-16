import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { Image, SafeAreaView, Text, TouchableOpacity, StyleSheet, View } from 'react-native'

//Import des composants
import ButtonRegular from "./buttons/ButtonRegular"
import InputField from "./inputs/InputField";
import DatePickerInput from "./inputs/DatePickerInput";
//import AutocompleteField from "./inputs/AutocompleteField";

//Import des éléments de style
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLOR_PURPLE } from "../data/styleGlobal";


//Import des ressources
import { avatarImages } from "../data/imageSource";
import { URL } from "../data/globalVariables";
import { addUserToken } from "../reducers/user";
import UserAutocomplete from "./inputs/UserAutocomplete";

const formatDate = (date) => {
    let day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (day < 10) day = "0" + day;
    return `${day}/${month < 10 ? "0" + month : month}/${year}`;
};



export default function SignupPatient({ navigation }) {
    const [currentScreen, setCurrentScreen] = useState(1)

    const [inputs, setInputs] = useState({ firstname: '', name: '', email: '', password: '', passwordConfirmation: '' })


    const [birthdate, setBirthdate] = useState(new Date())
    const [phone, setPhone] = useState('')

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    // https://stackoverflow.com/questions/38483885/regex-for-french-telephone-numbers
    const [phoneError, setPhoneError] = useState('')
    const [validationError, setValidationError] = useState('')

    const [imageIndex, setImageIndex] = useState(1)
    const [isSubmit, setIsSubmit] = useState(false)

    const [therapistsList, setTherapistsList] = useState([])
    // const [filteredTherapistList, setFilteredTherapistList] = useState([])
    const [selectedTherapist, setSelectedTherapist] = useState({ photo: "", fullname: "", token: "" })
    // const [inputTherapist, setInputTherapist] = useState(null)


    const dispatch = useDispatch()

    useEffect(() => { getAllTherapists() }, [currentScreen])

    //Fonction pour gérer les inputs obligatoires pour l'inscription et les erreurs possibles
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
            }
        }
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

    //Fonction qui gère la validation de l'inscription et le POST en DB
    const validateSignUp = async () => {

        const token = selectedTherapist ? selectedTherapist.token : ''
        const newPatient = {
            firstname: inputs.firstname,
            name: inputs.name,
            email: inputs.email,
            password: inputs.password,
            phone: phone,
            birthdate: birthdate,
            therapist: token,
            avatar: avatarImages[imageIndex].toString(),
        }
        const resp = await fetch(`${URL}/patients/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPatient)
        })
        const data = await resp.json()
        console.log(data)

        if (data.result) {
            dispatch(addUserToken(data.token))
            navigation.navigate('PatientTabNavigator')


        } else {
            setValidationError('Une erreur a eu lieu lors de la création de compte, veuillez recommencer')
        }


    }

    //Fonctions pour récupérer tous les psys, les trier et les afficher dans le input autocomplete
    const getAllTherapists = async () => {
        const resp = await fetch(`${URL}/patients/getalltherapists`)
        const json = await resp.json()
        setTherapistsList(json.data.map(therapist => {
            return { photo: therapist.avatar, fullname: therapist.firstname + " " + therapist.name, token: therapist.token }
        }))
    }





    return (

        <>
            <Text>PATIENT</Text>
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
                        autoCapitalize='none'

                    />
                    <InputField
                        label='Mot de passe'
                        placeholder='Votre mot de passe'
                        onChangeText={(value) => setInputs(prev => ({ ...prev, password: value }))}
                        value={inputs.password}
                        isSubmitToggle={isSubmit}
                        autoCapitalize='none'
                        autoComplete={false}

                    />
                    <InputField
                        placeholder='Confirmez votre mot de passe'
                        onChangeText={(value) => setInputs(prev => ({ ...prev, passwordConfirmation: value }))}
                        value={inputs.passwordConfirmation}
                        forcedErrorMessage={passwordError}
                        isSubmitToggle={isSubmit}
                        autoCapitalize='none'
                        autoComplete={false}

                    />
                    <ButtonRegular text='Suivant' onPress={() => handleMandatory()} />

                </>
            }


            {currentScreen === 2 && <>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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
                    require={false}
                />

                <DatePickerInput
                    label="Date de naissance"
                    value={birthdate}
                    onChange={(event, newDate) => setBirthdate(newDate)}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <ButtonRegular text='Retour' onPress={() => (handleReturn())} type='buttonLittleStroke' orientation="left" />
                    <ButtonRegular text='Passer' onPress={() => (setCurrentScreen(currentScreen + 1))} type='buttonLittleStroke' />
                </View>
                <ButtonRegular text='Suivant' onPress={() => (setCurrentScreen(currentScreen + 1))} /></>
            }

            {currentScreen === 3 && <>

                <UserAutocomplete
                    label="Mon psychologue"
                    placeholder="Choisissez votre psychologue"
                    value={selectedTherapist}
                    onChangeText={(value) => setSelectedTherapist(value)}
                    users={therapistsList}
                    require={false}
                />



                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <ButtonRegular text='Retour' onPress={() => (handleReturn())} type='buttonLittleStroke' orientation="left" />
                    <ButtonRegular text='Passer' onPress={() => (setCurrentScreen(currentScreen + 1))} type='buttonLittleStroke' />
                </View>
                <ButtonRegular text='Valider' onPress={() => setCurrentScreen(currentScreen + 1)} />
            </>}
            {currentScreen === 4 && <>
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

                <View style={styles.input}>
                    <Text style={styles.inputText}>Mon psy : {selectedTherapist.fullname !== '' ? <>{selectedTherapist?.fullname}</> : <>Pas de psy sélectionné</>}</Text>
                </View>
                {validationError !== '' && <Text>{validationError}</Text>}
                <ButtonRegular text='Confirmer inscription' onPress={() => validateSignUp()} />
                <ButtonRegular text='Corriger les informations' onPress={() => handleReturn()} type='buttonLittleStroke' orientation="left" />
            </>}
        </>

    )
}


const styles = StyleSheet.create({
    container: {
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