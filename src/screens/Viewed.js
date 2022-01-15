import React, { Component } from 'react';
import {
    StatusBar,
    Platform,
    View,
    FlatList,
    RefreshControl,
    Image,
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
    Button
} from 'native-base';
import styles from '../tabs/ContainTabStyle';
import Ionicons from "react-native-vector-icons/Ionicons";
import CategoryItem from '../components/CategoryItem';
import store from '../store/store.js';
import { observer } from 'mobx-react';
import Dialog from 'react-native-dialog';
import {
    WaveIndicator
} from 'react-native-indicators';
import BottomCart from '../components/Cart';

@observer
export default class Viewed extends Component {
    state = {
        dataSource: 0,
        refreshing: false,
        scrolled: false,
        showTrashDialog: false
    }

    constructor(props) {
        super(props);

        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        this.makeItems = this.makeItems.bind(this);
        this.refresh = this.refresh.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.header = this.header.bind(this);
        this.reset = this.reset.bind(this);
        this.handleBackPress = this.handleBackPress.bind(this);
    }

    componentDidMount() {
        let visited = '';
        for (let i in store.viewed) {
            visited += i + ',';
        }

        visited = visited.slice(0, -1);

        this.getData(visited);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        this.props.navigation.state.params.onGoBack();
    }

    getData = (id) => {
        var lan = 0;
        if (store.langId == 1)
            lan = 2;
        else if (store.langId == 2)
            lan = 1;
        return fetch(store.url + '/app_api/mobile/mobile.php?filter=1&ids=' + id)
            .then((response) => response.json())
            .then((responseJson) => {
                var json = responseJson.products;

                var array = [];

                this.setState({
                    dataSource: []
                });
                if (Object.keys(json).length > 0) {
                    for (let i in json) {
                        if (i % 2 == 0) {
                            array[0] = json[i];
                            if (Object.keys(json).length == (parseInt(i) + 1)) {
                                this.setState({
                                    dataSource: [...this.state.dataSource, array]
                                });
                                array = [];
                            }
                        } else {
                            array[1] = json[i];
                            this.setState({
                                dataSource: [...this.state.dataSource, array]
                            });
                            array = [];
                        }

                    }
                }
                this.setState({ refreshing: false });
            })
            .catch((error) => {
            });
    }

    onScroll() {
        this.setState({
            scrolled: !this.state.scrolled
        });
    }

    reset() {
        if (Object.keys(store.viewed).length > 0)
            this.setState({ showTrashDialog: true });
    }

    refresh() {
        let visited = '';
        for (let i in store.viewed) {
            visited += i + ',';
        }

        visited = visited.slice(0, -1);

        this.getData(visited);
    }

    makeItems({ item }) {
        var items = [];
        for (let i in item) {
            var imageUrl = item[i].image + "-home_default/" + item[i].link_rewrite + ".jpg";
            let name = [item[i].name_4, item[i].name_4];
            items[i] = (
                <TouchableOpacity key={item[i].id} activeOpacity={1} onPress={() => {
                    this.props.navigation.navigate("ProductDetail", {
                        id: item[i].id,
                        count: store.count[item[i].id] > 0 ? store.count[item[i].id] : 0,
                        onGoBack: this.onScroll
                    });
                }}>
                    <CategoryItem
                        id={item[i].id}
                        image_url={imageUrl}
                        price={item[i].price}
                        stock_available_quantity={item[i].stock_available_quantity}
                        count={store.count[item[i].id] > 0 ? store.count[item[i].id] : 0}
                        name={name[store.langId - 1]}
                        liked={store.liked[item[i].id] ? true : false}
                        sale={item[i].quantity_discount}
                        newProduct={item[i].new > 0? true : false}
                        star={item[i].star}
                        onChange={this.onScroll}
                    />
                </TouchableOpacity>);
        }
        return (<View style={styles.categoryList}>
            {
                items
            }
        </View>);
    }

    header() {
        return (
            <View style={styles.filterPart}>
                <View style={styles.filterHeader}>
                    <Button transparent rounded style={styles.cartBtns} onPress={this.reset}>
                        <Ionicons name="ios-trash" size={16} color="#000" />
                    </Button>
                </View>
            </View>);
    }

    _keyExtractor = (item, index) => "c_" + item.id;

    render() {
        StatusBar.setBarStyle('light-content', true);
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('#ffbb00', true);
            StatusBar.setTranslucent(true);
        }
        if (this.state.dataSource === 0) {
            return (<Container style={styles.container}>
                <Header style={styles.searchBarContainer}>
                    <Left style={styles.leftAppBar}>
                        <Button transparent onPress={() => {
                            this.props.navigation.state.params.onGoBack();
                            this.props.navigation.goBack();
                        }}>
                            <Ionicons name="ios-arrow-back" size={24} color="#000" />
                        </Button>
                    </Left>
                    <Body style={styles.bodyAppBar}>
                        <Text style={styles.headerTextOther}>{store.lang.viewed}</Text>
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
            if (Object.keys(this.state.dataSource).length == 0) {
                return (
                    <Container style={styles.container}>
                        <Header style={styles.searchBarContainer}>
                            <Left style={styles.leftAppBar}>
                                <Button transparent onPress={() => {
                                    this.props.navigation.state.params.onGoBack();
                                    this.props.navigation.goBack()
                                }}>
                                    <Ionicons name="ios-arrow-back" size={24} color="#000" />
                                </Button>
                            </Left>
                            <Body style={styles.bodyAppBar}>
                                <Text style={styles.headerTextOther}>{store.lang.viewed}</Text>
                            </Body>
                            <Right style={styles.rightAppBar}>
                            </Right>
                        </Header>
                        <Content style={{width: '100%'}}>
                            <View style={styles.emptyBox}>
                                <Text style={styles.emptyHeaderText}>{store.lang.viewedempty}</Text>

                                <Text style={styles.emptySubHeaderText}>
                                    {
                                        store.lang.viewedemptySub
                                    }
                                </Text>
                            </View>
                        </Content>
                    </Container>

                );
            } else {
                return (<Container>
                    <Header style={styles.searchBarContainer}>
                        <Left style={styles.leftAppBar}>
                            <Button transparent onPress={() => {
                                this.props.navigation.state.params.onGoBack();
                                this.props.navigation.goBack();
                            }}>
                                <Ionicons name="ios-arrow-back" size={24} color="#000" />
                            </Button>
                        </Left>
                        <Body style={styles.bodyAppBar}>
                            <Text style={styles.headerTextOther}>{store.lang.viewed}</Text>
                        </Body>
                        <Right style={styles.rightAppBar}>
                        </Right>
                    </Header>
                        <View style={styles.bodyWithoutFooter}>
                            <FlatList
                                extraData={this.state}
                                showsVerticalScrollIndicator={false}
                                data={this.state.dataSource}
                                keyExtractor={this._keyExtractor}
                                renderItem={this.makeItems}
                                ListHeaderComponent={this.header}
                                extraData={this.state}
                                onScroll={this.onScroll}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.refreshing}
                                        onRefresh={this.refresh.bind(this)}
                                    />
                                }
                                initialNumToRender={3}
                                removeClippedSubviews
                                disableVirtualization />
                        </View>
                        <BottomCart go={() => this.props.navigation.navigate("ContainTabCart")} />
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
                                store.resetViewed();
                                this.refresh();
                            }} />
                        </Dialog.Container>
                </Container>)
            }
        }
    }
}