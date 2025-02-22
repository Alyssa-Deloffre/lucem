import { useState, useEffect } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Linking,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useSelector } from 'react-redux';

import ButtonRegular from '../../components/buttons/ButtonRegular';
import Card from '../../components/Card';
import MainContainerWithScroll from '../../components/MainContainerWithScroll';
import UserAutocomplete from '../../components/inputs/UserAutocomplete';
import DeconnectUserButton from '../../components/buttons/DeconnectUserButton';
import Button from '../../components/buttons/Button';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { URL } from '../../data/globalVariables';
import { avatarImages } from '../../data/imageSource';
import { COLOR_PURPLE, FONTS } from '../../data/styleGlobal';

// Fonction - Récupération des informations du patient (fetch)
const getPatient = async (token) => {
    const resp = await fetch(`${URL}/patients/getPatient/${token}`);
    const json = await resp.json();
    if (json.result) {
        return json.data;
    }
    return json;
};

// Fonction - Récupérations des therapists du patient (fetch)
const getAllTherapists = async () => {
    const resp = await fetch(`${URL}/patients/getalltherapists`);
    const json = await resp.json();
    return json.data.map((therapist) => {
        return {
            photo: therapist.avatar,
            fullname: therapist.firstname + ' ' + therapist.name,
            token: therapist.token,
        };
    });
};

// Fonction - Lier un therapist (fetch)
const linkTherapist = async (tokenPatient, tokenTherapist) => {
    await fetch(URL + '/patients/addTherapist', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            tokenPatient: tokenPatient,
            tokenTherapist: tokenTherapist,
        }),
    });
};

// Fonction - Retirer un therapist (fetch)
const unlinkTherapist = async (tokenPatient, tokenTherapist) => {
    await fetch(URL + '/patients/removeTherapist', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            tokenPatient: tokenPatient,
            tokenTherapist: tokenTherapist,
        }),
    });
};

export default function PatientProfileScreen({ navigation }) {
    // States
    // Infos patient
    const [patientInfos, setPatientInfos] = useState({ therapist: [] });
    // Gestion des onglets
    const [menuItem, setMenuItem] = useState('infos');
    // List des therapists
    const [therapistsList, setTherapistsList] = useState([]);
    // Afficher plus d'infos therapist (accordeon)
    const [showTherapistInfos, setShowTherapistInfos] = useState(null);
    // Affichage du formulaire d'ajout de therapist
    const [isAddPsyVisible, setIsAddPsyVisible] = useState(false);
    // Sléection du therapist (autocomplete)
    const [selectedTherapist, setSelectedTherapist] = useState({
        photo: '',
        fullname: '',
        token: '',
    });
    // Gestion de l'affichage
    const [autocompleteMargin, setAutocompleteMargin] = useState(0);

    // Reducer - Récupération du token patient
    const patientToken = useSelector((state) => state.user.token);

    // useEffect - Récupération des informations patient
    useEffect(() => {
        (async () => {
            const infos = await getPatient(patientToken);
            setPatientInfos(infos);
        })();
    }, []);

    // Style des boutons des onglets
    const buttonStyle = (name) => {
        if (name === menuItem) {
            return 'buttonLittleRegular';
        } else {
            return 'buttonLittleStroke';
        }
    };

    // Affichage des informations du therapist (accordeon)
    const handleDisplayInfoTherapist = (token) => {
        if (token === showTherapistInfos) {
            setShowTherapistInfos(null);
        } else {
            setShowTherapistInfos(token);
        }
    };

    // Alert - Confirmation de la suppression du therapist
    const alertUnlinkTherapist = (therapist) => {
        Alert.alert(
            ` Étes-vous sûr de vouloir retirer ${therapist.firstname
            } ${therapist.name.toUpperCase()} de vos psychologues ?`,
            '',
            [
                {
                    text: 'Annuler',
                    style: 'cancel',
                },
                {
                    text: 'Confirmer',
                    onPress: () => handleUnlinkTherapist(therapist.token),
                },
            ]
        );
    };

    // Supression du therapist auprès du patient
    const handleUnlinkTherapist = async (therapistToken) => {
        await unlinkTherapist(patientToken, therapistToken);
        const infos = await getPatient(patientToken);
        setPatientInfos(infos);
    };

    // Affichage du formulaire d'ajout d'un therapist
    const handleAddPsy = async () => {
        const therapists = await getAllTherapists();
        await setTherapistsList(therapists);
        setIsAddPsyVisible(true);
    };

    // Affichage lorsque l'autocomplete est affiché
    const handleAutocompleteFocus = async () => {
        setAutocompleteMargin(-120);
    };
    const handleAutocompleteBlur = async () => {
        setAutocompleteMargin(0);
    };

    // Ajout du therapist auprés du patient
    const handleLinkTherapist = async (patientToken, therapistToken) => {
        await linkTherapist(patientToken, therapistToken);
        const infos = await getPatient(patientToken);
        setPatientInfos(infos);
        setIsAddPsyVisible(false);
    };

    // Savoir si le therapist est déjà relié au patient (pour l'autocomplete)
    const isTherapistAlreadyLink =
        patientInfos.therapist.length > 0
            ? patientInfos.therapist.some(
                (therapist) => therapist.token === selectedTherapist.token
            )
            : false;

    // Affichage des informations du patient
    const infos = (
        <>
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
            <DeconnectUserButton navigation={navigation} />
        </>
    );

    // Affichage de la liste des therapists liés au patient
    const psys = patientInfos.therapist.map((therapist) => {
        const image = avatarImages[therapist.avatar];
        // Affichage ou non des informations complémentaires
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
                        <View style={styles.psyBlock_actionsBlock}>
                            <Button
                                label='Retirer'
                                type='red'
                                size='s'
                                icon='unlink'
                                iconSize={14}
                                onPress={() => alertUnlinkTherapist(therapist)}
                            />
                        </View>
                    </>
                )}
            </View>
        );
    });

    return (
        <MainContainerWithScroll>
            <View style={[styles.container, { marginTop: autocompleteMargin }]}>
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
                    </View>
                </View>
                <View style={styles.menu}>
                    <ButtonRegular
                        text='Mes informations'
                        type={buttonStyle('infos')}
                        orientation='none'
                        onPress={() => {
                            setAutocompleteMargin(0);
                            setMenuItem('infos');
                        }}
                    />
                    <ButtonRegular
                        text='Mes psychologues'
                        type={buttonStyle('psys')}
                        orientation='none'
                        onPress={() => {
                            setMenuItem('psys');
                            setIsAddPsyVisible(false);
                            setAutocompleteMargin(0);
                        }}
                    />
                </View>
                {menuItem === 'infos' && infos}
                {menuItem === 'psys' && (
                    <>
                        {psys.length === 0 && (
                            <Text
                                style={[
                                    styles.infosBlock_label,
                                    { textAlign: 'center' },
                                ]}
                            >
                                Vous n'avez pas encore ajouté de psychologue,
                                cliquez sur le bouton ci-dessous pour le faire.
                            </Text>
                        )}
                        {!isAddPsyVisible && (
                            <>
                                {psys}
                                <Button
                                    label='Ajouter un psychologue'
                                    icon='plus-circle'
                                    iconSize={20}
                                    onPress={() => handleAddPsy()}
                                />
                            </>
                        )}
                        {isAddPsyVisible && (
                            <Card>
                                <UserAutocomplete
                                    label='Ajouter un psychologue'
                                    placeholder='Choisissez votre psychologue'
                                    value={selectedTherapist}
                                    onChangeText={(value) =>
                                        setSelectedTherapist(value)
                                    }
                                    users={therapistsList}
                                    require={false}
                                    onFocus={() => handleAutocompleteFocus()}
                                    onBlur={() => handleAutocompleteBlur()}
                                    forcedErrorMessage={
                                        isTherapistAlreadyLink
                                            ? 'Vous êtes déjà relié à ce psychologue'
                                            : ''
                                    }
                                />
                                <View style={styles.addPsy_buttons}>
                                    <Button
                                        label='Annuler'
                                        iconLocation='none'
                                        type='stroke'
                                        onPress={() => {
                                            setIsAddPsyVisible(false);
                                            setAutocompleteMargin(0);
                                        }}
                                    />
                                    {selectedTherapist.token &&
                                        !isTherapistAlreadyLink && (
                                            <Button
                                                label='Ajouter'
                                                icon='plus-circle'
                                                iconSize={20}
                                                onPress={() => {
                                                    setAutocompleteMargin(0);
                                                    handleLinkTherapist(
                                                        patientToken,
                                                        selectedTherapist.token
                                                    );
                                                }}
                                            />
                                        )}
                                </View>
                            </Card>
                        )}
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
        ...FONTS.Heading2,
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
        color: COLOR_PURPLE[600],
        fontFamily: 'Quicksand-SemiBold',
    },
    infosBlock_infos_description: {
        ...FONTS.Body,
        fontFamily: 'Quicksand-SemiBold',
    },
    infosBlock_label: {
        ...FONTS.Body,
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
        ...FONTS.Body,
    },
    psyBlock_head_icon: {
        fontSize: 16,
        color: COLOR_PURPLE[1000],
        marginRight: 8,
    },
    psyBlock_actionsBlock: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingTop: 8,
    },
    addPsy_buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
    },
});
