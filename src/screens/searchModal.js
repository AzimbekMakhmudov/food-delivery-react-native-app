import React, { Component } from 'react';
import {
    StatusBar,
    Platform,
    FlatList,
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
    Item,
    Input
} from 'native-base';
import styles from '../tabs/ContainTabStyle';
import Ionicons from "react-native-vector-icons/Ionicons";
import store from '../store/store.js';
import { observer } from 'mobx-react';
import CategoryItem from '../components/CategoryItem';
import {
    UIActivityIndicator,
    MaterialIndicator
} from 'react-native-indicators';

@observer
export default class SearchModal extends Component {
    state = {
        data: [],
        refreshing: false,
        searchText: "",
        scrolled: false,
        offset: 0,
        end: false,
        isMain: false
    }

    storage = 0;
    timer = null;

    constructor(props) {
        super(props);

        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        this.makeItems = this.makeItems.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.footer = this.footer.bind(this);
        this.handleBackPress = this.handleBackPress.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        if (typeof this.props.isMain !== 'undefined') {
            this.setState({ isMain: true });
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        if (!(typeof this.props.isMain !== 'undefined')) {
            this.props.navigation.state.params.onGoBack();
            //this.props.navigation.goBack();
        }
        /* else {
             this.props.goHome();  
             return true;
         }*/
    }

    onScroll() {
        this.setState({ scrolled: !this.state.scrolled });
        if (typeof this.props.onScroll !== 'undefined')
            this.props.onScroll();
    }

    getData = (text, data, isScrolled = false) => {
        this.setState({ searchText: text });
        var offset = 0;
        if (!isScrolled) {
            this.setState({ offset: 0 });
            this.setState({ data: [] });
        } else {
            offset = this.state.offset;
        }

        if (this.storage != 0 && isScrolled) {
            var pro = this.storage.slice(this.state.offset, (this.state.offset + 10));
            this.setState({ offset: this.state.offset + Object.keys(pro).length });
            this.setState({ data: data });

            if (Object.keys(pro).length > 0) {
                var array = [];

                if (Object.keys(pro).length < 10) {
                    this.setState({ end: true });
                }

                if (Object.keys(pro).length > 0) {
                    for (let i in pro) {
                        if (i % 2 == 0) {
                            array[0] = pro[i];
                            if (Object.keys(pro).length == (parseInt(i) + 1)) {
                                this.setState({
                                    data: [...this.state.data, array]
                                });
                                array = [];
                            }
                        } else {
                            array[1] = pro[i];
                            this.setState({
                                data: [...this.state.data, array]
                            });
                            array = [];
                        }

                    }
                    this.setState({ refreshing: false });
                } else {
                    this.setState({ refreshing: false });
                    this.setState({ end: true });
                }
            }
        } else {
            this.timer = setTimeout(() => {
                var lan = 0;
                if (store.langId == 1)
                    lan = 2;
                else if (store.langId == 2)
                    lan = 1;

                if (text.length > 2) {
                    this.setState({ refreshing: true });
                    return fetch(store.url + '/app_api/mobile/mobile.php?is_search=1&text=' + text)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            var products = responseJson.products;
                            this.storage = products;
                            var pro = products.slice(0, 10);
                            this.setState({ offset: Object.keys(pro).length });
                            this.setState({ data: data });

                            if (Object.keys(pro).length > 0) {
                                var array = [];

                                if (Object.keys(pro).length < 10) {
                                    this.setState({ end: true });
                                }

                                if (Object.keys(pro).length > 0) {
                                    for (let i in pro) {
                                        if (i % 2 == 0) {
                                            array[0] = pro[i];
                                            if (Object.keys(pro).length == (parseInt(i) + 1)) {
                                                this.setState({
                                                    data: [...this.state.data, array]
                                                });
                                                array = [];
                                            }
                                        } else {
                                            array[1] = pro[i];
                                            this.setState({
                                                data: [...this.state.data, array]
                                            });
                                            array = [];

                                        }

                                    }
                                    this.setState({ refreshing: false });
                                } else {
                                    this.setState({ refreshing: false });
                                    this.setState({ end: true });
                                }
                            }
                        })
                        .catch((error) => {

                        });
                } else {
                    this.setState({ refreshing: false });
                    this.setState({ data: {} });
                }
            }, 1000);
        }
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
                        count={store.count[item[i].id] > 0 ? store.count[item[i].id] : 0}
                        name={name[store.langId - 1]}
                        stock_available_quantity={item[i].stock_available_quantity}
                        liked={store.liked[item[i].id] ? true : false}
                        sale={item[i].quantity_discount}
                        newProduct={item[i].new > 0 ? true : false}
                        star={item[i].star}
                        onChange={this.props.onScroll}
                    />
                </TouchableOpacity>);
        }
        return (<View style={styles.categoryList}>
            {
                items
            }
        </View>);
    }

    footer() {
        if (this.state.refreshing && !this.state.end) {
            return (<View style={{ width: '100%', height: 60, justifyContent: 'center' }}>
                <View style={{ height: 40, marginTop: 10 }}>
                    <UIActivityIndicator color="#ffcc00" size={24} />
                </View>
            </View>)
        } else {
            return (<View style={{ width: 0, height: 0 }}></View>);
        }
    }

    _keyExtractor = (item, index) => "aaa" + item[0].id;

    render() {
        StatusBar.setBarStyle('light-content', true);
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('#ffbb00', true);
            StatusBar.setTranslucent(true);
        }
        if (Object.keys(this.state.data).length == 0 && this.state.refreshing) {
            return (<Container style={this.state.isMain ? styles.container : {}}>
                <Header searchBar style={styles.searchBarContainer}>
                    {
                        !this.state.isMain ? (<Left style={styles.leftAppBar}>
                            <Button transparent onPress={() => {
                                this.props.navigation.state.params.onGoBack();
                                this.props.navigation.goBack();
                            }}>
                                <Ionicons name="ios-arrow-back" size={24} color="#000" />
                            </Button>
                        </Left>) : (<Left style={styles.leftAppBar}>
                        </Left>)
                    }
                    <Body style={styles.bodyAppBar}>
                        <Item style={styles.searchBar}>
                            <Input style={styles.inputTextCat}
                                placeholder={store.lang.search}
                                autoFocus={true}
                                onChangeText={(text) => this.getData(text, [])} />
                        </Item>
                    </Body>
                    <Right style={styles.rightAppBar}>
                    </Right>
                </Header>
                <Content>
                    <View style={{ height: 40, marginTop: 60, alignSelf: 'center' }}>
                        <MaterialIndicator color="#ffcc00" size={32} />
                    </View>
                </Content>
            </Container>)
        } else if (Object.keys(this.state.data).length === 0 && !this.state.refreshing) {
            return (<Container style={this.state.isMain ? styles.container : {}}>
                <Header searchBar style={styles.searchBarContainer}>
                    {
                        !this.state.isMain ? (<Left style={styles.leftAppBar}>
                            <Button transparent onPress={() => {
                                this.props.navigation.state.params.onGoBack();
                                this.props.navigation.goBack();
                            }}>
                                <Ionicons name="ios-arrow-back" size={24} color="#000" />
                            </Button>
                        </Left>) : (<Left style={styles.leftAppBar}>
                        </Left>)
                    }
                    <Body style={styles.bodyAppBar}>
                        <Item style={styles.searchBar}>
                            <Input style={styles.inputTextCat}
                                placeholder={store.lang.search}
                                autoFocus={true}
                                onChangeText={(text) => this.getData(text, [])} />
                        </Item>
                    </Body>
                    <Right style={styles.rightAppBar}></Right>
                </Header>
                <Content style={{ margin: 10 }}>
                    <View style={styles.emptyBox}>
                        <Text style={styles.emptyHeaderText}>{store.lang.noResult}</Text>
                        <Text style={styles.emptySubHeaderText2}>
                            {store.lang.noResultSub}
                        </Text>
                    </View>
                </Content>
            </Container>)
        } else {
            return (<Container style={this.state.isMain ? styles.container : {}}>
                <Header searchBar style={styles.searchBarContainer}>
                    {
                        !this.state.isMain ? (<Left style={styles.leftAppBar}>
                            <Button transparent onPress={() => {
                                this.props.navigation.state.params.onGoBack();
                                this.props.navigation.goBack();
                            }}>
                                <Ionicons name="ios-arrow-back" size={24} color="#000" />
                            </Button>
                        </Left>) : (<Left style={styles.leftAppBar}>
                        </Left>)
                    }
                    <Body style={styles.bodyAppBar}>
                        <Item style={styles.searchBar}>
                            <Input style={styles.inputTextCat}
                                placeholder={store.lang.search}
                                autoFocus={true}
                                onChangeText={(text) => this.getData(text, [])} />
                        </Item>
                    </Body>
                    <Right style={styles.rightAppBar}></Right>
                </Header>
                <View style={this.state.isMain ? styles.body : styles.bodyWithoutFooter}>
                    <FlatList
                        extraData={this.state}
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        keyExtractor={this._keyExtractor}
                        renderItem={this.makeItems}
                        extraData={this.state}
                        onScroll={this.onScroll}
                        ListFooterComponent={this.footer}
                        onEndReached={() => {
                            this.getData(this.state.searchText, this.state.data, true);
                        }}
                        initialNumToRender={3}
                        removeClippedSubviews
                        disableVirtualization />
                </View>
            </Container>)
        }
    }
}