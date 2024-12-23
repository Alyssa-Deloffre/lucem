import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import MainContainer from '../../components/MainContainer';
import PatientButton from '../../components/buttons/PatientButton';

import { URL } from '../../data/globalVariables';
import { FONTS } from '../../data/styleGlobal';
import { avatarImages } from '../../data/imageSource';

// Fonction - Récupération de tous les patients d'un therapist (fetch)
const getAllPatient = async (token) => {
    const resp = await fetch(`${URL}/therapists/patients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token }),
    });
    const json = await resp.json();
    return json.patients;
};

export default function TherapistHomeScreen({ navigation }) {
    // Reducer récupération du token du therapist
    const userToken = useSelector((state) => state.user.token);

    // State - Enregistrement des patients (useEffect et fonction)
    const [patientList, setPatientList] = useState([]);

    // useEffect - Récupération des patients
    useEffect(() => {
        (async () => {
            const patients = await getAllPatient(userToken);
            setPatientList(patients);
        })();
    }, []);

    // Navigation vers la page patient en transmettant les informations
    const goToPatient = (patientdata) => {
        navigation.navigate('Patient', { data: patientdata });
    };

    // Tri des patients par nom de famille et map pour afficher les boutons de patient
    const patientDisplay = patientList
        .sort((a, b) => a.name < b.name)
        .map((patient, i) => {
            return (
                <PatientButton
                    key={i}
                    firstname={patient.firstname}
                    name={patient.name}
                    avatar={avatarImages[patient.avatar]}
                    onPress={() => goToPatient(patient)}
                />
            );
        });

    return (
        <MainContainer>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Mes patients</Text>
                </View>
                <ScrollView>
                    <View style={styles.patientButton}>
                        {patientList.length === 0 ? (
                            <Text style={styles.errorMessage}>
                                Vous n'avez pas encore de patient relié à votre
                                compte.
                            </Text>
                        ) : (
                            patientDisplay
                        )}
                    </View>
                </ScrollView>
            </View>
        </MainContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        ...FONTS.Heading1,
    },
    patientButton: {},
    errorMessage: {
        ...FONTS.Body,
        marginTop: 32,
        textAlign: 'center',
    },
});
