import React, { Component } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Animated,
  Image,
  BackHandler,
  Platform,
  FlatList,
  Modal
} from 'react-native';
import {
  Text,
  Button,
  Container,
  Content,
  Header,
  Left,
  Right,
  Body,
  Input
} from 'native-base';
import FastImage from 'react-native-fast-image';
import Fonts from '../theme/Fonts';
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Animatable from 'react-native-animatable';
import Carousel from 'react-native-snap-carousel';
import store from '../store/store.js';
import { observer } from 'mobx-react';
import StarRating from 'react-native-star-rating';
import Toast from 'react-native-simple-toast';
import {
  WaveIndicator
} from 'react-native-indicators';
import ImageViewer from 'react-native-image-zoom-viewer';
import BottomCart from '../components/Cart';
import CustomButton from '../components/CustomButton';

@observer
export default class ProductDetail extends Component {
  state = {
    isClickedIn: false,
    isClickedOut: false,
    data: 0,
    id: -1,
    count: 0,
    modalVisible: false,
    starCount: 5,
    reviewText: "",
    entries: {},
    marginTop: new Animated.Value(-60),
    images: [],
    scrolled: false,
    clicked: false,
    ImageModalVisible: false,
    refreshing: true,
    updated: false,
    similars: {}
  }

  timer = null;
  timer2 = null;
  timer3 = null;
  timer4 = null;
  timer5 = null;

  constructor(props) {
    super(props);

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    this.onPressedOut = this.onPressedOut.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this.minus = this.minus.bind(this);
    this.plus = this.plus.bind(this);
    this.handleBackPress = this.handleBackPress.bind(this);
    this.move = this.move.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this._renderImage = this._renderImage.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.goBackTo = this.goBackTo.bind(this);
    this.getCustomButtons = this.getCustomButtons.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id', 0);
    const count = navigation.getParam('count', 0);
    this.getReviews(id);
    this.getData(id);
    this.setState({ count: count });
    store.setViewed(id);

    this.timer3 = setTimeout(this.onScroll, 1000);
  }

  componentWillReceiveProps(nextProps) {
    const id = nextProps.navigation.getParam('id', 0);
    if (id !== this.state.id) {
      this.setState({ data: 0 });
      this.getData(id);
    }
  }

  goBackTo() {
    this.onScroll();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  onScroll() {
    this.setState({ scrolled: !this.state.scrolled });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    clearTimeout(this.timer2);
    clearTimeout(this.timer3);
    clearTimeout(this.timer4);
    clearTimeout(this.timer5);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.state.params.onGoBack();
    if (typeof this.props.navigation.state.params.onGoBackTo !== 'undefined')
      this.props.navigation.state.params.onGoBackTo();
  }

  getDescription(text) {
    //var one = text.indexOf("align:justify;");
    //var two = text.indexOf("</p>", one);
    //return text.substring(one + 16, two);
    text = text.replace(/<(?:.|\n)*?>/gm, '');
    return text;
  }

  getData = (id) => {
    var c = store.count[id] > 0 ? store.count[id] : 0;
    this.setState({ count: c });
    this.setState({ refreshing: true });
    this.setState({ id: parseInt(id) });
    return fetch(store.url + '/app_api/mobile/mobile.php?product_detail=1&id=' + id)
      .then((response) => response.json())
      .then(async (responseJson) => {
        await this.setState({
          similars: responseJson.product.similars
        });
        await this.setState({
          data: responseJson.product
        });

        var images = responseJson.product.image;
        var link_rewrite = responseJson.product.name;
        var image1 = store.url + '/' + images[0].id + "-home_default/" + link_rewrite[0].link_rewrite + ".jpg";
        var image2 = "";
        if (images[1] != null && Object.keys(images).length > 0) {
          image2 = store.url + '/' + images[1].id + "-home_default/" + link_rewrite[1].link_rewrite + ".jpg";
        } else {
          image2 = store.url + '/' + images[0].id + "-home_default/" + link_rewrite[1].link_rewrite + ".jpg";
        }

        var image = [
          {
            url: image1
          },
          {
            url: image2
          }
        ];
        await this.setState({ images: image }, function () {
          this.timer4 = setTimeout(() => {
            this.setState({ refreshing: false });
            this.setState({ updated: true });
          }, 1000);
        });
      })
      .catch((error) => {

      });
  }

  getReviews = (id) => {
    return fetch(store.url + '/app_api/mobile/mobile.php?getReview=1&productId=' + id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'cache-control': 'no-cache'
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        var json = responseJson;
        this.setState({
          entries: json.data
        });
      })
      .catch((error) => {

      });
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  plus() {
    clearTimeout(this.timer);
    if (this.state.count < this.state.data.stock_available_quantity) {
      this.timer = setTimeout(this.fadeOut, 5000);
      let count = this.state.count + 1;
      let summa = this.state.data.price;
      let skidka = ((this.state.data.quantity_discount * summa) / 100);
      store.setOrderCount(this.state.id, count, summa, skidka);
      this.setState({
        count
      });
    } else {
      Toast.showWithGravity(store.lang.noinstock, Toast.SHORT, Toast.CENTER);
    }
  }

  minus() {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.fadeOut, 5000);
    let count = this.state.count - 1;
    if (count >= 0) {
      let summa = this.state.data.price;
      let skidka = ((this.state.data.quantity_discount * summa) / 100);
      store.setOrderCount(this.state.id, count, -summa, -skidka);
      this.setState({
        count
      });
    }
  }

  fadeOut() {
    this.setState({ isClickedIn: false });
    this.setState({ isClickedOut: true });
  }

  onPressedOut() {
    this.setState({ isClickedIn: true });
    this.timer = setTimeout(this.fadeOut, 5000);
  }

  getCustomButtons({ item }) {
    if (item.id == this.state.data.id)
      return null;

    var imageUrl = item.image + "-home_default/" + item.link_rewrite + ".jpg";
    return (
      <TouchableOpacity activeOpacity={1} key={item.id} onPress={() => {
        this.setState({ isClickedIn: false });
        this.setState({ isClickedOut: false });
        this.getData(item.id);
        this.getReviews(item.id);
        clearTimeout(this.timer);
        clearTimeout(this.timer2);
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
          minimal_quantity={parseInt(item.minimal_quantity)}
          newProduct={item.new > 0 ? true : false}
          onChange={this.onScroll}
        />
      </TouchableOpacity>
    );
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

  _keyExtractor = (item, index) => "c_" + item.id;
  _keyExtractor2 = (item, index) => "s_" + item.id;
  _keyExtractor3 = (item, index) => "n_" + item.id;

  sendReview() {
    var data = new FormData();
    data.append("is_product_comment", "1");
    data.append("productId", this.state.id);
    data.append("deviceId", store.deviceId);
    data.append("star", this.state.starCount);
    data.append("text", this.state.reviewText);

    return fetch(store.url + '/app_api/mobile/mobile.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'cache-control': 'no-cache'
      },
      body: data
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (parseInt(responseJson.data.success) == 0) {
          Toast.show(store.lang.leaveOrderDenied);
        } else {
          Toast.show(store.lang.thanksReview);
        }
        this.timer5 = setTimeout(() => {
          this.getReviews(this.state.id);
        }, 2000);
      })
      .catch((error) => {
      });
  }

  _renderItem({ item, index }) {
    return (
      <TouchableWithoutFeedback>
        <View style={styles.pagerItem3}>
          <View style={styles.otzivP}>
            <View style={styles.otzivTop}>
              <View style={styles.starpart}>
                <View style={styles.stars2}>
                  <Ionicons name="ios-star" size={14} color={item.star > 0 ? "#ffee00" : "#ddd"} />
                  <Ionicons name="ios-star" size={14} color={item.star > 1 ? "#ffee00" : "#ddd"} />
                  <Ionicons name="ios-star" size={14} color={item.star > 2 ? "#ffee00" : "#ddd"} />
                  <Ionicons name="ios-star" size={14} color={item.star > 3 ? "#ffee00" : "#ddd"} />
                  <Ionicons name="ios-star" size={14} color={item.star > 4 ? "#ffee00" : "#ddd"} />
                </View>
              </View>
              <View style={styles.datepart}>
                <Text style={styles.dateparttext}>{item.date_add}</Text>
              </View>
            </View>
            <Text style={styles.otzivBottom}>{item.review_text}</Text>
            <Text style={styles.otzivauthor}> {item.username}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _renderImage({ item, index }) {
    return (<TouchableOpacity activeOpacity={1} onPress={this.move}>
      <FastImage style={styles.productImage} source={{ uri: item.url }} priority={FastImage.priority.normal} resizeMode={FastImage.resizeMode.contain} />
    </TouchableOpacity>)
  }

  addCartButton() {
    if (this.state.isClickedIn) {
      return (<View style={styles.itemBottom}>
        <Animatable.View animation='fadeInRightBig' duration={100} style={styles.animatible}>
          <TouchableOpacity activeOpacity={1} style={styles.bottomMinus} onPress={this.minus}>
            <Ionicons name="ios-remove" size={20} color="#fff" style={[styles.extMinus, { position: 'absolute', zIndex: 1000 }]} />
            <Image source={require('../../assets/img/green.jpg')} style={{ width: '100%' }} />
          </TouchableOpacity>
          <Text style={styles.bottomCount}>{store.count[this.state.id] > 0 ? store.count[this.state.id] : 0}</Text>
          <TouchableOpacity activeOpacity={1} onPress={this.plus}>
            <View style={styles.plusIcon}>
              <Ionicons name="ios-add" size={20} color="#fff" style={[styles.extAdd, { position: 'absolute', zIndex: 1000 }]} />
              <Image source={require('../../assets/img/green.jpg')} style={{ width: '100%' }} />
            </View>
          </TouchableOpacity>
        </Animatable.View>
        <TouchableOpacity activeOpacity={1} style={styles.basketBtnExtended} onPress={this.plus}>
          <View style={styles.basketIcon}>
            <Ionicons name="ios-basket" size={20} color="#fff" style={[styles.extBtn, { position: 'absolute', zIndex: 1000 }]} />
            <Image source={require('../../assets/img/green.jpg')} style={{ width: '100%' }} />
          </View>
        </TouchableOpacity>
      </View>)
    } else if (this.state.isClickedOut) {
      return (
        <View style={styles.itemBottom}>
          <Animatable.View onAnimationEnd={() => {
            this.setState({ isClickedOut: false });
          }} animation='fadeOutRightBig' duration={100} style={styles.animatible}>
            <TouchableOpacity activeOpacity={1} style={styles.bottomMinus} onPress={this.minus}>
              <Ionicons name="ios-remove" size={20} color="#fff" style={[styles.extMinus, { position: 'absolute', zIndex: 1000 }]} />
              <Image source={require('../../assets/img/green.jpg')} style={{ width: '100%' }} />
            </TouchableOpacity>
            <Text style={styles.bottomCount}>{store.count[this.state.id] > 0 ? store.count[this.state.id] : 0}</Text>
            <TouchableOpacity activeOpacity={1} onPress={this.plus}>
              <View style={styles.plusIcon}>
                <Ionicons name="ios-add" size={20} color="#fff" style={[styles.extAdd, { position: 'absolute', zIndex: 1000 }]} />
                <Image source={require('../../assets/img/green.jpg')} style={{ width: '100%' }} />
              </View>
            </TouchableOpacity>
          </Animatable.View>
          <TouchableOpacity activeOpacity={1} style={styles.basketBtnExtended} onPress={this.plus}>
            <View style={styles.basketBtn2}>
              <Ionicons name="ios-basket" size={20} color="#fff" style={{ position: 'absolute', zIndex: 1000, paddingLeft: 6 }} />
              <Image source={require('../../assets/img/green.jpg')} style={{ width: '100%' }} />
            </View>
          </TouchableOpacity>
        </View>)
    } else {
      return (<View style={styles.itemBottom}>
        <Button style={styles.basketBtn} onPress={this.onPressedOut}>
          <Ionicons name="ios-basket" size={20} color="#fff" style={{ position: 'absolute', zIndex: 1000 }} />
          <Image source={require('../../assets/img/green.jpg')} style={{ width: '100%' }} />
        </Button>
        {
          store.count[this.state.id] > 0 && (<Text style={styles.badge}>{store.count[this.state.id]}</Text>)
        }
      </View>
      )
    }
  }

  moveUp() {
    Animated.timing(this.state.marginTop, {
      toValue: -60,
      duration: 500
    }).start();
    this.setState({ clicked: false });
  }

  move() {
    if (this.state.clicked) {
      this.setState({ ImageModalVisible: true });
    } else {
      clearTimeout(this.timer2);
      Animated.timing(this.state.marginTop, {
        toValue: 10,
        duration: 500
      }).start();

      this.timer2 = setTimeout(this.moveUp, 10000);
      this.setState({ clicked: true });
    }
  }

  reviewBox() {
    if (Object.keys(this.state.entries).length > 0) {
      return (
        <Carousel
          ref={(c) => {
            this._carousel3 = c;
          }}
          data={this.state.entries}
          renderItem={this._renderItem}
          sliderWidth={width}
          itemWidth={width - 10}
          firstItem={0}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          enableMomentum={true}
          slideStyle={styles.slideStyle}
        />
      );
    } else {
      return (<View>
        <Text style={styles.noReview}>{store.lang.noReview}</Text>
        <Text style={styles.noReviewSub}>{store.lang.noReviewSub}</Text>
      </View>);
    }
  }

  render() {
    StatusBar.setBarStyle('light-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#ffbb00', true);
      StatusBar.setTranslucent(true);
    }

    if ((this.state.refreshing && !this.state.updated) || typeof this.state.data.name === 'undefined') {
      return (<Container style={styles.container}>
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
            <Text style={styles.headerTextOther}>{store.lang.products}</Text>
          </Body>
        </Header>
        <Content>
          <View style={styles.emptyBox}>
            <View style={styles.roundedBox}>
              <Image source={require('../../assets/img/logo.jpg')} style={{ width: '100%', height: '100%' }} />
            </View>
            <View style={{ height: 40, marginTop: 10 }}>
              <WaveIndicator color="#ffcc00" />
            </View>
          </View>
        </Content>
      </Container>);
    } else {
      const description = [this.state.data.name[1].description_short, this.state.data.name[1].description_short];
      const name = [this.state.data.name[1].name, this.state.data.name[0].name];
      return (<Container style={styles.main}>
        <Header style={styles.searchBarContainer}>
          <Left style={styles.leftAppBar}>
            <Button transparent onPress={() => {
              this.props.navigation.goBack()
              this.props.navigation.state.params.onGoBack();
            }}>
              <Ionicons name="ios-arrow-back" size={24} color="#000" />
            </Button>
          </Left>
          <Body style={styles.bodyAppBar}>
            <Text style={styles.headerTextOther}>{name[store.langId - 1]}</Text>
          </Body>
        </Header>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            this.state.data.quantity_discount > 0 && (<Text style={styles.saleCount}>
              -{this.state.data.quantity_discount}
            </Text>)
          }
          {
            this.state.data.IS_NEW > 0 && !(this.state.data.new > 0) && (<Text style={styles.saleCount}>
              {
                store.lang.new
              }
            </Text>)
          }
          <Carousel
            ref={(c) => {
              this._carousel4 = c;
            }}
            data={this.state.images}
            renderItem={this._renderImage}
            sliderWidth={width}
            itemWidth={width - 10}
            firstItem={0}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            enableMomentum={true}
          />
          <Animated.View style={[styles.panel, { marginTop: this.state.marginTop }]}>
            <Text style={styles.productName}>{name[store.langId - 1]}</Text>
            <View style={styles.stars}>
              <Ionicons name="ios-star" color={this.state.data.star > 0 ? "#ffee00" : "#ddd"} />
              <Ionicons name="ios-star" color={this.state.data.star > 1 ? "#ffee00" : "#ddd"} />
              <Ionicons name="ios-star" color={this.state.data.star > 2 ? "#ffee00" : "#ddd"} />
              <Ionicons name="ios-star" color={this.state.data.star > 3 ? "#ffee00" : "#ddd"} />
              <Ionicons name="ios-star" color={this.state.data.star > 4 ? "#ffee00" : "#ddd"} />
            </View>
            <Text style={styles.productDetail}>{this.getDescription(description[store.langId - 1])}</Text>
            <View style={styles.bottom}>
              {
                this.state.data.quantity_discount > 0 && (<View style={{ flexDirection: 'column' }}>
                  <Text style={styles.price2}>
                    {this.changeToString(this.state.data.price)}
                  </Text>
                  <Text style={styles.price}>
                    {this.changeToString(this.state.data.price - parseInt((this.state.data.price * this.state.data.quantity_discount) / 100))}
                  </Text>
                </View>)
              }
              {
                this.state.data.quantity_discount == 0 && (<Text style={styles.price}>
                  {this.changeToString(this.state.data.price)}
                </Text>)
              }
              <View style={styles.bottomCard}>
                {
                  this.addCartButton()
                }
              </View>
            </View>
          </Animated.View>

          <View style={styles.otzivPart} key={this.state.data.id}>
            <View style={styles.line}></View>
            <Text style={styles.otzivHeaderText}>{store.lang.sameCategory}</Text>
            <FlatList
              horizontal
              onScroll={this.onScroll}
              extraData={this.state}
              showsHorizontalScrollIndicator={false}
              data={this.state.similars}
              keyExtractor={this._keyExtractor}
              renderItem={this.getCustomButtons}
              initialNumToRender={4}
              contentContainerStyle={styles.datapart}
              removeClippedSubviews={Platform.OS === 'ios' ? false : true}
              disableVirtualization />
          </View>

          <View style={styles.categoryBlock}>
            <View style={styles.line}></View>
            <Text style={styles.otzivHeaderText}>{store.lang.reviews}</Text>
            <View style={styles.otzivs}>
              {
                this.reviewBox()
              }
            </View>
          </View>
          <Button style={styles.otzivButton} onPress={() => {
            this.setState({ modalVisible: true });
          }}>
            <Text style={styles.otzivBtnText}>{store.lang.review}</Text>
          </Button>

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => { this.setState({ modalVisible: false }) }}>
            <View style={styles.modal}>
              <View style={styles.modalPanel}>
                <Text style={styles.head}>{store.lang.evaulateProduct}</Text>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  fullStarColor="#FED700"
                  containerStyle={styles.starConatiner}
                  starSize={24}
                  rating={this.state.starCount}
                  selectedStar={(rating) => this.onStarRatingPress(rating)}
                />
                <View style={styles.inputBox}>
                  <Input placeholder={store.lang.writeReview} onChangeText={(text) => {
                    this.setState({ reviewText: text });
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
                    this.sendReview();
                  }}>
                    <Text style={styles.bottomBtnText}>{store.lang.send}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.ImageModalVisible}
            onRequestClose={() => { this.setState({ ImageModalVisible: false }) }}>
            <ImageViewer
              enableSwipeDown={true}
              renderHeader={() => {
                return (<TouchableOpacity onPress={() => {
                  this.setState({ ImageModalVisible: false })
                }} activeOpacity={1} style={{ width: 60, height: 40, marginTop: 60 }}>
                  <Text style={{ height: 30, width: 40, fontSize: 24, color: 'white', textAlign: 'right' }}>x</Text>
                </TouchableOpacity>)
              }}
              imageUrls={this.state.images} onSwipeDown={() => {
                this.setState({ ImageModalVisible: false })
              }} />
          </Modal>
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.refreshing && this.state.updated}
            onRequestClose={() => { }}>
            <Container style={styles.container}>
              <Header style={[styles.searchBarContainer, { marginTop: 0 }]}>
                <Left style={styles.leftAppBar}>
                  <Button transparent onPress={() => {
                    this.props.navigation.goBack();
                    this.props.navigation.state.params.onGoBack();
                  }}>
                    <Ionicons name="ios-arrow-back" size={24} color="#000" />
                  </Button>
                </Left>
                <Body style={styles.bodyAppBar}>
                  <Text style={styles.headerTextOther}>{store.lang.products}</Text>
                </Body>
              </Header>
              <Content>
                <View style={styles.emptyBox}>
                  <View style={styles.roundedBox}>
                    <Image source={require('../../assets/img/logo.jpg')} style={{ width: '100%', height: '100%' }} />
                  </View>
                  <View style={{ height: 40, marginTop: 10 }}>
                    <WaveIndicator color="#ffcc00" />
                  </View>
                </View>
              </Content>
            </Container>
          </Modal>
        </ScrollView>
        <BottomCart go={() => this.props.navigation.navigate("ContainTabCart", {
          onGoBackTo: this.goBackTo
        })} />
      </Container>)
    }
  }
}

var { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  similarp: {
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 16,
    backgroundColor: '#fff',
    fontSize: Fonts.moderateScale(16),
    fontFamily: Fonts.type.sfuiDisplayMedium,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'red'
  },
  hr: {
    marginTop: 30,
    marginBottom: 20,
    height: 1,
    backgroundColor: '#ddd'
  },
  categoryBlock: {
    width: width,
    marginTop: 5
  },
  leftAppBar: {
    width: 50,
    paddingLeft: 10,
    paddingRight: 10
  },
  rightAppBar: {
    width: 50,
    paddingRight: 10,
    paddingLeft: 10
  },
  bodyAppBar: {
    width: width - 140
  },
  imageModal: {
    width: width,
    height: height
  },
  saleCount: {
    position: 'absolute',
    marginLeft: 20,
    marginTop: 10,
    zIndex: 10,
    backgroundColor: 'red',
    color: '#fff',
    fontSize: Fonts.moderateScale(12),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  noReview: {
    width: '100%',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.moderateScale(16),
    color: '#000'
  },
  noReviewSub: {
    width: width,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: Fonts.type.sfuiDisplayLight,
    fontSize: Fonts.moderateScale(14),
    color: '#929292',
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30
  },
  starConatiner: {
    marginTop: 30,
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 20
  },
  inputBox: {
    height: 120,
    marginTop: 10
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: Fonts.moderateScale(14),
    backgroundColor: '#ededed'
  },
  head: {
    fontSize: Fonts.moderateScale(16),
    fontFamily: Fonts.type.sfuiDisplayMedium,
    color: '#32cd32',
    marginLeft: 10,
    width: '100%',
    textAlign: 'center'
  },
  bottomModal: {
    marginTop: 'auto',
    flexDirection: 'row'
  },
  bottomBtn: {
    width: '50%'
  },
  bottomBtnText: {
    color: '#000',
    fontSize: Fonts.moderateScale(18),
    fontFamily: Fonts.type.sfuiDisplayLight,
    width: '100%',
    textAlign: 'center'
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: '100%',
    width: '100%'
  },
  modalPanel: {
    marginLeft: 30,
    marginRight: 30,
    minHeight: 300,
    backgroundColor: '#fff',
    marginTop: 'auto',
    marginBottom: 'auto',
    elevation: 10,
    borderRadius: 10,
    padding: 10
  },
  headerTextOther: {
    textAlign: 'center',
    width: width - 140,
    fontSize: Fonts.moderateScale(22),
    fontFamily: Fonts.type.sfuiDisplayLight,
    fontSize: Fonts.moderateScale(14),
    color: '#000',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginLeft: -50,
    textAlign: 'center'
  },
  searchBarContainer: {
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#ffcc00",
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  header: {
    width: 20,
    height: 40,
    marginLeft: 20,
    justifyContent: 'center'
  },
  badge: {
    position: 'absolute',
    fontSize: 10,
    backgroundColor: '#ff9900',
    width: 16,
    height: 16,
    paddingLeft: 0,
    paddingRight: 0,
    textAlign: 'center',
    paddingTop: 2,
    borderRadius: 8,
    marginLeft: 139,
    color: '#fff',
    elevation: 5,
    marginTop: 0,
    fontFamily: Fonts.type.helveticaNeueLight,
    overflow: 'hidden'
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    height: height - 60
  },
  emptyBox: {
    width: width,
    height: height - StatusBar.currentHeight - 120,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  roundedBox: {
    height: width * 2 / 3,
    width: width * 2 / 3,
    borderRadius: width / 3,
    overflow: 'hidden',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  pagerItem3: {
    height: width / 2,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 3,
    backgroundColor: '#fff',
    marginBottom: 5
  },
  main: {
    backgroundColor: "#fff",
    minHeight: height
  },
  slideStyle: {
    paddingRight: 2,
    paddingLeft: 2
  },
  productImage: {
    width: width,
    height: width * 2 / 3
  },
  panel: {
    width: width - 40,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 10
  },
  productName: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    fontSize: Fonts.moderateScale(18),
    color: '#000'
  },
  productDetail: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
    color: '#000',
    fontFamily: Fonts.type.sfuiDisplayLight,
    fontSize: Fonts.moderateScale(14)
  },
  bottom: {
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10
  },
  bottomCard: {
    width: 158,
    marginLeft: 'auto',
    backgroundColor: '#fff'
  },
  itemBottom: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    paddingTop: 5,
    overflow: 'hidden'
  },
  basketBtnExtended: {
    borderBottomRightRadius: 10,
    marginLeft: 'auto',
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#fff'
  },
  bottomCount: {
    width: 40,
    height: 30,
    paddingTop: 3,
    fontFamily: Fonts.type.sfuiDisplayRegular,
    textAlign: 'center'
  },
  bottomMinus: {
    width: 40,
    height: 30,
    justifyContent: 'center',
    elevation: 5,
    marginBottom: 7,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15, marginLeft: 10,
    overflow: 'hidden'
  },
  extBtn: {
    marginRight: 5,
    borderLeftWidth: 1,
    paddingLeft: 6,
    borderLeftColor: '#fff',
  },
  extAdd: {
    marginLeft: 10
  },
  extMinus: {
    marginLeft: 20
  },
  basketBtn: {
    width: 30,
    height: 30,
    backgroundColor: '#00DB15',
    marginRight: 10,
    marginLeft: 'auto',
    elevation: 5,
    borderRadius: 15,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  basketBtn2: {
    width: 30,
    height: 30,
    backgroundColor: '#00DB15',
    marginLeft: 'auto',
    elevation: 5,
    borderRadius: 15,
    justifyContent: 'center',
    marginRight: 10,
    overflow: 'hidden'
  },
  plusIcon: {
    width: 28,
    height: 30,
    justifyContent: 'center',
    elevation: 5,
    marginBottom: 7,
    overflow: 'hidden'
  },
  basketIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    elevation: 5,
    marginBottom: 7,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    marginRight: 10,
    overflow: 'hidden'
  },
  animatible: {
    flexDirection: 'row'
  },
  price: {
    color: '#000',
    fontSize: Fonts.moderateScale(18),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    paddingTop: 0
  },
  price2: {
    fontSize: Fonts.moderateScale(15),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    paddingTop: 5,
    color: '#929292',
    textDecorationLine: "line-through",
    textDecorationColor: '#929292'
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 20
  },
  rightBtn: {
    marginLeft: 'auto',
    backgroundColor: '#ffcc00',
    marginRight: 10,
    width: (width - 20) / 2 - 10
  },
  leftBtn: {
    marginLeft: 10,
    backgroundColor: '#ffcc00',
    marginRight: 10,
    width: (width - 20) / 2 - 10
  },
  btnText: {
    fontSize: Fonts.moderateScale(10),
    fontFamily: Fonts.type.robotoRegular,
    textAlign: 'center',
    width: '100%',
    color: '#000'
  },
  otzivPart: {
    marginTop: 40,
    marginBottom: 10
  },
  line: {
    borderTopWidth: 1,
    borderColor: 'red',

  },
  otzivHeaderText: {
    color: 'red',
    fontFamily: Fonts.type.helveticaNeueBold,
    backgroundColor: '#fff',
    paddingLeft: 5,
    paddingRight: 5,
    alignSelf: 'center',
    marginTop: -12,
    marginBottom: 10
  },
  otzivs: {
    marginTop: 10
  },
  otzivP: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    height: '100%'
  },
  otzivTop: {
    height: 30,
    width: '100%',
    flexDirection: 'row'
  },
  starpart: {
    height: '100%',
    width: '50%'
  },
  datepart: {
    height: '100%',
    width: '50%'
  },
  dateparttext: {
    fontSize: 12,
    color: '#777',
    fontFamily: Fonts.type.helveticaRegular,
    marginLeft: 'auto'
  },
  stars2: {
    height: '100%',
    flexDirection: 'row'
  },
  otzivBottom: {
    fontFamily: Fonts.type.base,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  otzivauthor: {
    fontSize: 14,
    fontFamily: Fonts.type.sfuiDisplaySemibold,
    marginLeft: 'auto',
    marginTop: 'auto'
  },
  otzivButton: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    alignSelf: 'stretch',
    backgroundColor: '#00DB15',
    borderRadius: 2
  },
  otzivBtnText: {
    width: '100%',
    textAlign: 'center',
    color: '#fff',
    fontSize: Fonts.moderateScale(14),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    paddingTop: 5
  }
});