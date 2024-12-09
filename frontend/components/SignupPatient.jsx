import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {SafeAreaViewView, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, TextInput, View} from 'react-native'
import { checkEmail, isMissingInputSignup } from "../modules/checkConnectionInputs";

export default function SignupPatient () {




    return (
        <SafeAreaViewView>
            <View>
                <Text>Logo</Text>
                </View>
            <View>
            <Text>M'inscrire</Text>
            </View>
            <View>
                <Text>Inputs</Text>
            </View>
            <View>
                <Text>Bouton validation</Text>
            </View>
        </SafeAreaViewView>
    )
}