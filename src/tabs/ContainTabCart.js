
import React, { Component } from 'react';
import { Text, StatusBar, Platform, Image, View, RefreshControl, FlatList, TouchableOpacity, Modal, BackHandler, Dimensions } from 'react-native';
import { Container, Content, Header, Body, Button, Left, Right, List, ListItem } from 'native-base';
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from './ContainTabStyle';
import store from '../store/store.js';
import { observer } from 'mobx-react';
import CartItem from '../components/CartItem';
import Dialog from 'react-native-dialog';
import {
  WaveIndicator
} from 'react-native-indicators';
import Toast from 'react-native-simple-toast';

@observer
export default class ContainTabCart extends Component {

  state = {
    dataSource: [],
    summa: 0,
    skidka: 0,
    refreshing: false,
    showTrashDialog: false,
    scrolled: false,
    showOrderBox: false,
    orderName: "",
    data: {},
    modalStatusVisible: false
  }

  constructor(props) {
    super(props);

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    this.footer = this.footer.bind(this);
    this.makeItems = this.makeItems.bind(this);
    this.calculateSumma = this.calculateSumma.bind(this);
    this.refresh = this.refresh.bind(this);
    this.reset = this.reset.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.addToOrderBox = this.addToOrderBox.bind(this);
    this.handleBackPress = this.handleBackPress.bind(this);
  }

  componentDidMount() {
    store.calculateOrder();

    this.refresh();

    if (typeof this.props.isMain !== 'undefined') {
      this.setState({ isMain: true });
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    if (typeof this.props.isMain !== 'undefined') {
      //this.props.goHome();
    } else {
      //this.props.navigation.goBack();
      if (typeof this.props.navigation.state.params.onGoBackTo() !== 'undefined')
        this.props.navigation.state.params.onGoBackTo();
    }
  }

  onScroll() {
    this.setState({
      scrolled: !this.state.scrolled
    });
  }

  getData = (id) => {
    var lan = 0;
    if (store.langId == 1)
      lan = 2;
    else if (store.langId == 2)
      lan = 1;

    return fetch(store.url + '/app_api/mobile/mobile.php?filter=1&ids=' + id)
      .then((response) => response.json())
      .then(async (responseJson) => {
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

        if (json != null) {
          var data = json;
          var count = store.count;
          var summa = 0;
          var skidka = 0;
          var ids = [];
          for (let i in data) {
            if (typeof count[data[i].id] === 'undefined') continue;
            summa += parseInt(count[data[i].id] * data[i].price);
            skidka += parseInt(count[data[i].id] * Math.round(data[i].price * (data[i].quantity_discount / 100)));

            store.setOrderCount(data[i].id, count[data[i].id], data[i].price, Math.round(data[i].price * (data[i].quantity_discount / 100)));
          
            ids.push(data[i].id);
          }

          for (let i in store.count) {
              if(ids.includes(i)) continue;
              else
                store.removeItem(i, store.price[i], store.discount[i]);
          }

          await this.setState({ data: data });
          this.setState({ summa: summa });
          this.setState({ skidka: skidka });
          this.setState({ refreshing: false });
        }
      })
      .catch((error) => {
      });
  }

  toTrash() {
    store.resetOrderCount();
    this.refresh();
  }

  addToOrderBox() {
    this.setState({ showOrderBox: true });
    this.setState({ modalStatusVisible: false });
  }

  reset() {
    this.setState({ showTrashDialog: true });
    this.setState({ modalStatusVisible: false });
  }

  calculateSumma() {
    if (this.state.dataSource != null) {
      var data = this.state.dataSource;
      var summa = 0;
      var skidka = 0;
      for (let i in data) {
        if (typeof store.count[data[i].id] === 'undefined') continue;
        summa += parseInt(store.count[data[i].id] * data[i].price);
        skidka += parseInt(store.count[data[i].id] * Math.round(data[i].price * (data[i].quantity_discount / 100)));
      }
      this.setState({ summa });
      this.setState({ skidka });
    }
  }

  refresh() {
    this.setState({ refreshing: true });
    let buyed = "";
    for (let i in store.count) {
      buyed += i + ",";
    }

    buyed = buyed.slice(0, -1);
    if (buyed.length == 0)
      this.setState({ dataSource: 0 });
    else
      this.getData(buyed);
    if (typeof this.props.onScroll !== 'undefined')
      this.props.onScroll();
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

  makeItems({ item }) {
    var imageUrl = item.image + "-home_default/" + item.link_rewrite + ".jpg";
    let name = [item.name_4, item.name_4];
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => {
        this.props.navigation.navigate("ProductDetail", {
          id: item.id,
          count: store.count[item.id] > 0 ? store.count[item.id] : 0,
          onGoBack: () => {
            this.onScroll();
            this.refresh();
          }
        });
      }}>
        <CartItem
          key={item.id}
          id={item.id}
          image_url={imageUrl}
          price={item.price}
          stock_available_quantity={item.stock_available_quantity}
          count={store.count[item.id] > 0 ? store.count[item.id] : 0}
          name={name[store.langId - 1]}
          calculate={this.calculateSumma}
          refresh={this.refresh}
          sale={item.quantity_discount}
          newProduct={item.new > 0 ? true : false}
        /></TouchableOpacity>)
  }


  footer() {
    return (<View style={styles.footer}>
      <Text style={styles.totalHeader}>{store.lang.footerCount}</Text>
      <View style={styles.totalprice}>
        <Text style={styles.totalPricesText}>{store.lang.footerCount}:</Text>
        <Text style={styles.totalPrices}>{this.changeToString(this.state.summa)}</Text>
      </View>
      <View style={styles.totalprice}>
        <Text style={styles.totalPricesText}>{store.lang.sale}:</Text>
        <Text style={styles.totalPrices}>{this.changeToString(this.state.skidka)}</Text>
      </View>
      <View style={styles.hr}></View>
      <View style={styles.totalprice}>
        <Text style={styles.itogoText}>{store.lang.footerSum}</Text>
        <Text style={styles.itogoConut}>{this.changeToString(this.state.summa - this.state.skidka)}</Text>
      </View>
    </View>)
  }

  _keyExtractor = (item, index) => "c_" + item.id;

  render() {
    StatusBar.setBarStyle('light-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#ffbb00', true);
      StatusBar.setTranslucent(true);
    }

    if (this.state.dataSource.length == 0) {
      return (<Container style={this.state.isMain ? styles.container : {}}>
        <Header style={styles.searchBarContainer}>
          {
            !this.state.isMain ? (<Left style={styles.leftAppBar}>
              <Button transparent onPress={() => {
                this.props.navigation.goBack()
              }}>
                <Ionicons name="ios-arrow-back" size={24} color="#000" />
              </Button>
            </Left>) : (<Left style={styles.leftAppBar}>
            </Left>)
          }

          <Body style={styles.bodyAppBar}>
            <Text style={styles.headerTextOther}>{store.lang.cart}</Text>
          </Body>
          <Right style={styles.rightAppBar}></Right>
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
      if (Object.keys(store.count).length > 0) {
        return (
          <Container style={this.state.isMain ? styles.container : {}}>
            <Header style={styles.searchBarContainer}>
              {
                !this.state.isMain ? (<Left style={styles.leftAppBar}>
                  <Button transparent onPress={() => {
                    this.props.navigation.goBack()
                  }}>
                    <Ionicons name="ios-arrow-back" size={24} color="#000" />
                  </Button>
                </Left>) : (<Left style={styles.leftAppBar}>
                </Left>)
              }
              <Body style={styles.bodyAppBar}>
                <Text style={styles.headerTextOther}>{store.lang.cart}</Text>
              </Body>
              <Right style={styles.rightAppBar}>
                <Button transparent onPress={() => {
                  this.setState({ modalStatusVisible: true });
                }}>
                  <Ionicons name="md-more" size={24} color="#000" />
                </Button>
              </Right>
            </Header>
            <View style={this.state.isMain ? styles.body : styles.bodyWithoutFooter}>
              <View style={styles.listFooterContent}>
                <FlatList
                  extraData={this.state}
                  showsVerticalScrollIndicator={false}
                  data={this.state.dataSource}
                  keyExtractor={this._keyExtractor}
                  renderItem={this.makeItems}
                  onScroll={this.onScroll}
                  initialNumToRender={Object.keys(this.state.dataSource).length}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this.refresh.bind(this)}
                    />
                  }
                  contentContainerStyle={[styles.cartList, this.state.isMain && {paddingBottom: 110}]}
                  ListFooterComponent={this.footer}
                  removeClippedSubviews
                  disableVirtualization />
              </View>
            </View>
            <Button transparent style={this.state.isMain ? styles.cartConfirmBtn : styles.cartConfirmBtn2} onPress={() => {
              if (Object.keys(this.state.data).length > 0) {
                this.props.navigation.navigate("OrderConfirm", {
                  data: this.state.data,
                  skidka: this.state.skidka,
                  summa: this.state.summa
                });
              } else {
                Toast.showWithGravity(store.lang.backetempty, Toast.SHORT, Toast.CENTER);
              }
            }}>
              <Text style={styles.cartConfirmBtnText}>{store.lang.apply}</Text>
              <Image source={require('../../assets/img/green.jpg')} style={{ width: '100%', marginTop: 0 }} />
            </Button>
            <Dialog.Container visible={this.state.showTrashDialog}>
              <Dialog.Title style={styles.dialogTitle}>{store.lang.deleteAllTitle}</Dialog.Title>
              <Dialog.Description style={styles.dialogDetail}>
                {store.lang.deleteAllText}
              </Dialog.Description>
              <Dialog.Button style={styles.dialogStyle} label={store.lang.cancel} onPress={() => {
                this.setState({ showTrashDialog: false });
              }} />
              <Dialog.Button label="Ok " style={styles.dialogStyle2} onPress={() => {
                this.setState({ showTrashDialog: false });
                this.toTrash();
              }} />
            </Dialog.Container>

            <Dialog.Container visible={this.state.showOrderBox}>
              <Dialog.Title style={styles.dialogTitle}>{store.lang.shoppingPatternName}</Dialog.Title>
              <Dialog.Input style={[styles.dialogDetail, {borderBottomWidth: 1, borderBottomColor: '#888'}]} onChangeText={(text) => {
                this.setState({ orderName: text });
              }}>
              </Dialog.Input>
              <Dialog.Button style={styles.dialogStyle} label={store.lang.cancel} onPress={() => {
                this.setState({ showOrderBox: false });
              }} />
              <Dialog.Button label="Ok " style={styles.dialogStyle2} onPress={() => {
                this.setState({ showOrderBox: false });
                store.setOrderBook(this.state.orderName, store.price, store.count, this.state.summa);
              }} />
            </Dialog.Container>
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.modalStatusVisible}
              onRequestClose={() => { this.setState({ modalStatusVisible: false }) }}>
              <TouchableOpacity activeOpacity={1} onPress={() => {
                this.setState({ modalStatusVisible: false });
              }}>
                <View style={{ width: '100%', height: '100%' }}>
                  <TouchableOpacity activeOpacity={1} onPress={() => {

                  }}>
                    <View style={[styles.dropdown, { paddingTop: 5, paddingBottom: 10 }]}>
                      <ListItem style={styles.listItem3} onPress={this.reset}>
                        <Text style={styles.listItemText10}>{store.lang.delete}</Text>
                      </ListItem>
                      <ListItem style={styles.listItem3} onPress={this.addToOrderBox}>
                        <Text style={styles.listItemText10}>{store.lang.addPattern}</Text>
                      </ListItem>
                      <ListItem style={styles.listItem3} onPress={() => {
                        this.setState({ modalStatusVisible: false });
                        this.props.navigation.navigate("OrderBox", {
                          onGoBack: this.onScroll
                        })
                      }}>
                        <Text style={styles.listItemText10}>{store.lang.selectPattern}</Text>
                      </ListItem>
                    </View>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Modal>
          </Container>

        );
      } else {
        return (<Container style={this.state.isMain ? styles.container : {}}>
          <Header style={styles.searchBarContainer}>
            {
              !this.state.isMain ? (<Left style={styles.leftAppBar}>
                <Button transparent onPress={() => {
                  this.props.navigation.goBack()
                }}>
                  <Ionicons name="ios-arrow-back" size={24} color="#000" />
                </Button>
              </Left>) : (<Left style={styles.leftAppBar}>
              </Left>)
            }
            <Body style={styles.bodyAppBar}>
              <Text style={styles.headerTextOther}>{store.lang.cart}</Text>
            </Body>
            <Right style={styles.rightAppBar}></Right>
          </Header>
          <Content>
            <View style={styles.emptyBox}>
              <Text style={styles.emptyHeaderText}>{store.lang.backetempty}</Text>
              <Image source={require('../../assets/img/backet.jpeg')} style={styles.backetImage} />
              <Text style={styles.emptySubHeaderText}>
                {store.lang.backetemptySub}
              </Text>
            </View>
          </Content>
        </Container>);
      }
    }
  }
}
