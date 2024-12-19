import { Text, View, StyleSheet } from "react-native"
import ButtonRegular from "../components/buttons/ButtonRegular"
import FullButton from "../components/buttons/FullButton";
import MainContainer from "../components/MainContainer";
import { useDispatch } from "react-redux";
import { addUserType } from "../reducers/user";
import LogoLucem from "../assets/lucem-logo";
import { FONTS } from "../data/styleGlobal";

export default function LandingScreen({ navigation }) {

    const dispatch = useDispatch()

    const navigateToUserSignIn = (userType) => {
        dispatch(addUserType(userType))
        navigation.navigate('Signin')
    }



    const navigateToTest = () => {
        navigation.navigate('Test')
    }

    const navigateToEventRecap = () => {
        navigation.navigate('EventRecap')
    }


    return (
        <MainContainer>
            <View style={styles.container}>
                <LogoLucem width={120} />
                <Text style={styles.title}>
                    Bienvenue sur Lucem.
                </Text>
                <View style={styles.buttonsBlock}>
                    <Text style={styles.description}>
                        Merci d'indiquer si vous êtes un patient ou un psychologue.
                    </Text>
                    <FullButton text='Je suis un patient' onPress={() => navigateToUserSignIn("patient")} type='default' />
                    <FullButton text='Je suis un psychologue' onPress={() => navigateToUserSignIn("psy")} type='white' />
                </View>
            </View>
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        rowGap: "10%",
        alignItems: 'center',
    },
    title: {
        ...FONTS.Heading1,
        alignItems: 'center',
        maxWidth: 300,
        textAlign: "center"
    },
    description: {
        textAlign: "center",
    },
    merci: {
        fontSize: 16,
        textAlign: "center",
        fontWeight: 300,
    },
    buttonsBlock: {
        rowGap: 16,
    }
})