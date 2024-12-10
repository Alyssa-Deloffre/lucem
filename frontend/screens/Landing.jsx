import { Text, View, SafeAreaView, StyleSheet } from "react-native"
import ButtonRegular from "../components/buttons/Button-regular"
import Input from "../components/inputs/input"

export default function LandingScreen({navigation}) {

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
                {ButtonRegular('patient', navigateToPatient, 'buttonStroke')}
            </View>            
            <View>
                {ButtonRegular('psy')}
            </View>
            <View>
                <Input label="jhevker" />
            </View>
            <View>
            <Input label="jhevker" onChangeText={() => setBidum()} value={bidum} placeholder="Votre mot de passe" errorMessage="test" />
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