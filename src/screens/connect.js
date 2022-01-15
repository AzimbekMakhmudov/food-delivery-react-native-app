import React, { Component } from 'react';
import {
    Platform,
    StatusBar,
    KeyboardAvoidingView,
    View,
    Modal
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
    List,
    ListItem,
    Input,
    Radio
} from 'native-base';
import styles from '../tabs/ContainTabStyle';
import Ionicons from "react-native-vector-icons/Ionicons";
import store from '../store/store.js';
import { observer } from 'mobx-react';
import Communications from 'react-native-communications';
import Toast from 'react-native-simple-toast';

type = [
    [
        "Taklif",
        "Minnatdorchilik",
        "Arz"
    ],
    [
        "Предложение",
        "Благодарность",
        "Жалоба"
    ],
    [
        "Offer",
        "Thanks",
        "Complaint"
    ]
]

@observer
export default class Connect extends Component {
    state = {
        name: '',
        phone: '',
        type: 0,
        text: '',
        modalVisible: false
    }

    constructor(props) {
        super(props);

        this.getName = this.getName.bind(this);
        this.getPhone = this.getPhone.bind(this);
        this.getType = this.getType.bind(this);
        this.getText = this.getText.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount() {
        this.setState({ name: store.userInfo.name });
        this.setState({ phone: store.userInfo.phone });
    }
 
    save() {
        if (this.state.name.length > 0 && this.state.phone !== 16) {
            this.setState({text: ""});
            var bot_token = "559543795:AAGObPiD_qnE638gtaRua3mrD0mI2F_c_a8";
            var chat_id = "-272851411";
            var text = "*" + store.lang.ism + "*: " + this.state.name + "%0A";
            text += "*" + store.lang.phoneNumber + "*: " + this.state.phone + "%0A";
            text += "*" + store.lang.want + "*: " + type[store.langId - 1][this.state.type] + "%0A";
            text += "*" + store.lang.textConnect + "*: " + this.state.text;
            Toast.show(store.lang.thanks1 + type[store.langId - 1][this.state.type] + store.lang.thanks2, Toast.SHORT, Toast.CENTER);
            return fetch("https://api.telegram.org/bot" + bot_token + "/sendMessage?chat_id=" + chat_id + "&parse_mode=Markdown&text=" + text)
                .then((response) => response.json())
                .then((responseJson) => {
                    
                })
                .catch((error) => {

                });
        } else {
            Toast.show(store.lang.userinfo, Toast.SHORT, Toast.CENTER);
        }
    }

    getName(text) {
        this.setState({ name: text });
    }

    getPhone(text) {
        this.setState({ phone: this.formatNumber(text) });
    }

    getType(text) {
        this.setState({ modalVisible: true });
    }

    getText(text) {
        this.setState({ text: text });
    }

    formatNumber(text) {
        text = text.replace(/\D/g, '').substring(0, 12);
        var formatted = "";
        if (text.length > 10) {
            formatted = "+" + text.slice(0, 5) + " " + text.slice(5, 8) + " " + text.slice(8, 10) + " " + text.slice(10, 12);
        } else if (text.length > 8) {
            formatted = "+" + text.slice(0, 5) + " " + text.slice(5, 8) + " " + text.slice(8, 10);
        } else if (text.length > 5) {
            formatted = "+" + text.slice(0, 5) + " " + text.slice(5, 8);
        } else if (text.length > 0) {
            formatted = "+" + text.slice(0, 5);
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
                    <Text style={styles.headerTextOther}>{store.lang.connect}</Text>
                </Body>
                <Right style={styles.rightAppBar}>

                </Right>
            </Header>
            <Content>
                <Text style={styles.question3}>{store.lang.connectText1}</Text>
                <List style={{ marginTop: 10 }}>
                    <ListItem style={[styles.listItem2, { paddingTop: 10, paddingBottom: 10 }]} onPress={() => {
                        Communications.phonecall('+998994007000', true)
                    }}>
                        <Ionicons name="ios-call" size={20} color="#000" style={styles.listLeftIcon} />
                        <Text style={styles.listItemText}>+99899 400 70 00</Text>
                    </ListItem>
                </List>
                <Text style={styles.question3}>{store.lang.connectText2}</Text>
                <KeyboardAvoidingView style={styles.keyboardcontainer2} behavior="padding" enabled>
                    <View style={styles.inputBox}>
                        <Label style={styles.inputLabel}>{store.lang.ism}</Label>
                        <Input style={styles.input} value={this.state.name} onChangeText={this.getName} />
                    </View>
                    <View style={styles.inputBox}>
                        <Label style={styles.inputLabel}>{store.lang.phoneNumber}</Label>
                        <Input keyboardType="numeric" value={this.state.phone} onChangeText={this.getPhone} placeholder="+998XX XXX XX XX" style={styles.input} />
                    </View>
                    <View style={styles.inputBox}>
                        <Label style={styles.inputLabel}>{store.lang.want}</Label>
                        <Input style={styles.input} value={type[store.langId - 1][this.state.type]} onTouchStart={this.getType} />
                    </View>
                    <View style={styles.inputBox2}>
                        <Label style={styles.inputLabel}>{store.lang.textConnect}</Label>
                        <Input style={styles.input} value={this.state.text} onChangeText={this.getText} />
                    </View>
                    <Button style={styles.connectBtn} onPress={this.save}>
                        <Text style={styles.userInfoBtnText}>{store.lang.send}</Text>
                    </Button>
                </KeyboardAvoidingView>
                <View style={[styles.divider, { marginTop: 10 }]}></View>
                <List style={{ marginTop: 10, marginBottom: 10 }}>
                    <ListItem style={styles.listItem2} onPress={() => {
                        this.props.navigation.navigate("Contacts");
                    }}>
                        <Text style={styles.listItemText}>{store.lang.contacts}</Text>
                        <Ionicons name="ios-arrow-forward" size={20} color="#000" style={styles.listRightIcon} />
                    </ListItem>
                    <ListItem style={styles.listItem2} onPress={() => {
                        this.props.navigation.navigate("Rekviziti");
                    }}>
                        <Text style={styles.listItemText}>{store.lang.rekviziti}</Text>
                        <Ionicons name="ios-arrow-forward" size={20} color="#000" style={styles.listRightIcon} />
                    </ListItem>
                </List>
            </Content>
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => { this.setState({ modalVisible: false }) }}>
                <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={styles.deliveryModal}>
                        <Text style={styles.question}>{store.lang.want}</Text>
                        <View style={styles.hr}></View>
                        <List>
                            <ListItem style={styles.listItem2} onPress={() => {
                                this.setState({ type: 0 });
                                this.setState({ modalVisible: false });
                            }}>
                                <Text style={styles.listItemText}>{type[store.langId - 1][0]}</Text>
                                <Radio
                                    color={"#929292"}
                                    selectedColor={"#ffcc00"}
                                    selected={this.state.type == 0 ? true : false}
                                    style={{ marginLeft: 'auto' }}
                                />
                            </ListItem>
                            <ListItem style={styles.listItem2} onPress={() => {
                                this.setState({ type: 1 });
                                this.setState({ modalVisible: false });
                            }}>
                                <Text style={styles.listItemText}>{type[store.langId - 1][1]}</Text>
                                <Radio
                                    color={"#929292"}
                                    selectedColor={"#ffcc00"}
                                    selected={this.state.type == 1 ? true : false}
                                    style={{ marginLeft: 'auto' }}
                                />
                            </ListItem>
                            <ListItem style={styles.listItem2} onPress={() => {
                                this.setState({ type: 2 });
                                this.setState({ modalVisible: false });
                            }}>
                                <Text style={styles.listItemText}>{type[store.langId - 1][2]}</Text>
                                <Radio
                                    color={"#929292"}
                                    selectedColor={"#ffcc00"}
                                    selected={this.state.type == 2 ? true : false}
                                    style={{ marginLeft: 'auto' }}
                                />
                            </ListItem>
                        </List>
                    </View>
                </View>
            </Modal>
        </Container>)
    }
}