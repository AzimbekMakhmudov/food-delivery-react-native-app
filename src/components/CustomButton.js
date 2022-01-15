import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { Text, Button } from 'native-base';
import * as Animatable from 'react-native-animatable';
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from '../tabs/ContainTabStyle';
import FastImage from 'react-native-fast-image';
import store from '../store/store.js';
import { observer } from 'mobx-react';
import Toast from 'react-native-simple-toast';

@observer
export default class CustomButton extends Component {
  state = {
    isClickedIn: false,
    isClickedOut: false,
    sale: false,
    newProduct: false,
    image_url: "",
    id: 0,
    price: 0,
    count: 0,
    liked: false
  }

  timer = null

  constructor(props) {
    super(props);

    this.onPressedOut = this.onPressedOut.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
    this.minus = this.minus.bind(this);
    this.plus = this.plus.bind(this);
    this.makeLiked = this.makeLiked.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      sale,
      newProduct,
      image_url,
      id,
      price,
      count,
      liked,
      stock_available_quantity
    } = nextProps;
    this.setState({
      sale,
      newProduct,
      image_url,
      id,
      price,
      count,
      liked,
      stock_available_quantity
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    var image_url = this.state.image_url !== nextState.image_url;
    var count = this.state.count !== nextState.count;
    var liked = this.state.liked !== nextState.liked;
    var id = this.state.id !== nextState.id;
    return id || image_url || liked || this.state.isClickedIn !== nextState.isClickedIn || this.state.isClickedOut !== nextState.isClickedOut || count;
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }


  makeLiked() {
    this.setState({
      liked: !this.state.liked
    });
    store.setLiked(this.state.id);
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

  plus() {
    clearTimeout(this.timer);
    if(this.state.count < this.state.stock_available_quantity) {
      this.timer = setTimeout(this.fadeOut, 5000);
      let count = this.state.count + 1;
      let summa = this.state.price;
      let skidka = ((this.state.sale * summa) / 100);
      store.setOrderCount(this.state.id, count, summa, skidka);
      this.setState({
        count
      });
      this.props.onChange();
    } else {
      Toast.showWithGravity(store.lang.noinstock, Toast.SHORT, Toast.CENTER);
    }
  }

  minus() {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.fadeOut, 5000);
    let count = this.state.count - 1;
    if (count >= 0) {
      let summa = this.state.price;
      let skidka = ((this.state.sale * summa) / 100);
      store.setOrderCount(this.state.id, count, -summa, -skidka);
      this.setState({
        count
      });
    } else {
      
    }
    this.props.onChange();
  }

  fadeOut() {
    this.setState({ isClickedIn: false });
    this.setState({ isClickedOut: true });
  }

  onPressedOut() {
    this.setState({ isClickedIn: true });
    this.timer = setTimeout(this.fadeOut, 5000);
  }

  addCartButton() {
    if (this.state.isClickedIn) {
      return (<View style={styles.itemBottom}>
        <Animatable.View animation='fadeInRightBig' duration={100} style={styles.animatible}>
          <TouchableOpacity activeOpacity={1} style={styles.bottomMinus} onPress={this.minus}>
            <Ionicons name="ios-remove" size={20} color="#fff" style={[styles.extMinus, { position: 'absolute', zIndex: 1000 }]} />
            <Image source={require('../../assets/img/green.jpg')} style={{ width: '100%' }} />
          </TouchableOpacity>
          <Text style={styles.bottomCount}>{this.state.count}</Text>
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
            <Text style={styles.bottomCount}>{this.state.count}</Text>
            <TouchableOpacity activeOpacity={1} onPress={this.plus}>
              <View style={styles.plusIcon}>
                <Ionicons name="ios-add" size={20} color="#fff" style={[styles.extAdd, { position: 'absolute', zIndex: 1000 }]} />
                <Image source={require('../../assets/img/green.jpg')} style={{ width: '100%' }} />
              </View>
            </TouchableOpacity>
          </Animatable.View>
          <TouchableOpacity activeOpacity={1} style={styles.basketBtnExtended} onPress={this.plus}>
            <View style={styles.basketBtn2}>
              <Ionicons name="ios-basket" size={20} color="#fff" style={{position: 'absolute', zIndex: 1000, paddingLeft: 6 }} />
            <Image source={require('../../assets/img/green.jpg')} style={{ width: '100%' }} />
            </View>
          </TouchableOpacity>
        </View>)
    } else {
      return (<View style={styles.itemBottom}>
        {
          this.state.sale > 0 && (<View style={styles.salePrice}>
            <Text style={styles.oldPrice}>{this.changeToString(this.state.price)}</Text>
            <Text style={styles.bottomPrice2}>{this.changeToString(this.state.price - parseInt((this.state.price * this.state.sale) / 100))}</Text>
          </View>)
        }
        {
          !(this.state.sale > 0) && (<Text style={styles.bottomPrice}>{this.changeToString(this.state.price)}</Text>)
        }
        <Button transparent style={styles.basketBtn} onPress={this.onPressedOut}>
          <Ionicons name="ios-basket" size={20} color="#fff" style={{ position: 'absolute', zIndex: 1000 }} />
          <Image source={require('../../assets/img/green.jpg')} style={{ width: '100%' }} />
        </Button>
        {
          this.state.count > 0 && (<Text style={styles.badge}>{this.state.count}</Text>)
        }
      </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.items}>
        {
          this.state.sale > 0 && (<Text style={styles.saleCount}>
            -{this.state.sale}
          </Text>)
        }
        {
          this.state.newProduct && !(this.state.sale > 0) && (<Text style={styles.saleCount}>
            {
              store.lang.new
            }
          </Text>)
        }
        <Ionicons onPress={this.makeLiked} name="ios-heart" size={24} style={this.state.liked ? styles.heartIcon : styles.heartIconUnliked} />
        <FastImage style={styles.itemImage} source={{ uri: store.url + '/' + this.state.image_url }} priority={FastImage.priority.normal} resizeMode={FastImage.resizeMode.contain} />
        {
          this.addCartButton()
        }
      </View>
    );
  }
}