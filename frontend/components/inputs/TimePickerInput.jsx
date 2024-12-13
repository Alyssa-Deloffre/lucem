import React, { useState } from "react";
import { Text, View, TouchableOpacity, Platform, StyleSheet, Modal, TextInput } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLOR_GREEN, COLOR_PURPLE } from "../../data/styleGlobal";
import InputField from "./InputField";
import ButtonRegular from "../buttons/ButtonRegular";


 function formatTime(time) {
     return time.toLocaleTimeString(navigator.language, {
       hour: '2-digit',
       minute:'2-digit'
     });

   }


export default function TimePickerInput ({
value,
onChange
}) {
    const [isModalVisible, setIsModalVisible] = useState(false)


    return (
        <>
        <Text>TimePicker</Text>

        <InputField inputMode="none" value={formatTime(value)} onFocus={() => setIsModalVisible(true)} />

        <Modal visible={isModalVisible} >
            <View style={{flex : 1, justifyContent : 'center'}}>

        <DateTimePicker 
        mode='time'
        value={value}
        textColor="red"
        accentColor="blue"
        display="spinner"
        onChange={onChange}
        locale='fr'


        />
        <ButtonRegular text='Valider' onPress={() => setIsModalVisible(false)}/>

            </View>
        </Modal>



        
        {/* <DateTimePicker
        mode='date'
        value={date}
        display="spinner"
        /> */}

        





        </>
    )
}