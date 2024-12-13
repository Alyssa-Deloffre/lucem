import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {COLOR_GREEN, COLOR_PURPLE} from "../data/styleGlobal";
import { View, StyleSheet, Text} from "react-native";


export default function DateCheck({text, type = 'circle'}){

    let dateCheck = <FontAwesome name='circle-thin' size={40}/>

    if (type === 'check'){
        dateCheck = <FontAwesome name='check-circle' size={40} style={styles.check}/>
    }else if (type === 'today'){
        dateCheck = <FontAwesome name='circle-thin' size={40} style={styles.today}/> 
    }else{
        (type === 'empty')
        dateCheck = <FontAwesome name='circle-thin' size={40} style={styles.todayCheck}/> 
    }
    
    return(
        <View>

            {dateCheck}
            <Text style={styles.txt}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    check: {
        color: COLOR_GREEN[600],
    },
    today: {
        color: COLOR_PURPLE[500],
    },
    todayCheck: {
        color: COLOR_GREEN[500],
    },
    txt: {
        fontWeight : 'bold',
    }
})