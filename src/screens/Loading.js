import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Platform,
    StyleSheet,
    Image,
    Dimensions
} from 'react-native';

import {
    SkypeIndicator
} from 'react-native-indicators';
import SplashScreen from 'react-native-splash-screen'

export default class Loading extends Component {
    timer = null;
    componentDidMount() {
        this.timer = setTimeout(() => {
            SplashScreen.hide();
        }, 100);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }
    
    render() {
        StatusBar.setBarStyle('light-content', true);
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('#ffbb00', true);
            StatusBar.setTranslucent(true);
        }

        return (<View style={styles.background}>
            <View style={styles.roundedBox}>
                <Image source={require('../../assets/img/logo.jpg')} style={{ width: '100%', height: '100%' }} />
            </View>
            <View style={styles.activityIndicator}>
                <SkypeIndicator color="#fff" size={32} />
            </View>
        </View>)
    }
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffcc00',
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight
    },
    roundedBox: {
        height: width * 2 / 3,
        width: width * 2 / 3,
        borderRadius: width / 3,
        overflow: 'hidden',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    activityIndicator: {
        marginTop: 30,
        height: 40
    }
});