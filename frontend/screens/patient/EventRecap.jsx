import React from "react";
import MainContainer from "../../components/MainContainer";
import SleepRecap from "../../components/SleepRecap";
import { Text, View, StyleSheet } from "react-native"
import { URL } from "../../data/globalVariables";
import { useState } from "react";
import { useEffect } from "react";
import { formatBirthdate } from "../../modules/dateAndTimeFunctions";


async function getEvent(eventId) {
    const resp = await fetch(`${URL}/events/getEvent/${eventId}`)
    const json = await resp.json()
    return json
}


export default function EventRecap({navigation, route}) {

const [infos, setInfos] = useState(null);
//const truc = route.params.data

useEffect(() => {
    const setEvent = async () => {
        const event = await getEvent('675efd391362eda697850b20')
        setInfos(event)
    }
    setEvent()
}, [])

console.log(infos)

    return (
        <MainContainer>
        <View style={styles.container}>
            <Text style={styles.title}>Récap sommeil</Text>
            {infos && infos.event && <Text style={styles.title2}>du {formatBirthdate(new Date(infos.event.date))}</Text>}
            <SleepRecap eventInfos={infos}/>
        </View>
        </MainContainer>
    )
}


const styles = StyleSheet.create({
    container: {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        },
    title: {
        fontFamily: 'Heading',
        fontWeight: 'bold',
        justifyContent:'center',
        fontSize: 30,
        width: 400,
        textAlign: 'center',
    },
    title2:{
        fontFamily: 'Heading',
        fontWeight: 'bold',
        fontSize: 30,
        width: 400,
        textAlign: 'center',
    },
    component:{

        width:'80%',


    }
})