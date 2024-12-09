import React from "react";
import {TextInput, View, Text} from 'react-native'
import Style from "../../style/Style";

export default function Input ({label}) {

    const [input, setInput] = useState('');


    return (
        <View>
            <Text>{label}</Text>
            <TextInput placeholder={text} onChangeText={(value) => setInput(value)} value={input} style={styles.input} />
            <Text>Error message</Text>
        </View>
    )
}

