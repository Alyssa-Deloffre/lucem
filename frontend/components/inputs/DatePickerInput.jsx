import React, { useState } from "react";
import { Text, View, TouchableOpacity, Platform, StyleSheet, Modal } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLOR_GREEN, COLOR_PURPLE } from "../../data/styleGlobal";
import ButtonRegular from "../buttons/ButtonRegular";
import InputField from "./InputField";

const formatDate = (date) => {
  let day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (day < 10) day = "0" + day;
  return `${day}/${month < 10 ? "0" + month : month}/${year}`;
};


export default function DatePickerInput({
  value,
  onChange,
  label,
}) {

  const [isModalVisible, setIsModalVisible] = useState(false)

  return <>
    <InputField label={label} inputMode="none" value={formatDate(value)} onFocus={() => setIsModalVisible(true)} />

    <Modal visible={isModalVisible} >
      <View style={styles.modalOverlay}>
        <View style={styles.pickerContainer}>

          <DateTimePicker
            mode='date'
            value={value}
            textColor={COLOR_PURPLE[1000]}
            display="spinner"
            onChange={onChange}
            locale='fr'


          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>

            <ButtonRegular text='Retour' onPress={() => setIsModalVisible(false)} type='buttonLittleStroke' orientation="left" />
            <ButtonRegular text='Valider' onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </View>
    </Modal>

  </>
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


