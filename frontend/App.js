import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native-ve';


//redux imports
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import nomdureducer from '../reducers/nomdufichierreducer'

//redux persist imports
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Permet d'enregistrer les reducers
const reducers = combineReducers({ nomdureducer })

//Clé de stockage pour définir un nom au store à l'intérieur du local storage
const persistConfig = { key : 'Lucem', storage: AsyncStorage,}

//Met à jour le contenu du store
const store = configureStore({
 reducer: persistReducer(persistConfig, reducers),
 middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

//Transforme le store pour qu'il soit persistant
const persistor = persistStore(store)


export default function App() {
  return (
    <Provider store={store}>
		<PersistGate persistor={persistor}>
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
    </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
