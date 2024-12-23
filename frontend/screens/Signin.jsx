import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { addUserToken } from '../reducers/user';

import ButtonRegular from '../components/buttons/ButtonRegular';
import InputField from '../components/inputs/InputField';
import Card from '../components/Card';
import MainContainer from '../components/MainContainer';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { checkEmail } from '../modules/checkConnectionInputs';
import LogoLucem from '../assets/lucem-logo';
import { URL } from '../data/globalVariables';
import { COLOR_RED, COLOR_PURPLE } from '../data/styleGlobal';

// Function connexion en fonction du type d'utilisateur (fetch)
const connectUser = async (email, password, userType) => {
    const routePath = userType === 'psy' ? 'therapists' : 'patients';
    const resp = await fetch(`${URL}/${routePath}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
    });
    const json = await resp.json();
    return json;
};


export default function SigninScreen({ navigation }) {
    const dispatch = useDispatch();
    const userType = useSelector((state) => state.user.type);

    // Enregistrer les valeurs des inputs
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    // Afficher une erreur en cas de problème lors de la connexion
    const [globalError, setGlobalError] = useState(false);
    // Afficher les erreurs des inputs quand on appuie sur le bouton
    const [isSubmitToggle, setIsSubmitToggle] = useState(false);

    // Changer la valeur de l'état email au changement de l'input
    const handleChangeEmail = (value) => {
        setInputs((prev) => ({ ...prev, email: value }));
    };

    // Fonction lors de la connexion (bouton "Me connecter")
    const handleConnected = async () => {
        // Force les erreurs même si aucun champ n'a été complété
        setIsSubmitToggle(!isSubmitToggle);
        // Vérification des entrées du formulaire
        if (
            inputs.email !== '' &&
            inputs.password !== '' &&
            checkEmail(inputs.email)
        ) {
            // Fetch de connexion
            const response = await connectUser(
                inputs.email,
                inputs.password,
                userType
            );
            // Si result === true, ajout du token au reducer et redirection vers la bonne page d'accueil en fonction du compte
            if (response.result) {
                dispatch(addUserToken(response.token));
                navigation.navigate(
                    userType === 'psy'
                        ? 'TherapistTabNavigator'
                        : 'PatientTabNavigator'
                );
            } else {
                setGlobalError(true);
            }
        } else {
            setGlobalError(false);
        }
    };

    return (
        <MainContainer>
            <TouchableOpacity
                onPress={() => navigation.navigate('Landing')}
                activeOpacity={2}
                style={{ position: 'absolute', zIndex: 3, margin: 20 }}
            >
                <FontAwesome
                    name='chevron-circle-left'
                    size={35}
                    style={{ color: COLOR_PURPLE[700] }}
                />
            </TouchableOpacity>
            <View style={styles.container}>
                <LogoLucem width={120} />
                <Card label='Me connecter'>
                    <InputField
                        label='Email'
                        placeholder='Votre adresse e-mail'
                        value={inputs.email}
                        onChangeText={(value) => handleChangeEmail(value)}
                        autoComplete='email'
                        inputMode='email'
                        isSubmitToggle={isSubmitToggle}
                        autoCapitalize='none'
                    />
                    <InputField
                        label='Mot de passe'
                        placeholder='Votre mot de passe'
                        value={inputs.password}
                        onChangeText={(value) =>
                            setInputs((prev) => ({ ...prev, password: value }))
                        }
                        secureTextEntry={true}
                        isSubmitToggle={isSubmitToggle}
                    />
                    {globalError && (
                        <Text style={styles.errorMessage}>
                            Mauvaise adresse e-mail ou mot de passe.
                        </Text>
                    )}
                    <ButtonRegular
                        text='Me connecter'
                        onPress={() => handleConnected()}
                    />
                </Card>

                <ButtonRegular
                    text='Créer mon compte'
                    type='buttonStroke'
                    onPress={() => navigation.navigate('Signup')}
                />
            </View>
        </MainContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    errorMessage: {
        fontSize: 14,
        color: COLOR_RED[600],
    },
});
