import React from "react";
import MainContainer from "../../components/MainContainer";
import SleepRecap from "../../components/SleepRecap";
import MoodRecap from "../../components/MoodRecap";
import { Text, View, StyleSheet } from "react-native"
import { URL } from "../../data/globalVariables";
import { useState } from "react";
import { useEffect } from "react";
import { formatBirthdate } from "../../modules/dateAndTimeFunctions";
import ButtonRegular from "../../components/buttons/ButtonRegular";
import Card from "../../components/Card";
import { FONTS } from "../../data/styleGlobal";


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
        <MainContainer>

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


})