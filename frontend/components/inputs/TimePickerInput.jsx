import React, { useState } from 'react';
import { View, Platform, StyleSheet, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { formatTime } from '../../modules/dateAndTimeFunctions';
import { COLOR_PURPLE } from '../../data/styleGlobal';

import InputField from './InputField';
import ButtonRegular from '../buttons/ButtonRegular';

export default function TimePickerInput({
    value,
    onChange,
    minuteInterval = 1,
}) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <>
            <InputField
                inputMode='none'
                value={formatTime(value)}
                onFocus={() => setIsModalVisible(true)}
            />

            {Platform.OS === 'ios' && (
                <Modal visible={isModalVisible}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.pickerContainer}>
                            <DateTimePicker
                                mode='time'
                                value={value}
                                textColor={COLOR_PURPLE[1000]}
                                display='spinner'
                                onChange={onChange}
                                locale='fr'
                                minuteInterval={minuteInterval}
                                themeVariant='light'
                            />

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                }}
                            >
                                <ButtonRegular
                                    text='Retour'
                                    onPress={() => setIsModalVisible(false)}
                                    type='buttonLittleStroke'
                                    orientation='left'
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
                    mode='time'
                    value={value}
                    display='spinner'
                    onChange={(event, selectedDate) => {
                        setIsModalVisible(false); // Ferme la modale après interaction
                        if (event.type === 'set' && selectedDate) {
                            // L'utilisateur a sélectionné une heure
                            onChange(event, selectedDate);
                        }
                        // Sinon, aucune action nécessaire (l'utilisateur a annulé)
                    }}
                    locale='fr'
                    minuteInterval={minuteInterval}
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay sombre
    },
    pickerContainer: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 10,
        width: '90%',
        alignItems: 'center',
    },
});
