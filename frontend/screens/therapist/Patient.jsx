import { Text, View, StyleSheet, Image } from "react-native"
import { useState, useEffect } from "react"
import { URL } from "../../data/globalVariables"

import ButtonRegular from "../../components/buttons/ButtonRegular"
import MainContainer from "../../components/MainContainer"
import Card from "../../components/Card"

import FontAwesome from "react-native-vector-icons/FontAwesome";

import { avatarImages } from "../../data/imageSource"
import { formatBirthdate } from '../../modules/dateAndTimeFunctions'

export default function Patient({ navigation, route }) {
    const [patientInfos, setPatientInfos] = useState({})
    const [menuItem, setMenuItem] = useState('Récap')

    const getPatient = async (token) => {
        const resp = await fetch(`${URL}/therapists/getPatient/${token}`)
        const infos = await resp.json()
        return infos.data
    }

    useEffect(() => {
        const fetchPatient = async () => {
            const infos = await getPatient(route.params.data.token)
            setPatientInfos(infos)
        }
        fetchPatient()
    }, [route.params.data.token])

    const returnToHome = () => {
        navigation.navigate('TherapistTabNavigator')
    }

    const buttonStyle = (name) => {
        if (name === menuItem) {
            return 'buttonLittleRegular'
        } else {
            return 'buttonLittleStroke'
        }

    }

    const contact = <>
        <Text>Adresse e-mail</Text>
        <FontAwesome name='envelope-o' />
        <Text>{patientInfos.email}</Text>
        <Text>Téléphone</Text>
        <FontAwesome name='phone' />
        <Text>{patientInfos.phone}</Text>
    </>

    const recap = <>
        <Text>Récap</Text>
    </>

    const stats = <>
        <Text>Stats</Text>
    </>


    return (
        <MainContainer>
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', rowGap: 20 }}>

                    <View style={styles.header}>
                        <Image source={avatarImages[patientInfos.avatar]} style={{ width: 100, height: 100 }} />
                        <Text>{patientInfos.firstname} {patientInfos.name}</Text>
                        <Text>{formatBirthdate(new Date(patientInfos.birthdate))}</Text>
                    </View>
                    <View style={styles.menu}>
                        <ButtonRegular text='Récap' type={buttonStyle('Récap')} orientation="none" onPress={() => setMenuItem('Récap')} />
                        <ButtonRegular text='Stats' type={buttonStyle('Stats')} orientation="none" onPress={() => setMenuItem('Stats')} />
                        <ButtonRegular text='Contact' type={buttonStyle('Contact')} orientation="none" onPress={() => setMenuItem('Contact')} />
                    </View>
                    <Card>

                        {menuItem === 'Contact' && contact}
                        {menuItem === 'Récap' && recap}
                        {menuItem === 'Stats' && stats}
                    </Card>
                </View>
                <ButtonRegular text='Retourner à la liste des patients' onPress={() => returnToHome()} type='buttonLittleStroke' orientation="left" />
            </View>
        </MainContainer>
    )
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
        width: '100%'

    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%'
    }
})
