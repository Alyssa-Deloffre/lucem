import React from "react"
import { Text, View, StyleSheet, SafeAreaView } from "react-native"
import SignupPatient from "../components/SignupPatient"


export default function SignupScreen({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <Text>
                SignupScreen
            </Text>
            <View>
            <SignupPatient/>

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