import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native-ve";
import FontAwesome from "react-native-vector-icons/FontAwesome";

//redux imports
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import nomdureducer from "../reducers/nomdufichierreducer";

//redux persist imports
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Navigationn imports
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// Global screens
import LandingScreen from "./screens/Landing";
// Patient screens
import PatientHomeScreen from "./screens/patient/Home";
// Therapist screens
import TherapistHomeScreen from "./screens/patient/Home";

//Permet d'enregistrer les reducers
const reducers = combineReducers({ nomdureducer });

//Clé de stockage pour définir un nom au store à l'intérieur du local storage
const persistConfig = { key: "Lucem", storage: AsyncStorage };

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

// Patient tab
const PatientTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={PatientHomeScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Landing" component={LandingScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
