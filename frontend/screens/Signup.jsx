import React from "react"
import { Text, StyleSheet, View, TouchableOpacity } from "react-native"
import { useSelector } from "react-redux"
import SignupPatient from "../components/SignupPatient"
import SignupTherapist from "../components/SignupTherapist"
import ButtonRegular from "../components/buttons/ButtonRegular"
import MainContainerWithScroll from "../components/MainContainerWithScroll"

import Card from "../components/Card"
import LogoLucem from "../assets/lucem-logo"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { COLOR_PURPLE } from "../data/styleGlobal";




export default function SignupScreen({ navigation }) {
    const userType = useSelector(state => state.user.type)
    return (
        <MainContainerWithScroll>
            <TouchableOpacity onPress={() => navigation.navigate('Signin')} activeOpacity={2} style={{ position: 'absolute', zIndex: 3, margin: 20 }}>
                <FontAwesome name='chevron-circle-left' size={35} style={{ color: COLOR_PURPLE[700] }} />
            </TouchableOpacity>

            <View style={styles.container}>
                <LogoLucem width={120} />
                <Card>

                    {userType === 'patient' && <SignupPatient navigation={navigation} />}

                    {userType === 'psy' && <SignupTherapist navigation={navigation} />}
                </Card>
            </View>
        </MainContainerWithScroll>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        gap: 32,
    }
})