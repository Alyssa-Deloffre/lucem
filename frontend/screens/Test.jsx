import { Text, View, StyleSheet, Dimensions, ScrollView, Image } from "react-native"
import { URL } from "../data/globalVariables";
import Card from '../components/Card';
import MainContainer from "../components/MainContainer";
import DateCheck from "../components/DateCheck";
import { sleepQuality } from "../data/sleep";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { COLOR_GREEN, COLOR_PURPLE } from "../data/styleGlobal";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
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

export default function Test() {

  const [patientData, setPatientData] = useState([]);
  const [dateSleepArr, setDateSleepArr] = useState([])
  const [eventSleepArr, setEventSleepArr] = useState([])
  const [dateMoodArr, setDateMoodArr] = useState([])
  const [eventMoodArr, setEventMoodArr] = useState([])

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


  return (
    <MainContainer>

      <Card>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.titre}>Récap sommeil</Text>
          {dateSleepArr.length > 0 &&
            <LineChart
              data={{
                labels: dateSleepArr.map(date => dateFormat(date)),
                datasets: [
                  {
                    data: eventSleepArr.map(event => event.ref.sleepquality)
                  }
                ]
              }}
              width={Dimensions.get("window").width - 80} // from react-native
              height={200}
              fromZero={true}
              fromNumber={4}
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
            />}

          <Text style={styles.titre}>Récap humeur</Text>
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
              width={Dimensions.get("window").width - 80} // from react-native
              height={200}
              fromZero={true}
              fromNumber={4}
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
            />}

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
  }
})
