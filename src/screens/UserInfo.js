import React, { Component } from 'react';
import {
    StatusBar,
    Platform,
    KeyboardAvoidingView,
    View
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
    Item,
    Label,
    Input,
    Form
} from 'native-base';
import styles from '../tabs/ContainTabStyle';
import Ionicons from "react-native-vector-icons/Ionicons";
import store from '../store/store.js';
import { observer } from 'mobx-react';
import Toast from 'react-native-simple-toast';

@observer
export default class UserInfo extends Component {
    state = {
        name: '',
        phone: '',
        email: '',
        surname: ''
    }

    constructor(props) {
        super(props);

        this.getName = this.getName.bind(this);
        this.getSurname = this.getSurname.bind(this);
        this.getPhone = this.getPhone.bind(this);
        this.getEmail = this.getEmail.bind(this);
        this.save = this.save.bind(this);
    }

    save() {
        if (this.state.name.length == 0 || this.state.phone.length != 16) {
            if(this.state.name.length == 0){
                Toast.show(store.lang.enterName);
            } else {
                Toast.show(store.lang.phonewrong);
            }
        } else {
            store.setUserInfo(this.state);
            this.props.navigation.goBack()
        }
    }

    getName(text) {
        this.setState({ name: text });
    }

    getSurname(text) {
        this.setState({ surname: text });
    }

    getPhone(text) {
        this.setState({ phone: this.formatNumber(text) });
    }

    getEmail(text) {
        this.setState({ email: text });
    }

    componentDidMount() {
        this.setState({ name: store.userInfo.name });
        this.setState({ surname: store.userInfo.surname });
        this.setState({ phone: this.formatNumber(store.userInfo.phone) });
        this.setState({ email: store.userInfo.email });
    }

    formatNumber(text) {
        text = text.replace(/\D/g,'').substring(0,12);
        var formatted  = "";
        if(text.length > 10) {
            formatted = "+" + text.slice(0,5) + " " + text.slice(5,8) + " " + text.slice(8,10) + " " + text.slice(10, 12);
        } else if(text.length > 8) {
            formatted = "+" + text.slice(0,5) + " " + text.slice(5,8) + " " + text.slice(8,10); 
        } else if(text.length > 5) {
            formatted = "+" + text.slice(0,5) + " " + text.slice(5,8); 
        } else if(text.length > 0) {
            formatted = "+" + text.slice(0,5); 
        }
        return formatted;
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
                    <Text style={styles.headerTextOther}>{store.lang.totalinfo}</Text>
                </Body>
                <Right style={styles.rightAppBar}>

                </Right>
            </Header>
            <Content>
                <KeyboardAvoidingView style={styles.keyboardcontainer} behavior="padding" enabled>
                    <View style={styles.inputBox}>
                        <Label style={styles.inputLabel}>{store.lang.ism}</Label>
                        <Input value={this.state.name} onChangeText={this.getName} style={styles.input} />
                    </View>
                    <View style={styles.inputBox}>
                        <Label style={styles.inputLabel}>{store.lang.gender}</Label>
                        <Input value={this.state.surname} onChangeText={this.getSurname} style={styles.input} />
                    </View>
                    <View style={styles.inputBox}>
                        <Label style={styles.inputLabel}>{store.lang.phoneNumber}</Label>
                        <Input keyboardType="numeric" placeholder="+998XX XXX XX XX" onChangeText={this.getPhone} value={this.state.phone} style={styles.input} />
                    </View>
                    <View style={styles.inputBox}>
                        <Label style={styles.inputLabel}>{store.lang.email}</Label>
                        <Input value={this.state.email} onChangeText={this.getEmail} style={styles.input} />
                    </View>
                    <Button style={styles.userInfoBtn} onPress={this.save}>
                        <Text style={styles.userInfoBtnText}>{store.lang.save}</Text>
                    </Button>
                </KeyboardAvoidingView>
            </Content>
        </Container>)
    }
}