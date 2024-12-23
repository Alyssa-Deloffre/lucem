import { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import MainContainerWithScroll from '../../components/MainContainerWithScroll';
import FullButton from '../../components/buttons/FullButton';
import Card from '../../components/Card';
import DateCheck from '../../components/DateCheck';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { dateFormat } from '../../modules/dateAndTimeFunctions';

import { URL } from '../../data/globalVariables';
import { COLOR_PURPLE, FONTS } from '../../data/styleGlobal';

// Fonction - Récupération des informations pour les 5 dates souhaitées en fonction de l'utilisateur
const getDates = async (date, token) => {
    const dates = [];
    let startDate = date;
    // Boucle 5 fois
    for (let i = 0; i < 5; i++) {
        const newDay = new Date(startDate);
        // Date - i
        newDay.setDate(startDate.getDate() - i);
        // Récupération des informations correspondantes à la date
        const resp = await fetch(`${URL}/events/getPatientEventsByDate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                patientToken: token,
                date: newDay,
            }),
        });
        const data = await resp.json();
        // Ajout de la date et des informations récupérées au début du tableau de dates
        dates.unshift({
            formattedDate: dateFormat(newDay),
            date: newDay,
            ...data,
        });
    }
    return dates;
};

// Fonction - Check si deux dates sont égales en dehors des heures et minutes
const isEqualDates = (date1, date2) => {
    return (
        date1.getDay() === date2.getDay() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    );
};

// Fonction - Récupérer les informations de la date courrantes dans le tableaux de dates
const getCurrentInfos = (date, arr) => {
    const index = arr.findIndex((event) => isEqualDates(date, event.date));
    return arr[index];
};

// Fonction - Récupération des informations du patient grâce au token (fetch)
const getPatientInfos = async (token) => {
    const resp = await fetch(`${URL}/patients/getPatient/${token}`);
    const patient = await resp.json();
    return patient;
};

export default function HomeScreen({ navigation, route }) {
    // Savoir si la screen est affichée
    const isFocused = useIsFocused();
    // Reducer - Récupération du token patient
    const patientToken = useSelector((state) => state.user.token);

    // Information du patient
    const [patientInfos, setPatientInfos] = useState('');
    // Start date pour les 5 dates à afficher
    const [startDate, setStartDate] = useState(new Date());
    // Liste des 5 dates
    const [arrDates, setArrDates] = useState([]);
    // Date sélectionnée
    const [selectedDate, setSelectedDate] = useState(startDate);
    // Gestion des informations en fonction de la date
    const [sleepId, setSleepId] = useState(null);
    const [isCompleteSleep, setIsCompleteSleep] = useState(false);
    const [moodId, setMoodId] = useState(null);
    const [isCompleteMood, setIsCompleteMood] = useState(false);
    // Loading pour attendre les fetchs
    const [isLoading, setIsLoading] = useState(false);

    // useEffect - Au chargement, lors du changement de date (flêches)
    useEffect(() => {
        // Si la screen est visible
        if (isFocused) {
            const fetchDates = async () => {
                // Loading pendant que le fetch se fait
                setIsLoading(true);
                // Récupération des informations du patient
                const patient = await getPatientInfos(patientToken);
                setPatientInfos(patient);
                // Récupération des informations par dates
                const dates = await getDates(startDate, patientToken);
                setArrDates(dates);
                // Fin du loading
                setIsLoading(false);
            };
            fetchDates();
            // Sélection de la date de départ
            if (!route?.params?.date) {
                setSelectedDate(startDate);
            } else {
                setSelectedDate(new Date(route.params.date));
            }
        }
    }, [startDate, isFocused]);

    // useEffect - Affichage des informations correspondant à la date sélectionnée
    useEffect(() => {
        // Si la screen est visible
        if (isFocused) {
            (async () => {
                // Récupération des informations de la date actuel
                const infos = getCurrentInfos(selectedDate, arrDates);
                // S'il y a des informations
                if (infos?.events) {
                    // Affichage du sommeil
                    const sleep = infos.events.find((e) => e.type === 'sleep');
                    setSleepId(sleep?._id);
                    setIsCompleteSleep(sleep ? true : false);
                    // Affichage de l'hummeur
                    const mood = infos.events.find((e) => e.type === 'mood');
                    setMoodId(mood?._id);
                    setIsCompleteMood(mood ? true : false);
                } else {
                    setIsCompleteMood(false);
                    setIsCompleteSleep(false);
                }
            })();
        }
    }, [selectedDate, arrDates, isFocused]);

    // Affichage des dates et des "checks" correspondants
    const datesDisplay = arrDates.map((date, i) => {
        const isChecked = () => {
            if (date?.events?.length >= 2) {
                return 2;
            } else if (date?.events?.length === 1) {
                return 1;
            } else {
                return 0;
            }
        };
        return (
            <TouchableOpacity
                key={i}
                onPress={() => setSelectedDate(date.date)}
            >
                <DateCheck
                    text={date.formattedDate}
                    select={isEqualDates(date.date, selectedDate)}
                    check={isChecked()}
                    isLoading={isLoading}
                />
            </TouchableOpacity>
        );
    });

    return (
        <MainContainerWithScroll>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Bonjour</Text>
                    <Text style={styles.title}>
                        {patientInfos && patientInfos.data.firstname}
                    </Text>
                </View>
                <View style={styles.recapPatientBlock}>
                    <View style={styles.dateCheck}>
                        <TouchableOpacity
                            onPress={() =>
                                setStartDate(
                                    new Date(
                                        startDate.setDate(
                                            startDate.getDate() - 5
                                        )
                                    )
                                )
                            }
                        >
                            <FontAwesome
                                style={styles.chevron}
                                name='chevron-left'
                            />
                        </TouchableOpacity>
                        {datesDisplay}
                        <TouchableOpacity
                            onPress={() =>
                                setStartDate(
                                    new Date(
                                        startDate.setDate(
                                            startDate.getDate() + 5
                                        )
                                    )
                                )
                            }
                        >
                            <FontAwesome
                                style={[
                                    styles.chevron,
                                    {
                                        opacity: isEqualDates(
                                            startDate,
                                            new Date()
                                        )
                                            ? 0
                                            : 1,
                                    },
                                ]}
                                name='chevron-right'
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Card>
                            <View style={styles.text}>
                                <View style={styles.text1}>
                                    <Text style={styles.textRecap}>
                                        Récap sommeil
                                    </Text>
                                    {!isCompleteSleep && (
                                        <Text style={styles.textAFaire}>
                                            {' '}
                                            - À faire
                                        </Text>
                                    )}
                                </View>
                                {!isCompleteSleep && (
                                    <Text style={styles.textRecap}>8h</Text>
                                )}
                            </View>

                            {!isCompleteSleep && (
                                <FullButton
                                    text='Faire mon récap sommeil'
                                    illustration={require('../../assets/icons/sleep-star-icon.png.png')}
                                    onPress={() =>
                                        navigation.navigate('SleepForm', {
                                            date: selectedDate.toISOString(),
                                        })
                                    }
                                />
                            )}
                            {isCompleteSleep && (
                                <FullButton
                                    text='Voir mon récap sommeil'
                                    type='stroke'
                                    illustration={require('../../assets/icons/sleep-star-icon.png.png')}
                                    onPress={() =>
                                        navigation.navigate(
                                            'EventRecapPatient',
                                            { id: sleepId }
                                        )
                                    }
                                />
                            )}

                            <View style={styles.text}>
                                <View style={styles.text1}>
                                    <Text style={styles.textRecap}>
                                        Récap mood
                                    </Text>
                                    {!isCompleteMood && (
                                        <Text style={styles.textAFaire}>
                                            {' '}
                                            - À faire
                                        </Text>
                                    )}
                                </View>
                                {!isCompleteMood && (
                                    <Text style={styles.textRecap}>18h</Text>
                                )}
                            </View>
                            {!isCompleteMood && (
                                <FullButton
                                    text='Faire mon récap mood'
                                    illustration={require('../../assets/icons/mood-star-icon.png')}
                                    onPress={() =>
                                        navigation.navigate('MoodForm', {
                                            date: selectedDate.toISOString(),
                                        })
                                    }
                                />
                            )}
                            {isCompleteMood && (
                                <FullButton
                                    text='Voir mon récap mood'
                                    type='stroke'
                                    illustration={require('../../assets/icons/mood-star-icon.png')}
                                    onPress={() =>
                                        navigation.navigate(
                                            'EventRecapPatient',
                                            { id: moodId }
                                        )
                                    }
                                />
                            )}
                            <View>
                                <Text style={styles.dateDuJour}>
                                    {dateFormat(selectedDate)}
                                </Text>
                            </View>
                        </Card>
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
                    </View>
                </View>
            </View>
        </MainContainerWithScroll>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        flex: 1,
        alignItems: 'center',
        rowGap: 48,
    },
    title: {
        ...FONTS.Heading1,
        justifyContent: 'center',

        textAlign: 'center',
    },
    text: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text1: {
        flexDirection: 'row',
    },
    recapPatientBlock: {
        flex: 1,
        alignItems: 'center',
        rowGap: 16,
    },
    chevron: {
        fontSize: 20,
        color: COLOR_PURPLE[400],
    },
    textRecap: {
        fontFamily: 'Quicksand-SemiBold',
    },
    textAFaire: {
        color: COLOR_PURPLE[500],
        fontFamily: 'Quicksand',
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
        alignItems: 'center',
    },
    dateDuJour: {
        color: COLOR_PURPLE[500],
        fontFamily: 'Montserrat-SemiBold',
        width: '100%',
        textAlign: 'right',
        fontSize: 15,
    },
    loadingBlock: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 100,
        bottom: 0,
        right: 0,
        borderRadius: 16,
    },
    loadingBlock_text: {
        fontSize: 18,
        fontWeight: 600,
        fontFamily: 'Quicksand',
    },
});
