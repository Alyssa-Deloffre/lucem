import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import MainContainer from "../../components/MainContainer";
import {COLOR_GREEN, COLOR_PURPLE } from "../../data/styleGlobal";
import Card from "../../components/Card";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";


export default function PatientScreen() {

    const dispatch = useDispatch()

    const navigateContact = (contact) => {
        dispatch(buttonContact(contact))
        navigation.navigate('Contact')
    }


    return (
        <MainContainer>
        <View style={styles.container}>
            <Text illustration={require('../../assets/avatars/avatar1.png')}/>
            <Text style={styles.name}>
                Marie Dupot
            </Text>
            <Text style={styles.age}>
                24 ans
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Contacts")}/>
            <Card style={styles.card}>
                <Text>Adresse e-mail</Text>
                <Text>marie.dupot@gmail.com</Text>
                <Text>Téléphone</Text>
                <Text>01.23.45.67.89</Text>
            </Card>
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
    name: {
        fontFamily: 'Heading',
        fontWeight: 'bold',
        justifyContent: 'center',
        fontSize: 30,
        width: 200,
        textAlign: 'center',
    },
    age: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: 100,
    },
    button: {
        color:'green',
    },

})