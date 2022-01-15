import React, { Component } from 'react';
import {
    StatusBar,
    Platform,
    KeyboardAvoidingView,
    View,
    TouchableOpacity
} from 'react-native';
import {
    Container,
    Text,
    Header,
    Body,
    Left,
    Right,
    Content,
    Button,
    Label,
    Input
} from 'native-base';
import styles from '../tabs/ContainTabStyle';
import Ionicons from "react-native-vector-icons/Ionicons";
import store from '../store/store.js';
import { observer } from 'mobx-react';

@observer
export default class AddressBook extends Component {
    state = {
        region: "",
        city: "",
        street: "",
        other: ""
    }

    constructor(props) {
        super(props);

        this.getRegion = this.getRegion.bind(this);
        this.getCity = this.getCity.bind(this);
        this.getStreet = this.getStreet.bind(this);
        this.getOther = this.getOther.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    save() {
        var text = this.state.region + ", " + this.state.city + ", " + this.state.street + ", " + this.state.other;
        store.setAddressText(text);
        this.props.navigation.goBack();
    }

    onScroll() {
        this.getData();
    }

    async getData() {
        this.setState({ region: "" });
        this.setState({ city: "" });
        this.setState({ street: "" });
        this.setState({ other: "" });
     
        if (store.mapInfo.length > 0) {
            for(let i = 0; i < store.mapInfo.length; i++) {
                if(typeof store.mapInfo[i].kind !== 'undefined' && store.mapInfo[i].kind == "province") {
                   await this.setState({ region: store.mapInfo[i].name });
                } else if(typeof store.mapInfo[i].kind !== 'undefined' && store.mapInfo[i].kind == "area") {
                    await this.setState({ city:  store.mapInfo[i].name});
                } else if(typeof store.mapInfo[i].kind !== 'undefined' && store.mapInfo[i].kind == "locality" && this.state.region != store.mapInfo[i].name) {
                    if(this.state.city.length > 0 && this.state.city != store.mapInfo[i].name)
                    await  this.setState({ city:  this.state.city + ", " + store.mapInfo[i].name});
                    else
                    await this.setState({ city:  store.mapInfo[i].name});
                } else if(typeof store.mapInfo[i].kind !== 'undefined' && (store.mapInfo[i].kind == "street" || store.mapInfo[i].kind == "vegetation")) {
                    await this.setState({ street: store.mapInfo[i].name });
                } else if(typeof store.mapInfo[i].kind !== 'undefined' && store.mapInfo[i].kind == "house") {
                    await this.setState({ other: store.mapInfo[i].name });
                } else if(typeof store.mapInfo[i].kind !== 'undefined' && store.mapInfo[i].kind == "district") {
                    if(this.state.city.length > 0 && this.state.city != store.mapInfo[i].name)
                    await this.setState({ city:  this.state.city + ", " + store.mapInfo[i].name});
                    else
                    await this.setState({ city:  store.mapInfo[i].name});
                } else if(typeof store.mapInfo[i].kind !== 'undefined' && store.mapInfo[i].kind == "other") {
                    if(this.state.street.length > 0 && this.state.street != store.mapInfo[i].name)
                    await this.setState({ street:  this.state.street + ", " + store.mapInfo[i].name});
                    else
                    await this.setState({ street:  store.mapInfo[i].name});
                }
            }
        }
    }

    getRegion(text) {
        this.setState({ region: text });
    }

    getCity(text) {
        this.setState({ city: text });
    }

    getStreet(text) {
        this.setState({ street: text });
    }

    getOther(text) {
        this.setState({ other: text });
    }

    render() {
        StatusBar.setBarStyle('light-content', true);
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('#ffbb00', true);
            StatusBar.setTranslucent(true);
        }

        return (<Container>
            <Header style={styles.searchBarContainer}>
                <Left style={styles.leftAppBar}>
                    <Button transparent onPress={() => {
                        this.props.navigation.goBack()
                    }}>
                        <Ionicons name="ios-arrow-back" size={24} color="#000" />
                    </Button>
                </Left>
                <Body style={styles.bodyAppBar}>
                    <Text style={styles.headerTextOther}>{store.lang.addressBook}</Text>
                </Body>
                <Right style={styles.rightAppBar}>

                </Right>
            </Header>
            <Content>
                <KeyboardAvoidingView style={styles.keyboardcontainer} behavior="padding" enabled>
                    <TouchableOpacity activeOpacity={1} onPress={() => {
                        this.props.navigation.navigate("Maps", {
                            onGoBack: this.onScroll
                        });
                    }}>
                        <View style={styles.inputREf}>
                            <Left><Label style={styles.textColor}>{store.lang.showinmap}</Label></Left>
                            <Right><Ionicons name="ios-arrow-forward" style={styles.IconColor} /></Right>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.inputBox}>
                        <Label style={styles.inputLabel}>{store.lang.city}</Label>
                        <Input style={styles.input} value={this.state.region} onChangeText={this.getRegion} />
                    </View>
                    <View style={styles.inputBox}>
                        <Label style={styles.inputLabel}>{store.lang.district}</Label>
                        <Input style={styles.input} value={this.state.city} onChangeText={this.getCity} />
                    </View>
                    <View style={styles.inputBox}>
                        <Label style={styles.inputLabel}>{store.lang.street}</Label>
                        <Input style={styles.input} value={this.state.street} onChangeText={this.getStreet} />
                    </View>
                    <View style={styles.inputBox}>
                        <Label style={styles.inputLabel}>{store.lang.additional}</Label>
                        <Input style={styles.input} value={this.state.other} onChangeText={this.getOther} />
                    </View>
                    <Button style={styles.userInfoBtn} onPress={this.save}>
                        <Text style={styles.userInfoBtnText}>{store.lang.save}</Text>
                    </Button>
                </KeyboardAvoidingView>
            </Content>
        </Container>)
    }
}