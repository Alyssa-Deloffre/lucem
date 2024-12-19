import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { COLOR_PURPLE, FONTS } from "../data/styleGlobal";

export default function CardWithScroll({ children, label }) {
    return (
        <KeyboardAvoidingView
            style={{ width: "100%" }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.cardContainer}>
                {label && (
                    <Text style={styles.title}>
                        {label}
                    </Text>
                )}
                <ScrollView style={styles.card}>
                    {children}
                    <View style={{ height: 24 }} />
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: "100%",
        gap: 8,
        maxHeight: 500
    },
    title: {
        fontSize: 20,
        fontFamily: 'Montserrat-SemiBold',
        letterSpacing: -1.5,
        color: COLOR_PURPLE[1000]
    },
    card: {
        width: "100%",
        paddingVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: "white",
        borderRadius: 16,
        shadowColor: COLOR_PURPLE[1000],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        gap: 16,
    }
})