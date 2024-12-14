import { SafeAreaView, Text, View, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { URL as URL } from "../../data/globalVariables";
import MainContainer from "../../components/MainContainer";
import PatientButton from "../../components/buttons/PatientButton";



const getAllPatient = async (token) => {
    const resp = await fetch(`${URL}/therapists/patients`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token }),
    })
    const json = await resp.json()
    return json.patients
}

export default function TherapistHomeScreen({navigation}) {
    const userToken = useSelector(state => state.user.token)

    const [patientList, setPatientList] = useState([]);

    useEffect(() => {
        (async() => {
            //const patients = await getAllPatient("vb-H2GnVCWyzdfhz6tVHHk6Xe-cr-p7a")
            const patients = await getAllPatient(userToken)
            setPatientList(patients)
        })()
    }, [])

    const patientDisplay = patientList.map((patient, i) => {
        return <PatientButton key={i} firstname={patient.firstname} name={patient.name} onPress={() => goToPatient(patient)}/>;
    })

    const goToPatient = (patientdata) => {
        navigation.navigate('Patient', { data : patientdata})

    }
    return (
        <MainContainer >
            <View style={styles.container}>
            <View>
                <Text style={styles.title}>
                    Mes patients
                </Text>
            </View>
            <View style={styles.patientButton}>
                {patientDisplay}
            </View>
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
    title: {
        fontFamily: 'Heading',
        fontWeight: 'bold',
        fontSize: 30,
        alignItems: 'center',
        width: "30%",
    },
    patientButton: {
        justifyContent: 'space-between',

    }
})

