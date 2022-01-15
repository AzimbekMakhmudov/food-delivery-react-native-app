import React, { Component } from 'react';
import {
    StatusBar,
    Platform,
    View,
    Image,
    FlatList,
    Modal,
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
    List,
    ListItem,
    Input
} from 'native-base';
import styles from '../tabs/ContainTabStyle';
import Ionicons from "react-native-vector-icons/Ionicons";
import Communications from 'react-native-communications';
import store from '../store/store.js';
import { observer } from 'mobx-react';
import {
    WaveIndicator
} from 'react-native-indicators';
import Toast from 'react-native-simple-toast';
import Dialog from 'react-native-dialog';

@observer
export default class OrderStatus extends Component {
    state = {
        data: [],
        text: "",
        id: 0,
        star: 0,
        otziv: "",
        modalVisible: false,
        child: false,
        idSelected: -1,
        deleteOrderModal: false,
        idDelete: -1,
        nodata: false
    }

    timer = null;

    constructor(props) {
        super(props);

        this.makeItems = this.makeItems.bind(this);
        this.empty = this.empty.bind(this);
        this.get = this.get.bind(this);
    }

    componentDidMount() {
        this.timer = setInterval(this.get, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    get() {
        this.getData(store.deviceId);
    }

    getData = (val) => {
        return fetch(store.url + '/app_api/mobile/mobile.php?is_order_status=1&deviceId=' + val)
            .then((response) => response.json())
            .then(async (responseJson) => {
                if (typeof responseJson.order != 'undefined') {
                    var json = responseJson.order;
                    this.setState({ data: json });
                    this.setState({ nodata: true });
                } else {
                    this.setState({ nodata: false });
                }
            })
            .catch((error) => {

            });
    }

    async onSubmit() {
        let data = "is_order_comment=1&orderId=" + this.state.id + "&otzivs=" + this.state.otziv + "&comment=" + this.state.text + "&star=" + this.state.star + "&deviceId=" + store.deviceId;
        const rawResponse = fetch(store.url + '/app_api/mobile/mobile.php?' + data).then((response) => response.json())
            .then((responseJson) => {
            }).catch((error) => {
            });;

        this.setState({ id: 0 });
        this.setState({ text: "" });
        this.setState({ otziv: "" });
        this.setState({ star: 5 });

        Toast.showWithGravity(store.lang.thanks, Toast.SHORT, Toast.CENTER);
    }

    deleteOrder() {
        return fetch(store.url + '/app_api/mobile/mobile.php?is_order_cancel=1&orderId=' + this.state.idDelete + '&deviceId=' + store.deviceId)
            .then((response) => response.json())
            .then((responseJson) => {

            })
            .catch((error) => {
            });
    }

    confirm(id) {
        this.setState({ modalVisible: true });
        this.setState({ id: id });
        /*return fetch('https://xumsan.uz/web/api/order/confirm?orderId=' + id)
            .then((response) => response.json())
            .then((responseJson) => {
                this.getData(store.deviceId);
            })
            .catch((error) => {
            });*/
    }

    _render(data) {
        var items = [];
        if (data == 0) {
            return (<View style={{ width: '100%', height: 60, justifyContent: 'center' }}>
                <UIActivityIndicator color="#ffcc00" size={24} />
            </View>)
        } else {
            for (let i in data) {
                items[i] = (
                    <ListItem key={i} style={{ flexDirection: 'row', marginLeft: 0, borderBottomWidth: 0, minHeight: 30, marginRight: 0, padding: 0 }}>
                        <Text style={styles.statusCount}>x{data[i].product_quantity}</Text>
                        <Text style={styles.statusProduct} numberOfLines={1}>{data[i].product_name}</Text>
                        <Text style={styles.statusSumma}>{this.changeToString(data[i].product_price * data[i].product_quantity)}</Text>
                    </ListItem>);
            }
            return items;
        }
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

    loadData(id) {
        if (!this.state.child || this.state.idSelected != id) {
            this.setState({ idSelected: id });
            this.setState({ child: true });
        } else {
            this.setState({ idSelected: -1 });
            this.setState({ child: false });
        }

    }

    makeItems({ item }) {
        item.current_state = parseInt(item.current_state);
        return (<TouchableOpacity activeOpacity={1} onPress={() => {
            this.loadData(item.id);
        }}>
            <View style={styles.statusContainer} key={item.id}>
                <View style={[styles.row, { marginTop: 10 }]}>
                    <TouchableOpacity onPress={() => {
                        this.setState({ deleteOrderModal: true });
                        this.setState({ idDelete: item.id });
                    }} activeOpacity={1} style={{ flexDirection: 'row', marginLeft: 'auto', paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5, borderWidth: 1, borderRadius: 10, borderColor: '#ddd' }}>
                        <Text style={[styles.simpleText, { textAlign: 'center' }]}>{store.lang.cancel}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <Text style={styles.head}>{store.lang.orderText}: {item.id} </Text>
                    <Button style={styles.floatRight} rounded transparent onPress={() => {
                        Communications.phonecall('+998994007000', true)
                    }}>
                        <Image style={styles.opImage} source={require("../../assets/img/operator.png")} />
                    </Button>
                </View>
                <View style={[styles.row, { marginTop: 20 }]}>
                    <View style={styles.situationBox}>
                        <View style={[styles.situationLine, (item.current_state >= 4) ? { borderColor: 'green' } : { borderColor: '#929292' }]}></View>
                        <View style={styles.leftCircle}>
                            <View style={[styles.circle, (item.current_state >= 3) ? { borderColor: 'green' } : { borderColor: '#929292' }]}>
                                {
                                    item.current_state == 6 && (
                                        <View style={styles.inlineCircle}>

                                        </View>
                                    )
                                }
                                {
                                    (item.current_state >= 3) && (
                                        <Ionicons name="ios-checkmark-circle" size={28} color="green" style={{ alignSelf: 'center' }} />
                                    )
                                }
                            </View>
                            <Text style={styles.simpleText}>{store.lang.waiting}</Text>
                        </View>
                    </View>
                    <View style={styles.situationBox}>
                        <View style={[styles.situationLine, item.current_state > 4 ? { borderColor: 'green' } : { borderColor: '#929292' }]}></View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.leftCircle, { marginLeft: 'auto', marginRight: 'auto' }]}>
                                <View style={[styles.circle, item.current_state >= 4 ? { marginLeft: 'auto', borderColor: 'green' } : { marginLeft: 'auto', borderColor: '#929292' }]}>
                                    {
                                        (item.current_state < 4) && (
                                            <View style={styles.inlineCircle}>

                                            </View>
                                        )
                                    }
                                    {
                                        item.current_state >= 4 && (
                                            <Ionicons name="ios-checkmark-circle" size={28} color="green" style={{ alignSelf: 'center' }} />
                                        )
                                    }
                                </View>
                                <Text style={styles.simpleText}>{store.lang.onWay}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.situationBox}>
                        <View style={[styles.situationLine, item.current_state == 5 ? { borderColor: 'green' } : { borderColor: '#929292' }]}></View>
                        <View style={[styles.leftCircle, { marginLeft: 'auto' }]}>
                            <View style={[styles.circle, (item.current_state == 5) ? { marginLeft: 'auto', borderColor: 'green' } : { marginLeft: 'auto', borderColor: '#929292' }]}>
                                {
                                    (item.current_state < 5) && (
                                        <View style={styles.inlineCircle}>

                                        </View>
                                    )
                                }
                                {
                                    (item.current_state == 5) && (
                                        <Ionicons name="ios-checkmark-circle" size={28} color="green" style={{ alignSelf: 'center' }} />
                                    )
                                }
                            </View>
                            <Text style={styles.simpleText}>{store.lang.delivired}</Text>
                        </View>
                    </View>
                </View>
                <ListItem style={{ marginLeft: 0, borderBottomWidth: 0, minHeight: 30, marginRight: 0, padding: 0 }} onPress={() => {
                    this.loadData(item.id);
                }}>
                    <Text style={styles.statusCount}>{store.lang.orderDate}:</Text>
                    <Text style={styles.statusSumma}>{item.date_add}</Text>
                </ListItem>
                <ListItem style={{ marginLeft: 0, borderBottomWidth: 0, minHeight: 30, marginRight: 0, padding: 0 }} onPress={() => {
                    this.loadData(item.id);
                }}>
                    <Text style={styles.statusCount}>{store.lang.deliverDate}:</Text>
                    <Text style={styles.statusSumma}>{item.delivery_date}</Text>
                </ListItem>
                <ListItem style={{ marginLeft: 0, borderBottomWidth: 0, minHeight: 30, marginRight: 0, padding: 0 }} onPress={() => {
                    this.loadData(item.id);
                }}>
                    <Text style={styles.statusCount}>{store.lang.countP}:</Text>
                    <Text style={styles.statusSumma}>{Object.keys(item.associations.order_rows).length}</Text>
                </ListItem>
                {
                    this.state.idSelected == item.id && this.state.child && (<List style={{ marginTop: 10, marginBottom: 20, borderTopWidth: 1, borderColor: '#ddd', paddingTop: 10 }}>
                        {
                            this._render(item.associations.order_rows)
                        }
                        <ListItem style={{ marginTop: 10, marginLeft: 0, borderBottomWidth: 0, minHeight: 30, marginRight: 0, borderTopWidth: 1, borderColor: '#ddd', paddingTop: 10, paddingBottom: 0 }} onPress={() => {
                            this.loadData(item.id);
                        }}>
                            <Text style={styles.statusTotal}>{store.lang.footerSum}</Text>
                            <Text style={styles.statusTotalSumma}>{this.changeToString(item.total_paid)}</Text>
                        </ListItem>
                    </List>)
                }
                <ListItem style={{ marginLeft: 0, borderBottomWidth: 0, marginRight: 0 }} onPress={() => {
                    this.loadData(item.id);
                }}>
                    <Text style={[styles.answer, { textAlign: 'center' }]}>{store.lang.leavereview}</Text>
                </ListItem>
                <Button style={styles.deliveryBtn} onPress={() => {
                    this.confirm(item.id);
                }}>
                    <Text style={styles.deliveryBtnText}>{store.lang.review}</Text>
                </Button>
            </View>
        </TouchableOpacity>);
    }

    _keyExtractor = (item, index) => "c_" + item.id;

    empty() {
        return (<View style={styles.emptyBox}>
            <Text style={styles.emptyHeaderText}>{store.lang.noActiveOrder}</Text>
        </View>);
    }

    render() {
        StatusBar.setBarStyle('light-content', true);
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('#ffbb00', true);
            StatusBar.setTranslucent(true);
        }

        if (!this.state.nodata) {
            return (<Container style={styles.container}>
                <Header style={styles.searchBarContainer}>
                    <Left style={styles.leftAppBar}>
                        <Button transparent onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                            <Ionicons name="ios-arrow-back" size={24} color="#000" />
                        </Button>
                    </Left>
                    <Body style={{ width: '80%' }}>
                        <Text style={styles.headerTextOther}>{store.lang.deliveryText}</Text>
                    </Body>
                    <Right style={styles.rightAppBar}>

                    </Right>
                </Header>
                <Content>
                    <View style={styles.emptyBox}>
                        <View style={styles.roundedBox}>
                            <Image source={require('../../assets/img/logo.jpg')} style={{ width: '100%', height: '100%' }} />
                        </View>
                        <View style={styles.activityIndicator}>
                            <WaveIndicator color="#ffcc00" />
                        </View>
                    </View>
                </Content>
            </Container>);
        } else {
            return (<Container>
                <Header style={styles.searchBarContainer}>
                    <Left style={styles.leftAppBar}>
                        <Button transparent onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                            <Ionicons name="ios-arrow-back" size={24} color="#000" />
                        </Button>
                    </Left>
                    <Body style={{ width: '80%' }}>
                        <Text style={styles.headerTextOther}>{store.lang.deliveryText}</Text>
                    </Body>
                    <Right style={styles.rightAppBar}>

                    </Right>
                </Header>
                <View style={styles.bodyWithoutFooter}>
                    <FlatList
                        extraData={this.state}
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        keyExtractor={this._keyExtractor}
                        renderItem={this.makeItems}
                        extraData={this.state}
                        ListFooterComponent={this.footer}
                        ListEmptyComponent={this.empty}
                        removeClippedSubviews
                        disableVirtualization />
                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { this.setState({ modalVisible: false }) }}>
                    <View style={styles.modal}>
                        <View style={styles.modalPanel}>
                            <Text style={styles.head}>{store.lang.rating}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
                                <TouchableOpacity style={styles.imojiBtn} onPress={() => {
                                    this.setState({ star: 1 });
                                    this.setState({ otziv: store.lang.Worst });
                                }}>
                                    <Image source={require("../../assets/img/5.png")} style={[styles.imojis, this.state.star != 0 && this.state.star != 1 ? { opacity: 0.3 } : { opacity: 1 }]} />
                                    <Text style={[styles.simpleText2, this.state.star != 0 && this.state.star != 1 ? { opacity: 0.3 } : { opacity: 1 }]}>{store.lang.Worst}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.imojiBtn} onPress={() => {
                                    this.setState({ star: 2 });
                                    this.setState({ otziv: store.lang.bad });
                                }}>
                                    <Image source={require("../../assets/img/4.png")} style={[styles.imojis, this.state.star != 0 && this.state.star != 2 ? { opacity: 0.3 } : { opacity: 1 }]} />
                                    <Text style={[styles.simpleText2, this.state.star != 0 && this.state.star != 2 ? { opacity: 0.3 } : { opacity: 1 }]}>{store.lang.bad}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.imojiBtn} onPress={() => {
                                    this.setState({ star: 3 });
                                    this.setState({ otziv: store.lang.normal });
                                }}>
                                    <Image source={require("../../assets/img/3.png")} style={[styles.imojis, this.state.star != 0 && this.state.star != 3 ? { opacity: 0.3 } : { opacity: 1 }]} />
                                    <Text style={[styles.simpleText2, this.state.star != 0 && this.state.star != 3 ? { opacity: 0.3 } : { opacity: 1 }]}>{store.lang.normal}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.imojiBtn} onPress={() => {
                                    this.setState({ star: 4 });
                                    this.setState({ otziv: store.lang.good });
                                }}>
                                    <Image source={require("../../assets/img/2.png")} style={[styles.imojis, this.state.star != 0 && this.state.star != 4 ? { opacity: 0.3 } : { opacity: 1 }]} />
                                    <Text style={[styles.simpleText2, this.state.star != 0 && this.state.star != 4 ? { opacity: 0.3 } : { opacity: 1 }]}>{store.lang.good}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.imojiBtn} onPress={() => {
                                    this.setState({ star: 5 });
                                    this.setState({ otziv: store.lang.best });
                                }}>
                                    <Image source={require("../../assets/img/1.png")} style={[styles.imojis, this.state.star != 0 && this.state.star != 5 ? { opacity: 0.3 } : { opacity: 1 }]} />
                                    <Text style={[styles.simpleText2, this.state.star != 0 && this.state.star != 5 ? { opacity: 0.3 } : { opacity: 1 }]}>{store.lang.best}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.inputBox}>
                                <Input placeholder={store.lang.writeReview} onChangeText={(text) => {
                                    this.setState({ text: text });
                                }} style={styles.input} />
                            </View>
                            <View style={styles.bottomModal}>
                                <TouchableOpacity activeOpacity={1} style={styles.bottomBtn} onPress={() => {
                                    this.setState({ modalVisible: false })
                                }}>
                                    <Text style={styles.bottomBtnText}>{store.lang.cancel}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={1} style={styles.bottomBtn} onPress={() => {
                                    this.setState({ modalVisible: false })
                                    this.onSubmit();
                                }}>
                                    <Text style={styles.bottomBtnText}>{store.lang.send}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Dialog.Container visible={this.state.deleteOrderModal}>
                    <Dialog.Title style={[styles.dialogTitle, { width: '100%' }]}>{store.lang.deleteOrder}</Dialog.Title>
                    <Dialog.Button style={styles.dialogStyle} label={store.lang.cancel} onPress={() => {
                        this.setState({ deleteOrderModal: false });
                    }} />
                    <Dialog.Button label="Ok " style={styles.dialogStyle2} onPress={() => {
                        this.setState({ deleteOrderModal: false });
                        this.deleteOrder();
                    }} />
                </Dialog.Container>
            </Container>)
        }
    }
}