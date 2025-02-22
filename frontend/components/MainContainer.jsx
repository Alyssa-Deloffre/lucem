import {
    SafeAreaView,
    StyleSheet,
    Dimensions,
    View,
    Platform,
} from 'react-native';
import { COLOR_PURPLE } from '../data/styleGlobal';
import Svg, { Path } from 'react-native-svg';

export default function MainContainer({ children }) {
    return (
        <View style={styles.main}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.contentContainer}>{children}</View>
            </SafeAreaView>
            <Svg
                xmlns='http://www.w3.org/2000/svg'
                style={styles.svg}
                width='389'
                height='290'
                viewBox='0 0 389 290'
            >
                <Path d='M0 163.59V290h390V0C293 221.484 111-40.366 0 163.59Z' />
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: COLOR_PURPLE[100],
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        paddingTop: Platform.OS === 'android' ? 32 : 0,
    },
    safeArea: {
        flex: 1,
        position: 'relative',
        zIndex: 2,
    },
    contentContainer: {
        flex: 1,
        padding: 24,
    },
    svg: {
        fill: COLOR_PURPLE[200],
        position: 'absolute',
        zIndex: 1,
        bottom: 0,
        left: 0,
    },
});
