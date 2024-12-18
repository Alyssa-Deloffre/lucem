import { Text, View, StyleSheet, Dimensions, ScrollView, Image } from "react-native"
import { URL } from "../data/globalVariables";
import Card from '../components/Card';
import MainContainer from "../components/MainContainer";
import DateCheck from "../components/DateCheck";
import { sleepQuality } from "../data/sleep";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { COLOR_GREEN, COLOR_PURPLE } from "../data/styleGlobal";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import {
    LineChart,
} from "react-native-chart-kit";
import { dateFormat } from "../modules/dateAndTimeFunctions";


const getPatientEventsByDate = async (token, date) => {
    const resp = await fetch(`${URL}/events/getPatientEventsByDate`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientToken: token, date: date }),
    })
    const json = await resp.json()
    return json
}

export default function StatsGraph({ patientToken }) {

    const [dateSleepArr, setDateSleepArr] = useState([])
    const [eventSleepArr, setEventSleepArr] = useState([])
    const [dateMoodArr, setDateMoodArr] = useState([])
    const [eventMoodArr, setEventMoodArr] = useState([])

    useEffect(() => {
        (async () => {
            const dateSleeps = []
            const eventSleeps = []
            const dateMoods = []
            const eventMoods = []
            for (let i = 0; i < 7; i++) {
                const newDay = new Date()
                newDay.setDate(newDay.getDate() - i);
                const patientEventsByDate = await getPatientEventsByDate(patientToken, newDay)
                if (patientEventsByDate.result) {
                    const sleep = patientEventsByDate.events.find(event => event.type === "sleep")
                    if (sleep) {
                        dateSleeps.unshift(newDay)
                        eventSleeps.unshift(sleep)
                    }
                    const mood = patientEventsByDate.events.find(event => event.type === "mood")
                    if (mood) {
                        dateMoods.unshift(newDay)
                        eventMoods.unshift(mood)
                    }
                }
            }
            setDateSleepArr(dateSleeps)
            setEventSleepArr(eventSleeps)
            setDateMoodArr(dateMoods)
            setEventMoodArr(eventMoods)

        })()
    }, [])

    const formatYLabel = (label) => {
        const truncLabel = Math.trunc(label)
        if (truncLabel === 0) {
            return 'Médiocre'
        }
        if (truncLabel === 1) {
            return 'Mauvais'
        }
        if (truncLabel === 2) {
            return 'Moyen'
        }
        if (truncLabel === 3) {
            return 'Bien'
        }
        if (truncLabel === 4) {
            return 'Très bien'
        }
    }
    return (
        <MainContainer>

            <Card>
                <ScrollView style={styles.scrollView}>

                    <Text style={styles.titre}>Qualité du sommeil et Humeur au réveil</Text>
                    {dateSleepArr.length > 0 &&
                        <LineChart
                            data={{
                                labels: dateSleepArr.map(date => dateFormat(date)),
                                datasets: [
                                    {
                                        data: eventSleepArr.map(event => event.ref.sleepquality),
                                        svg: { fill: COLOR_GREEN[100] },
                                        strokeWidth: 3,
                                    },
                                    {
                                        data: eventSleepArr.map(event => event.ref.wakingquality),
                                        color: () => COLOR_PURPLE[600],
                                        strokeWidth: 3,
                                    },
                                ]
                            }}
                            //Style graphique dans son ensemble 
                            width={Dimensions.get("window").width - 80}
                            height={200}
                            fromZero={true}
                            fromNumber={4}
                            chartConfig={{
                                backgroundGradientFrom: COLOR_GREEN[100],
                                backgroundGradientTo: COLOR_GREEN[100],
                                decimalPlaces: 2,
                                color: () => COLOR_GREEN[600],
                                labelColor: () => COLOR_GREEN[1000],
                                style: {
                                    borderRadius: 16
                                },
                                //Style des points
                                propsForDots: {
                                    r: "7",
                                    strokeWidth: "0",
                                    stroke: 'black',
                                }
                            }}
                            //Style fond 
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                            formatYLabel={formatYLabel}
                        />}
                    <View style={styles.legende1}>
                        <FontAwesome style={styles.rond1} name='circle' />
                        <Text style={styles.qualite}>Qualité du sommeil</Text>
                    </View>
                    <View style={styles.legende1}>
                        <FontAwesome style={styles.rond2} name='circle' />
                        <Text style={styles.humeur}>Humeur au réveil</Text>
                    </View>


                    <Text style={styles.titre}>Etat émotionnel des 6 derniers jours</Text>

                    {dateMoodArr.length > 0 &&
                        <LineChart
                            data={{
                                labels: dateMoodArr.map(date => dateFormat(date)),
                                datasets: [
                                    {
                                        data: eventMoodArr.map(event => event.ref.quality)
                                    }
                                ]
                            }}
                            width={Dimensions.get("window").width - 80}
                            height={200}
                            fromZero={true}
                            fromNumber={4}
                            chartConfig={{
                                backgroundGradientFrom: COLOR_GREEN[100],
                                backgroundGradientTo: COLOR_GREEN[100],
                                decimalPlaces: 2,
                                color: () => COLOR_GREEN[600],
                                labelColor: () => COLOR_GREEN[1000],
                                style: {
                                    borderRadius: 16
                                },
                                propsForDots: {
                                    r: "7",
                                    strokeWidth: "0",
                                    stroke: COLOR_GREEN[800]
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 16
                            }}
                            formatYLabel={formatYLabel}
                        />}
                </ScrollView>
            </Card>
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: 50,
        justifyContent: 'center',
        alignContent: 'center',
    },
    choice: {
        padding: '10',
        flexDirection: 'row',
    },
    scrollView: {
        height: 500,
    },
    titre: {
        fontWeight: 'bold',
        padding: 10,
    },
    qualite: {
        color: COLOR_GREEN[700],
    },
    humeur: {
        color: COLOR_PURPLE[600],
    },
    legende1: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rond1: {
        width: 17,
        color: COLOR_GREEN[600],
        alignContent: 'center',
        fontSize: 15,
    },
    rond2: {
        width: 17,
        color: COLOR_PURPLE[600],
        alignContent: 'center',
        fontSize: 15,
    },
})
