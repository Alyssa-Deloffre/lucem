import { Text, View, StyleSheet } from "react-native"

import Card from '../components/Card';
import MainContainer from "../components/MainContainer";
import CustomSlider from "../components/CustomSlider";
import TimePickerInput from "../components/inputs/TimePickerInput";
import DatePickerInput from "../components/inputs/DatePickerInput";
import { sleepQuality } from "../data/sleep";
import { useState } from "react";

export default function Test() {
    const [value, setValue] = useState(0)
    const [time, setTime] = useState(new Date())
    console.log(time.toISOString())



    return (
        <MainContainer>
            <Card>
        <Text>Page Test
        </Text>
        <CustomSlider data={sleepQuality} value={value} onValueChange={(test) => setValue(test)}/>

        <TimePickerInput value={time} onChange={(event, selectedDate) => setTime(selectedDate)}/>

        <DatePickerInput />
            </Card>
        </MainContainer>
    )
}