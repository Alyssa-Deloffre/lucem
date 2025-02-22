import {
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    StatusBar,
    ActivityIndicator,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLOR_GREEN, COLOR_PURPLE } from './data/styleGlobal';
import { useFonts } from 'expo-font';

//redux imports
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

//redux persist imports
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Navigationn imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Global screens
import LandingScreen from './screens/Landing';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
// Patient screens
import PatientHomeScreen from './screens/patient/Home';
import PatientProfileScreen from './screens/patient/Profile';
import SleepFormScreen from './screens/patient/SleepForm';
import MoodFormScreen from './screens/patient/MoodForm';
import EventRecapPatient from './screens/patient/EventRecap';

// Therapist screens
import TherapistHomeScreen from './screens/therapist/Home';
import TherapistProfileScreen from './screens/therapist/Profile';
import TherapistPatientScreen from './screens/therapist/Patient';
import EventRecapTherapist from './screens/therapist/EventRecap';

//Permet d'enregistrer les reducers
const reducers = combineReducers({ user });

//Clé de stockage pour définir un nom au store à l'intérieur du local storage
const persistConfig = { key: 'Lucem', storage: AsyncStorage };

//Met à jour le contenu du store
const store = configureStore({
    reducer: persistReducer(persistConfig, reducers),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

//Transforme le store pour qu'il soit persistant
const persistor = persistStore(store);

// Stack & Tab initialisation
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Patient tabs
const PatientTabNavigator = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    // Personnalisation de la tabBar
                    tabBarStyle: {
                        backgroundColor: 'white',
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        position: 'absolute',
                        paddingBottom: Platform.OS === 'android' ? 80 : 0,
                    },
                    // Personnalisation des onglets
                    tabBarItemStyle: {
                        margin: 8,
                        padding: 8,
                        borderRadius: 8,
                        borderColor: 'white',
                        borderWidth: 1,
                        height: 64,
                    },
                    tabBarActiveBackgroundColor: COLOR_GREEN[200],

                    // Personnalisation des icones
                    tabBarIcon: ({ color, size }) => {
                        let iconName = '';

                        if (route.name === 'Accueil') {
                            iconName = 'home';
                        } else if (route.name === 'Profil') {
                            iconName = 'user';
                        }

                        return (
                            <FontAwesome
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    },
                    tabBarActiveTintColor: COLOR_GREEN[1000],
                    tabBarInactiveTintColor: COLOR_PURPLE[1000],
                    headerShown: false,
                })}
            >
                <Tab.Screen
                    name='Accueil'
                    component={PatientHomeScreen}
                />
                <Tab.Screen
                    name='Profil'
                    component={PatientProfileScreen}
                />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

// Therapist tabs
const TherapistTabNavigator = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    // Personnalisation de la tabBar
                    tabBarStyle: {
                        backgroundColor: 'white',
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        position: 'absolute',
                        paddingBottom: Platform.OS === 'android' ? 80 : 0,
                    },
                    // Personnalisation des onglets
                    tabBarItemStyle: {
                        margin: 8,
                        padding: 8,
                        borderRadius: 8,
                        borderColor: 'white',
                        borderWidth: 1,
                        height: 64,
                    },
                    tabBarActiveBackgroundColor: COLOR_GREEN[200],

                    // Personnalisation des icones
                    tabBarIcon: ({ color, size }) => {
                        let iconName = '';

                        if (route.name === 'Accueil') {
                            iconName = 'home';
                        } else if (route.name === 'Profil') {
                            iconName = 'user';
                        } else if (route.name === 'Patient') {
                            iconName = 'user';
                        }

                        return (
                            <FontAwesome
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    },
                    tabBarActiveTintColor: COLOR_GREEN[1000],
                    tabBarInactiveTintColor: COLOR_PURPLE[1000],
                    headerShown: false,
                })}
            >
                <Tab.Screen
                    name='Accueil'
                    component={TherapistHomeScreen}
                />

                <Tab.Screen
                    name='Profil'
                    component={TherapistProfileScreen}
                />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

export default function App() {
    // Import des fonts personnalisées
    const [fontsLoaded] = useFonts({
        Montserrat: require('./assets/fonts/MontserratAlternates-Regular.ttf'),
        'Montserrat-Black': require('./assets/fonts/MontserratAlternates-Black.ttf'),
        'Montserrat-Bold': require('./assets/fonts/MontserratAlternates-Bold.ttf'),
        'Montserrat-ExtraLight': require('./assets/fonts/MontserratAlternates-ExtraLight.ttf'),
        'Montserrat-Light': require('./assets/fonts/MontserratAlternates-Light.ttf'),
        'Montserrat-Medium': require('./assets/fonts/MontserratAlternates-Medium.ttf'),
        'Montserrat-SemiBold': require('./assets/fonts/MontserratAlternates-SemiBold.ttf'),
        'Montserrat-Thin': require('./assets/fonts/MontserratAlternates-Thin.ttf'),
        Quicksand: require('./assets/fonts/Quicksand-Regular.ttf'),
        'Quicksand-Bold': require('./assets/fonts/Quicksand-Bold.ttf'),
        'Quicksand-Light': require('./assets/fonts/Quicksand-Light.ttf'),
        'Quicksand-Medium': require('./assets/fonts/Quicksand-Medium.ttf'),
        'Quicksand-SemiBold': require('./assets/fonts/Quicksand-SemiBold.ttf'),
    });

    if (!fontsLoaded) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator
                    size='large'
                    color='#0000ff'
                />
                <Text>Chargement des polices...</Text>
            </View>
        );
    }

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen
                            name='Landing'
                            component={LandingScreen}
                        />
                        <Stack.Screen
                            name='Signin'
                            component={Signin}
                        />
                        <Stack.Screen
                            name='Signup'
                            component={Signup}
                        />
                        <Stack.Screen
                            name='SleepForm'
                            component={SleepFormScreen}
                        />
                        <Stack.Screen
                            name='MoodForm'
                            component={MoodFormScreen}
                        />
                        <Stack.Screen
                            name='EventRecapPatient'
                            component={EventRecapPatient}
                        />
                        <Stack.Screen
                            name='ProfilPatient'
                            component={PatientProfileScreen}
                        />
                        <Stack.Screen
                            name='ProfilTherapist'
                            component={TherapistProfileScreen}
                        />
                        <Stack.Screen
                            name='EventRecapTherapist'
                            component={EventRecapTherapist}
                        />
                        <Stack.Screen
                            name='Patient'
                            component={TherapistPatientScreen}
                        />
                        <Stack.Screen
                            name='PatientTabNavigator'
                            component={PatientTabNavigator}
                        />
                        <Stack.Screen
                            name='TherapistTabNavigator'
                            component={TherapistTabNavigator}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}
