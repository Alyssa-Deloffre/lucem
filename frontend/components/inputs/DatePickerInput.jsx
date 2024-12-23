import React, { useState } from 'react';
import { View, Platform, StyleSheet, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonRegular from '../buttons/ButtonRegular';
import InputField from './InputField';

const formatDate = (date) => {
  let day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month
    }/${year}`;
};

export default function DatePickerInput({ value, onChange, label }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <InputField
        label={label}
        inputMode='none'
        value={formatDate(value)}
        onFocus={() => setIsModalVisible(true)}
      />

      {/* Pour iOS */}
      {Platform.OS === 'ios' && (
        <Modal
          visible={isModalVisible}
          transparent
        >
          <View style={styles.modalOverlay}>
            <View style={styles.pickerContainer}>
              <DateTimePicker
                mode='date'
                value={value}
                display='spinner'
                onChange={onChange}
                locale='fr'
                themeVariant='light'
              />
              <View style={styles.buttonContainer}>
                <ButtonRegular
                  text='Retour'
                  onPress={() => setIsModalVisible(false)}
                />
                <ButtonRegular
                  text='Valider'
                  onPress={() => setIsModalVisible(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Pour Android */}
      {Platform.OS === 'android' && isModalVisible && (
        <DateTimePicker
          mode='date'
          value={value}
          display='spinner'
          onChange={(event, selectedDate) => {
            setIsModalVisible(false);
            if (selectedDate) onChange(event, selectedDate);
          }}
          locale='fr'
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});
