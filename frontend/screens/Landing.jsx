import { Text, View, SafeAreaView } from "react-native"
import ButtonRegular from "../components/buttons/Button-regular"

function LandingScreen({navigation}) {

    

    return (
        <SafeAreaView style={{flex : 1}}>
            <View>
            <Text>
                Logo
            </Text>
            </View>
            <View>
                {ButtonRegular('patient')}
            </View>            
            <View>
                {ButtonRegular('psy')}
            </View>

        </SafeAreaView>
    )
}

export default LandingScreen