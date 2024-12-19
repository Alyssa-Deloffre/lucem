import { Text } from "react-native";
import { COLOR_PURPLE, COLOR_GREEN } from "../data/styleGlobal";
import Slider from '@react-native-community/slider';


export default function CustomSlider ({
    data,
    value,
    onValueChange,
}) {



    return (
        <>

        <Slider
        minimumTrackTintColor={COLOR_GREEN[400]}
        thumbTintColor='#FFFFFF'
        tapToSeek={true}
        minimumValue={0}
        maximumValue={data.length - 1}
        onValueChange={onValueChange}
        value={2}
        step={1}
        />
        <Text style={{textAlign : 'center', fontSize : 16, fontFamily : 'Quicksand-SemiBold', color : COLOR_PURPLE[1000]}}>{data[value].text}</Text>

        </>
    )
}

