import { Text, View, StyleSheet } from "react-native"
import MainContainer from "../../components/MainContainer";
import FullButton from "../../components/buttons/FullButton";
import { MAYLEEN_URL } from "../../data/globalVariables";
import Card from "../../components/Card";
import { COLOR_PURPLE } from "../../data/styleGlobal";
import DateCheck from "../../components/DateCheck";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// const getCurrentDate=() =>{
//     let date = new Date().toLocaleString();
//     return (date)
// };

// let yesterday = new Date(date.getTime());
// yesterday.setDate(date.getDate()-1)

const DateFormat = (date = new Date()) => {

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
  
    return `${day}/${month}`;
};

// const formatDate = (date) => {
//     const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//     return new Intl.DateTimeFormat('fr-FR', options).format(date);
//   };

// const DateFormat = () => {
//     const dates = [];
//     const today = new Date();
//     dates.push(DateFormat(today));

// for (let i=1; i<=5; i++){
//     const previousDate = new Date(today);
//     previousDate.setDate(today.getDate()-i);
//     date.push(DateFormat(previousDate));
// }
// return dates;
// };

export default function HomeScreen() {
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
                    <FontAwesome style={styles.chevronLeft} name='chevron-left' />
                    <DateCheck text='Lun' type='check' />
                    <DateCheck text='Mar' type='circle' />
                    <DateCheck text='Mer' type='today' />
                    <DateCheck text='Jeu' type='todayCheck' />
                    <DateCheck text='Ven' type='todayCheck' />
                </View>
                <Card>
                    <View style={styles.text}>
                        <View style={styles.text1}>
                            <Text style={styles.textRecap}>Récap sommeil</Text>
                            <Text style={styles.textAFaire}> - À faire</Text>
                        </View>
                        <Text style={styles.textHeure}>8h</Text>
                    </View>
                    <FullButton style={styles.fullButton} type='emptyButton'
                        text='Faire mon récap sommeil'
                        illustration={require('../../assets/avatars/avatar1.png')}
                    />
                    <View style={styles.text}>
                        <View style={styles.text1}>
                            <Text style={styles.textRecap}>Récap mood</Text>
                            <Text style={styles.textAFaire}> - À faire</Text>
                        </View>
                        <Text style={styles.textHeure}>18h</Text>
                    </View>
                    <FullButton style={styles.fullButton} type='emptyButton'
                        text='Faire mon récap mood'
                        illustration={require('../../assets/avatars/avatar1.png')}
                    />
                    <Text style={styles.dateDuJour}>{DateFormat()}</Text>
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

