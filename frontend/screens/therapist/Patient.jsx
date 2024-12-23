import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import ButtonRegular from '../../components/buttons/ButtonRegular';
import MainContainer from '../../components/MainContainer';
import Card from '../../components/Card';
import DateCheck from '../../components/DateCheck';
import FullButton from '../../components/buttons/FullButton';
import StatsGraph from '../../components/StatsGraphs';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { URL } from '../../data/globalVariables';
import { avatarImages } from '../../data/imageSource';
import { COLOR_PURPLE, FONTS } from '../../data/styleGlobal';
import { getUserAge } from '../../modules/dateAndTimeFunctions';
import { dateFormat } from '../../modules/dateAndTimeFunctions';

// Fonction - Check si deux dates sont égales en dehors des heures et minutes
const isEqualDates = (date1, date2) => {
  return (
    date1.getDay() === date2.getDay() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

// Fonction - Récupérer les informations de la date courrantes dans le tableaux de dates
const getCurrentInfos = (date, arr) => {
  const index = arr.findIndex((event) => isEqualDates(date, event.date));
  return arr[index];
};

export default function Patient({ navigation, route }) {
  // State - Info du patient (useEffect)
  const [patientInfos, setPatientInfos] = useState({});
  // State - Gestion des onglets
  const [menuItem, setMenuItem] = useState('Récap');

  // -- Gestion des dates d'affichage
  // State - Start date pour calculer les 5 dates à afficher (checks)
  const [startDate, setStartDate] = useState(new Date());
  // State - Dae affichée
  const [selectedDate, setSelectedDate] = useState(startDate);
  // State - Tableau des infos 5 dates
  const [arrDates, setArrDates] = useState([]);

  // State - Gestion des boutons sleep et mood
  const [isCompleteMood, setIsCompleteMood] = useState(false);
  const [isCompleteSleep, setIsCompleteSleep] = useState(false);
  const [moodId, setMoodId] = useState(null);
  const [sleepId, setSleepId] = useState(null);

  // State - Affichage du loading lors du fetch
  const [isLoading, setIsLoading] = useState(false);

  // Permet de savoir quand le screen est affiché chez l'utilisateur
  const isFocused = useIsFocused();
  // Récupération du token patient grâce à la navigation
  const token = route.params.data.token;

  // Fonction - Récupération des informations pour les 5 dates souhaitées en fonction de l'utilisateur
  const getDates = async (date, token) => {
    const dates = [];
    let newDate = date;
    // Boucle 5 fois
    for (let i = 0; i < 5; i++) {
      const newDay = new Date(newDate);
      // Date - i
      newDay.setDate(newDate.getDate() - i);
      // Récupération des informations correspondantes à la date
      const resp = await fetch(`${URL}/events/getPatientEventsByDate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientToken: token,
          date: newDay,
        }),
      });
      const data = await resp.json();
      // Ajout de la date et des informations récupérées au début du tableau de dates
      dates.unshift({
        formattedDate: dateFormat(newDay),
        date: newDay,
        ...data,
      });
    }

    return dates;
  };

  // Fonction - Récupération des informations du patient grâce au token (fetch)
  const getPatient = async (token) => {
    const resp = await fetch(`${URL}/patients/getPatient/${token}`);
    const infos = await resp.json();
    return infos.data;
  };

  // useEffect - Au chargement, lors du changement de date (flêches)
  useEffect(() => {
    const fetchDates = async (userToken) => {
      // Loading pendant que le fetch se fait
      setIsLoading(true);
      // Récupération des informations du patient
      const infos = await getPatient(userToken);
      setPatientInfos(infos);
      // Récupération des informations par dates
      const dates = await getDates(startDate, userToken);
      setArrDates(dates);
      // Fin du loading
      setIsLoading(false);
    };

    // Si la screen est visible
    if (isFocused) {
      // Joue la fonction ci-dessus
      fetchDates(token);
      // Sélection de la date de départ
      if (!route?.params?.data?.date) {
        setSelectedDate(startDate);
      } else {
        setSelectedDate(new Date(route.params.data.date));
      }
    }
  }, [startDate, isFocused]);

  // useEffect - Affichage des informations correspondant à la date sélectionnée
  useEffect(() => {
    // Si la screen est visible
    if (isFocused) {
      (async () => {
        // Récupération des informations de la date actuel
        const infos = getCurrentInfos(selectedDate, arrDates);
        // S'il y a des informations
        if (infos?.events) {
          // Affichage du sommeil
          const sleep = infos.events.find((e) => e.type === 'sleep');
          setSleepId(sleep?._id);
          setIsCompleteSleep(sleep ? true : false);
          // Affichage de l'hummeur
          const mood = infos.events.find((e) => e.type === 'mood');
          setMoodId(mood?._id);
          setIsCompleteMood(mood ? true : false);
        } else {
          setIsCompleteMood(false);
          setIsCompleteSleep(false);
        }
      })();
    }
  }, [selectedDate, arrDates, isFocused]);

  // Affichage des dates et des "checks" correspondants
  const datesDisplay = arrDates.map((date, i) => {
    const isChecked = () => {
      if (date?.events?.length >= 2) {
        return 2;
      } else if (date?.events?.length === 1) {
        return 1;
      } else {
        return 0;
      }
    };

    return (
      <TouchableOpacity
        key={i}
        onPress={() => setSelectedDate(date.date)}
      >
        <DateCheck
          text={date.formattedDate}
          select={isEqualDates(date.date, selectedDate)}
          check={isChecked()}
          isLoading={isLoading}
        />
      </TouchableOpacity>
    );
  });

  // Bouton de retour à l'accueil
  const returnToHome = () => {
    navigation.navigate('TherapistTabNavigator');
  };

  // Style des boutons onglets
  const buttonStyle = (name) => {
    if (name === menuItem) {
      return 'buttonLittleRegular';
    } else {
      return 'buttonLittleStroke';
    }
  };

  const getPatientAge = getUserAge(patientInfos.birthdate);

  // Onlget contact patient
  const contact = (
    <>
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
    </>
  );

  // Onglet récap (boutons récap sommeil et hummeur)
  const recap = (
    <>
      {isCompleteMood && (
        <FullButton
          text='Voir le récap mood'
          type='stroke'
          illustration={require('../../assets/icons/mood-star-icon.png')}
          onPress={() =>
            navigation.navigate('EventRecapTherapist', {
              id: moodId,
              token: token,
            })
          }
        />
      )}
      {isCompleteSleep && (
        <FullButton
          text='Voir le récap sommeil'
          type='stroke'
          illustration={require('../../assets/icons/sleep-star-icon.png.png')}
          onPress={() =>
            navigation.navigate('EventRecapTherapist', {
              id: sleepId,
              token: token,
            })
          }
        />
      )}
    </>
  );

  // Affichage des dates pour longlet récap
  const datesMenu = (
    <>
      <View style={styles.dateCheck}>
        <TouchableOpacity
          onPress={() =>
            setStartDate(
              new Date(startDate.setDate(startDate.getDate() - 5))
            )
          }
        >
          <FontAwesome
            style={styles.chevron}
            activeOpacity={1}
            name='chevron-left'
          />
        </TouchableOpacity>
        {datesDisplay}

        <TouchableOpacity
          activeOpacity={1}
          onPress={() =>
            setStartDate(
              new Date(startDate.setDate(startDate.getDate() + 5))
            )
          }
        >
          <FontAwesome
            style={[
              styles.chevron,
              {
                opacity: isEqualDates(startDate, new Date())
                  ? 0
                  : 1,
              },
            ]}
            name='chevron-right'
          />
        </TouchableOpacity>
      </View>
    </>
  );

  // Onglet statistiques
  const stats = <StatsGraph patientToken={patientInfos.token} />;

  return (
    <MainContainer>
      <TouchableOpacity
        onPress={() => returnToHome()}
        activeOpacity={2}
        style={{ position: 'absolute', zIndex: 3, margin: 20 }}
      >
        <FontAwesome
          name='chevron-circle-left'
          size={35}
          style={{ color: COLOR_PURPLE[700] }}
        />
      </TouchableOpacity>
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
            <View>
              <Text style={styles.name}>
                {patientInfos.firstname} {patientInfos.name}
              </Text>
              <Text style={FONTS.Body}>{getPatientAge} ans</Text>
            </View>
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
            {menuItem === 'Récap' && datesMenu}
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
    columnGap: 25,
    marginBottom: 16,
    width: '100%',
    flexDirection: 'row',
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  infosBlock_infos: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infosBlock_label: {
    fontFamily: 'Quicksand',
  },
  infosBlock_infos_texts: {
    fontSize: 20,
    fontWeight: 600,
    color: COLOR_PURPLE[600],
    fontFamily: 'Quicksand',
  },
  scrollView: {
    height: 400,
  },
  titre: {
    fontWeight: 'bold',
  },
  chevron: {
    fontSize: 20,
    color: COLOR_PURPLE[400],
    paddingVertical: '20',
    paddingHorizontal: 10,
  },

  dateCheck: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 28,
    letterSpacing: -1.5,
  },
  loadingBlock: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 100,
    bottom: 0,
    right: 0,
    borderRadius: 16,
  },
  loadingBlock_text: {
    fontSize: 18,
    fontWeight: 600,
  },
});
