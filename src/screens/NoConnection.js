import React, {Component} from 'react';
import {
    StyleSheet,
    StatusBar,
    Platform,
    View,
    Image,
    Dimensions
} from 'react-native';
import {
    Container,
    Text
} from 'native-base';
import store from '../store/store.js';
import { observer } from 'mobx-react';
import Fonts from '../theme/Fonts';
import SplashScreen from 'react-native-splash-screen'

@observer
export default class NoConnection extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            SplashScreen.hide();
        }, 100);
    }

    render() {
        StatusBar.setBarStyle('light-content', true);
		if(Platform.OS === 'android') {
			StatusBar.setBackgroundColor('#ffbb00',true);
			StatusBar.setTranslucent(true);
        }
        
        return(<Container style={styles.background}>
            <View styles={styles.content}>
                <Image source={require("../../assets/img/nointernet.png")} style={styles.image}/>
                <Text style={styles.headText}>{store.lang.noInternet}</Text>
                <Text style={styles.detailedText}>{store.lang.noInternsetSub}</Text>
            </View>
        </Container>)
    }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    background: {
        backgroundColor: '#ffcc00',
        justifyContent: 'center'
    },
    image: {
        height: width/3,
        width: width/3,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    content: {
        width: width
    },
    headText: {
        textAlign: 'center',
        width: '100%',
        marginTop: 10,
        color: '#fff',
        fontSize: Fonts.moderateScale(24),
        fontFamily: Fonts.type.helveticaBold
    },
    detailedText: {
        textAlign: 'center',
        width: '100%',
        marginTop: 10,
        color: '#fff',
        fontSize: Fonts.moderateScale(16),
        fontFamily: Fonts.type.helveticaRegular,
        paddingLeft: 20,
        paddingRight: 20
    }
});