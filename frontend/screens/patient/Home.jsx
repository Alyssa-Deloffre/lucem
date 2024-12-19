import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native"
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useIsFocused } from '@react-navigation/native';

import MainContainerWithScroll from "../../components/MainContainerWithScroll";
import FullButton from "../../components/buttons/FullButton";


import { URL } from "../../data/globalVariables";
import Card from "../../components/Card";
import { COLOR_PURPLE } from "../../data/styleGlobal";
import DateCheck from "../../components/DateCheck";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { dateFormat } from "../../modules/dateAndTimeFunctions";


const getDates = async (date, token) => {
    const dates = [];
    let startDate = date;
    for (let i = 0; i < 5; i++) {
        const newDay = new Date(startDate)
        newDay.setDate(startDate.getDate() - i);
        const resp = await fetch(`${URL}/events/getPatientEventsByDate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                patientToken: token,
                date: newDay
            })
        })
        const data = await resp.json()
        dates.unshift({ formattedDate: dateFormat(newDay), date: newDay, ...data });

    }
    return dates;
};

const isEqualDates = (date1, date2) => {
    return date1.getDay() === date2.getDay() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
}

const getCurrentInfos = (date, arr) => {
    const index = arr.findIndex((event) =>
        isEqualDates(date, event.date))
    return arr[index]
}

export default function HomeScreen({ navigation, route }) {
    const [startDate, setStartDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(startDate)
    const [arrDates, setArrDates] = useState([])
    const [currentInfos, setCurrentInfos] = useState([])
    const [isCompleteMood, setIsCompleteMood] = useState(false)
    const [isCompleteSleep, setIsCompleteSleep] = useState(false)
    const [moodId, setMoodId] = useState(null)
    const [sleepId, setSleepId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const isFocused = useIsFocused();


    const patientToken = useSelector(state => state.user.token)



    useEffect(() => {
        if (isFocused) {
            const fetchDates = async () => {
                setIsLoading(true)
                const dates = await getDates(startDate, patientToken);
                setArrDates(dates);
                setIsLoading(false)
            };
            fetchDates();
            if (!route?.params?.date) {
                setSelectedDate(startDate);
            } else {
                setSelectedDate(new Date(route.params.date))
            }
        }

    }, [startDate, isFocused]);

    useEffect(() => {
        if (isFocused) {

            (async () => {
                const infos = getCurrentInfos(selectedDate, arrDates);
                setCurrentInfos(infos);
                if (infos?.events) {
                    const mood = infos.events.find((e) => e.type === 'mood');
                    const sleep = infos.events.find((e) => e.type === 'sleep');
                    setMoodId(mood?._id);
                    setSleepId(sleep?._id);
                    setIsCompleteMood(mood ? true : false);
                    setIsCompleteSleep(sleep ? true : false);

                } else {
                    setIsCompleteMood(false);
                    setIsCompleteSleep(false);
                }
            })();
        }
    }, [selectedDate, arrDates, isFocused]);




    const datesDisplay = arrDates.map((date, i) => {
        const isChecked = () => {
            if (date?.events?.length >= 2) {
                return 2
            } else if (date?.events?.length === 1) {
                return 1
            } else {
                return 0
            }
        }

        return (
            <TouchableOpacity key={i} onPress={() => setSelectedDate(date.date)}>
                <DateCheck
                    text={date.formattedDate}
                    select={isEqualDates(date.date, selectedDate)}
                    check={isChecked()}
                    isLoading={isLoading}
                />
            </TouchableOpacity>
        )
    })
    return (
        <MainContainerWithScroll >
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>
                        Bonjour
                    </Text>
                    <Text style={styles.title}>
                        Marie
                    </Text>
                </View>
                <View style={styles.recapPatientBlock}>
                    <View style={styles.dateCheck}>
                        <TouchableOpacity onPress={() => setStartDate(new Date(startDate.setDate(startDate.getDate() - 5)))}>

                            <FontAwesome style={styles.chevrons} name='chevron-left' />
                        </TouchableOpacity>
                        {datesDisplay}
                        {!isEqualDates(startDate, new Date()) && <TouchableOpacity onPress={() => setStartDate(new Date(startDate.setDate(startDate.getDate() + 5)))}>

                            <FontAwesome style={styles.chevrons} name='chevron-right' />
                        </TouchableOpacity>}
                    </View>
                    <View>
                        <Card>
                            <View style={styles.text}>
                                <View style={styles.text1}>
                                    <Text style={styles.textRecap}>Récap sommeil</Text>
                                    {!isCompleteSleep &&
                                        <Text style={styles.textAFaire}> - À faire</Text>
                                    }
                                </View>
                                {
                                    !isCompleteSleep &&
                                    <Text style={styles.textHeure}>8h</Text>
                                }
                            </View>

                            {
                                !isCompleteSleep &&
                                <FullButton
                                    text='Faire mon récap sommeil'
                                    illustration={require('../../assets/avatars/avatar1.png')}
                                    onPress={() => navigation.navigate('SleepForm', { date: selectedDate.toISOString() })}
                                />
                            }
                            {
                                isCompleteSleep &&
                                <FullButton
                                    text='Voir mon récap sommeil'
                                    type='stroke'
                                    illustration={require('../../assets/avatars/avatar1.png')}
                                    onPress={() => navigation.navigate('EventRecapPatient', { id: sleepId })}
                                />
                            }



                            <View style={styles.text}>
                                <View style={styles.text1}>
                                    <Text style={styles.textRecap}>Récap mood</Text>
                                    {!isCompleteMood &&
                                        <Text style={styles.textAFaire}> - À faire</Text>
                                    }
                                </View>
                                {
                                    !isCompleteMood &&
                                    <Text style={styles.textHeure}>18h</Text>
                                }
                            </View>
                            {!isCompleteMood &&
                                <FullButton
                                    text='Faire mon récap mood'
                                    illustration={require('../../assets/avatars/avatar1.png')}
                                    onPress={() => navigation.navigate('MoodForm', { date: selectedDate.toISOString() })}

                                />}
                            {isCompleteMood &&
                                <FullButton
                                    text='Voir mon récap mood'
                                    type='stroke'
                                    illustration={require('../../assets/avatars/avatar1.png')}
                                    onPress={() => navigation.navigate('EventRecapPatient', { id: moodId })}

                                />
                            }
                            <Text style={styles.dateDuJour}>{dateFormat(selectedDate)}</Text>
                        </Card>
                        {isLoading && <View style={styles.loadingBlock}>
                            <ActivityIndicator size="large" color={COLOR_PURPLE[600]} />
                            <Text style={styles.loadingBlock_text}>Chargement des données</Text>
                        </View>}
                    </View>
                </View>
            </View>
        </MainContainerWithScroll>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        flex: 1,
        alignItems: 'center',
        rowGap: 48
    },
    title: {
        fontFamily: 'Heading',
        fontWeight: 'bold',
        justifyContent: 'center',
        fontSize: 30,
        width: 120,
        textAlign: 'center',
    },
    text: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
    },
    text1: {
        flexDirection: 'row',
    },
    recapPatientBlock: {
        flex: 1,
        alignItems: "center",
        rowGap: 16,
    },
    chevrons: {
        fontSize: 20,
        color: COLOR_PURPLE[400],
    },
    textRecap: {
        fontWeight: 'bold',
    },
    textAFaire: {
        color: COLOR_PURPLE[500],
    },
    check: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    dateCheck: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    dateDuJour: {
        color: COLOR_PURPLE[500],
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'right',
        fontSize: 15,
    },
    loadingBlock: {
        backgroundColor: "white",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 100,
        bottom: 0,
        right: 0,
        borderRadius: 16
    },
    loadingBlock_text: {
        fontSize: 18,
        fontWeight: 600
    },
})

