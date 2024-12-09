import { Text, View, StyleSheet, SafeAreaView } from "react-native"
import SignupPatient from "../components/SignupPatient"

function SignupScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>
                SignupScreen
            </Text>
        </SafeAreaView>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})