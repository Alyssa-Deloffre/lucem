import { Text, View, StyleSheet } from "react-native"
import ButtonRegular from "../components/buttons/ButtonRegular"
import FullButton from "../components/buttons/FullButton";
import MainContainer from "../components/MainContainer";
import { useDispatch } from "react-redux";
import { addUserType } from "../reducers/user";

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
                <View>
                    <Text>
                        Logo
                    </Text>
                </View>
                <Text style={styles.bienvenue}>
                    Bienvenue sur Lucem.
                </Text>
                <View style={styles.button}>
                    <Text style={styles.merci}>
                        Merci d'indiquer si vous êtes un patient ou un psychologue.
                    </Text>
                    <FullButton text='Je suis un patient' onPress={() => navigateToUserSignIn("patient")} type='fullButton' />
                    <FullButton text='Je suis un psychologue' onPress={() => navigateToUserSignIn("psy")} type='emptyButton' />
                </View>
                <View>
                    <ButtonRegular text='Test Psy' onPress={() => navigation.navigate("TherapistTabNavigator")} type='buttonStroke' />
                </View>
                <View>
                    <ButtonRegular text='Test patient' onPress={() => navigation.navigate("PatientTabNavigator")} type='buttonStroke' />
                </View>
                <View>
                    <ButtonRegular text='Test' onPress={() => navigation.navigate('Test')} />
                </View>
                <View>
                    <ButtonRegular text='TestEventRecap' onPress={() => navigation.navigate('EventRecap')} />
                </View>
            </View>
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    bienvenue: {
        fontWeight: 800,
        fontSize: 32,
        alignItems: 'center',
        maxWidth: 300,
        textAlign: "center"
    },
    merci: {
        fontSize: 16,
        textAlign: "center",
        fontWeight: 300
    },
    button: {
        justifyContent: 'space-between',
        height: 200,
    }
})