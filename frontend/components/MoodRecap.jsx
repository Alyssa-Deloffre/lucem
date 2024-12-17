import React from "react";
import { SafeAreaView, Text, StyleSheet, View } from 'react-native'
import Card from "./Card";
import { formatTime, dateFormat } from "../modules/dateAndTimeFunctions";
import { moodQualityValues } from "../data/mood";
import { COLOR_PURPLE } from "../data/styleGlobal";

const formatDuration = (date) => {
    let hours = date.getHours()
    let minutes = date.getMinutes()

    let newDuration = hours + ' h ' + minutes + ' min'

    if (hours === 0) {
        newDuration = minutes + ' min'
    }
    return newDuration
}

export default function MoodRecap({eventInfos}){
    // console.log('test : ', eventInfos?.event)
    const event = eventInfos?.event

    const quality = event && moodQualityValues.find(item => item.value === event.ref.quality).text

    const emotionsToDisplay = event && event.ref.emotions.map((emotion, i) => {
        return <View  key={i} style={styles.button}> 
        <Text>{emotion.mood} </Text>
        </View>
    })

    const influenceToDisplay = event && event.ref.influence.map((influenceFactor, i) => {
        return <View key={i} style={styles.button}>
            <Text >{influenceFactor}</Text>
            </View>
            
    })
    return ( 
        <Card>
                <Text>
                Humeur de la journée : 
                </Text>
                <Text style={{fontWeight : 'bold'}}>
                {event && quality}
                </Text>
        
                <Text>Emotions ressenties : </Text>
                <Text>{emotionsToDisplay}</Text>
                <Text>Facteurs d'influence actuels : </Text>

                <Text>{influenceToDisplay}</Text>
                <Text>{event && event.ref.details}</Text>
            </Card>

    )
}

const styles = StyleSheet.create({
    buttonView : {

    },
    button : {
        borderRadius: 100,
        borderColor: COLOR_PURPLE[1000],
        borderWidth: 1,
        paddingVertical: 6,
        paddingHorizontal: 16,
    }
})