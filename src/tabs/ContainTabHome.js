
import React, { Component } from 'react';
import { View, Dimensions, Image, FlatList, StatusBar, Platform, TouchableOpacity } from 'react-native';
import { Container, Content, Left, Right, Text, Header, Body, Button, ListItem, List } from 'native-base';
import styles from './ContainTabStyle';
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import store from '../store/store.js';
import { observer } from 'mobx-react';
import Communications from 'react-native-communications';
import CustomButton from '../components/CustomButton';
//import OtzivCart from '../components/OtzivCart';
import FastImage from 'react-native-fast-image';
import OneSignal from 'react-native-onesignal';
import {
  WaveIndicator
} from 'react-native-indicators';

@observer
export default class ContainTabHome extends Component {
  state = {
    index: 0,
    isClickedIn: false,
    isClickedOut: false,
    data: 0,
    scrolled: false,
    aksiya: [],
    count: 2
  };

  storage = 0;

  constructor(props) {
    super(props);

    this._renderItem = this._renderItem.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.getCustomButtons = this.getCustomButtons.bind(this);
    this.getData = this.getData.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.onScrollEnd = this.onScrollEnd.bind(this);

    this.onIds = this.onIds.bind(this);
    this.onReceived = this.onReceived.bind(this);
    this.onOpened = this.onOpened.bind(this);
  }

  componentDidMount() {
    this.getAksiya();
    this.getData();
  }

  componentWillMount() {
    OneSignal.init("6054a02d-df17-482d-a312-9b987a26ffa3");
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.configure();
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {

  }

  onOpened(openResult) {
    this.props.navigation.navigate("OrderStatus");
  }

  onIds(device) {
    store.setDeviceId(device.userId);
  }

  getAksiya = () => {
    var lan = 0;
    if (store.langId == 1)
      lan = 2;
    else if (store.langId == 2)
      lan = 1;
    return fetch(store.url + '/app_api/mobile/mobile.php?getSlider=1&lang=' + lan)
      .then((response) => response.json())
      .then((responseJson) => {
        var json = responseJson;
        this.setState({
          aksiya: json.data
        });
      })
      .catch((error) => {
      });
  }

  async onScrollEnd() {
    if (this.storage != 0 && this.state.count < Object.keys(this.storage).length) {
      var category = this.storage.slice(this.state.count, (this.state.count + 2));

      if (Object.keys(category).length > 0) {
        for (let i in category) {
          await this.setState({ data: [...this.state.data, category[i]] });
        }

        await this.setState({ count: this.state.count + Object.keys(category).length });
        if (this.state.count > Object.keys(this.storage).length) {
          this.setState({ count: Object.keys(this.storage).length });
        }
      }
    }
  }

  //get main data from server
  getData = async () => {
    var lan = 0;
    if (store.langId == 1)
      lan = 2;
    else if (store.langId == 2)
      lan = 1;
    return await fetch(store.url + '/app_api/mobile/mobile.php?id=2&main_page=1&langId=' + lan)
      .then((response) => response.json())
      .then(async (responseJson) => {
        //this.storage = responseJson.categories;
        //var category = this.storage.slice(0, this.state.count);
        var category = responseJson.categories;
        
        await this.setState({ data: category });
        this.onScroll();
      })
      .catch((error) => {

      });
  }


  _renderItem({ item, index }) {
    return (
      <TouchableOpacity activeOpacity={1}>
        <View style={styles.pagerItem}>
          <FastImage style={{ width: '100%', height: '100%' }} source={{ uri: store.url + '/' + item.image }} priority={FastImage.priority.normal} resizeMode={FastImage.resizeMode.cover} />
        </View>
      </TouchableOpacity>
    );
  }

  getCategories({ item }) {
    var array = item.products;
    if (item.name == 'discount')
      item.name = store.lang.discount;
    var items = (<View style={styles.categoryBlock} key={item.id}>
      <TouchableOpacity activeOpacity={1} onPress={() => {
        this.props.navigation.navigate("Category", {
          name: item.name,
          id: item.id,
          onGoBack: this.onScroll
        })
      }}>
        <View style={styles.headerSpec}>
          <Text style={styles.headerSpecText}>{item.name}</Text>
          <View style={styles.listRightIcon2}>
            <Text style={styles.listRightIcon2Text}>{store.lang.all}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <FlatList
        horizontal
        onScroll={this.onScroll}
        extraData={this.state}
        showsHorizontalScrollIndicator={false}
        data={array}
        keyExtractor={this._keyExtractor}
        renderItem={this.getCustomButtons}
        initialNumToRender={3}
        contentContainerStyle={styles.datapart}
        removeClippedSubviews
        disableVirtualization />
    </View>);
    return items;
  }


  getCustomButtons({ item }) {
    var imageUrl = item.image + "-home_default/" + item.link_rewrite + ".jpg";
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => {
        this.props.navigation.navigate("ProductDetail", {
          id: item.id,
          count: store.count[item.id] > 0 ? store.count[item.id] : 0,
          onGoBack: this.onScroll
        });
      }}>
        <CustomButton
          key={item.id}
          id={item.id}
          image_url={imageUrl}
          stock_available_quantity={item.stock_available_quantity}
          price={item.price}
          count={store.count[item.id] > 0 ? store.count[item.id] : 0}
          liked={store.liked[item.id]}
          sale={item.quantity_discount}
          newProduct={item.new > 0 ? true : false}
          onChange={this.props.onScroll}
        />
      </TouchableOpacity>
    );
  }

  onScroll() {
    this.setState({
      scrolled: !this.state.scrolled
    });
    this.props.onScroll();
  }

  _keyExtractor = (item, index) => "c_" + item.id;
  _keyExtractor2 = (item, index) => "s_" + item.id;
  _keyExtractor3 = (item, index) => "n_" + item.id;

  render() {
    const { width, height } = Dimensions.get('window');

    StatusBar.setBarStyle('light-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#ffbb00', true);
      StatusBar.setTranslucent(true);
    }

    if (store.deviceId == 0 || this.state.data === 0) {
      return (<Container style={styles.container}>
        <Header style={styles.searchBarContainer}>
          <Left>
            <Button rounded transparent onPress={() => {
              Communications.phonecall('+998994007000', true)
            }}>
              <Image style={styles.opImage} source={require("../../assets/img/operator.png")} />
            </Button>
          </Left>
          <Body>
            <Text style={styles.headerText}>Oltindiyor.Uz</Text>
          </Body>
          <Right>
            <Button rounded transparent onPress={() => {
              this.props.navigation.navigate("SearchModal", {
                onGoBack: this.props.onScroll
              })
            }}>
              <Image style={styles.searchIcon} source={require("../../assets/img/search.png")} />
            </Button>
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
      return (
        <Container style={styles.container}>
          <Header style={styles.searchBarContainer}>
            <Left>
              <Button rounded transparent onPress={() => {
                Communications.phonecall('+998994007000', true)
              }}>
                <Image style={styles.opImage} source={require("../../assets/img/operator.png")} />
              </Button>
            </Left>
            <Body>
              <Text style={styles.headerText}>Oltindiyor.Uz</Text>
            </Body>
            <Right>
              <Button rounded transparent onPress={() => {
                this.props.navigation.navigate("SearchModal", {
                  onGoBack: this.props.onScroll
                })
              }}>
                <Image style={styles.searchIcon} source={require("../../assets/img/search.png")} />
              </Button>
            </Right>
          </Header>
          <Content>
            <View style={styles.reklamablock}>
              <Carousel
                ref={(c) => {
                  this._carousel = c;
                }}
                data={this.state.aksiya}
                renderItem={this._renderItem}
                sliderWidth={width}
                itemWidth={width}
                firstItem={this.state.index}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                onSnapToItem={(index) => { this.setState({ index: index }); }}
              />
              <Pagination
                dotsLength={Object.keys(this.state.aksiya).length}
                activeDotIndex={this.state.index}
                carouselRef={this._carousel}
                tappableDots={!!this._carousel}
                dotColor={'red'}
                dotStyle={styles.pagination}
                containerStyle={styles.paginationStyle}
                inactiveDotColor={'#ddd'}
                inactiveDotOpacity={1}
                inactiveDotScale={1}
              />
            </View>
            <View style={styles.aksiyaBlock}>
              <View style={styles.services}>
                <List>
                  <ListItem style={styles.listItem} onPress={() => {
                    this.props.navigation.navigate("OrderStatus");
                  }}>
                    <FontAwesome5 name="bell" size={24} color="green" style={[styles.listLeftIcon, { paddingLeft: 8 }]} />
                    <Text style={styles.listItemText}>{store.lang.deliveryText}</Text>
                    <Ionicons name="ios-arrow-forward" size={20} color="#000" style={styles.listRightIcon} />
                  </ListItem>
                  <ListItem style={styles.listItem} onPress={() => {
                    this.props.navigation.navigate("OrderHistory")
                  }}>
                    <FontAwesome5 name="book" size={24} color="green" style={[styles.listLeftIcon, { paddingLeft: 7 }]} />
                    <Text style={styles.listItemText}>{store.lang.myOrders}</Text>
                    <Ionicons name="ios-arrow-forward" size={20} color="#000" style={styles.listRightIcon} />
                  </ListItem>
                  <ListItem style={styles.listItem} onPress={() => {
                    this.props.navigation.navigate("OrderBox", {
                      onGoBack: this.onScroll
                    })
                  }}>
                    <FontAwesome5 name="clipboard" size={24} color="green" style={[styles.listLeftIcon, { paddingLeft: 6 }]} />
                    <Text style={styles.listItemText}>{store.lang.usualorders}</Text>
                    <Ionicons name="ios-arrow-forward" size={20} color="#000" style={styles.listRightIcon} />
                  </ListItem>
                  <ListItem style={styles.listItem} onPress={() => {
                    this.props.navigation.navigate("SelectTime");
                  }}>
                    <FontAwesome5 name="clock" size={24} color="green" style={[styles.listLeftIcon, { paddingLeft: 6 }]} />
                    <Text style={styles.listItemText}>{store.lang.selectTime}</Text>
                    <Ionicons name="ios-arrow-forward" size={20} color="#000" style={styles.listRightIcon} />
                  </ListItem>
                  <ListItem style={styles.listItem} onPress={() => {
                    this.props.navigation.navigate("ContainTabLiked", {
                      onGoBack: this.props.onScroll
                    })
                  }}>
                    <FontAwesome5 name="heart" size={24} color="green" style={[styles.listLeftIcon, { paddingLeft: 5 }]} />
                    <Text style={styles.listItemText}>{store.lang.liked}</Text>
                    <Ionicons name="ios-arrow-forward" size={20} color="#000" style={styles.listRightIcon} />
                  </ListItem>
                  <ListItem style={styles.listItem} onPress={() => {
                    this.props.navigation.navigate("Viewed", {
                      onGoBack: this.props.onScroll
                    })
                  }}>
                    <FontAwesome5 name="eye" size={24} color="green" style={[styles.listLeftIcon]} />
                    <Text style={styles.listItemText}>{store.lang.viewed}</Text>
                    <Ionicons name="ios-arrow-forward" size={20} color="#000" style={styles.listRightIcon} />
                  </ListItem>
                </List>
              </View>
            </View>
            <FlatList
              onScroll={this.onScroll}
              extraData={this.state}
              showsVerticalScrollIndicator={false}
              data={Object.values(this.state.data)}
              keyExtractor={this._keyExtractor}
              renderItem={this.getCategories}
              extraData={this.state}
              initialNumToRender={3}
              removeClippedSubviews
              disableVirtualization />
            <View style={styles.bottom}>
              <List>
                <ListItem style={styles.listItem2}>
                  <TouchableOpacity activeOpacity={1} onPress={() => {
                    this.props.navigation.navigate("Qa")
                  }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={[styles.iconButton, { backgroundColor: 'blue' }]}>
                        <FontAwesome5 name="info" size={16} color="#fff" />
                      </View>
                      <Text style={styles.listItemText2}>{store.lang.qa}</Text>
                    </View>
                  </TouchableOpacity>
                </ListItem>
                <ListItem style={styles.listItem2}>
                  <TouchableOpacity activeOpacity={1} onPress={() => {
                    this.props.navigation.navigate("AboutOrder")
                  }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={[styles.iconButton, { backgroundColor: 'orange' }]}>
                        <FontAwesome5 name="file" size={16} color="#fff" />
                      </View>
                      <Text style={styles.listItemText2}>{store.lang.aboutOrder}</Text>
                    </View>
                  </TouchableOpacity>
                </ListItem>
                <ListItem style={styles.listItem2}>
                  <TouchableOpacity activeOpacity={1} onPress={() => {
                    this.props.navigation.navigate("AboutDelivery")
                  }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={[styles.iconButton, { backgroundColor: 'green' }]}>
                        <FontAwesome5 name="truck-moving" size={16} color="#fff" />
                      </View>
                      <Text style={styles.listItemText2}>{store.lang.aboutDelivery}</Text>
                    </View>
                  </TouchableOpacity>
                </ListItem>
                <ListItem style={styles.listItem2}>
                  <TouchableOpacity activeOpacity={1} onPress={() => {
                    this.props.navigation.navigate("AboutPayment")
                  }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={[styles.iconButton, { backgroundColor: '#2ecc71' }]}>
                        <FontAwesome5 name="credit-card" size={16} color="#fff" />
                      </View>
                      <Text style={styles.listItemText2}>{store.lang.aboutPayment}</Text>
                    </View>
                  </TouchableOpacity>
                </ListItem>
                <ListItem style={styles.listItem2}>
                  <TouchableOpacity activeOpacity={1} onPress={() => {
                    this.props.navigation.navigate("Return")
                  }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={[styles.iconButton, { backgroundColor: '#f1c40f' }]}>
                        <FontAwesome5 name="sync" size={16} color="#fff" />
                      </View>
                      <Text style={styles.listItemText2}>{store.lang.return}</Text>
                    </View>
                  </TouchableOpacity>
                </ListItem>
                <ListItem style={styles.listItem2}>
                  <TouchableOpacity activeOpacity={1} onPress={() => {
                    this.props.navigation.navigate("Connect")
                  }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={[styles.iconButton, { backgroundColor: '#f1c49f' }]}>
                        <FontAwesome5 name="comments" size={16} color="#fff" />
                      </View>
                      <Text style={styles.listItemText2}>{store.lang.connect}</Text>
                    </View>
                  </TouchableOpacity>
                </ListItem>
              </List>
            </View>
          </Content>
        </Container>

      );
    }
  }
}
