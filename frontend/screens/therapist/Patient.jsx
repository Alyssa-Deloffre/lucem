import { Text, View, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from "react-native"
import { useState, useEffect } from "react"
import { URL } from "../../data/globalVariables"
import { useIsFocused } from '@react-navigation/native';


import ButtonRegular from "../../components/buttons/ButtonRegular"
import MainContainer from "../../components/MainContainer"
import Card from "../../components/Card"
import DateCheck from "../../components/DateCheck";
import FullButton from "../../components/buttons/FullButton";


import { LineChart } from "react-native-chart-kit"

import FontAwesome from "react-native-vector-icons/FontAwesome";

import { avatarImages } from "../../data/imageSource"
import { formatBirthdate, getUserAge } from '../../modules/dateAndTimeFunctions'
import { COLOR_GREEN, COLOR_PURPLE, FONTS } from "../../data/styleGlobal"
import { dateFormat } from "../../modules/dateAndTimeFunctions";



const isEqualDates = (date1, date2) => {
  return date1.getDay() === date2.getDay() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
}

const getCurrentInfos = (date, arr) => {
  const index = arr.findIndex((event) =>
    isEqualDates(date, event.date))
  return arr[index]
}




export default function Patient({ navigation, route }) {
  const [patientInfos, setPatientInfos] = useState({})
  const [menuItem, setMenuItem] = useState('Récap')


  const [startDate, setStartDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(startDate)
  const [arrDates, setArrDates] = useState([])
  const [currentInfos, setCurrentInfos] = useState([])
  const [isCompleteMood, setIsCompleteMood] = useState(false)
  const [isCompleteSleep, setIsCompleteSleep] = useState(false)
  const [moodId, setMoodId] = useState(null)
  const [sleepId, setSleepId] = useState(null)

  const isFocused = useIsFocused();
  const token = route.params.data.token



  const getDates = async (date, token) => {
    const dates = [];
    let newDate = date;
    for (let i = 0; i < 5; i++) {
      const newDay = new Date(newDate)
      newDay.setDate(newDate.getDate() - i);
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

  const getPatient = async (token) => {
    const resp = await fetch(`${URL}/patients/getPatient/${token}`)
    const infos = await resp.json()
    return infos.data
  }

  useEffect(() => {
    const fetchDates = async (userToken) => {
      const infos = await getPatient(userToken)
      setPatientInfos(infos)
      const dates = await getDates(startDate, userToken);
      setArrDates(dates);
    };
    if (isFocused) {
      fetchDates(token);
      if (!route?.params?.data?.date) {
        setSelectedDate(startDate);
      } else {
        setSelectedDate(new Date(route.params.data.date))
      }
    }
  }, [startDate, isFocused])

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

    return <TouchableOpacity key={i} onPress={() => setSelectedDate(date.date)}>
      <DateCheck text={date.formattedDate} select={isEqualDates(date.date, selectedDate)} check={isChecked()}/>
    </TouchableOpacity>
  })

  const returnToHome = () => {
    navigation.navigate('TherapistTabNavigator')
  }

  const buttonStyle = (name) => {
    if (name === menuItem) {
      return 'buttonLittleRegular'
    } else {
      return 'buttonLittleStroke'
    }

  }

  const getPatientAge = getUserAge(patientInfos.birthdate)


  const contact = (
    <>
      <View style={styles.infosBlock}>
        <Text style={styles.infosBlock_label}>Adresse e-mail</Text>
        <View style={styles.infosBlock_infos}>
          <FontAwesome style={styles.infosBlock_infos_texts} name='envelope-o' />
          <Text style={styles.infosBlock_infos_texts}>{patientInfos.email}</Text>
        </View>
      </View>
      <View style={styles.infosBlock}>
        <Text style={styles.infosBlock_label}>Téléphone</Text>
        <View style={styles.infosBlock_infos}>
          <FontAwesome style={styles.infosBlock_infos_texts} name='phone' />
          <Text style={styles.infosBlock_infos_texts}>{patientInfos.phone}</Text>
        </View>
      </View>
    </>
  );


  const recap = <>
    {isCompleteMood &&
      <FullButton
        text='Voir le récap mood'
        illustration={require('../../assets/icons/mood-star-icon.png')}
        onPress={() => navigation.navigate('EventRecapTherapist', { id: moodId, token: token })}

      />
    }
    {
      isCompleteSleep &&
      <FullButton
        text='Voir le récap sommeil'
        type='stroke'
        illustration={require('../../assets/icons/sleep-star-icon.png.png')}
        onPress={() => navigation.navigate('EventRecapTherapist', { id: sleepId, token: token })}
      />
    }
  </>

  const datesMenu = <>
    <View style={styles.dateCheck}>
      <TouchableOpacity onPress={() => setStartDate(new Date(startDate.setDate(startDate.getDate() - 5)))}>

        <FontAwesome style={styles.chevron} activeOpacity={1} name='chevron-left' />
      </TouchableOpacity>
      {datesDisplay}
      {!isEqualDates(startDate, new Date()) && <TouchableOpacity activeOpacity={1} onPress={() => setStartDate(new Date(startDate.setDate(startDate.getDate() + 5)))}>

        <FontAwesome style={styles.chevron} name='chevron-right' />
      </TouchableOpacity>}
    </View>

  </>

  const stats = (

    <ScrollView style={styles.scrollView}>
      <Text style={styles.titre}>Récap sommeil</Text>
      <LineChart
        data={{
          labels: ["11/12", "12/12", "13/12", "14/12", "15/12", "16/12", "Today"],
          datasets: [
            {
              data: [
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
              ]
            }
          ]
        }}
        width={Dimensions.get("window").width - 80} // from react-native
        height={200}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundGradientFrom: COLOR_GREEN[100],
          backgroundGradientTo: COLOR_GREEN[100],
          decimalPlaces: 2, // optional, defaults to 2dp
          color: () => COLOR_GREEN[600],
          labelColor: () => COLOR_GREEN[1000],
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: COLOR_GREEN[800]
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />

      <Text style={styles.titre}>Récap humeur</Text>
      <LineChart
        data={{
          labels: ["11/12", "12/12", "13/12", "14/12", "15/12", "16/12", "Today"],
          datasets: [
            {
              data: [
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000
              ]
            }
          ]
        }}
        width={Dimensions.get("window").width - 80} // from react-native
        height={200}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundGradientFrom: COLOR_GREEN[100],
          backgroundGradientTo: COLOR_GREEN[100],
          decimalPlaces: 2, // optional, defaults to 2dp
          color: () => COLOR_GREEN[600],
          labelColor: () => COLOR_GREEN[1000],
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: COLOR_GREEN[800]
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />

      <Text style={styles.titre}>Cumul</Text>
      <LineChart
        data={{
          labels: ["11/12", "12/12", "13/12", "14/12", "15/12", "16/12", "Today"],
          datasets: [
            {
              data: [
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
              ],
              svg: { fill: COLOR_GREEN[600] }
            },
            {
              data: [
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
              ],
              color: () => COLOR_PURPLE[600],

            }
          ]
        }}
        width={Dimensions.get("window").width - 80} // from react-native
        height={200}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundGradientFrom: COLOR_GREEN[100],
          backgroundGradientTo: COLOR_GREEN[100],
          decimalPlaces: 2, // optional, defaults to 2dp
          color: () => COLOR_GREEN[600],
          labelColor: () => COLOR_GREEN[1000],
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: COLOR_GREEN[800]
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </ScrollView>)


  return (
    <MainContainer>
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', rowGap: 20 }}>

          <View style={styles.header}>
            <Image source={avatarImages[patientInfos.avatar]} style={{ width: 100, height: 100 }} />
            <Text style={styles.name}>{patientInfos.firstname} {patientInfos.name}</Text>
            <Text style={FONTS.Body}>{getPatientAge} ans</Text>
          </View>
          <View style={styles.menu}>
            <ButtonRegular text='Récap' type={buttonStyle('Récap')} orientation="none" onPress={() => setMenuItem('Récap')} />
            <ButtonRegular text='Stats' type={buttonStyle('Stats')} orientation="none" onPress={() => setMenuItem('Stats')} />
            <ButtonRegular text='Contact' type={buttonStyle('Contact')} orientation="none" onPress={() => setMenuItem('Contact')} />
          </View>
          <Card>

            {menuItem === 'Récap' && datesMenu}
            {menuItem === 'Contact' && contact}
            {menuItem === 'Récap' && recap}
            {menuItem === 'Stats' && stats}
          </Card>
        </View>

        <ButtonRegular text='Retourner à la liste des patients' onPress={() => returnToHome()} type='buttonLittleStroke' orientation="left" />
      </View>
    </MainContainer>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 5,
    marginBottom: 16,
    width: '100%'

  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%'
  },
  infosBlock_infos: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infosBlock_label : {
    fontFamily : 'Quicksand'
  },
  infosBlock_infos_texts: {
    fontSize: 20,
    fontWeight: 600,
    color: COLOR_PURPLE[600],
    fontFamily : 'Quicksand'
  },
  scrollView: {
    height: 400,
  },
  titre: {
    fontWeight: 'bold',
  },
  chevron: {
    fontSize: 20,
    color: 'grey',
    paddingVertical: '20',
    paddingHorizontal: 10,
  },

dateCheck: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
name : {
  fontFamily : 'Montserrat-SemiBold',
  fontSize : 28,
  letterSpacing : -1.5,
}


})
