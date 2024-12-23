import {
    View,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { COLOR_PURPLE } from '../data/styleGlobal';

export default function Card({ children, label }) {
    return (
        <KeyboardAvoidingView
            style={{ width: '100%' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.cardContainer}>
                {label && <Text style={styles.title}>{label}</Text>}
                <View style={styles.card}>{children}</View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        justifyContent: 'center',
        gap: 8,
    },
    title: {
        fontSize: 20,
        fontFamily: 'Montserrat-SemiBold',
        letterSpacing: -1.5,
        color: COLOR_PURPLE[1000],
    },
    card: {
        width: '100%',
        paddingVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 16,
        shadowColor: COLOR_PURPLE[1000],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        gap: 16,
    },
});
