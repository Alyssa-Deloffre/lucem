import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";


import MainContainer from "../../components/MainContainer";
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
        console.log(data)
        dates.unshift({ formattedDate: dateFormat(newDay), date: newDay });

    }
    return dates;
};

const isEqualDates = (date1, date2) => {

    return date1.getDay() === date2.getDay() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()

}

export default function HomeScreen({ navigation }) {
    const [startDate, setStartDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(startDate)
    const [arrDates, setArrDates] = useState([])

    const patientToken = useSelector(state => state.user.token)

    useEffect(() => {
        const fetchDates = async () => {
            const dates = await getDates(startDate, patientToken); // attendre la résolution
            setArrDates(dates); // Mettre à jour l'état avec le tableau de dates
        };
        fetchDates();
        setSelectedDate(startDate);
    }, [startDate]);





    const datesDisplay = arrDates.map((date, i) => {

        return <TouchableOpacity key={i} onPress={() => setSelectedDate(date.date)}>
            <DateCheck text={date.formattedDate} select={isEqualDates(date.date, selectedDate)} />
        </TouchableOpacity>
    })

    return (
        <MainContainer >
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>
                        Bonjour
                    </Text>
                    <Text style={styles.title}>
                        Marie
                    </Text>
                </View>
                <View style={styles.dateCheck}>
                    <TouchableOpacity onPress={() => setStartDate(new Date(startDate.setDate(startDate.getDate() - 5)))}>

                        <FontAwesome style={styles.chevronLeft} name='chevron-left' />
                    </TouchableOpacity>
                    {datesDisplay}
                    {!isEqualDates(startDate, new Date()) && <TouchableOpacity onPress={() => setStartDate(new Date(startDate.setDate(startDate.getDate() + 5)))}>

                        <FontAwesome style={styles.chevronLeft} name='chevron-right' />
                    </TouchableOpacity>}
                </View>
                <Card>
                    <View style={styles.text}>
                        <View style={styles.text1}>
                            <Text style={styles.textRecap}>Récap sommeil</Text>
                            <Text style={styles.textAFaire}> - À faire</Text>
                        </View>
                        <Text style={styles.textHeure}>8h</Text>
                    </View>
                    <FullButton type='fullButton'
                        text='Faire mon récap sommeil'
                        illustration={require('../../assets/avatars/avatar1.png')}
                        onPress={() => navigation.navigate('SleepForm')}
                    />
                    <View style={styles.text}>
                        <View style={styles.text1}>
                            <Text style={styles.textRecap}>Récap mood</Text>
                            <Text style={styles.textAFaire}> - À faire</Text>
                        </View>
                        <Text style={styles.textHeure}>18h</Text>
                    </View>
                    <FullButton type='fullButton'
                        text='Faire mon récap mood'
                        illustration={require('../../assets/avatars/avatar1.png')}
                    />
                    <Text style={styles.dateDuJour}>{dateFormat(selectedDate)}</Text>
                </Card>
            </View>
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
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
    chevronLeft: {
        fontSize: 20,
        color: 'grey',
        paddingVertical: '20',
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
        width: '80%',
        justifyContent: 'space-between',
    },
    dateDuJour: {
        color: COLOR_PURPLE[500],
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'right',
        fontSize: 15,
    }
})

