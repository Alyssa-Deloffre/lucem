import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { COLOR_GREEN, COLOR_PURPLE } from '../../data/styleGlobal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function FullButton({
    text,
    onPress,
    type = 'default',
    illustration,
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, styles[type]]}
        >
            {illustration && (
                <Image
                    style={styles.image}
                    source={illustration}
                />
            )}
            <Text style={styles.buttonTxt}>{text}</Text>
            <FontAwesome name='chevron-right' />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 18,
        paddingHorizontal: 18,
        minHeight: 64,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        borderRadius: 16,
        shadowColor: COLOR_PURPLE[1000],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    default: {
        backgroundColor: COLOR_GREEN[600],
    },
    white: {
        backgroundColor: 'white',
    },
    stroke: {
        borderWidth: 1,
        borderColor: COLOR_PURPLE[1000],
    },
    buttonTxt: {
        fontFamily: 'Quicksand',
        fontWeight: 700,
        fontSize: 16,
        color: COLOR_PURPLE[1000],
    },
    image: {
        width: 60,
        height: 60,
    },
});
