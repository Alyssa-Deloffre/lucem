import React from "react";
import { SafeAreaView, Text, StyleSheet, View, ScrollView } from 'react-native'
import Card from "./Card";
import { formatTime } from "../modules/dateAndTimeFunctions";
import { sleepQuality, wakeQuality } from "../data/sleep";

const formatDuration = (date) => {
    let hours = date.getHours()
    let minutes = date.getMinutes()

    let newDuration = hours + ' h ' + minutes + ' min'

    if (hours === 0) {
        newDuration = minutes + ' min'
    }
    return newDuration
}

export default function SleepRecap({eventInfos}){

    const event = eventInfos?.event

    const nightWakeToDisplay = event && event.ref.nightwaking.map((nightWake, i) => {
        return <View key={i} style={styles.nightWake}>
                    <Text>Réveil nocturne à </Text>
                    <Text style={styles.bold}>{formatTime(new Date(nightWake.start))}</Text> 
                    <Text> pendant </Text>
                    <Text style={styles.bold}>{formatDuration(new Date(nightWake.duration))}</Text> 
                </View>
    })

    const sleepQualityValue = event && sleepQuality.find(item => item.value === event.ref.sleepquality).text
    const wakeQualityValue = event && wakeQuality.find(item => item.value === event.ref.wakingquality).text


    console.log('truc : ', eventInfos.event.ref.nightwaking)


//PB : ON PERD 1H sur la start et end 
    return (
        <Card>
            <View style={{ flexDirection : 'row'}}>
                <Text>Sommeil de </Text>
                {event && <Text style={styles.bold}>{formatTime(new Date(event.ref.start))}</Text>}
                <Text> à </Text> 
                {event && <Text style={styles.bold}>{formatTime(new Date(event.ref.end))}</Text>}
            </View>
            <View style={styles.line} />
            <View>
                <Text>Réveil(s) nocturne(s) :</Text>
                {nightWakeToDisplay}
            </View>
                <View style={styles.line} />
            <View style={{flexDirection : 'row'}}>
                <Text style={styles.titre}>Qualité du sommeil : </Text>
                <Text style={styles.bold}>{event && sleepQualityValue}</Text>
            </View>
        
            <View style={styles.line} />
            <View style={{flexDirection : 'row'}}>
                <Text style={styles.titre}>Etat de forme au réveil : </Text>
                <Text style={styles.bold}>{wakeQualityValue}</Text>
            </View>
            <View style={styles.line} />
            {event && event.ref.details !== '' && 
            
            <View>
                <Text>Détails : </Text>
                <ScrollView>

                <Text>{event && event.ref.details}</Text>
                </ScrollView>

            </View>
            
            }
    
        </Card>
    )
}

const styles = StyleSheet.create({
    bold : {
        fontWeight : 'bold',   
    },
    line : {
        height: 1,
        backgroundColor: 'grey',
        marginVertical: 15,
    },
    nightWake : {
        borderRadius : 10,
        borderWidth : 1,
        borderColor : 'grey',
        flexDirection : 'row',
        paddingVertical : '10',
        paddingHorizontal : 8
    },
})