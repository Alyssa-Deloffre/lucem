import { Text, View, SafeAreaView, StyleSheet } from "react-native"
import ButtonRegular from "../components/buttons/ButtonRegular"

export default function LandingScreen({ navigation }) {

    const navigateToPatient = () => {
        return navigation.navigate('Signin')
    }



    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>
                    Logo
                </Text>
            </View>
            <View>
                <ButtonRegular text='patient' onPress={navigateToPatient} type='buttonStroke' />
            </View>
            <View>
                <ButtonRegular text='psy' onPress={navigateToPatient} type='buttonStroke' />
            </View>
            <View>
                <ButtonRegular text='Test Psy' onPress={() => navigation.navigate("TherapistTabNavigator")} type='buttonStroke' />
            </View>
            <View>
                <ButtonRegular text='Test patient' onPress={() => navigation.navigate("PatientTabNavigator")} type='buttonStroke' />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
})