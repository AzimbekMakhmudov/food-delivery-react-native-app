import React, { Component } from 'react';
import {
    StatusBar,
    Platform,
    View,
    FlatList,
    TouchableOpacity,
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
    ListItem,
    Radio
} from 'native-base';
import styles from '../tabs/ContainTabStyle';
import Ionicons from "react-native-vector-icons/Ionicons";
import store from '../store/store.js';
import { observer } from 'mobx-react';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-simple-toast';
import {
    SkypeIndicator
} from 'react-native-indicators';
import Dialog from 'react-native-dialog';

@observer
export default class OrderConfirm extends Component {
    state = {
        payment: 1,
        data: {},
        skidka: 0,
        summa: 0,
        sended: false,
        modalVisible: false
    }

    constructor(props) {
        super(props);

        this.footer = this.footer.bind(this);
        this.makeItems = this.makeItems.bind(this);
        this.confirm = this.confirm.bind(this);
    }

    changeToString = (val) => {
        var str = "";
        if (Math.floor(val / 1000) > 0) {
            var v = val / 1000;
            var dec1 = val - Math.floor(v) * 1000;
            if (dec1 > 0) {
                if (dec1 < 10)
                    dec1 = "00" + dec1;
                else if (dec1 < 100)
                    dec1 = "0" + dec1;

                str = str + dec1;
            } else
                str = str + "000";
            var dec2 = Math.floor(v / 1000);
            if (dec2 > 0) {
                var dec3 = Math.floor(v) - dec2 * 1000;
                if (dec3 < 10)
                    dec3 = "00" + dec3;
                else if (dec3 < 100)
                    dec3 = "0" + dec3;
                if (dec3 > 0)
                    str = dec3 + " " + str;
                else
                    str = "000 " + str;
                str = dec2 + " " + str;
            } else {
                str = Math.floor(v) + " " + str;
            }
        } else {
            str = val;
        }
        return str;
    }

    componentDidMount() {
        store.calculateOrder();
        
        const { navigation } = this.props;
        var data = navigation.getParam('data', {});
        var skidka = navigation.getParam('skidka', {});
        var summa = navigation.getParam('summa', {});
        this.setState({ data: data });
        this.setState({ skidka: skidka });
        this.setState({ summa: summa });
    }

    async confirm() {
        if (!this.state.sended) {
            if (this.state.payment > 0 && store.addressText.length > 0 && store.userInfo.name.length > 1 && store.userInfo.phone.length == 16 && store.date.length > 0 && store.time.length > 0) {
                if ((this.state.summa - this.state.skidka) >= 50000) {
                    var lon = "0";
                    var lat = "0";
                    if (Object.keys(store.mapInfo).length > 0) {
                        lon = store.mapInfo.lon;
                        lat = store.mapInfo.lat;
                    }

                    let buyed = {};
                    let m = 0;
                    for (let i in store.count) {
                        buyed[m] = i;
                        m++;
                    }

                    if(store.userInfo.surname.length == 0)
                        store.userInfo.surname = "-";

                    var data = "";
                    data += "is_mobile=1";
                    data += "&name=" + store.userInfo.name;
                    data += "&surname=" + store.userInfo.surname;
                    data += "&lang=1";
                    data += "&deviceId=" + store.deviceId;
                    data += "&address=" + store.addressText;
                    data += "&tel=" + store.userInfo.phone;
                    data += "&date=" + store.date;
                    data += "&time=" + store.time;
                    data += "&summa=" + this.state.summa;
                    data += "&skidka=" + this.state.skidka;
                    data += "&payment=" + this.state.payment;

                    for (let i in store.count) {
                        data += "&orders[" + i + "]=" + store.count[i];
                    }

                    this.setState({ modalVisible: true });
                    this.setState({ sended: true });

                    const rawResponse = await fetch(store.url + '/app_api/mobile/mobile.php?' + data).then((response) => response.json())
                        .then((responseJson) => {
                            store.resetOrderCount();
                            store.resetDateTime();
                            const { popToTop } = this.props.navigation;
                            popToTop();
                            Toast.show(store.lang.confirmOrder, Toast.SHORT, Toast.CENTER);
                            this.props.navigation.navigate("OrderStatus");
                            this.setState({ sended: false });
                            this.setState({ modalVisible: false });
                        }).catch((error) => {
                        });
                } else {
                    this.setState({ showDialog: true });
                }
            } else {
                if (this.state.payment == 0) {
                    Toast.show(store.lang.selectPaymentType, Toast.SHORT, Toast.CENTER);
                } else if (store.addressText.length == 0) {
                    Toast.show(store.lang.selectAdress, Toast.SHORT, Toast.CENTER);
                } else if (store.userInfo.name.length == 0 || store.userInfo.phone.length !== 16) {
                    Toast.show(store.lang.userinfo, Toast.SHORT, Toast.CENTER);
                } else if (store.date.length == 0 || store.time.length == 0) {
                    Toast.show(store.lang.selectDateTime, Toast.SHORT, Toast.CENTER);
                }
            }
        }
    }

    encodeData(details) {
        var formBody = [];
        for (var property in details) {
            if (property == 'orders') {
                var data = details[property];
                for (var property2 in data) {
                    var encodedKey = encodeURIComponent(property + "[" + property2 + "]");
                    var encodedValue = encodeURIComponent(data[property2]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
            } else {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
        }
        formBody = formBody.join("&");
        return formBody;
    }

    makeItems({ item }) {
        if (store.count[item.id] > 0) {
            let name = [item.name_4, item.name_4];
           var imageUrl = item.image + "-home_default/" + item.link_rewrite + ".jpg";
            return (<View style={styles.row}>
                <Left>
                    <FastImage style={{ height: 50, width: 50 }} source={{ uri: store.url + '/' + imageUrl }} priority={FastImage.priority.normal} resizeMode={FastImage.resizeMode.contain} />
                </Left>
                <Body>
                    <Text style={styles.productName}>{name[store.langId - 1]} (x{store.count[item.id]})</Text>
                </Body>
                <Right>
                    <Text style={styles.bottomPrice}>{this.changeToString(item.price * store.count[item.id])}</Text>
                </Right>
            </View>)
        } else {
            return (<View></View>);
        }

    }

    footer() {
        return (<View style={{ marginBottom: 20 }}>
            <View style={{
                marginTop: 10,
                marginBottom: 10,
                height: 1,
                backgroundColor: '#ddd'
            }}></View>
            <View style={styles.totalprice2}>
                <Text style={styles.itogoText}>{store.lang.footerCount}:</Text>
                <Text style={styles.itogoCount}>{this.changeToString(this.state.summa)} UZS</Text>
            </View>
            <View style={styles.totalprice2}>
                <Text style={styles.itogoText}>{store.lang.sale}:</Text>
                <Text style={styles.itogoCount}>{this.changeToString(this.state.skidka)} UZS</Text>
            </View>
            <View style={{
                marginTop: 10,
                marginBottom: 10,
                height: 1,
                backgroundColor: '#ddd'
            }}></View>
            <View style={styles.totalprice2}>
                <Text style={styles.itogoText}>{store.lang.footerSum}</Text>
                <Text style={styles.itogoCount}>{this.changeToString(this.state.summa - this.state.skidka)} UZS</Text>
            </View>
        </View>)
    }

    _keyExtractor = (item, index) => "c_" + item.ID;

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
                    <Text style={styles.headerTextOther}>{store.lang.apply}</Text>
                </Body>
                <Right style={styles.rightAppBar}>

                </Right>
            </Header>
            <Content>
                <View style={styles.contactInfo}>
                    <View style={[styles.row, { marginTop: 10 }]}>
                        <TouchableOpacity style={styles.cartBtns2} onPress={() => {
                            this.props.navigation.navigate("UserInfo")
                        }}>
                            <Text style={styles.number}>1</Text>
                            <Text style={styles.contactHead}>{store.lang.contactInfo}</Text>
                            <Ionicons name="md-arrow-forward" size={20} style={{ marginLeft: 'auto' }} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <Label style={[styles.inputLabel, { color: '#929292' }]}>{store.lang.ism}:</Label>
                        <Label style={[styles.inputLabel, { marginLeft: 'auto' }]}>{store.userInfo.name}</Label>
                    </View>
                    <View style={styles.row}>
                        <Label style={[styles.inputLabel, { color: '#929292' }]}>{store.lang.phoneNumber}:</Label>
                        <Label style={[styles.inputLabel, { marginLeft: 'auto' }]}>{store.userInfo.phone}</Label>
                    </View>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.contactInfo}>
                    <View style={[styles.row, { marginTop: 10 }]}>
                        <TouchableOpacity style={styles.cartBtns2} onPress={() => {
                            this.props.navigation.navigate("AddressBook")
                        }}>
                            <Text style={styles.number}>2</Text>
                            <Text style={styles.contactHead}>{store.lang.address}</Text>
                            <Ionicons name="md-arrow-forward" size={20} style={{ marginLeft: 'auto' }} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <Label style={styles.inputLabel}>{store.addressText}</Label>
                    </View>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.contactInfo}>
                    <View style={[styles.row, { marginTop: 10 }]}>
                        <TouchableOpacity style={styles.cartBtns2} onPress={() => {
                            this.props.navigation.navigate("SelectTime")
                        }}>
                            <Text style={styles.number}>3</Text>
                            <Text style={styles.contactHead}>{store.lang.selectdatetime}</Text>
                            <Ionicons name="md-arrow-forward" size={20} style={{ marginLeft: 'auto' }} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <Label style={styles.inputLabel}>{store.dateText}  {store.timeText}</Label>
                    </View>
                </View>
                <View style={styles.divider}></View>
                <View style={styles.contactInfo}>
                    <View style={[styles.row, { marginTop: 10, marginBottom: 20 }]}>
                        <Text style={styles.number}>4</Text>
                        <Text style={styles.contactHead}>{store.lang.yourOrder}</Text>
                    </View>
                    <FlatList
                        extraData={this.state}
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        keyExtractor={this._keyExtractor}
                        renderItem={this.makeItems}
                        extraData={this.state}
                        ListFooterComponent={this.footer}
                        removeClippedSubviews
                        disableVirtualization />
                </View>
                <Button style={this.state.sended ? styles.userInfoBtn2 : styles.userInfoBtn} onPress={this.confirm}>
                    <Text style={styles.userInfoBtnText}>{store.lang.confirmorder}</Text>
                </Button>
            </Content>
            <Modal animationType="fade"
                transparent={true}
                onRequestClose={() => { this.setState({ modalVisible: false }) }}
                visible={this.state.modalVisible}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                    <SkypeIndicator color="#ffcc00" size={32} />
                </View>
            </Modal>
            <Dialog.Container visible={this.state.showDialog}>
                <Dialog.Description style={styles.dialogDetail}>
                    {store.lang.minimumSumma}
                </Dialog.Description>
                <Dialog.Button label="Ok " style={styles.dialogStyle2} onPress={() => {
                    this.setState({ showDialog: false });
                }} />
            </Dialog.Container>
        </Container>)
    }
}
