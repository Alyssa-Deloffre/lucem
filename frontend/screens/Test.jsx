import { Text, View, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native"
import { URL } from "../data/globalVariables";
import Card from '../components/Card';
import MainContainer from "../components/MainContainer";
import { useState, useEffect } from "react";
import { COLOR_GREEN, COLOR_PURPLE } from "../data/styleGlobal";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import {
  LineChart,
} from "react-native-chart-kit";
import { dateFormat } from "../modules/dateAndTimeFunctions";
import { sleepQuality, wakeQuality } from "../data/sleep";
import { moodQualityValues } from "../data/mood";


const getPatientEventsByDate = async (token, date) => {
  const resp = await fetch(`${URL}/events/getPatientEventsByDate`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ patientToken: token, date: date }),
  })
  const json = await resp.json()
  return json
}

export default function Test() {

  const [dateSleepArr, setDateSleepArr] = useState([])
  const [eventSleepArr, setEventSleepArr] = useState([])
  const [dateMoodArr, setDateMoodArr] = useState([])
  const [eventMoodArr, setEventMoodArr] = useState([])

  // Show dot infos
  const [displayInfosSleep, setDisplayInfosSleep] = useState(null)
  const [displayInfosMood, setDisplayInfosMood] = useState(null)

  const patientToken = 'QF3G7zFCM8zzBUV31eWMmmymcFh7gzLp'

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


  const handleShowDotInfosSleep = async (value) => {

    const infos = { label: "", value: "", color: "" }

    if (value.dataset.type === "sleepQuality") {
      infos.label = "Qualité du sommeil"
      infos.value = sleepQuality.find(sleep => sleep.value === value.value).text
      infos.color = COLOR_GREEN[700]
    }
    if (value.dataset.type === "wakingQuality") {
      infos.label = "Forme au réveil"
      infos.value = wakeQuality.find(wake => wake.value === value.value).text
      infos.color = COLOR_PURPLE[600]
    }

    setDisplayInfosSleep(
      <TouchableOpacity
        style={[styles.showInfosCard, { borderColor: infos.color }]}
        onPress={() => setDisplayInfosSleep(null)}
      >
        <Text style={[styles.showInfosCard_label, { color: infos.color }]}>{infos.label}</Text>
        <Text style={styles.showInfosCard_value}>{infos.value}</Text>
      </TouchableOpacity>
    )
  }

  const handleShowDotInfosMood = async (value) => {

    const infos = { label: "Humeur", value: moodQualityValues.find(mood => mood.value === value.value).text, color: COLOR_GREEN[700] }

    setDisplayInfosMood(
      <TouchableOpacity
        style={[styles.showInfosCard, { borderColor: infos.color }]}
        onPress={() => setDisplayInfosMood(null)}
      >
        <Text style={[styles.showInfosCard_label, { color: infos.color }]}>{infos.label}</Text>
        <Text style={styles.showInfosCard_value}>{infos.value}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <MainContainer>
      <Card>
        <ScrollView>
          <View style={styles.scrollView}>
            {dateSleepArr.length > 0 &&
              <View style={styles.chartBlock}>

                <Text style={styles.titre}>Récap sommeil</Text>
                <LineChart
                  data={{
                    labels: dateSleepArr.map(date => dateFormat(date)),
                    datasets: [
                      {
                        data: eventSleepArr.map(event => event.ref.sleepquality),
                        color: () => COLOR_GREEN[600],
                        type: "sleepQuality"
                      },
                      {
                        data: eventSleepArr.map(event => event.ref.wakingquality),
                        color: () => COLOR_PURPLE[600],
                        type: "wakingQuality"
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
                  onDataPointClick={(value) => handleShowDotInfosSleep(value)}
                />
                <View style={styles.legendes}>
                  <View style={styles.legendes_legende}>
                    <FontAwesome style={styles.rond1} name='circle' />
                    <Text style={styles.qualite}>Qualité du sommeil</Text>
                  </View>
                  <View style={styles.legendes_legende}>
                    <FontAwesome style={styles.rond2} name='circle' />
                    <Text style={styles.humeur}>Humeur au réveil</Text>
                  </View>
                </View>
                {displayInfosSleep && displayInfosSleep}
              </View>}


            {dateMoodArr.length > 0 &&
              <View style={styles.chartBlock}>
                <Text style={styles.titre}>État émotionnel</Text>

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
                  onDataPointClick={(value) => handleShowDotInfosMood(value)}
                />
                <View style={styles.legendes}>
                  <View style={styles.legendes_legende}>
                    <FontAwesome style={styles.rond1} name='circle' />
                    <Text style={styles.qualite}>Humeur</Text>
                  </View>
                </View>
                {displayInfosMood && displayInfosMood}
              </View>}
          </View>
        </ScrollView>
      </Card>
    </MainContainer >
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
    flex: 1,
    gap: 32
  },
  chartBlock: {
    rowGap: 4
  },
  titre: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  qualite: {
    color: COLOR_GREEN[700],
  },
  humeur: {
    color: COLOR_PURPLE[600],
  },
  legendes: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: "wrap",
    gap: 16,
  },
  legendes_legende: {
    flexDirection: 'row',
    alignItems: 'center',
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
  showInfosCard: {
    position: "absolute",
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: COLOR_PURPLE[1000],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    top: 8,
    left: "50%",
    transform: [{ translateX: "-50%" }],
    borderWidth: 1,
  },
  showInfosCard_label: {
    textAlign: "center",
  },
  showInfosCard_value: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: 600,
    color: COLOR_PURPLE[1000]
  },
})
