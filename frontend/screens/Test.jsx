import { Text, View, StyleSheet } from "react-native"

import Card from '../components/Card';
import MainContainer from "../components/MainContainer";
import CustomSlider from "../components/CustomSlider";
import { sleepQuality } from "../data/sleep";
import { useState } from "react";

export default function Test() {
    const [value, setValue] = useState(0)



    return (
        <MainContainer>
            <Card>
        <Text>Page Test
        </Text>
        <CustomSlider data={sleepQuality} value={value} onValueChange={(test) => setValue(test)}/>
            </Card>
        </MainContainer>
    )
}