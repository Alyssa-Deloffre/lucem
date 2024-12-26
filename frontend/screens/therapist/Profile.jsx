import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import { useSelector } from 'react-redux';

import MainContainerWithScroll from '../../components/MainContainerWithScroll';
import DeconnectUserButton from '../../components/buttons/DeconnectUserButton';
import Card from '../../components/Card';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { URL } from '../../data/globalVariables';
import { avatarImages } from '../../data/imageSource';
import { COLOR_PURPLE, FONTS } from '../../data/styleGlobal';

// Fonction get therapist information par Token
const getTherapist = async (token) => {
    const resp = await fetch(`${URL}/therapists/getTherapist/${token}`);
    const json = await resp.json();
    if (json.result) {
        return json.therapist;
    }
    return json;
};


export default function TherapistProfileScreen({ navigation }) {
    // Récupération du token utilisateur dans le reducer
    const therapistToken = useSelector((state) => state.user.token);

    // State - Enregistrement des informations du therapist
    const [therapistInfos, setTherapistInfos] = useState({});

    // Récupération des informations du thérapist (fonction ci-dessus appelée)
    useEffect(() => {
        (async () => {
            const infos = await getTherapist(therapistToken);
            setTherapistInfos(infos);
        })();
    }, []);

    return (
        <MainContainerWithScroll>
            <View style={[styles.container]}>
                <View style={styles.header}>
                    <Image
                        source={avatarImages[therapistInfos.avatar]}
                        style={styles.header_image}
                    />
                    <View style={styles.header_infos}>
                        <Text style={styles.therapistName}>
                            {therapistInfos.firstname}{' '}
                            {therapistInfos?.name?.toUpperCase()}
                        </Text>
                    </View>
                </View>
                <Card>
                    {therapistInfos.description && (
                        <View style={styles.infosBlock}>
                            <Text style={styles.infosBlock_label}>
                                Description
                            </Text>
                            <View style={styles.infosBlock_infos}>
                                <Text
                                    style={styles.infosBlock_infos_description}
                                >
                                    {therapistInfos.description}
                                </Text>
                            </View>
                        </View>
                    )}
                    <View style={styles.infosBlock}>
                        <Text style={styles.infosBlock_label}>
                            Adresse e-mail
                        </Text>
                        <View style={styles.infosBlock_infos}>
                            <FontAwesome
                                style={styles.infosBlock_infos_texts}
                                name='envelope-o'
                            />
                            <Text style={styles.infosBlock_infos_texts}>
                                {therapistInfos.email}
                            </Text>
                        </View>
                    </View>
                    {therapistInfos.phone && (
                        <View style={styles.infosBlock}>
                            <Text style={styles.infosBlock_label}>
                                Téléphone
                            </Text>
                            <View style={styles.infosBlock_infos}>
                                <FontAwesome
                                    style={styles.infosBlock_infos_texts}
                                    name='phone'
                                />
                                <Text style={styles.infosBlock_infos_texts}>
                                    {therapistInfos.phone}
                                </Text>
                            </View>
                        </View>
                    )}
                </Card>
                <DeconnectUserButton navigation={navigation} />
            </View>
        </MainContainerWithScroll>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 16,
    },
    header: {
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
        width: '100%',
    },
    header_image: {
        width: 112,
        height: 112,
    },
    header_infos: {
        alignItems: 'center',
        gap: 2,
    },
    therapistName: {
        ...FONTS.Heading2,
        color: COLOR_PURPLE[1000],
    },
    infosBlock: {
        gap: 2,
    },
    infosBlock_infos: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    infosBlock_infos_texts: {
        ...FONTS.Body,
        color: COLOR_PURPLE[600],
    },
    infosBlock_infos_description: {
        ...FONTS.Body,
    },
    infosBlock_label: {
        fontFamily: 'Quicksand-SemiBold',
        fontSize: 16,
        color: COLOR_PURPLE[1000],
    },
});
