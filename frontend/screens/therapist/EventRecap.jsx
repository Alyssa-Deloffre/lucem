import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

import SleepRecap from '../../components/SleepRecap';
import MoodRecap from '../../components/MoodRecap';
import MainContainerWithScroll from '../../components/MainContainerWithScroll';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { formatBirthdate } from '../../modules/dateAndTimeFunctions';

import { URL } from '../../data/globalVariables';
import { FONTS, COLOR_PURPLE } from '../../data/styleGlobal';

// Fonction - Récupération des informations d'un événement (fetch)
async function getEvent(eventId) {
    const resp = await fetch(`${URL}/events/getEvent/${eventId}`);
    const json = await resp.json();
    return json;
}


export default function EventRecapTherapist({ navigation, route }) {
    // Récupération de l'id de l'événement et du token patient à travers la navigation
    const { id, token } = route.params;

    // States - informations et type d'événement
    const [infos, setInfos] = useState(null);
    const [type, setType] = useState(null);

    // useEffect - Récupération des événements et enregistrement dans les useStates
    useEffect(() => {
        const setEvent = async () => {
            const event = await getEvent(id);
            setInfos(event);
            setType(event.event.type);
        };
        setEvent();
    }, []);

    // Retour à la page patient précédente 
    const navigateToHome = async () => {
        return await navigation.navigate('Patient', {
            data: { date: infos.event.date, token: token },
        });
    };

    return (
        <MainContainerWithScroll>
            <TouchableOpacity
                onPress={() => navigateToHome()}
                activeOpacity={2}
                style={{ position: 'absolute', zIndex: 3, margin: 6 }}
            >
                <FontAwesome
                    name='chevron-circle-left'
                    size={35}
                    color={COLOR_PURPLE[700]}
                />
            </TouchableOpacity>
            <Text style={styles.title}>
                Récap {type === 'mood' ? 'humeur' : 'sommeil'} du{' '}
                {infos?.event && formatBirthdate(new Date(infos.event.date))}
            </Text>

            {type === 'mood' && <MoodRecap eventInfos={infos} />}

            {type === 'sleep' && <SleepRecap eventInfos={infos} />}
        </MainContainerWithScroll>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
    title: {
        ...FONTS.Heading2,
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: 16,
    },
});
