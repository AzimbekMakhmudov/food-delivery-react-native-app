import React, { Component } from 'react';
import {
    StatusBar,
    Platform,
    View,
    TouchableOpacity,
    BackHandler
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
    ListItem
} from 'native-base';
import styles from '../tabs/ContainTabStyle';
import Ionicons from "react-native-vector-icons/Ionicons";
import store from '../store/store.js';
import { observer } from 'mobx-react';
import Dialog from 'react-native-dialog';
import {
    UIActivityIndicator
} from 'react-native-indicators';

@observer
export default class OrderBox extends Component {
    state = {
        loadingName: "",
        child: false,
        dataSource: 0,
        showTrashDialog: false,
        showOrderBox: false
    }

    constructor(props) {
        super(props);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        this.loadData = this.loadData.bind(this);
        this.handleBackPress = this.handleBackPress.bind(this);
    }


    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.state.params.onGoBack();
    }

    loadData(name) {
        if (!this.state.child) {
            this.setState({ loadingName: name });

            let buyed = '';
            for (let i in store.orderBook[name].products) {
                buyed += i + ',';
            }

            buyed = buyed.slice(0, -1);

            this.getData(buyed);
            this.setState({ child: true });
        } else {
            this.setState({ dataSource: 0 });
            this.setState({ loadingName: "" });
            this.setState({ child: false });
        }

    }

    getData = (id) => {
        return fetch(store.url + '/app_api/mobile/mobile.php?filter=1&ids=' + id)
            .then((response) => response.json())
            .then((responseJson) => {
                var json = responseJson.products;
                if (json.length > 0) {
                    this.setState({
                        dataSource: json
                    });
                } else {
                    this.setState({
                        dataSource: 0
                    });
                }
            })
            .catch((error) => {

            });
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

    _getItem() {
        var items = [];
        for (let i in this.state.dataSource) {
            let data = this.state.dataSource[i];
            let name = [data.name_4, data.name_4];
            var price = store.orderBook[this.state.loadingName].products[data.id] * data.price;
            items[i] = (<ListItem key={i} style={{ marginLeft: 0, borderBottomWidth: 0, height: 40, marginRight: 0 }}>
                <Text style={styles.statusCount}>x{store.orderBook[this.state.loadingName].products[data.id]}</Text>
                <Text style={styles.statusProduct} numberOfLines={1}>{name[store.langId - 1]}</Text>
                <Text style={styles.statusSumma}>{this.changeToString(price)}</Text>
            </ListItem>);
        }
        return items;
    }

    _loadProducts() {
        if (this.state.dataSource == 0) {
            return (<View style={{ width: '100%', height: 60, justifyContent: 'center' }}>
                <UIActivityIndicator color="#ffcc00" size={24} />
            </View>)
        } else {
            return (<List style={{ marginTop: 10, paddingLeft: 20, marginBottom: 20, borderTopWidth: 1, borderColor: '#ddd', paddingTop: 10 }}>
                {
                    this._getItem()
                }
            </List>)
        }
    }

    deleteOrder(name) {
        this.setState({ loadingName: name });
        this.setState({ showTrashDialog: true });
    }

    uploadTo(name) {
        this.setState({ loadingName: name });
        this.setState({ showOrderBox: true });
    }

    _renderItem() {
        var items = [];
        var m = 0;
        for (let i in store.orderBook) {
            items[m] = (
                <TouchableOpacity key={m} activeOpacity={1} onPress={() => this.loadData(i)}>
                    <View style={styles.shablonCart}>
                        <View style={{ marginLeft: 'auto', marginBottom: 10, marginRight: 10, marginTop: 10, flexDirection: 'row' }}>
                            <Button transparent rounded style={styles.cartBtns} onPress={() => this.deleteOrder(i)}>
                                <Ionicons name="ios-trash" size={18} color="#000" />
                            </Button>
                        </View>
                        <View style={[styles.row, { marginTop: 10 }]}>
                            <Text style={styles.statusProduct}>{store.lang.name}:</Text>
                            <Text style={[styles.statusTotal, { marginLeft: 'auto', marginRight: 20 }]}>{i}</Text>
                        </View>
                        <View style={[styles.row, { marginTop: 10 }]}>
                            <Text style={styles.statusProduct}>{store.lang.totalSum}:</Text>
                            <Text style={[styles.statusTotal, { marginLeft: 'auto', marginRight: 20 }]}>{this.changeToString(store.orderBook[i].summa)}</Text>
                        </View>
                        <View style={[styles.row, { marginTop: 10 }]}>
                            <Text style={styles.statusProduct}>{store.lang.countP}:</Text>
                            <Text style={[styles.statusTotal, { marginLeft: 'auto', marginRight: 20 }]}>{Object.keys(store.orderBook[i].products).length}</Text>
                        </View>
                        {
                            this.state.loadingName == i && this.state.child && this._loadProducts()
                        }
                        <View style={{ marginLeft: 20, marginRight: 20 }}>
                            <Button style={styles.deliveryBtn} onPress={() => this.uploadTo(i)}>
                                <Text style={styles.deliveryBtnText}>{store.lang.addCart}</Text>
                            </Button>
                        </View>
                    </View>
                </TouchableOpacity>);
            m++;
        }
        return items;

    }

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
                        <Text style={styles.headerTextOther}>{store.lang.usualorders}</Text>
                    </Body>
                    <Right style={styles.rightAppBar}>

                    </Right>
                </Header>
                <Content>
                    {
                        Object.keys(store.orderBook).length > 0 && this._renderItem()
                    }
                    {
                        Object.keys(store.orderBook).length == 0 && (
                            <View style={styles.emptyBox}>
                                <Text style={styles.emptyHeaderText}>{store.lang.emptyUsualOrders}</Text>

                                <Text style={styles.emptySubHeaderText}>
                                    {store.lang.emptyUsualOrdersSub}
                                </Text>
                            </View>)
                    }

                    <Dialog.Container visible={this.state.showTrashDialog}>
                        <Dialog.Title style={styles.dialogTitle}>{store.lang.deleteAllTitle}</Dialog.Title>
                        <Dialog.Description style={styles.dialogDetail}>
                            {store.lang.deleteAllText}
                        </Dialog.Description>
                        <Dialog.Button style={styles.dialogStyle} label={store.lang.cancel} onPress={() => {
                            this.setState({ showTrashDialog: false });
                        }} />
                        <Dialog.Button style={styles.dialogStyle2} label="Ok " onPress={() => {
                            this.setState({ showTrashDialog: false });
                            store.deleteOrderBook(this.state.loadingName);
                        }} />
                    </Dialog.Container>

                    <Dialog.Container visible={this.state.showOrderBox}>
                        <Dialog.Title style={[styles.dialogTitle, { width: '100%' }]}>{store.lang.addtocart}</Dialog.Title>
                        <Dialog.Button style={styles.dialogStyle} label={store.lang.cancel} onPress={() => {
                            this.setState({ showOrderBox: false });
                        }} />
                        <Dialog.Button label="Ok " style={styles.dialogStyle2} onPress={() => {
                            this.setState({ showOrderBox: false });
                            store.uploadToCart(this.state.loadingName);
                        }} />
                    </Dialog.Container>
                </Content>
            </Container>)
    }
}