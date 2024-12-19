import React from "react";
import MainContainer from "../../components/MainContainer";
import SleepRecap from "../../components/SleepRecap";
import MoodRecap from "../../components/MoodRecap";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { URL } from "../../data/globalVariables";
import { useState } from "react";
import { useEffect } from "react";
import { formatBirthdate } from "../../modules/dateAndTimeFunctions";
import ButtonRegular from "../../components/buttons/ButtonRegular";
import Card from "../../components/Card";
import { COLOR_PURPLE, FONTS } from "../../data/styleGlobal";
import FontAwesome from "react-native-vector-icons/FontAwesome";



async function getEvent(eventId) {
    const resp = await fetch(`${URL}/events/getEvent/${eventId}`)
    const json = await resp.json()
    return json
}


export default function EventRecapPatient({ navigation, route }) {

    const [infos, setInfos] = useState(null);
    const [type, setType] = useState(null)

    const { id } = route.params

    useEffect(() => {
        const setEvent = async () => {
            const event = await getEvent(id)
            setInfos(event)
            setType(event.event.type)
        }
        setEvent()
    }, [])


    const navigateToHome = async () => {
        return await navigation.navigate('PatientTabNavigator', {screen: 'Accueil',  params: {date: infos.event.date}})
    }
    return (
        <MainContainer>
                                        <TouchableOpacity onPress={() => navigateToHome()} activeOpacity={2} style={{position : 'absolute', zIndex : 3, margin : 20}}>
                            <FontAwesome name='chevron-circle-left' size={35} style={{color : COLOR_PURPLE[700]}}/>
                            </TouchableOpacity>

            <View style={styles.container}>
                <Text style={styles.title}>Récap {type === 'mood' ? "humeur" : 'sommeil'} du {infos?.event && formatBirthdate(new Date(infos.event.date))}</Text>




                {type === 'mood' &&
                    <MoodRecap eventInfos={infos} />}

                {type === 'sleep' && <SleepRecap eventInfos={infos} />}




            </View>
                <ButtonRegular type='buttonStroke' text='Retour' orientation="left" onPress={() => navigateToHome()} />


        </MainContainer>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width : '100%'
    },
    title: {
        ...FONTS.Heading2,
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom : 16
    },
    title2: {
        fontFamily: 'Heading',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
    },

})