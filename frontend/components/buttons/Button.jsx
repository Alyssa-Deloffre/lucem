import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { COLOR_GREEN, COLOR_PURPLE, COLOR_RED } from '../../data/styleGlobal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Button({
    label,
    onPress,
    type = 'default',
    size = 'm',
    icon = 'chevron-right',
    iconLocation = 'right',
    iconSize = 12
}) {
    const typeList = ['default', 'stroke', 'red', 'redStroke'];
    const sizeList = ['s', 'm', 'sFull', 'full'];
    const iconLocationList = ['right', 'left', 'none'];

    if (label === "" || !label) {
        return (
            <Text style={{ fontSize: 20, color: 'red' }}>
                Label must be defined.
            </Text>
        )
    }

    if (
        !typeList.includes(type) ||
        !sizeList.includes(size) ||
        !iconLocationList.includes(iconLocation)
    ) {
        return (
            <Text style={{ fontSize: 20, color: 'red' }}>
                Button props not allowed.
            </Text>
        );
    }

    const textColor = type === "redStroke" ? "redText" : type === "red" ? "whiteText" : "blackText"

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.button,
                styles[type],
                styles[size],
                styles[iconLocation],
            ]}
        >
            <Text
                style={
                    [
                        styles[size === "s" || size === "sFull" ? "sText" : "mText"],
                        styles[textColor]
                    ]
                }>
                {label}
            </Text>
            {iconLocation !== "none" && (
                <FontAwesome
                    name={icon}
                    style={styles[textColor]}
                    size={iconSize}
                />
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        shadowColor: COLOR_PURPLE[1000],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    default: {
        backgroundColor: COLOR_GREEN[600],
        borderColor: COLOR_GREEN[600],
        borderWidth: 1,
    },
    stroke: {
        borderColor: COLOR_PURPLE[1000],
        borderWidth: 1,
    },
    red: {
        backgroundColor: COLOR_RED[600],
        borderColor: COLOR_RED[600],
        borderWidth: 1,
    },
    redStroke: {
        borderColor: COLOR_RED[600],
        borderWidth: 1,
    },
    s: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        gap: 8,
    },
    m: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        gap: 16,
    },
    sFull: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        width: '100%',
        gap: 8,
        justifyContent: 'space-between',
    },
    full: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        width: '100%',
        gap: 16,
        justifyContent: 'space-between',
    },
    sText: {
        fontSize: 14,
    },
    mText: {
        fontSize: 16,
        fontWeight: 600
    },
    blackText: {
        color: COLOR_PURPLE[1000]
    },
    whiteText: {
        color: "white"
    },
    redText: {
        color: COLOR_RED[600]
    },
    right: {
        flexDirection: 'row',
    },
    left: {
        flexDirection: 'row-reverse',
    },
});
