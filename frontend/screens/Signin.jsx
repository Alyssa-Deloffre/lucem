import { Text, View, SafeAreaView, StyleSheet } from "react-native"
import ButtonRegular from "../components/buttons/ButtonRegular"

export default function SigninScreen({ navigation }) {

    const navigateToSignup = () => {
        return navigation.navigate('Signup')
    }



    return (
        <SafeAreaView style={styles.container}>
            <Text>
                SigninScreen
            </Text>
            <View>
                <Text>Inputs + bouton connexion</Text>
            </View>

            <View>
            <ButtonRegular text='Créer mon compte patient' onPress={navigateToSignup} type='buttonRegular' />
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