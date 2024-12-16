import { Text, View, StyleSheet, Modal, FlatList, ScrollView } from "react-native"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

import MainContainer from "../../components/MainContainer"
import Card from "../../components/Card"
import CustomSlider from "../../components/CustomSlider"
import TimePickerInput from "../../components/inputs/TimePickerInput"
import ButtonRegular from "../../components/buttons/ButtonRegular"
import TextArea from "../../components/inputs/TextArea"
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { formatTime } from "../../modules/dateAndTimeFunctions"
import { sleepQuality, wakeQuality } from "../../data/sleep"
import { URL } from "../../data/globalVariables"

const setDefaultHour = (date, hours, minutes) => {
    date.setHours(hours, minutes, 0, 0);
    console.log(date)
    return date;
};

export default function SleepFormScreen({ navigation }) {
    const [infos, setInfos] = useState({
        sleepTime: setDefaultHour(new Date(), 21, 0),
        wakeTime: setDefaultHour(new Date(), 8, 0),
        nightWake: [],
        sleepQuality: 2,
        wakeQuality: 2,
        details: '',
    })
    const [nightWaking, setNightWaking] = useState({
        start: new Date(),
        end: '',
        duration: setDefaultHour(new Date(), 0, 0),
        type: '',
    })
    const [currentScreen, setCurrentScreen] = useState(1)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const patientToken = useSelector(state => state.user.token)


    const navigationButtons = () => {
        if (currentScreen === 1) {
            return <ButtonRegular text='Suivant' onPress={() => setCurrentScreen(currentScreen + 1)} />
        }
        else {
            return <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <ButtonRegular text='Retour' onPress={() => currentScreen > 1 && setCurrentScreen(currentScreen - 1)} orientation="left" type='buttonStroke' />
                <ButtonRegular text='Valider' onPress={() => validateForm()} />
            </View>
        }
    }


    console.log({ token: patientToken, data: infos })
    // console.log(nightWaking)

    const addNightWake = () => {
        setInfos(prev => ({ ...prev, nightWake: [...prev.nightWake, nightWaking] }))
        setIsModalVisible(false)
    }

    const deleteNightWake = (nightWakeIndex) => {
        let newArr = infos.nightWake.filter((item, index) => index !== nightWakeIndex)
        setInfos(prev => ({ ...prev, nightWake: newArr }))
    }


    const displayNightWake = ({ item, index }) => (
        <View style={styles.flatlist}>
            <Card >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>Réveil nocturne #{index + 1}</Text>
                    <FontAwesome name='trash-o' size={20} onPress={() => deleteNightWake(index)} />
                </View>
                <Text>Début : {formatTime(item.start)}</Text>
                <Text>Durée : {formatTime(item.duration)}</Text>
            </Card>
        </View>
    )

    const validateForm = async () => {
        const resp = await fetch(`${URL}/events/addSleepGlobal`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: patientToken, date: new Date(), data: infos
            })
        })
        const data = await resp.json()
        if (data.result) {
            console.log('form validé')
            navigation.navigate('PatientTabNavigator')

        } else {
            console.log('problème')
            navigation.navigate('PatientTabNavigator')
        }
    }


    return (
        <MainContainer>
            <View style={styles.container}>
                <View style={{
                    rowGap: 16,
                }}>
                    {currentScreen === 1 &&
                        <>
                            <Card label='Heure de coucher'>
                                <TimePickerInput value={infos.sleepTime} onChange={(event, selectedTime) => setInfos(prev => ({ ...prev, sleepTime: selectedTime.toLocaleTimeString() }))} />
                            </Card>
                            <Card label='Heure de lever'>
                                <TimePickerInput value={infos.wakeTime} onChange={(event, selectedTime) => setInfos(prev => ({ ...prev, wakeTime: selectedTime.toLocaleTimeString() }))} />
                            </Card>
                            <ButtonRegular text='Ajouter un réveil nocturne' orientation='plus-left' onPress={() => setIsModalVisible(true)} />
                            {
                                infos.nightWake.length > 0 &&
                                <FlatList
                                    data={infos.nightWake}
                                    renderItem={displayNightWake}
                                    keyExtractor={(item) => item.id}
                                    style={{ height: '30%' }}
                                />
                            }



                            <Modal visible={isModalVisible}>
                                <View style={styles.modalOverlay}>
                                    <View style={styles.modalContainer}>
                                        <Text>Début</Text>
                                        <TimePickerInput value={nightWaking.start} onChange={(event, selectedTime) => setNightWaking(prev => ({ ...prev, start: selectedTime }))} />
                                        <Text>Durée</Text>
                                        <TimePickerInput
                                            value={nightWaking.duration}
                                            onChange={(event, selectedTime) => setNightWaking(prev => ({ ...prev, duration: selectedTime }))}
                                            minuteInterval={5}
                                        />
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                            <ButtonRegular text='Annuler' type='buttonLittleStroke' onPress={() => setIsModalVisible(false)} orientation="left" />
                                            <ButtonRegular text='Valider' type='buttonLittleRegular' onPress={() => addNightWake()} />
                                        </View>
                                    </View>

                                </View>

                            </Modal>
                        </>
                    }

                    {currentScreen === 2 &&
                        <>

                            <Card>
                                <Text>Comment était votre sommeil cette nuit ?</Text>
                                <CustomSlider data={sleepQuality} value={infos.sleepQuality} onValueChange={(newValue) => setInfos(prev => ({ ...prev, sleepQuality: newValue }))} />
                            </Card>
                            <Card>
                                <Text>Quel est votre niveau de forme ce matin ?</Text>
                                <CustomSlider data={wakeQuality} value={infos.wakeQuality} onValueChange={(newValue) => setInfos(prev => ({ ...prev, wakeQuality: newValue }))} />
                            </Card>
                            <Card>
                                <TextArea label='Avez-vous des détails à noter sur votre nuit ?' onChangeText={(newValue) => setInfos(prev => ({ ...prev, details: newValue }))} />
                            </Card>
                        </>
                    }
                </View>
            </View>
            <View>
                {navigationButtons()}
                <ButtonRegular text="Retour à l'accueil" type='buttonLittleStroke' orientation="left" onPress={() => navigation.navigate('PatientTabNavigator')} />
            </View>
        </MainContainer>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between"
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay sombre
    },
    modalContainer: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        padding: 20,
        width: "90%",
    },
    flatlist: {
        marginBottom: 8,
    }
})


