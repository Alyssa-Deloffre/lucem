import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Image, Text, StyleSheet, View, ActivityIndicator } from 'react-native';

//Import des composants
import ButtonRegular from './buttons/ButtonRegular';
import InputField from './inputs/InputField';
import TextArea from './inputs/TextArea';

//Import des éléments de style
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLOR_PURPLE } from '../data/styleGlobal';

//Import des ressources
import { avatarImages } from '../data/imageSource';
import { URL } from '../data/globalVariables';
import { addUserToken } from '../reducers/user';

export default function SignupTherapist({ navigation }) {
    const [currentScreen, setCurrentScreen] = useState(1);

    const [inputs, setInputs] = useState({
        firstname: '',
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });

    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [validationError, setValidationError] = useState('');

    const [imageIndex, setImageIndex] = useState(1);
    const [isSubmit, setIsSubmit] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => { }, [currentScreen]);

    //Fonction pour gérer les inputs obligatoires pour l'inscription et les erreurs possibles
    const handleMandatory = async () => {
        setIsSubmit(!isSubmit);
        setEmailError('');
        setPasswordError('');

        if (
            inputs.firstname !== '' ||
            inputs.name !== '' ||
            inputs.email !== '' ||
            inputs.password !== '' ||
            inputs.passwordConfirmation !== ''
        ) {
            const resp = await fetch(
                `${URL}/therapists/getByEmail/${inputs.email}`
            );
            const isUserExisting = await resp.json();

            if (isUserExisting.result) {
                setEmailError('Cet email est déjà utilisé');
            }
            if (inputs.password !== inputs.passwordConfirmation) {
                setPasswordError('Les deux mots de passe sont différents.');
            }

            if (
                emailError === '' &&
                passwordError === '' &&
                !isUserExisting.result &&
                inputs.password === inputs.passwordConfirmation
            ) {
                setCurrentScreen(currentScreen + 1);
            }
        }
    };

    //Revenir au screen précédent
    const handleReturn = () => {
        if (currentScreen > 1) {
            setCurrentScreen(currentScreen - 1);
        }
    };

    //Gestion des flèches du caroussel d'avatars
    const handleLeftArrow = () => {
        if (imageIndex > 1) {
            setImageIndex(imageIndex - 1);
        }
        if (imageIndex === 1) {
            setImageIndex(18);
        }
    };

    const handleRightArrow = () => {
        if (imageIndex < 18) {
            setImageIndex(imageIndex + 1);
        }
        if (imageIndex === 18) {
            setImageIndex(1);
        }
    };

    //Fonction qui gère la validation de l'inscription et le POST en DB
    const validateSignUp = async () => {
        setIsLoading(true);
        const newTherapist = {
            firstname: inputs.firstname,
            name: inputs.name,
            email: inputs.email,
            password: inputs.password,
            phone: phone,
            avatar: imageIndex,
            description: description,
        };
        const resp = await fetch(`${URL}/therapists/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTherapist),
        });
        const data = await resp.json();

        setIsLoading(false);
        if (data.result) {
            dispatch(addUserToken(data.token));
            navigation.navigate('TherapistTabNavigator');
        } else {
            setValidationError(
                'Une erreur a eu lieu lors de la création de compte, veuillez recommencer'
            );
        }
    };

    return (
        <>
            {currentScreen === 1 && (
                <>
                    <InputField
                        label='Prénom'
                        placeholder='Prénom'
                        onChangeText={(value) =>
                            setInputs((prev) => ({ ...prev, firstname: value }))
                        }
                        value={inputs.firstname}
                        isSubmitToggle={isSubmit}
                        autoComplete='given-name'
                    />
                    <InputField
                        label='Nom'
                        placeholder='Nom'
                        onChangeText={(value) =>
                            setInputs((prev) => ({ ...prev, name: value }))
                        }
                        value={inputs.name}
                        isSubmitToggle={isSubmit}
                        autoComplete='family-name'
                    />
                    <InputField
                        label='Adresse email'
                        placeholder='exemple@exemple.com'
                        inputMode='email'
                        onChangeText={(value) =>
                            setInputs((prev) => ({ ...prev, email: value }))
                        }
                        value={inputs.email}
                        forcedErrorMessage={emailError}
                        isSubmitToggle={isSubmit}
                        autoCapitalize='none'
                        autoComplete='email'
                    />
                    <InputField
                        label='Mot de passe'
                        placeholder='Votre mot de passe'
                        onChangeText={(value) =>
                            setInputs((prev) => ({ ...prev, password: value }))
                        }
                        value={inputs.password}
                        isSubmitToggle={isSubmit}
                        autoCapitalize='none'
                        autoComplete='off'
                        secureTextEntry={true}
                    />
                    <InputField
                        placeholder='Confirmez votre mot de passe'
                        onChangeText={(value) =>
                            setInputs((prev) => ({
                                ...prev,
                                passwordConfirmation: value,
                            }))
                        }
                        value={inputs.passwordConfirmation}
                        forcedErrorMessage={passwordError}
                        isSubmitToggle={isSubmit}
                        autoCapitalize='none'
                        autoComplete='off'
                        secureTextEntry={true}
                    />
                    <ButtonRegular
                        text='Suivant'
                        onPress={() => handleMandatory()}
                    />
                </>
            )}
            {currentScreen === 2 && (
                <>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <FontAwesome
                            name='angle-left'
                            size={50}
                            onPress={() => handleLeftArrow()}
                        />
                        <Image
                            source={avatarImages[imageIndex]}
                            style={{
                                height: 100,
                                width: 100,
                                marginHorizontal: 8,
                            }}
                        />
                        <FontAwesome
                            name='angle-right'
                            size={50}
                            onPress={() => handleRightArrow()}
                        />
                    </View>
                    <InputField
                        label='Téléphone'
                        placeholder='Téléphone'
                        inputMode='tel'
                        value={phone}
                        onChangeText={(value) => setPhone(value)}
                        require={false}
                        autoComplete='tel'
                    />
                    <TextArea
                        label='Description'
                        onChangeText={(value) => setDescription(value)}
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}
                    >
                        <ButtonRegular
                            text='Retour'
                            onPress={() => handleReturn()}
                            type='buttonLittleStroke'
                            orientation='left'
                        />
                        <ButtonRegular
                            text='Passer'
                            onPress={() => setCurrentScreen(currentScreen + 1)}
                            type='buttonLittleStroke'
                        />
                    </View>
                    <ButtonRegular
                        text='Valider'
                        onPress={() => setCurrentScreen(currentScreen + 1)}
                    />
                </>
            )}
            {currentScreen === 3 && (
                <>
                    <Image
                        source={avatarImages[imageIndex]}
                        style={{ height: 100, width: 100, marginHorizontal: 8 }}
                    />
                    <View style={styles.input}>
                        <Text style={styles.inputText}>
                            Nom : {inputs.name}
                        </Text>
                        <Text style={styles.inputText}>
                            Prénom : {inputs.firstname}
                        </Text>
                        <Text style={styles.inputText}>
                            Adresse email : {inputs.email}
                        </Text>
                    </View>
                    <View style={styles.input}>
                        <Text style={styles.inputText}>
                            Numéro de téléphone : {phone}
                        </Text>
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.inputText}>
                            Description : {description}
                        </Text>
                    </View>
                    {validationError !== '' && <Text>validationError</Text>}
                    <ButtonRegular
                        text='Confirmer inscription'
                        onPress={() => validateSignUp()}
                    />
                    <ButtonRegular
                        text='Corriger les informations'
                        onPress={() => handleReturn()}
                        type='buttonLittleStroke'
                        orientation='left'
                    />
                </>
            )}
            {isLoading && (
                <View style={styles.loadingBlock}>
                    <ActivityIndicator
                        size='large'
                        color={COLOR_PURPLE[600]}
                    />
                    <Text style={styles.loadingBlock_text}>
                        Votre compte est en cours de création.
                    </Text>
                </View>
            )}
        </>
    );
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
        width: '100%',
        padding: 12,
    },
    inputText: {
        fontSize: 16,
        color: COLOR_PURPLE[1000],
    },
    loadingBlock: {
        position: 'absolute',
        zIndex: 1000,
        top: 24,
        left: 16,
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        width: '100%',
        height: '100%',
    },
    loadingBlock_text: {
        fontSize: 18,
        fontWeight: 600,
        textAlign: 'center',
    },
});
