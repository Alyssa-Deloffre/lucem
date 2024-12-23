import React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import Card from './Card';
import { moodQualityValues } from '../data/mood';
import { COLOR_PURPLE, FONTS } from '../data/styleGlobal';

export default function MoodRecap({ eventInfos }) {
    const event = eventInfos?.event;
    // Récupération du texte correspondant à la valeur du mood
    const quality =
        event &&
        moodQualityValues.find((item) => item.value === event.ref.quality).text;

    // Affichage de la liste des émotions
    const emotionsToDisplay =
        event &&
        event.ref.emotions.map((emotion, i) => {
            return (
                <View
                    key={i}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>{emotion.mood} </Text>
                </View>
            );
        });

    // Affichage de la liste des influences
    const influenceToDisplay =
        event &&
        event.ref.influence.map((influenceFactor, i) => {
            return (
                <View
                    key={i}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>{influenceFactor}</Text>
                </View>
            );
        });

    return (
        <Card>
            <ScrollView>
                <Text style={styles.label}>Humeur de la journée :</Text>
                <Text style={styles.body}>{event && quality}</Text>
                <View style={styles.line} />

                <Text style={styles.label}>Emotions ressenties : </Text>
                <View style={styles.buttonContainer}>{emotionsToDisplay}</View>

                <View style={styles.line} />

                <Text style={styles.label}>
                    Facteurs d'influence actuels :{' '}
                </Text>

                <View style={styles.buttonContainer}>{influenceToDisplay}</View>

                {event && event.ref.details !== '' && (
                    <>
                        <View style={styles.line} />

                        <Text style={styles.label}>Détails : </Text>

                        <Text style={styles.body}>
                            {event && event.ref.details}
                        </Text>
                    </>
                )}
            </ScrollView>
        </Card>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    button: {
        borderRadius: 100,
        borderColor: COLOR_PURPLE[1000],
        borderWidth: 1,
        paddingVertical: 6,
        paddingHorizontal: 16,
    },
    buttonText: {
        fontFamily: 'Quicksand',
    },
    line: {
        height: 1,
        backgroundColor: 'grey',
        marginVertical: 15,
    },
    body: {
        ...FONTS.Body,
    },
    bodyBold: {
        fontFamily: 'Quicksand-Bold',
        fontSize: 18,
    },
    label: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        marginBottom: 6,
    },
});
