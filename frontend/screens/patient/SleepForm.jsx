import { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Modal,
    FlatList,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';

import MainContainer from '../../components/MainContainer';
import Card from '../../components/Card';
import CustomSlider from '../../components/CustomSlider';
import TimePickerInput from '../../components/inputs/TimePickerInput';
import ButtonRegular from '../../components/buttons/ButtonRegular';
import TextArea from '../../components/inputs/TextArea';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { formatTime } from '../../modules/dateAndTimeFunctions';
import { sleepQuality, wakeQuality } from '../../data/sleep';
import { URL } from '../../data/globalVariables';
import { COLOR_PURPLE, FONTS } from '../../data/styleGlobal';

// Ajustement de l'heure (heure d'hivers)
const setDefaultHour = (date, hours, minutes) => {
    date.setHours(hours + 1, minutes, 0, 0);
    return date;
};

export default function SleepFormScreen({ navigation, route }) {
    // States - Enregistrement des informations du formulaire
    const [infos, setInfos] = useState({
        sleepTime: setDefaultHour(new Date(), 21, 0),
        wakeTime: setDefaultHour(new Date(), 8, 0),
        nightWake: [],
        sleepQuality: 2,
        wakeQuality: 2,
        details: '',
    });
    const [nightWaking, setNightWaking] = useState({
        start: new Date(),
        duration: setDefaultHour(new Date(), 0, 0),
        type: '',
    });
    // Gestion des pages du formulaire
    const [currentScreen, setCurrentScreen] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Reducer - Patient token
    const patientToken = useSelector((state) => state.user.token);
    // Navigation - Date
    const selectedDate = route.params.date;

    // Boutons de navigation en fonction de la page affichée
    const navigationButtons = () => {
        if (currentScreen === 1) {
            return (
                <ButtonRegular
                    text='Suivant'
                    onPress={() => setCurrentScreen(currentScreen + 1)}
                />
            );
        } else if (currentScreen === 2) {
            return (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <ButtonRegular
                        text='Retour'
                        onPress={() =>
                            currentScreen > 1 &&
                            setCurrentScreen(currentScreen - 1)
                        }
                        orientation='left'
                        type='buttonStroke'
                    />
                    <ButtonRegular
                        text='Suivant'
                        onPress={() => setCurrentScreen(currentScreen + 1)}
                    />
                </View>
            );
        } else {
            return (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <ButtonRegular
                        text='Retour'
                        onPress={() =>
                            currentScreen > 1 &&
                            setCurrentScreen(currentScreen - 1)
                        }
                        orientation='left'
                        type='buttonStroke'
                    />
                    <ButtonRegular
                        text='Valider'
                        onPress={() => validateForm()}
                    />
                </View>
            );
        }
    };

    // Ajout d'un réveil
    const addNightWake = () => {
        setInfos((prev) => ({
            ...prev,
            nightWake: [...prev.nightWake, nightWaking],
        }));
        setIsModalVisible(false);
    };

    // Suppression d'un réveil
    const deleteNightWake = (nightWakeIndex) => {
        let newArr = infos.nightWake.filter(
            (item, index) => index !== nightWakeIndex
        );
        setInfos((prev) => ({ ...prev, nightWake: newArr }));
    };

    // Affichage du formulaire ajout d'un réveil
    const displayNightWake = ({ item, index }) => (
        <View
            style={styles.flatlist}
            key={index}
        >
            <Card>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text style={styles.wakeTitle}>
                        Réveil nocturne #{index + 1}
                    </Text>
                    <FontAwesome
                        name='trash-o'
                        size={20}
                        style={{ color: COLOR_PURPLE[1000] }}
                        onPress={() => deleteNightWake(index)}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.body}>Début : </Text>
                    <Text style={styles.bodyBold}>
                        {formatTime(item.start)}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.body}>Durée : </Text>
                    <Text style={styles.bodyBold}>
                        {formatTime(item.duration)}
                    </Text>
                </View>
            </Card>
        </View>
    );

    // Enregistrement du formulaire et redirection (fetch)
    const validateForm = async () => {
        const resp = await fetch(`${URL}/events/addSleepGlobal`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: patientToken,
                date: new Date(selectedDate),
                data: infos,
            }),
        });
        const data = await resp.json();
        if (data.result) {
            navigateToHome();
        } else {
            navigateToHome();
        }
    };

    // Navigation à la page précédente
    const navigateToHome = async () => {
        return await navigation.navigate('PatientTabNavigator', {
            screen: 'Accueil',
            params: { date: selectedDate },
        });
    };

    return (
        <MainContainer>
            <TouchableOpacity
                onPress={() => navigateToHome()}
                activeOpacity={2}
                style={{
                    position: 'absolute',
                    zIndex: 3,
                    margin: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <FontAwesome
                    name='chevron-circle-left'
                    size={25}
                    color={COLOR_PURPLE[700]}
                />
                <Text
                    style={{
                        paddingLeft: 6,
                        fontFamily: 'Quicksand-SemiBold',
                        color: COLOR_PURPLE[700],
                    }}
                >
                    Accueil
                </Text>
            </TouchableOpacity>
            <View style={styles.container}>
                <View
                    style={{
                        rowGap: 16,
                    }}
                >
                    {currentScreen === 1 && (
                        <View style={{ rowGap: 16, paddingTop: 24 }}>
                            <Card label='Heure de coucher'>
                                <TimePickerInput
                                    value={infos.sleepTime}
                                    onChange={(event, selectedTime) => {
                                        selectedTime.toLocaleString('fr-FR', {
                                            timezone: 'Europe/Paris',
                                        });
                                        setInfos((prev) => ({
                                            ...prev,
                                            sleepTime: selectedTime,
                                        }));
                                    }}
                                />
                            </Card>
                            <Card label='Heure de lever'>
                                <TimePickerInput
                                    value={infos.wakeTime}
                                    onChange={(event, selectedTime) =>
                                        setInfos((prev) => ({
                                            ...prev,
                                            wakeTime: selectedTime,
                                        }))
                                    }
                                />
                            </Card>
                            <ButtonRegular
                                text='Ajouter un réveil nocturne'
                                orientation='plus-left'
                                onPress={() => setIsModalVisible(true)}
                            />
                            {infos.nightWake.length > 0 && (
                                <FlatList
                                    data={infos.nightWake}
                                    renderItem={displayNightWake}
                                    keyExtractor={(item, index) => index}
                                    style={{ height: '40%' }}
                                />
                            )}

                            <Modal visible={isModalVisible}>
                                <View style={styles.modalOverlay}>
                                    <View style={styles.modalContainer}>
                                        <Text style={styles.label}>Début</Text>
                                        <TimePickerInput
                                            value={nightWaking.start}
                                            onChange={(event, selectedTime) =>
                                                setNightWaking((prev) => ({
                                                    ...prev,
                                                    start: selectedTime,
                                                }))
                                            }
                                        />
                                        <Text style={styles.label}>Durée</Text>
                                        <TimePickerInput
                                            value={nightWaking.duration}
                                            onChange={(event, selectedTime) =>
                                                setNightWaking((prev) => ({
                                                    ...prev,
                                                    duration: selectedTime,
                                                }))
                                            }
                                            minuteInterval={5}
                                        />
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                marginTop: 18,
                                            }}
                                        >
                                            <ButtonRegular
                                                text='Annuler'
                                                type='buttonLittleStroke'
                                                onPress={() =>
                                                    setIsModalVisible(false)
                                                }
                                                orientation='left'
                                            />
                                            <ButtonRegular
                                                text='Valider'
                                                type='buttonLittleRegular'
                                                onPress={() => addNightWake()}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    )}

                    {currentScreen === 2 && (
                        <View style={{ rowGap: 16, paddingTop: 24 }}>
                            <Card>
                                <Text style={styles.label}>
                                    Comment était votre sommeil cette nuit ?
                                </Text>
                                <CustomSlider
                                    data={sleepQuality}
                                    value={infos.sleepQuality}
                                    onValueChange={(newValue) =>
                                        setInfos((prev) => ({
                                            ...prev,
                                            sleepQuality: newValue,
                                        }))
                                    }
                                />
                            </Card>
                            <Card>
                                <Text style={styles.label}>
                                    Quel est votre niveau de forme ce matin ?
                                </Text>
                                <CustomSlider
                                    data={wakeQuality}
                                    value={infos.wakeQuality}
                                    onValueChange={(newValue) =>
                                        setInfos((prev) => ({
                                            ...prev,
                                            wakeQuality: newValue,
                                        }))
                                    }
                                />
                            </Card>
                        </View>
                    )}
                    {currentScreen === 3 && (
                        <ScrollView style={{ height: '100%', paddingTop: 24 }}>
                            <Card>
                                <TextArea
                                    label='Avez-vous des détails à noter sur votre nuit ?'
                                    onChangeText={(newValue) =>
                                        setInfos((prev) => ({
                                            ...prev,
                                            details: newValue,
                                        }))
                                    }
                                />
                            </Card>
                        </ScrollView>
                    )}
                </View>
            </View>

            <View>{navigationButtons()}</View>
        </MainContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 25,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay sombre
    },
    modalContainer: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        width: '90%',
    },
    flatlist: {
        marginBottom: 8,
    },
    label: {
        fontFamily: 'Quicksand-SemiBold',
        color: COLOR_PURPLE[1000],
        fontSize: 16,
        marginVertical: 6,
    },
    body: {
        ...FONTS.Body,
        fontSize: 16,
    },
    bodyBold: {
        fontFamily: 'Quicksand-SemiBold',
        color: COLOR_PURPLE[1000],
        fontSize: 16,
    },
    wakeTitle: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        color: COLOR_PURPLE[1000],
    },
});
