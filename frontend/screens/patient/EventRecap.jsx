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


async function getEvent(eventId) {
    const resp = await fetch(`${URL}/events/getEvent/${eventId}`)
    const json = await resp.json()
    return json
}


export default function EventRecap({ navigation, route }) {

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



    console.log(infos?.event.date)
    return (
        <MainContainer>

            <View style={styles.container}>
                <Text style={styles.title}>Récap {type === 'mood' ? "humeur" : 'sommeil'} du {infos?.event && formatBirthdate(new Date(infos.event.date))}</Text>




                {type === 'mood' &&
                    <MoodRecap eventInfos={infos} />}

                {type === 'sleep' && <SleepRecap eventInfos={infos} />}




            </View>
                <ButtonRegular type='buttonStroke' text='Retour' orientation="left" onPress={() => navigation.navigate('PatientTabNavigator')} />


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
        fontFamily: 'Heading',
        fontWeight: 'bold',
        justifyContent: 'center',
        fontSize: 30,
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