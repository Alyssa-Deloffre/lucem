import {
    Text,
    View,
    StyleSheet,
    Image,
    Linking,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { URL } from '../../data/globalVariables';

import ButtonRegular from '../../components/buttons/ButtonRegular';
import Card from '../../components/Card';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { avatarImages } from '../../data/imageSource';
import { getUserAge } from '../../modules/dateAndTimeFunctions';
import { COLOR_PURPLE, COLOR_RED } from '../../data/styleGlobal';
import MainContainerWithScroll from '../../components/MainContainerWithScroll';
import UserAutocomplete from '../../components/inputs/UserAutocomplete';

const getPatient = async (token) => {
    const resp = await fetch(`${URL}/patients/getPatient/${token}`);
    const infos = await resp.json();
    return infos.data;
};

const unlinkTherapist = async (tokenPatient, tokenTherapist) => {
    const resp = await fetch(URL + '/patients/removeTherapist', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            tokenPatient: tokenPatient,
            tokenTherapist: tokenTherapist,
        }),
    });
    const json = await resp.json();
    console.log(json);
};

const getAllTherapists = async () => {
    const resp = await fetch(`${URL}/patients/getalltherapists`)
    const json = await resp.json()
    return json.data.map(therapist => {
        return { photo: therapist.avatar, fullname: therapist.firstname + " " + therapist.name, token: therapist.token }
    })
}

export default function PatientProfileScreen() {
    const [patientInfos, setPatientInfos] = useState({ therapist: [] });
    const [menuItem, setMenuItem] = useState('infos');
    const [showTherapistInfos, setShowTherapistInfos] = useState(null);
    const [isModalUnlinkVisible, setIsModalUnlinkVisible] = useState(false);
    const [isAddPsyVisible, setIsAddPsyVisible] = useState(false);
    const [selectedTherapist, setSelectedTherapist] = useState({ photo: "", fullname: "", token: "" })
    const [therapistsList, setTherapistsList] = useState([])

    const patientToken = useSelector((state) => state.user.token);

    useEffect(() => {
        (async () => {
            const infos = await getPatient(patientToken);
            setPatientInfos(infos);
        })();
    }, []);

    const buttonStyle = (name) => {
        if (name === menuItem) {
            return 'buttonLittleRegular';
        } else {
            return 'buttonLittleStroke';
        }
    };

    const handleDisplayInfoTherapist = (token) => {
        if (token === showTherapistInfos) {
            setShowTherapistInfos(null);
        } else {
            setShowTherapistInfos(token);
        }
    };

    const handleUnlinkTherapist = async (patientToken, therapistToken) => {
        await unlinkTherapist(patientToken, therapistToken);
        const infos = await getPatient(patientToken);
        setPatientInfos(infos);
        setIsModalUnlinkVisible(false);
    };

    const handleAddPsy = async () => {
        const therapists = await getAllTherapists()
        await setTherapistsList(therapists)
        setIsAddPsyVisible(true)
    }

    const getPatientAge = getUserAge(patientInfos.birthdate);

    const infos = (
        <Card>
            <View style={styles.infosBlock}>
                <Text style={styles.infosBlock_label}>Adresse e-mail</Text>
                <View style={styles.infosBlock_infos}>
                    <FontAwesome
                        style={styles.infosBlock_infos_texts}
                        name='envelope-o'
                    />
                    <Text style={styles.infosBlock_infos_texts}>
                        {patientInfos.email}
                    </Text>
                </View>
            </View>
            {patientInfos.phone && (
                <View style={styles.infosBlock}>
                    <Text style={styles.infosBlock_label}>Téléphone</Text>
                    <View style={styles.infosBlock_infos}>
                        <FontAwesome
                            style={styles.infosBlock_infos_texts}
                            name='phone'
                        />
                        <Text style={styles.infosBlock_infos_texts}>
                            {patientInfos.phone}
                        </Text>
                    </View>
                </View>
            )}
        </Card>
    );

    const psys = patientInfos.therapist.map((therapist) => {
        const image = avatarImages[therapist.avatar];
        const isShow = therapist.token === showTherapistInfos;
        return (
            <View
                style={styles.psyBlock}
                key={therapist.token}
            >
                <TouchableOpacity
                    onPress={() => handleDisplayInfoTherapist(therapist.token)}
                >
                    <View style={styles.psyBlock_head}>
                        <View style={styles.psyBlock_head_infos}>
                            <Image
                                source={image}
                                style={styles.psyBlock_head_infos_image}
                            />
                            <Text style={styles.psyBlock_head_infos_name}>
                                {therapist.firstname}{' '}
                                {therapist.name.toUpperCase()}
                            </Text>
                        </View>
                        <FontAwesome
                            name={isShow ? 'chevron-up' : 'chevron-down'}
                            style={styles.psyBlock_head_icon}
                        />
                    </View>
                </TouchableOpacity>
                {isShow && (
                    <>
                        {therapist.description && (
                            <View style={styles.infosBlock}>
                                <Text style={styles.infosBlock_label}>
                                    Description
                                </Text>
                                <Text
                                    style={styles.infosBlock_infos_description}
                                >
                                    {therapist.description}
                                </Text>
                            </View>
                        )}
                        <View style={styles.infosBlock}>
                            <TouchableOpacity
                                onPress={() =>
                                    Linking.openURL(`mailto:${therapist.email}`)
                                }
                            >
                                <Text style={styles.infosBlock_label}>
                                    Adresse e-mail
                                </Text>
                                <View style={styles.infosBlock_infos}>
                                    <FontAwesome
                                        style={styles.infosBlock_infos_texts}
                                        name='envelope-o'
                                    />
                                    <Text style={styles.infosBlock_infos_texts}>
                                        {therapist.email}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {therapist.phone && (
                            <View style={styles.infosBlock}>
                                <TouchableOpacity
                                    onPress={() =>
                                        Linking.openURL(
                                            `tel:${therapist.phone}`
                                        )
                                    }
                                >
                                    <Text style={styles.infosBlock_label}>
                                        Téléphone
                                    </Text>
                                    <View style={styles.infosBlock_infos}>
                                        <FontAwesome
                                            style={
                                                styles.infosBlock_infos_texts
                                            }
                                            name='phone'
                                        />
                                        <Text
                                            style={
                                                styles.infosBlock_infos_texts
                                            }
                                        >
                                            {therapist.phone}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                        <View>
                            <ButtonRegular
                                text='Retirer ce psychologue'
                                onPress={() => setIsModalUnlinkVisible(true)}
                            />
                        </View>
                    </>
                )}
                <Modal
                    visible={isModalUnlinkVisible}
                    transparent={true}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalContainer_text}>
                                Étes-vous sûr de vouloir retirer{' '}
                                {therapist.firstname}{' '}
                                {therapist.name.toUpperCase()} de vos
                                psychologues ?
                            </Text>
                            <View style={styles.modalContainer_buttons}>
                                <ButtonRegular
                                    text='Annuler'
                                    onPress={() =>
                                        setIsModalUnlinkVisible(false)
                                    }
                                />
                                <ButtonRegular
                                    text='Confirmer'
                                    type='buttonStroke'
                                    onPress={() =>
                                        handleUnlinkTherapist(
                                            patientToken,
                                            therapist.token
                                        )
                                    }
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    });

    return (
        <MainContainerWithScroll>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={avatarImages[patientInfos.avatar]}
                        style={styles.header_image}
                    />
                    <View style={styles.header_infos}>
                        <Text style={styles.patientName}>
                            {patientInfos.firstname}{' '}
                            {patientInfos?.name?.toUpperCase()}
                        </Text>
                        <Text>{getPatientAge} ans</Text>
                    </View>
                </View>
                <View style={styles.menu}>
                    <ButtonRegular
                        text='Mes informations'
                        type={buttonStyle('infos')}
                        orientation='none'
                        onPress={() => setMenuItem('infos')}
                    />
                    <ButtonRegular
                        text='Mes psychologues'
                        type={buttonStyle('psys')}
                        orientation='none'
                        onPress={() => setMenuItem('psys')}
                    />
                </View>
                {menuItem === 'infos' && infos}
                {menuItem === 'psys' && (
                    <>
                        {!isAddPsyVisible && (<>
                            {psys}
                            <ButtonRegular
                                text='Ajouter un psychologue'
                                orientation='plus-right'
                                onPress={() => handleAddPsy()}
                            />
                        </>)}
                        {isAddPsyVisible && <Card>
                            <UserAutocomplete
                                label="Ajouter un psychologue"
                                placeholder="Choisissez votre psychologue"
                                value={selectedTherapist}
                                onChangeText={(value) => setSelectedTherapist(value)}
                                users={therapistsList}
                                require={false}
                            />
                            <View style={styles.modalContainer_buttons}>
                                <ButtonRegular
                                    text='Annuler'
                                    type='buttonStroke'
                                    onPress={() =>
                                        setIsAddPsyVisible(false)
                                    }
                                />
                                <ButtonRegular
                                    text='Ajouter'
                                    onPress={() =>
                                        setIsAddPsyVisible(false)
                                    }
                                />
                            </View>
                        </Card>}
                    </>
                )}
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
    patientName: {
        fontSize: 20,
        fontWeight: 700,
        color: COLOR_PURPLE[1000],
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
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
        fontSize: 20,
        fontWeight: 600,
        color: COLOR_PURPLE[600],
    },
    infosBlock_infos_description: {
        fontSize: 18,
        fontWeight: 60,
    },
    psyBlock: {
        width: '100%',
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 16,
        shadowColor: COLOR_PURPLE[1000],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        gap: 16,
    },
    psyBlock_head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    psyBlock_head_infos: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    psyBlock_head_infos_image: {
        width: 56,
        height: 56,
        borderRadius: 100,
    },
    psyBlock_head_infos_name: {
        fontSize: 18,
        fontWeight: 700,
        color: COLOR_PURPLE[1000],
    },
    psyBlock_head_icon: {
        fontSize: 16,
        color: COLOR_PURPLE[1000],
        marginRight: 8,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay sombre
    },
    modalContainer: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        gap: 24,
    },
    modalContainer_text: {
        fontSize: 20,
        fontWeight: 600,
        textAlign: 'center',
        lineHeight: 32,
        width: '90%',
    },
    modalContainer_buttons: {
        flexDirection: 'row',
        gap: 8,
    },
});
