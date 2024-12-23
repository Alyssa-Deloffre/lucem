import { Text, View, StyleSheet } from 'react-native';

import { useDispatch } from 'react-redux';
import { addUserType } from '../reducers/user';

import FullButton from '../components/buttons/FullButton';
import MainContainer from '../components/MainContainer';

import { FONTS } from '../data/styleGlobal';
import LogoLucem from '../assets/lucem-logo';

export default function LandingScreen({ navigation }) {
    // Ajout du type d'utilisateur au reducer en fonction du bouton cliqué
    const dispatch = useDispatch();
    const navigateToUserSignIn = (userType) => {
        dispatch(addUserType(userType));
        navigation.navigate('Signin');
    };

    return (
        <MainContainer>
            <View style={styles.container}>
                <LogoLucem width={120} />
                <Text style={styles.title}>Bienvenue sur Lucem.</Text>
                <View style={styles.buttonsBlock}>
                    <Text style={styles.description}>
                        Merci d'indiquer si vous êtes un patient ou un
                        psychologue.
                    </Text>
                    <FullButton
                        text='Je suis un patient'
                        onPress={() => navigateToUserSignIn('patient')}
                        type='default'
                    />
                    <FullButton
                        text='Je suis un psychologue'
                        onPress={() => navigateToUserSignIn('psy')}
                        type='white'
                    />
                </View>
            </View>
        </MainContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        rowGap: '10%',
        alignItems: 'center',
    },
    title: {
        ...FONTS.Heading1,
        alignItems: 'center',
        maxWidth: 300,
        textAlign: 'center',
    },
    description: {
        textAlign: 'center',
        ...FONTS.Body,
    },
    merci: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 300,
    },
    buttonsBlock: {
        rowGap: 16,
    },
});
