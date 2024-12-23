import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLOR_PURPLE } from '../../data/styleGlobal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function CheckButton({
    value,
    check = false,
    icon = '',
    onPress,
}) {
    // Changement du style si c'est check
    let styleCheck = 'buttonLittleStroke';
    if (check === true) {
        styleCheck = 'buttonLittleRegular';
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles[styleCheck], styles.button]}
        >
            {icon === 'plus-left' && (
                <FontAwesome
                    name='plus-circle'
                    size={20}
                />
            )}
            <Text style={styles.little}>{value}</Text>
            {icon === 'plus-right' && (
                <FontAwesome
                    name='plus-circle'
                    size={20}
                />
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        gap: 16,
    },
    buttonLittleRegular: {
        backgroundColor: COLOR_PURPLE[300],
        borderWidth: 1,
        borderColor: 'transparent',
        paddingVertical: 6,
        paddingHorizontal: 16,
        alignSelf: 'flex-start',
    },
    buttonLittleStroke: {
        borderColor: COLOR_PURPLE[1000],
        borderWidth: 1,
        paddingVertical: 6,
        paddingHorizontal: 16,
        alignSelf: 'flex-start',
    },
    little: {
        fontFamily: 'Quicksand',
        fontSize: 14,
    },
});
