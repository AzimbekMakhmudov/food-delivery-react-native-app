import React, { Component } from 'react';
import {
    StatusBar,
    Platform,
    Image,
    View,
    FlatList,
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
    ListItem,
    List
} from 'native-base';
import styles from '../tabs/ContainTabStyle';
import Ionicons from "react-native-vector-icons/Ionicons";
import store from '../store/store.js';
import { observer } from 'mobx-react';
import {
    WaveIndicator
} from 'react-native-indicators';

@observer
export default class OrderHistory extends Component {
    state = {
        data: [],
        loading: false,
        id: -1,
        child: false,
        nodata: false
    }

    constructor(props) {
        super(props);

        this.makeItems = this.makeItems.bind(this);
        this.empty = this.empty.bind(this);
    }

    componentDidMount() {
        this.getData(store.deviceId);
    }

    getData = (val) => {
        return fetch(store.url + '/app_api/mobile/mobile.php?is_order_history=1&deviceId=' + val)
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

    _render(data) {
        var items = [];
        for (let i in data) {
            var name = [data[i].name, data[i].name_rus, data[i].name_en];
            items[i] = (
                <ListItem key={i} style={{ marginLeft: 0, borderBottomWidth: 0, marginRight: 0 }}>
                    <Text style={styles.statusCount}>x{data[i].product_quantity}</Text>
                    <Text style={styles.statusProduct}>{data[i].product_name}</Text>
                    <Text style={styles.statusSumma}>{this.changeToString(data[i].product_price * data[i].product_quantity)}</Text>
                </ListItem>);
        }
        return items;
    }

    loadData(id) {
        if (!this.state.child || this.state.id != id) {
            this.setState({ id: id });
            this.setState({ child: true });
        } else {
            this.setState({ id: -1 });
            this.setState({ child: false });
        }

    }

    makeItems({ item }) {
        return (<TouchableOpacity activeOpacity={1} onPress={() => {
            this.loadData(item.id)
        }}>
            <View style={styles.statusContainer}>
            <View style={[styles.row, { marginTop: 10 }]}>
                <Text style={styles.head}>{store.lang.orderText}: {item.id} </Text>
            </View>
            <ListItem style={{ marginLeft: 0, borderBottomWidth: 0, marginRight: 0, padding: 0 }} onPress={() => {
            this.loadData(item.id)
        }}>
                <Text style={styles.statusCount}>{store.lang.orderDate}:</Text>
                <Text style={styles.statusSumma}>{item.date_add}</Text>
            </ListItem>
            <ListItem style={{ marginLeft: 0, borderBottomWidth: 0, marginRight: 0, padding: 0 }} onPress={() => {
            this.loadData(item.id)
        }}>
                <Text style={styles.statusCount}>{store.lang.deliverDate}:</Text>
                <Text style={styles.statusSumma}>{item.delivery_date}</Text>
            </ListItem>
            <ListItem style={{ marginLeft: 0, borderBottomWidth: 0, marginRight: 0, padding: 0 }} onPress={() => {
            this.loadData(item.id)
        }}>
                <Text style={styles.statusCount}>{store.lang.deliveryText}:</Text>
                <Text style={item.current_state == 5?styles.statusStatus:styles.statusStatus2}>{item.current_state == 5?store.lang.delivered:store.lang.canceled}</Text>
            </ListItem>
            {
                this.state.id == item.id && this.state.child && (
                <List style={{ marginTop: 10, marginBottom: 20, borderTopWidth: 1, borderColor: '#ddd', paddingTop: 10 }}>
                {
                    this._render(item.associations.order_rows)
                }
                <ListItem style={{ marginTop: 10, marginLeft: 0, borderBottomWidth: 0, marginRight: 0, borderTopWidth: 1, borderColor: '#ddd', paddingTop: 10, paddingBottom: 0 }}>
                    <Text style={styles.statusTotal}>{store.lang.footerSum}</Text>
                    <Text style={styles.statusTotalSumma}>{this.changeToString(item.total_paid)}</Text>
                </ListItem>
            </List>)
            }
        </View>
        </TouchableOpacity>)
    }

    changeToString = (val) => {
        var str = "";
        if (Math.floor(val / 1000) > 0) {
            var v = val / 1000;
            var dec1 = val - Math.floor(v) * 1000;
            if (dec1 > 0) {
                if(dec1 < 10)
                  dec1 = "00" +  dec1;
                else if(dec1 < 100)
                  dec1 = "0" + dec1;   
                str = str + dec1;
              }
            else
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

    empty() {
        return (<View style={styles.emptyBox}>
            <Text style={styles.emptyHeaderText}>{store.lang.noHistory}</Text>
        </View>);
    }

    _keyExtractor = (item, index) => "c_" + item.ID;

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
                    <Body style={styles.bodyAppBar}>
                        <Text style={styles.headerTextOther}>{store.lang.myOrders}</Text>
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
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                            <Ionicons name="ios-arrow-back" size={24} color="#000" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={styles.headerTextOther}>{store.lang.myOrders}</Text>
                    </Body>
                    <Right>

                    </Right>
                </Header>
                <Content>
                    <View style={styles.bodyWithoutFooter}>
                        <FlatList
                            extraData={this.state}
                            showsVerticalScrollIndicator={false}
                            data={this.state.data}
                            keyExtractor={this._keyExtractor}
                            renderItem={this.makeItems}
                            extraData={this.state}
                            ListEmptyComponent={this.empty}
                            removeClippedSubviews
                            disableVirtualization />
                    </View>
                </Content>
            </Container>)
        }
    }
}