import React, { Component } from 'react';
import {
    StatusBar,
    Platform,
    View,
    PermissionsAndroid,
    DeviceEventEmitter,
    TouchableOpacity,
    Image,
    BackHandler
} from 'react-native';
import {
    Container,
    Header,
    Content,
    Text,
    Button,
    Left,
    Right,
    Body
} from 'native-base';
import styles from '../tabs/ContainTabStyle';
import Ionicons from "react-native-vector-icons/Ionicons";
import store from '../store/store.js';
import { observer } from 'mobx-react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
/* uncomment belows for android and comment belows for ios */
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
/*untill here*/
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Geolocation from 'react-native-geolocation-service';
import {
    MaterialIndicator
} from 'react-native-indicators';

@observer
export default class Maps extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locationAllowed: false,
            gpsOn: true,
            latitude: 41.46889,
            longitude: 69.58222,
            latitudeDelta: 0.09,
            longitudeDelta: 0.051,
            loadingCurrent: false,
            loadingAddress: false,
            address: "",
            data: {},
            ready: true
        }

        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        /* uncomment belows for android and comment belows for ios */
        this.checkIsLocation = this.checkIsLocation.bind(this);
        this.getLocationPermission = this.getLocationPermission.bind(this);
        /*untill here*/
        this.onSuccess = this.onSuccess.bind(this);
        this.getCurrentLocation = this.getCurrentLocation.bind(this);
        this.regionChange = this.regionChange.bind(this);
        this.save = this.save.bind(this);
        this.handleBackPress = this.handleBackPress.bind(this);
        this.onMapReady = this.onMapReady.bind(this);
        this.setRegion = this.setRegion.bind(this);

        /* uncomment belows for android and comment belows for ios */
        this.getLocationPermission();
        /*untill here*/
    }

    timer = 0;
    map = null;

    componentDidMount() {

        if (Object.keys(store.mapInfo).length > 0) {
            this.setState({ latitude: parseFloat(store.mapInfo.lat) });
            this.setState({ longitude: parseFloat(store.mapInfo.lon) });

            this.getName(parseFloat(store.mapInfo.lat), parseFloat(store.mapInfo.lon));
        } else {
            this.getName(parseFloat(this.state.latitude), this.state.longitude);
        }

        DeviceEventEmitter.addListener('locationProviderStatusChange', function (status) {
            /* uncomment belows for android and comment belows for ios */
            this.getLocationPermission();
            /*untill here*/
        });
    }

    setRegion(region) {
        if (this.state.ready) {
            this.timer = setTimeout(() => this.map.animateToRegion(region), 10);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    async getCurrentLocation() {
        this.setState({ loadingCurrent: true });
        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({ latitude: position.coords.latitude });
                this.setState({ longitude: position.coords.longitude });
                this.setState({ loadingCurrent: false });

                const region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: this.state.latitudeDelta,
                    longitudeDelta: this.state.longitudeDelta,
                };
                this.setRegion(region);
            },
            (error) => {
            }
        );
    }

    onMapReady = (e) => {
        if (!this.state.ready) {
            this.setState({ ready: true });
        }
    };

    save() {
        store.setAddress(this.state.data);
        this.props.navigation.goBack();
        this.props.navigation.state.params.onGoBack();
    }

    /* uncomment belows for android and comment belows for ios */
    async getLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    "title": 'Location request',
                    "message": "LOcation request"
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.checkIsLocation();
                this.setState({
                    locationAllowed: true
                });
            } else {
                this.setState({
                    locationAllowed: false
                })
            }

        } catch (e) {

        }
    }
    /*untill here*/

    getName(lat, lon) {
        var lang = 'en-RU';
        if (store.langId == 2)
            lang = "ru-RU"
        else if (store.langId == 3)
            lang = "en-US";

        return fetch('https://geocode-maps.yandex.ru/1.x/?apikey=' + store.map_key + '&format=json&geocode=' + lon + ',' + lat + '&lang=' + lang)
            .then((response) => response.json())
            .then(async (responseJson) => {
                var response = responseJson.response.GeoObjectCollection.featureMember[0];
                response = response.GeoObject.metaDataProperty.GeocoderMetaData;
                await this.setState({ address: response.text });
                this.setState({ loadingAddress: true });
                response = response.Address.Components;
                this.setState({ data: response });
            })
    }

    onSuccess(success) {
        if (success.enabled)
            this.setState({
                gpsOn: true
            });
        else
            this.setState({
                gpsOn: false
            });
    }

    handleBackPress = () => {
        this.props.navigation.state.params.onGoBack();
    }

    componentWillUnmount() {
        /* uncomment belows for android and comment belows for ios */
        LocationServicesDialogBox.stopListener();
        /*untill here*/
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    regionChange(region) {
        this.setState({ loadingAddress: false });
        this.setState({
            latitude: region.latitude
        });
        this.setState({
            longitude: region.longitude
        });

        this.setState({
            latitudeDelta: region.latitudeDelta
        });
        this.setState({
            longitudeDelta: region.longitudeDelta
        });

        this.getName(region.latitude, region.longitude);
    }

    /* uncomment belows for android and comment belows for ios */
    async checkIsLocation() {
        await LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: store.lang.gpsmessage,
            ok: store.lang.ok,
            cancel: store.lang.cancel,
            enableHighAccuracy: true,
            showDialog: true,
            openLocationServices: true,
            preventOutSideTouch: false,
            preventBackClick: false,
            providerListener: true
        }).then(this.onSuccess).catch((error) => {
        });
    }
    /*untill here*/

    render() {
        StatusBar.setBarStyle('light-content', true);
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('#ffbb00', true);
            StatusBar.setTranslucent(true);
        }


        return (
            <Container>
                <Header style={styles.searchBarContainer}>
                    <Left style={styles.leftAppBar}>
                        <Button transparent onPress={() => {
                            this.props.navigation.goBack();
                            this.props.navigation.state.params.onGoBack();
                        }}>
                            <Ionicons name="ios-arrow-back" size={24} color="#000" />
                        </Button>
                    </Left>
                    <Body style={styles.bodyAppBar}>
                        <Text style={styles.headerTextOther}>{store.lang.map}</Text>
                    </Body>
                    <Right style={styles.rightAppBar}>

                    </Right>
                </Header>
                <View style={styles.bodyWithoutFooter}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        ref={map => { this.map = map }}
                        onMapReady={this.onMapReady}
                        showsMyLocationButton={false}
                        showsUserLocation={true}
                        style={styles.map}
                        initialRegion={{
                            latitude: 41.46889,
                            longitude: 69.58222,
                            latitudeDelta: 0.09,
                            longitudeDelta: 0.051
                        }}
                        onRegionChangeComplete={this.regionChange}
                    >
                    </MapView>
                    <View pointerEvents="none" style={styles.mapTitle}>
                        {
                            this.state.loadingAddress && (
                                <View style={{ alignItems: 'center' }}>
                                    <View pointerEvents="none" style={styles.titleCont}>
                                        <Text style={styles.titleText}>{this.state.address}</Text>
                                    </View>
                                    <View pointerEvents="none" style={styles.triangleTitle}>

                                    </View>
                                </View>
                            )
                        }
                        {
                            !this.state.loadingAddress && (
                                <View pointerEvents="none" style={styles.loadinIndicatorMap}>
                                    <MaterialIndicator color="red" size={32} />
                                </View>)
                        }
                    </View>
                    <View pointerEvents="none" style={styles.markerCenter}>
                        <Image pointerEvents="none" style={{ width: 36, height: 36, marginBottom: 36 }} source={require('../../assets/img/marker.png')} />
                    </View>
                    {
                        this.state.gpsOn && (
                            <TouchableOpacity activeOpacity={0.7} style={styles.mapView} onPress={this.getCurrentLocation}>
                                {
                                    !this.state.loadingCurrent && (<FontAwesome5 name="crosshairs" size={20} color="#000" />)
                                }
                                {
                                    this.state.loadingCurrent && (<MaterialIndicator color="red" size={24} />)
                                }
                            </TouchableOpacity>)
                    }
                    <Button style={styles.mapButton} onPress={this.save}>
                        <Text style={styles.mapButtonText}>{store.lang.save}</Text>
                    </Button>
                </View>
            </Container >
        );
    }
}