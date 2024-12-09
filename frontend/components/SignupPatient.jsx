import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {SafeAreaViewView, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, TextInput, View} from 'react-native'
import { checkEmail, isMissingInputSignup } from "../modules/checkConnectionInputs";
import ButtonRegular from "./buttons/Button-regular";
import Style from "../style/Style";
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
                {ButtonRegular('test', 'suivant')}
            </View>
        </SafeAreaViewView>
    )
}