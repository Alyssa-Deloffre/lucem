import React, { useState } from "react";
import { Text, View, TouchableOpacity, Platform, StyleSheet, Modal, TextInput } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLOR_GREEN, COLOR_PURPLE } from "../../data/styleGlobal";
import InputField from "./InputField";
import ButtonRegular from "../buttons/ButtonRegular";




export default function TimePickerInput () {
    const [date, setDate] = useState(new Date())
    const [isModalVisible, setIsModalVisible] = useState(false)

    return (
        <>
        <Text>TimePicker</Text>

        <InputField inputMode="none" onFocus={() => setIsModalVisible(true)} onChangeText={() => setIsModalVisible(true)}/>

        <Modal visible={isModalVisible} >
            <View style={{flex : 1, justifyContent : 'center'}}>

        <DateTimePicker 
        mode='time'
        value={new Date()}
        textColor="red"
        accentColor="blue"
        display="spinner"
        />
        <ButtonRegular text='truc'/>

            </View>
        </Modal>
        <DateTimePicker
        mode='date'
        value={date}
        display="spinner"
        />

        





        </>
    )
}