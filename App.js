import React, { Component } from 'react';
import { StyleSheet, BackHandler, NetInfo, View, TouchableOpacity, Image, StatusBar, Dimensions } from 'react-native';
import { Container, Text } from 'native-base';

import SplashScreen2 from './src/navigation/SpalshScreen';
import AppNavigator from './src/navigation/AppNavigator';
import NoConnection from './src/screens/NoConnection';
import Loading from './src/screens/Loading';
import Loading2 from './src/screens/Loading2';

import store from './src/store/store.js';
import { observer } from 'mobx-react';
import Fonts from './src/theme/Fonts';
import {
  SkypeIndicator
} from 'react-native-indicators';


type Props = {};
@observer
export default class App extends Component<Props> {
  state = {
    initial: false,
    loading: true,
    isConnected: true,
    startInitialize: false,
    initLang: false,
    init: false
  }

  timer = null;

  constructor(props) {
    super(props);

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    NetInfo.isConnected.fetch().done(
      (isConnected) => {
        this.setState({
          isConnected
        });
      }
    );

    this.handleBackPress = this.handleBackPress.bind(this);
    this.disableLoading = this.disableLoading.bind(this);
    this.startInit = this.startInit.bind(this);
    this._handleConnectivityChange = this._handleConnectivityChange.bind(this);
    this.selectLang = this.selectLang.bind(this);

    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleConnectivityChange
    );

    this.timer2 = setTimeout(this.startInit, 1000);
    this.timer = setTimeout(this.disableLoading, 5000);
  }



 

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    clearTimeout(this.timer2);
    clearTimeout(this.timer);
  }

  _handleConnectivityChange = (isConnected) => {
    if (this.state.isConnected == true || this.state.isConnected == false) {
      this.setState({
        isConnected
      });
    }
  };

  handleBackPress = () => {
    return false;
  }

  selectLang(num) {
    store.setLang(num);
    this.setState({ initLang: true });
    this.setState({ init: true });
  }

  startInit() {
    this.setState({ startInitialize: true });
  }

  disableLoading() {
    this.setState({ loading: false });
  }

  render() {
    if (!store.init) {
      return (
        <Container>
          {
            this.state.loading && (<Loading2 />)
          }
          {
            !this.state.loading && !this.state.initLang && (<View style={styles.main}>
              <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
              <Image style={styles.image} source={require('./assets/img/splash_screen.png')} />
              <View style={styles.langblock}>
                <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => this.selectLang(1)}>
                  <Image style={styles.langimage} source={require('./assets/img/uz.png')} />
                  <Text style={styles.btnText}>O'zbek tili</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => this.selectLang(2)}>
                  <Image style={styles.langimage} source={require('./assets/img/ru.png')} />
                  <Text style={styles.btnText}>Русский язык</Text>
                </TouchableOpacity>

                 <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => this.selectLang(3)}>
                  <Image style={styles.langimage} source={require('./assets/img/en.png')} />
                  <Text style={styles.btnText}>English</Text>
                </TouchableOpacity>
              </View>
            </View>)
          } 
          {
            this.state.initLang && (<SplashScreen2 />)
          }
        </Container>
      );
    } else {
      if (!this.state.isConnected) {
        return (
          <NoConnection />
        );
      } else {
        return (
          <Container>
            {
              this.state.loading && (<Loading />)
            }
            {
              this.state.startInitialize && (<AppNavigator/>)
            }
          </Container>
        );
      }
    }

  }
}

var { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffcc00',
    justifyContent: 'center'
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
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffcc00',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  main: {
    flex: 1,
    backgroundColor: "#ffcc00"
  },
  image: {
    //height: height,
    width: 'auto',
    flex: 1
  },
  langblock: {
    position: 'absolute',
    height: 200,
    width: width,
    marginTop: height / 3
  },
  btn: {
    backgroundColor: '#e5293e',
    flexDirection: 'row',
    borderColor: '#e5293e',
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 20,
    paddingRight: 20
  },
  langimage: {
    height: 20,
    width: 30,
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  btnText: {
    color: '#fff',
    fontSize: Fonts.moderateScale(22),
    fontFamily: Fonts.type.emphasis,
    marginLeft: 10,
    paddingTop: 10,
    paddingBottom: 10
  }
});
