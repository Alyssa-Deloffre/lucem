import React from "react";
import { SafeAreaView, Text, StyleSheet, View, ScrollView } from 'react-native'
import Card from "./Card";
import { formatTime } from "../modules/dateAndTimeFunctions";
import { sleepQuality, wakeQuality } from "../data/sleep";
import { FONTS } from "../data/styleGlobal";

const formatDuration = (date) => {
    let hours = date.getHours()
    let minutes = date.getMinutes()

    let newDuration = hours + ' h ' + minutes + ' min'

    if (hours === 0) {
        newDuration = minutes + ' min'
    }
    return newDuration
}

export default function SleepRecap({ eventInfos }) {

    const event = eventInfos?.event

    const nightWakeToDisplay = event && event.ref.nightwaking.map((nightWake, i) => {
        return <View key={i} style={styles.nightWake}>
            <View style={{flexDirection : 'row'}}>
            <Text style={styles.body}>Réveil nocturne à </Text>
            <Text style={styles.bodyBold}>{formatTime(new Date(nightWake.start))}</Text>
            </View>
            <View style={{flexDirection : 'row'}}>

            <Text style={styles.body}>pendant </Text>
            <Text style={styles.bodyBold}>{formatDuration(new Date(nightWake.duration))}</Text>
            </View>
        </View>
    })

    const sleepQualityValue = event && sleepQuality.find(item => item.value === event.ref.sleepquality).text
    const wakeQualityValue = event && wakeQuality.find(item => item.value === event.ref.wakingquality).text


    //PB : ON PERD 1H sur la start et end 
    return (
        <Card>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.body}>Sommeil de </Text>
                {event && <Text style={styles.bodyBold}>{formatTime(new Date(event.ref.start))}</Text>}
                <Text style={styles.body}> à </Text>
                {event && <Text style={styles.bodyBold}>{formatTime(new Date(event.ref.end))}</Text>}
            </View>
            <View style={styles.line} />
            <View>
                <Text style={styles.label}>Réveil(s) nocturne(s) :</Text>
                {nightWakeToDisplay}
            </View>
            <View style={styles.line} />
            <View>
                <Text style={styles.label}>Qualité du sommeil : </Text>
                <Text style={styles.body}>{event && sleepQualityValue}</Text>
            </View>

            <View style={styles.line} />
            <View>
                <Text style={styles.label}>Etat de forme au réveil : </Text>
                <Text style={styles.body}>{wakeQualityValue}</Text>
            </View>
            {event && event.ref.details !== '' &&
                <>
                    <View style={styles.line} />

                    <Text style={styles.label}>Détails : </Text>
                    <ScrollView>

                        <Text>{event && event.ref.details}</Text>
                    </ScrollView>

                </>

            }

        </Card>
    )
}

const styles = StyleSheet.create({
    line: {
        height: 1,
        backgroundColor: 'grey',
        marginVertical: 15,
    },
    nightWake: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
        paddingVertical: 10,
        paddingHorizontal: 8,
        marginTop: 8,
    },
    body: {
        ...FONTS.Body
    },
    bodyBold : {
        fontFamily : 'Quicksand-Bold',
        fontSize : 18,
    },
    label: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18
    }
})