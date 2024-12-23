import {
    Text,
    View,
    FlatList,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { useSelector } from 'react-redux';

//Import Components
import MainContainer from '../../components/MainContainer';
import Card from '../../components/Card';
import CustomSlider from '../../components/CustomSlider';
import CheckButton from '../../components/buttons/CheckButton';
import TextArea from '../../components/inputs/TextArea';

//Import Data
import { moods, moodQualityValues, influenceFactors } from '../../data/mood';
import ButtonRegular from '../../components/buttons/ButtonRegular';
import { URL } from '../../data/globalVariables';

import { COLOR_PURPLE, FONTS } from '../../data/styleGlobal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function MoodFormScreen({ navigation, route }) {
    // Enregistrement des informations du formulaire
    const [moodInfos, setMoodInfos] = useState({
        quality: 2,
        emotions: [],
        influence: [],
    });
    // Gestion de la page du formulaire
    const [currentScreen, setCurrentScreen] = useState(1);
    // Afficher plus de "moods"
    const [showmore, setShowMore] = useState(false);

    // Reducer - Patient token
    const patientToken = useSelector((state) => state.user.token);
    // Navigation - Récupération de la date
    const selectedDate = route.params.date;

    // Ajout ou suppression d'une émotion
    const addOrDeleteMood = (newMood, isChecked) => {
        if (isChecked) {
            setMoodInfos((prev) => ({
                ...prev,
                emotions: [...prev.emotions, newMood],
            }));
        } else {
            const newArr = moodInfos.emotions.filter(
                (mood) => mood !== newMood
            );
            setMoodInfos((prev) => ({ ...prev, emotions: newArr }));
        }
    };

    // Ajout ou suppression d'une influence
    const addOrDeleteInfluence = (newInfluence, isChecked) => {
        if (isChecked) {
            setMoodInfos((prev) => ({
                ...prev,
                influence: [...prev.influence, newInfluence],
            }));
        } else {
            const newArr = moodInfos.influence.filter(
                (influence) => influence !== newInfluence
            );
            setMoodInfos((prev) => ({ ...prev, influence: newArr }));
        }
    };

    // Affichage et tri des émotions en fonction de la "qualité"
    const moodsToDisplay = moods
        .sort((a, b) => a.mood > b.mood)
        .map((mood, i) => {
            const isChecked = moodInfos.emotions.some(
                (item) => item.mood === mood.mood
            );
            if (mood.value === moodInfos.quality) {
                return (
                    <CheckButton
                        key={i}
                        value={mood.mood}
                        check={isChecked}
                        onPress={() => {
                            addOrDeleteMood(mood, !isChecked);
                        }}
                    />
                );
            }
        });

    // Affichage et tri des émotions supplémnetaires
    const allMoodsToDisplay = moods
        .sort((a, b) => a.mood > b.mood)
        .map((mood, i) => {
            const isChecked = moodInfos.emotions.some(
                (item) => item.mood === mood.mood
            );
            return (
                <CheckButton
                    key={i}
                    value={mood.mood}
                    check={isChecked}
                    onPress={() => {
                        addOrDeleteMood(mood, !isChecked);
                    }}
                />
            );
        });

    // Affichage des influences
    const influenceToDisplay = influenceFactors.map((influence, i) => {
        const isChecked = moodInfos.influence.includes(influence);
        return (
            <CheckButton
                key={i}
                value={influence}
                check={isChecked}
                onPress={() => {
                    addOrDeleteInfluence(influence, !isChecked);
                }}
            />
        );
    });

    // Boutons de navigation en fonction de la page
    const navigationButtons = () => {
        if (currentScreen === 1) {
            return (
                <ButtonRegular
                    text='Suivant'
                    onPress={() => setCurrentScreen(currentScreen + 1)}
                />
            );
        } else if (currentScreen === 2) {
            return (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <ButtonRegular
                        text='Retour'
                        onPress={() =>
                            currentScreen > 1 &&
                            setCurrentScreen(currentScreen - 1)
                        }
                        orientation='left'
                        type='buttonStroke'
                    />
                    <ButtonRegular
                        text='Suivant'
                        onPress={() => setCurrentScreen(currentScreen + 1)}
                    />
                </View>
            );
        } else {
            return (
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <ButtonRegular
                        text='Retour'
                        onPress={() =>
                            currentScreen > 1 &&
                            setCurrentScreen(currentScreen - 1)
                        }
                        orientation='left'
                        type='buttonStroke'
                    />
                    <ButtonRegular
                        text='Valider'
                        onPress={() => validateForm()}
                    />
                </View>
            );
        }
    };

    // fonction d'ajout du formulaire d'hummeur et navigation (fetch)
    const validateForm = async () => {
        const resp = await fetch(`${URL}/events/addMoodGlobal`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: patientToken,
                date: new Date(selectedDate),
                data: moodInfos,
            }),
        });
        const data = await resp.json();
        if (data.result) {
            navigateToHome();
        } else {
            navigateToHome();
        }
    };

    // Navigation retour à la page d'accueil
    const navigateToHome = async () => {
        return await navigation.navigate('PatientTabNavigator', {
            screen: 'Accueil',
            params: { date: selectedDate },
        });
    };

    return (
        <MainContainer>
            <TouchableOpacity
                onPress={() => navigateToHome()}
                activeOpacity={2}
                style={{
                    position: 'absolute',
                    zIndex: 3,
                    margin: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <FontAwesome
                    name='chevron-circle-left'
                    size={25}
                    color={COLOR_PURPLE[700]}
                />
                <Text
                    style={{
                        paddingLeft: 6,
                        fontFamily: 'Quicksand-SemiBold',
                        color: COLOR_PURPLE[700],
                    }}
                >
                    Accueil
                </Text>
            </TouchableOpacity>
            <View style={styles.container}>
                <ScrollView>
                    {currentScreen === 1 && (
                        <View style={{ rowGap: 16, paddingTop: 24 }}>
                            <Card label='Humeur du jour'>
                                <Text style={styles.body}>
                                    Comment était votre humeur aujourd'hui ?
                                </Text>
                                <CustomSlider
                                    data={moodQualityValues}
                                    value={moodInfos.quality}
                                    onValueChange={(newValue) =>
                                        setMoodInfos((prev) => ({
                                            ...prev,
                                            quality: newValue,
                                        }))
                                    }
                                />
                            </Card>
                            <Card>
                                <Text style={styles.body}>
                                    Quelles émotions avez-vous ressenties ?
                                </Text>
                                {!showmore && (
                                    <ButtonRegular
                                        text='Voir tout'
                                        type='buttonLittleRegular'
                                        orientation='plus-left'
                                        onPress={() => setShowMore(!showmore)}
                                    />
                                )}
                                {showmore && (
                                    <ButtonRegular
                                        text="Voir moins d'émotions"
                                        type='buttonLittleRegular'
                                        orientation='minus-left'
                                        onPress={() => setShowMore(!showmore)}
                                    />
                                )}
                                <ScrollView style={{}}>
                                    <View style={styles.flatlist}>
                                        {!showmore && moodsToDisplay}
                                        {showmore && allMoodsToDisplay}
                                    </View>
                                </ScrollView>
                            </Card>
                        </View>
                    )}

                    {currentScreen === 2 && (
                        <View style={{ paddingTop: 24 }}>
                            <Card label="Facteurs d'influence">
                                <Text style={styles.body}>
                                    Quels sont les éléments qui influencent
                                    votre vie en ce moment ?
                                </Text>
                                <View style={styles.flatlist}>
                                    {influenceToDisplay}
                                </View>
                            </Card>
                        </View>
                    )}

                    {currentScreen === 3 && (
                        <View style={{ paddingTop: 24 }}>
                            <Card label='Détails'>
                                <TextArea
                                    label='Avez-vous des détails à noter sur votre journée ?'
                                    onChangeText={(newValue) =>
                                        setMoodInfos((prev) => ({
                                            ...prev,
                                            details: newValue,
                                        }))
                                    }
                                />
                            </Card>
                        </View>
                    )}
                </ScrollView>
                <View>{navigationButtons()}</View>
            </View>
        </MainContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 25,
    },
    flatlist: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    body: {
        fontFamily: 'Quicksand-SemiBold',
        fontSize: 16,
        color: COLOR_PURPLE[1000],
    },
});
