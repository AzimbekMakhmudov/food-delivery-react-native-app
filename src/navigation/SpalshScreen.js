    import React, {
    Component
    } from 'react';
    import { 
        StyleSheet, 
        View, 
        Dimensions,
        Text,
        TouchableOpacity,
        StatusBar,
        Image 
    } from 'react-native';
    import Ionicons from "react-native-vector-icons/Ionicons";
    import Fonts from '../theme/Fonts';

    import store from '../store/store.js';
    import { observer } from 'mobx-react';

@observer
    export default class SplashScreen extends Component {
        render() {
            return (
                <View style={styles.main}>
                    <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
                    <Image style={styles.image} source={require('../../assets/img/splash_screen.png')}/>
                    <View style={styles.block}>
                        <Text style={styles.header}>Oltindiyor.Uz</Text>
                        <Text style={styles.subheaderText}>{store.lang.shopanddeliver}</Text>
                        <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={() => {
                            store.setInit();
                        }}>
                            <Text style={styles.btnText}>{store.lang.start}</Text>
                            <Ionicons name="ios-arrow-forward" fontSize={Fonts.moderateScale(20)} style={styles.btnIcon}/>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
    
    var { height, width } = Dimensions.get('window');
    const styles = StyleSheet.create({
        main: {
            flex: 1,
            backgroundColor: "#fff"
        },
        image: {
            //height: height,
            width: 'auto',
            flex: 1
        },
        block: {
            position: 'absolute',
            height: 200,
            width: width-30,
            marginTop: height*2/3,
            marginLeft: 30,
            flexDirection: 'column'
        },
        header: {
            color: '#fff',
            fontSize: Fonts.moderateScale(36),
            fontFamily: Fonts.type.sfuiDisplaySemibold
        },
        subheaderText: {
            fontSize: Fonts.moderateScale(22),
            color: '#fff',
            fontFamily: Fonts.type.emphasis
        },
        btn: {
            backgroundColor: '#e5293e',
            marginTop: 10,
            justifyContent: 'center',
            width: 170,
            flexDirection: 'row',
            borderColor: '#e5293e',
            borderRadius: 30
        },
        btnText: {
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 20,
            color: '#fff',
            width: 150,
            textAlign: 'center',
            fontSize: Fonts.moderateScale(12),
            fontFamily: Fonts.type.emphasis
        },
        btnIcon: {
            width: 20,
            marginTop: 'auto',
            marginBottom: 'auto',
            color: '#fff',
            justifyContent: 'center'
        }
    });