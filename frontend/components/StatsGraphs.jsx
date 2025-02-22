import { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { LineChart } from 'react-native-chart-kit';

import { URL } from '../data/globalVariables';
import { COLOR_GREEN, COLOR_PURPLE } from '../data/styleGlobal';

import { dateFormat } from '../modules/dateAndTimeFunctions';

import { sleepQuality, wakeQuality } from '../data/sleep';
import { moodQualityValues } from '../data/mood';

const getPatientEventsByDate = async (token, date) => {
    const resp = await fetch(`${URL}/events/getPatientEventsByDate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientToken: token, date: date }),
    });
    const json = await resp.json();
    return json;
};

export default function StatsGraph({ patientToken }) {
    // Sommeils infos
    const [dateSleepArr, setDateSleepArr] = useState([]);
    const [eventSleepArr, setEventSleepArr] = useState([]);
    // Humeurs infos
    const [dateMoodArr, setDateMoodArr] = useState([]);
    const [eventMoodArr, setEventMoodArr] = useState([]);
    // Loading
    const [isLoading, setIsLoading] = useState(false);

    // Show dot infos
    const [displayInfosSleep, setDisplayInfosSleep] = useState(null);
    const [displayInfosMood, setDisplayInfosMood] = useState(null);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            // Création des tableaux
            const dateSleeps = [];
            const eventSleeps = [];
            const dateMoods = [];
            const eventMoods = [];
            // Récupération des 7 derniers jours
            for (let i = 0; i < 7; i++) {
                const newDay = new Date();
                newDay.setDate(newDay.getDate() - i);
                // Récupération des événements du patient pour chaque date
                const patientEventsByDate = await getPatientEventsByDate(
                    patientToken,
                    newDay
                );
                if (patientEventsByDate.result) {
                    // Ajout des événements aux tableaux ci-dessus
                    const sleep = patientEventsByDate.events.find(
                        (event) => event.type === 'sleep'
                    );
                    if (sleep) {
                        dateSleeps.unshift(newDay);
                        eventSleeps.unshift(sleep);
                    }
                    const mood = patientEventsByDate.events.find(
                        (event) => event.type === 'mood'
                    );
                    if (mood) {
                        dateMoods.unshift(newDay);
                        eventMoods.unshift(mood);
                    }
                }
            }
            // Une fois les événements ajoutés ajout des tableaux aux states (évite le grand nombre de re-rendus)
            setDateSleepArr(dateSleeps);
            setEventSleepArr(eventSleeps);
            setDateMoodArr(dateMoods);
            setEventMoodArr(eventMoods);
            setIsLoading(false);
        })();
    }, []);

    // Affichage des informations au click sur les points du graph sommeil
    const handleShowDotInfosSleep = async (value) => {
        const infos = { label: '', value: '', color: '' };

        if (value.dataset.type === 'sleepQuality') {
            infos.label = 'Qualité du sommeil';
            infos.value = sleepQuality.find(
                (sleep) => sleep.value === value.value
            ).text;
            infos.color = COLOR_GREEN[700];
        }
        if (value.dataset.type === 'wakingQuality') {
            infos.label = 'Forme au réveil';
            infos.value = wakeQuality.find(
                (wake) => wake.value === value.value
            ).text;
            infos.color = COLOR_PURPLE[600];
        }

        setDisplayInfosSleep(
            <TouchableOpacity
                style={[styles.showInfosCard, { borderColor: infos.color }]}
                onPress={() => setDisplayInfosSleep(null)}
            >
                <Text
                    style={[styles.showInfosCard_label, { color: infos.color }]}
                >
                    {infos.label}
                </Text>
                <Text style={styles.showInfosCard_value}>{infos.value}</Text>
            </TouchableOpacity>
        );
    };

    // Affichage des informations au click sur les points du graph d'humeur
    const handleShowDotInfosMood = async (value) => {
        const infos = {
            label: 'Humeur',
            value: moodQualityValues.find((mood) => mood.value === value.value)
                .text,
            color: COLOR_GREEN[700],
        };

        setDisplayInfosMood(
            <TouchableOpacity
                style={[styles.showInfosCard, { borderColor: infos.color }]}
                onPress={() => setDisplayInfosMood(null)}
            >
                <Text
                    style={[styles.showInfosCard_label, { color: infos.color }]}
                >
                    {infos.label}
                </Text>
                <Text style={styles.showInfosCard_value}>{infos.value}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView style={styles.scrollView}>
            {!isLoading && (
                <View style={styles.chartBlocks}>
                    {dateSleepArr.length > 0 && (
                        <View style={styles.chartBlock}>
                            <Text style={styles.title}>Récap sommeil</Text>
                            <LineChart
                                data={{
                                    labels: dateSleepArr.map((date) =>
                                        dateFormat(date)
                                    ),
                                    datasets: [
                                        {
                                            data: eventSleepArr.map(
                                                (event) =>
                                                    event.ref.sleepquality
                                            ),
                                            color: () => COLOR_GREEN[600],
                                            type: 'sleepQuality',
                                        },
                                        {
                                            data: eventSleepArr.map(
                                                (event) =>
                                                    event.ref.wakingquality
                                            ),
                                            color: () => COLOR_PURPLE[600],
                                            type: 'wakingQuality',
                                        },
                                    ],
                                }}
                                //Style graphique dans son ensemble
                                width={Dimensions.get('window').width - 80}
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
                                        borderRadius: 16,
                                    },
                                    //Style des points
                                    propsForDots: {
                                        r: '7',
                                        strokeWidth: '0',
                                        stroke: 'black',
                                    },
                                }}
                                //Style fond
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16,
                                }}
                                onDataPointClick={(value) =>
                                    handleShowDotInfosSleep(value)
                                }
                            />
                            <View style={styles.legends}>
                                <View style={styles.legends_legend}>
                                    <FontAwesome
                                        style={styles.greenCircle}
                                        name='circle'
                                    />
                                    <Text style={styles.greenText}>
                                        Qualité du sommeil
                                    </Text>
                                </View>
                                <View style={styles.legends_legend}>
                                    <FontAwesome
                                        style={styles.purpleCircle}
                                        name='circle'
                                    />
                                    <Text style={styles.purpleText}>
                                        Humeur au réveil
                                    </Text>
                                </View>
                            </View>
                            {displayInfosSleep && displayInfosSleep}
                        </View>
                    )}

                    {dateMoodArr.length > 0 && (
                        <View style={styles.chartBlock}>
                            <Text style={styles.title}>État émotionnel</Text>

                            <LineChart
                                data={{
                                    labels: dateMoodArr.map((date) =>
                                        dateFormat(date)
                                    ),
                                    datasets: [
                                        {
                                            data: eventMoodArr.map(
                                                (event) => event.ref.quality
                                            ),
                                        },
                                    ],
                                }}
                                width={Dimensions.get('window').width - 80}
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
                                        borderRadius: 16,
                                    },
                                    propsForDots: {
                                        r: '7',
                                        strokeWidth: '0',
                                        stroke: COLOR_GREEN[800],
                                    },
                                }}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16,
                                }}
                                onDataPointClick={(value) =>
                                    handleShowDotInfosMood(value)
                                }
                            />
                            <View style={styles.legends}>
                                <View style={styles.legends_legend}>
                                    <FontAwesome
                                        style={styles.greenCircle}
                                        name='circle'
                                    />
                                    <Text style={styles.greenText}>Humeur</Text>
                                </View>
                            </View>
                            {displayInfosMood && displayInfosMood}
                        </View>
                    )}
                </View>
            )}
            {isLoading && (
                <View style={styles.loadingBlock}>
                    <ActivityIndicator
                        size='large'
                        color={COLOR_PURPLE[600]}
                    />
                    <Text style={styles.loadingBlock_text}>
                        Chargement des données
                    </Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        height: 500,
    },
    chartBlocks: {
        gap: 32,
    },
    chartBlock: {
        rowGap: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    greenText: {
        color: COLOR_GREEN[700],
    },
    purpleText: {
        color: COLOR_PURPLE[600],
    },
    legends: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
    },
    legends_legend: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    greenCircle: {
        width: 17,
        color: COLOR_GREEN[600],
        alignContent: 'center',
        fontSize: 15,
    },
    purpleCircle: {
        width: 17,
        color: COLOR_PURPLE[600],
        alignContent: 'center',
        fontSize: 15,
    },
    showInfosCard: {
        position: 'absolute',
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        shadowColor: COLOR_PURPLE[1000],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        top: 8,
        left: '50%',
        transform: [{ translateX: '-50%' }],
        borderWidth: 1,
    },
    showInfosCard_label: {
        textAlign: 'center',
    },
    showInfosCard_value: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 600,
        color: COLOR_PURPLE[1000],
    },
    loadingBlock: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        width: '100%',
        height: 500,
    },
    loadingBlock_text: {
        fontSize: 18,
        fontWeight: 600,
    },
});
