import { Text, View, StyleSheet } from "react-native"

import Card from '../components/Card';
import MainContainer from "../components/MainContainer";
import DateCheck from "../components/DateCheck";
import { sleepQuality } from "../data/sleep";
import { useState } from "react";

export default function Test() {




    return (
        <MainContainer>
            <Card>
                <Text>toto</Text>
                <DateCheck text='13/12' select={true} check={true}/>
                <DateCheck text='13/12' select={false} check={false}/>
                <DateCheck text='13/12' select={false} check={true} />
                <DateCheck text='13/12' select={false} check={false}/>
            </Card>
        </MainContainer>
    )
}