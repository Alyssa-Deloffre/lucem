import React from "react"
import { Text, StyleSheet, View } from "react-native"
import { useSelector } from "react-redux"
import SignupPatient from "../components/SignupPatient"
import SignupTherapist from "../components/SignupTherapist"
import ButtonRegular from "../components/buttons/ButtonRegular"
import MainContainer from "../components/MainContainer"

import Card from "../components/Card"


export default function SignupScreen({ navigation }) {
    const userType = useSelector(state => state.user.type)
    return (
        <MainContainer>
            <View style={styles.container}>
                <Text>
                    M'inscrire
                </Text>
                <Card>

                    {userType === 'patient' && <SignupPatient navigation={navigation} />}

                    {userType === 'psy' && <SignupTherapist navigation={navigation} />}
                </Card>
                <ButtonRegular text='Retour à la connexion' onPress={() => navigation.navigate('Signin')} type='buttonLittleStroke' orientation="left" />
            </View>
        </MainContainer>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: "center"
    }
})