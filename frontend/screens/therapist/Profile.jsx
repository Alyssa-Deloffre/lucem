import { Text, View, StyleSheet, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { URL } from '../../data/globalVariables';

import ButtonRegular from '../../components/buttons/ButtonRegular';
import MainContainer from '../../components/MainContainer';
import Card from '../../components/Card';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { avatarImages } from '../../data/imageSource';
import { formatBirthdate } from '../../modules/dateAndTimeFunctions';

const getPatient = async (token) => {
    const resp = await fetch(`${URL}/patients/getPatient/${token}`);
    const infos = await resp.json();
    return infos.data;
};

export default function TherapistProfileScreen() {
    const [patientInfos, setPatientInfos] = useState({});
    const [menuItem, setMenuItem] = useState('Récap');

    const patientToken = useSelector((state) => state.user.token);

    useEffect(() => {
        const fetchPatient = async () => {
            const infos = await getPatient(patientToken);
            setPatientInfos(infos);
        };
        fetchPatient();
    }, []);

    const buttonStyle = (name) => {
        if (name === menuItem) {
            return 'buttonLittleRegular';
        } else {
            return 'buttonLittleStroke';
        }
    };

    const contact = (
        <>
            <Text>Adresse e-mail</Text>
            <FontAwesome name='envelope-o' />
            <Text>{patientInfos.email}</Text>
            <Text>Téléphone</Text>
            <FontAwesome name='phone' />
            <Text>{patientInfos.phone}</Text>
        </>
    );

    const recap = (
        <>
            <Text>Récap</Text>
        </>
    );

    const stats = (
        <>
            <Text>Stats</Text>
        </>
    );

    return (
        <MainContainer>
            <View style={styles.container}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        rowGap: 20,
                    }}
                >
                    <View style={styles.header}>
                        <Image
                            source={avatarImages[patientInfos.avatar]}
                            style={{ width: 100, height: 100 }}
                        />
                        <Text>
                            {patientInfos.firstname} {patientInfos.name}
                        </Text>
                        <Text>{formatBirthdate(new Date(patientInfos.birthdate))}</Text>
                    </View>
                    <View style={styles.menu}>
                        <ButtonRegular
                            text='Récap'
                            type={buttonStyle('Récap')}
                            orientation='none'
                            onPress={() => setMenuItem('Récap')}
                        />
                        <ButtonRegular
                            text='Stats'
                            type={buttonStyle('Stats')}
                            orientation='none'
                            onPress={() => setMenuItem('Stats')}
                        />
                        <ButtonRegular
                            text='Contact'
                            type={buttonStyle('Contact')}
                            orientation='none'
                            onPress={() => setMenuItem('Contact')}
                        />
                    </View>
                    <Card>
                        {menuItem === 'Contact' && contact}
                        {menuItem === 'Récap' && recap}
                        {menuItem === 'Stats' && stats}
                    </Card>
                </View>
            </View>
        </MainContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 5,
        marginBottom: 16,
        width: '100%',
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },
});
