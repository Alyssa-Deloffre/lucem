import React from "react"
import { Text, View, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native"
import SignupPatient from "../components/SignupPatient"
import ButtonRegular from "../components/buttons/ButtonRegular"

import Card from "../components/Card"


export default function SignupScreen({navigation}) {
    return (
        <SafeAreaView style={styles.container}>


            <Text>
                M'inscrire
            </Text>
            <Card>

            <SignupPatient/>
            </Card>
            <ButtonRegular text='Retour à la connexion' onPress={() => navigation.navigate('Signin')} type='buttonLittleStroke' orientation="left"/>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: "center"
    }
})