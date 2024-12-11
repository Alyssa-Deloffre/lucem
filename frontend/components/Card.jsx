import { View, StyleSheet } from "react-native";
import { COLOR_PURPLE } from "../data/styleGlobal";

export default function Card({ children }) {
    return (

        <View style={styles.card}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: "90%",
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