import React from "react";
import { SafeAreaView, Text, StyleSheet, View } from 'react-native'
import Card from "./Card";
import { formatTime } from "../modules/dateAndTimeFunctions";

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

    console.log(eventInfos)

    console.log('truc : ', eventInfos.event.ref.nightwaking)

//PB : ON PERD 1H sur la start et end 
    return (
        <Card>
            <View style={styles.sommeil}>
                <Text>Sommeil de </Text>
                {eventInfos && <Text style={styles.heures}>{formatTime(new Date(eventInfos.event.ref.start))}</Text>}
                <Text> à </Text> 
                {eventInfos && <Text style={styles.heures}>{formatTime(new Date(eventInfos.event.ref.end))}</Text>}
            </View>
            <View style={styles.line} />
            <View style={styles.reveil}>
                <Text>Réveil(s) nocturne(s) :</Text>
                <View style={styles.nocturne}>
                    <Text>Réveil nocturne à </Text>
                    <Text style={styles.heures}>02h00 </Text> 
                    <Text>pendant</Text>
                    <Text style={styles.heures}>{formatDuration(new Date(eventInfos.event.ref.nightwaking[0].duration))}</Text> 
                </View>
                <View style={styles.nocturne}>
                    <Text>Réveil nocturne à </Text>
                    <Text style={styles.heures}>04h00 </Text> 
                    <Text>pendant </Text>
                    <Text style={styles.heures} >30 min </Text> 
                </View>
                <View style={styles.line} />
            </View>
            <View style={styles.etat}>
                <Text style={styles.titre}>Qualité du sommeil : </Text>
                <Text style={styles.qualite}>Très bon</Text>
            </View>
                <Text style={styles.description}> Description</Text>
        
            <View style={styles.line} />
            <View style={styles.etat}>
                <Text style={styles.titre}>Etat de forme au réveil : </Text>
                <Text style={styles.qualite}>En forme</Text>
            </View>
                <Text style={styles.description}>Description</Text>
    
        </Card>
    )
}

const styles = StyleSheet.create({
    heures : {
        fontWeight : 'bold',   
    },
    sommeil : {
        flexDirection : 'row',
    },
    reveil : {
        width : 300,
    },
    line : {
        height: 1,
        backgroundColor: 'grey',
        marginVertical: 15,
    },
    nocturne : {
        borderRadius : 10,
        borderWidth : 1,
        borderColor : 'grey',
        flexDirection : 'row',
        paddingVertical : '10',
        marginBottom : 10,
    },
    partiel : {
        width : 300,
        borderRadius : 16,
        borderColor : 'grey',
    },
    etat : {
    flexDirection: 'row',
    margin: 5,
    },
    qualite : {
        fontWeight : 'bold',
    }
})