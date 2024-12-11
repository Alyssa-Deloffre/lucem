import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import PatientButton from "../../components/buttons/PatientButton";
import { useEffect, useState } from "react";
import { MAYLEEN_URL } from "../../data/globalVariables";
import MainContainer from "../../components/MainContainer";


const getAllPatient = async (token) => {
    const resp = await fetch(`${MAYLEEN_URL}/therapists/patients`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token }),
    })
    const json = await resp.json()
    return json.patients
}

export default function TherapistHomeScreen() {

    const [patientList, setPatientList] = useState([]);

    useEffect(() => {
        (async() => {
            const patients = await getAllPatient("vb-H2GnVCWyzdfhz6tVHHk6Xe-cr-p7a")
            setPatientList(patients)
        })()
    }, [])

    const patientDisplay = patientList.map((patient, i) => {
        return <PatientButton key={i} firstname={patient.firstname} name={patient.name}/>;
    })


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

