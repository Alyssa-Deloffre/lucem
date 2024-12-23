import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLOR_GREEN, COLOR_PURPLE } from '../../data/styleGlobal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ButtonRegular({
    text,
    onPress,
    type = 'buttonRegular',
    orientation = 'right',
}) {

    // Adaptation du style en fonction du type de bouton
    let textType = '';
    if (type === 'buttonRegular' || type === 'buttonStroke') {
        textType = 'regular';
    } else if (
        type === 'buttonLittleRegular' ||
        type === 'buttonLittleStroke'
    ) {
        textType = 'little';
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles[type], styles.button]}
        >
            {orientation === 'minus-left' && (
                <FontAwesome
                    name='minus-circle'
                    size={20}
                />
            )}
            {orientation === 'plus-left' && (
                <FontAwesome
                    name='plus-circle'
                    size={20}
                />
            )}
            {orientation === 'left' && <FontAwesome name='chevron-left' />}
            <Text style={styles[textType]}>{text}</Text>
            {orientation === 'right' && <FontAwesome name='chevron-right' />}
            {orientation === 'plus-right' && (
                <FontAwesome
                    name='plus-circle'
                    size={20}
                />
            )}
            {orientation === 'minus-right' && (
                <FontAwesome
                    name='minus-circle'
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
    buttonRegular: {
        backgroundColor: COLOR_GREEN[600],
        paddingVertical: 12,
        paddingHorizontal: 32,
    },
    buttonStroke: {
        borderColor: COLOR_PURPLE[1000],
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 32,
    },
    buttonLittleRegular: {
        backgroundColor: COLOR_GREEN[600],
        paddingVertical: 6,
        paddingHorizontal: 16,
    },
    buttonLittleStroke: {
        borderColor: COLOR_PURPLE[1000],
        borderWidth: 1,
        paddingVertical: 6,
        paddingHorizontal: 16,
    },
    regular: {
        fontFamily: 'Quicksand',

        fontSize: 16,
    },
    little: {
        fontFamily: 'Quicksand',

        fontSize: 14,
    },
});
