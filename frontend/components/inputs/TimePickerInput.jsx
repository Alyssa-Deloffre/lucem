import React, { useState } from "react";
import { Text, View, TouchableOpacity, Platform, StyleSheet, Modal, TextInput } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLOR_GREEN, COLOR_PURPLE } from "../../data/styleGlobal";
import InputField from "./InputField";
import ButtonRegular from "../buttons/ButtonRegular";


function formatTime(time) {
    return time.toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit'
    });

}


export default function TimePickerInput({
    value,
    onChange
}) {
    const [isModalVisible, setIsModalVisible] = useState(false)


    return (
        <>
            <Text>TimePicker</Text>

            <InputField inputMode="none" value={formatTime(value)} onFocus={() => setIsModalVisible(true)} />

            <Modal visible={isModalVisible} >
                <View style={styles.modalOverlay}>
                    <View style={styles.pickerContainer}>

                        <DateTimePicker
                            mode='time'
                            value={value}
                            textColor={COLOR_PURPLE[1000]}
                            display="spinner"
                            onChange={onChange}
                            locale='fr'


                        />

                        <View style={{flexDirection : 'row', justifyContent : 'space-between', width : '100%'}}>

                        <ButtonRegular text='Retour' onPress={() => setIsModalVisible(false)} type='buttonLittleStroke' orientation="left"/>

                        <ButtonRegular text='Valider' onPress={() => setIsModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>














        </>
    )
}


const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay sombre
    },
    pickerContainer: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        padding: 20,
        width: "90%",
        alignItems: "center",
    },
})