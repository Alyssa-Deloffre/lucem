import React, { useState } from "react";
import { Text, View, TouchableOpacity, Platform, StyleSheet, Modal } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLOR_GREEN, COLOR_PURPLE } from "../../data/styleGlobal";
import ButtonRegular from "../buttons/ButtonRegular";

const formatDate = (date) => {
  let day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  if (day < 10) day = "0" + day;
  return `${day}/${month < 10 ? "0" + month : month}/${year}`;
};

export default function DatePickerInput({
  label,
  mode = "date",
  onDateChange,
  initialDate = new Date(),
}) {
  const [date, setDate] = useState(initialDate); 
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShow(false);
    }
    if (selectedDate) {
      setDate(selectedDate);
      onDateChange && onDateChange(selectedDate);
    }
  };

  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity onPress={() => setShow(true)}>
        <View style={styles.input}>
          <Text style={styles.inputText}>{formatDate(date)}</Text>
        </View>
      </TouchableOpacity>

      {Platform.OS === "android" && show && (
        <DateTimePicker
          value={date}
          mode={mode}
          display="default"
          onChange={onChange}
        />
      )}

      {Platform.OS === "ios" && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={show}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={date}
                mode={mode}
                display="default"
                onChange={onChange}
                accentColor={COLOR_PURPLE[500]}
                style={{width : '100%'}}
                locale='fr'
                />

              <ButtonRegular text='Confirmer'
              onPress={() => setShow(false)}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLOR_PURPLE[1000],
    marginBottom: 5,
  },
  input: {
    fontSize: 18,
    color: COLOR_PURPLE[1000],
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
    padding: 12,
  },
  inputText: {
    fontSize: 16,
    color: COLOR_PURPLE[1000],
  },
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


});
