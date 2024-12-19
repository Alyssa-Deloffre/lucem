import React from "react";
import MainContainerWithScroll from "../../components/MainContainerWithScroll";
import MainContainer from "../../components/MainContainer";
import SleepRecap from "../../components/SleepRecap";
import MoodRecap from "../../components/MoodRecap";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { URL } from "../../data/globalVariables";
import { useState } from "react";
import { useEffect } from "react";
import { formatBirthdate } from "../../modules/dateAndTimeFunctions";
import ButtonRegular from "../../components/buttons/ButtonRegular";
import Card from "../../components/Card";
import { FONTS, COLOR_PURPLE } from "../../data/styleGlobal";
import FontAwesome from "react-native-vector-icons/FontAwesome";



async function getEvent(eventId) {
    const resp = await fetch(`${URL}/events/getEvent/${eventId}`)
    const json = await resp.json()
    return json
}


export default function EventRecapTherapist({ navigation, route }) {
    const [infos, setInfos] = useState(null);
    const [type, setType] = useState(null)
    const { id, token } = route.params

    useEffect(() => {
        const setEvent = async () => {
            const event = await getEvent(id)
            setInfos(event)
            setType(event.event.type)
        }
        setEvent()
    }, [])

    const navigateToHome = async () => {
        return await navigation.navigate('Patient',  {data : {date: infos.event.date, token : token}})
    }

    return (
        <MainContainerWithScroll>


                <TouchableOpacity onPress={() => navigateToHome()} activeOpacity={2} style={{position : 'absolute', zIndex : 3, margin : 6}}>
                <FontAwesome name='chevron-circle-left' size={35} color={COLOR_PURPLE[700]} />
                </TouchableOpacity>
                <Text style={styles.title}>Récap {type === 'mood' ? "humeur" : 'sommeil'} du {infos?.event && formatBirthdate(new Date(infos.event.date))}</Text>

                {type === 'mood' &&
                    <MoodRecap eventInfos={infos} />}

                {type === 'sleep' && <SleepRecap eventInfos={infos} />}





        </MainContainerWithScroll>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width : '100%',
    },
    title: {
        ...FONTS.Heading2,
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom : 16
    },


})