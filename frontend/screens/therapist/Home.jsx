import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import PatientButton from "../../components/buttons/PatientButton";
import { useEffect } from "react";


const getAllPatient = async (token) => {
    const resp = await fetch('http://10.9.1.146:3000/therapists/patients', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token }),
    })
    const json = await resp.json()
    return json
}

export default function TherapistHomeScreen() {

    useEffect(() => {
        const patients = getAllPatient("6758550e498a3b26ff60cc1e")
    }, [])




    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>
                    Mes patients
                </Text>
            </View>
            <View style={styles.patientButton}>
                <PatientButton text='Marie Dupot' type='patientButton' />
                <PatientButton text='Marie Dupot' type='patientButton' />
                <PatientButton text='Marie Dupot' type='patientButton' />
                <PatientButton text='Marie Dupot' type='patientButton' />
                <PatientButton text='Marie Dupot' type='patientButton' />
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
    title: {
        fontFamily: 'Heading',
        fontWeight: 'bold',
        fontSize: 30,
        alignItems: 'center',
        width: "30%",
    },
    patientButton: {
        justifyContent: 'space-between',
        height: 450,

    }
})

