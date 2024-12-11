import { Text, View, SafeAreaView, StyleSheet } from "react-native"
import ButtonRegular from "../components/buttons/ButtonRegular"
import { useState } from "react"
import InputField from "../components/inputs/InputField"
import FullButton from "../components/buttons/FullButton";
import { COLOR_GREEN } from "../data/styleGlobal";


export default function LandingScreen({ navigation }) {

    const [testInput, setTestInput] = useState("")

    const navigateToPatient = () => {
        return navigation.navigate('Signin')
    }

    const navigateToSignup = () => {
        return navigation.navigate('Signup')
    }



    return (
        <SafeAreaView style={styles.container}>
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
                <FullButton 
                    text='Je suis un patient' 
                    onPress={navigateToPatient} 
                    type='fullButton' 
                />
                <FullButton text='Je suis un psychologue' onPress={navigateToPatient} type='emptyButton' />
            </View>
            <View>
                <ButtonRegular 
                    text='Test Psy' 
                    onPress={() => navigation.navigate("TherapistTabNavigator")} 
                    type='buttonStroke' 
    
                />
            </View>
            <View>
                <ButtonRegular text='Test patient' onPress={() => navigation.navigate("PatientTabNavigator")} type='buttonStroke' />
            </View>
            <View>
            <ButtonRegular text='Créer mon compte' onPress={() => navigateToSignup()}/>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    bienvenue: {
        fontFamily: 'Heading',
        fontWeight : 'bold',
        fontSize : 30,
        alignItems: 'center',
        width : "40%",
    },
    merci: {
        fontSize : 15,
        justifyContent : 'center',
    },
    button: {
        justifyContent: 'space-between',
        height : 200,
    }
})