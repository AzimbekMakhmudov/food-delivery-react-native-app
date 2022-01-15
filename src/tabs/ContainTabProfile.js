
import React, { Component } from 'react';
import { Text, StatusBar, Platform, View, BackHandler, Modal, TouchableOpacity, Image } from 'react-native';
import { Container, Content, Header, Body, List, ListItem, Left, Right, Button } from 'native-base';
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './ContainTabStyle';
import store from '../store/store.js';
import { observer } from 'mobx-react';

color = [
  '#929292',
  '#c0c0c0',
  'ffd700',
  '#e5e4e2'
]

statusName = [
  'Simple',
  'Silver',
  'Gold',
  'Platinium'
]

@observer
export default class ContainTabProfile extends Component {

  state = {
    modalVisible: false
  }

  constructor(props) {
    super(props);

    this.selectLang = this.selectLang.bind(this);
  }

  selectLang(num) {
    store.setLang(num);
    this.setState({ initLang: true });
    this.setState({ init: true });
    this.setState({ modalVisible: false });
  }


  render() {
    StatusBar.setBarStyle('light-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#ffbb00', true);
      StatusBar.setTranslucent(true);
    }


    return (
      <Container style={styles.container}>
        <Header style={styles.searchBarContainer}>
          <Left style={styles.leftAppBar}>
        
          </Left>
          <Body style={styles.bodyAppBar}>
            <Text style={styles.headerTextOther}>{store.lang.myProfil}</Text>
          </Body>
          <Right style={styles.rightAppBar}>
          </Right>
        </Header>
        <Content>
          <View style={styles.panel}>
            <View style={styles.userImage}>
              <Ionicons name="ios-person" size={48} color="#000" style={styles.userIcon} />
            </View>
            <Text style={styles.userName}>{store.userInfo.name}</Text>
            <Text style={styles.userTel}>{store.userInfo.phone}</Text>
          </View>
          <List>
            <ListItem itemDivider></ListItem>
            <ListItem style={styles.userlist} onPress={() => {
              this.props.navigation.navigate("UserInfo")
            }}>
              <FontAwesome5 name="user-edit" size={24} color="#000" style={styles.arrowLeft} />
              <View style={styles.columnDirection}>
                <Text style={styles.userListItem}>{store.lang.totalinfo}</Text>
                <Text style={styles.subUserListItem}>{store.lang.totalInfoSub}</Text>
              </View>
              <Ionicons name="ios-arrow-forward" size={20} color="#000" style={styles.arrowRight} />
            </ListItem>
            <ListItem style={styles.userlist} onPress={() => {
              this.props.navigation.navigate("AddressBook")
            }}>
              <FontAwesome5 name="map-marked-alt" size={24} color="#000" style={styles.arrowLeft} />
              <View style={styles.columnDirection}>
                <Text style={styles.userListItem}>{store.lang.addressBook}</Text>
                <Text style={styles.subUserListItem}>{store.lang.addressBookSub}</Text>
              </View>
              <Ionicons name="ios-arrow-forward" size={20} color="#000" style={styles.arrowRight} />
            </ListItem>
            <ListItem style={styles.userlist} onPress={() => {
              this.props.navigation.navigate("OrderStatus")
            }}>
              <FontAwesome5 name="bell" size={24} color="#000" style={styles.arrowLeft} />
              <View style={styles.columnDirection}>
                <Text style={styles.userListItem}>{store.lang.deliveryText}</Text>
                <Text style={styles.subUserListItem}>{store.lang.deliveryTextSub}</Text>
              </View>
              <Ionicons name="ios-arrow-forward" size={20} color="#000" style={styles.arrowRight} />
            </ListItem>
            <ListItem style={styles.userlist} onPress={() => {
              this.props.navigation.navigate("OrderHistory")
            }}>
              <FontAwesome5 name="book" size={24} color="#000" style={styles.arrowLeft} />
              <View style={styles.columnDirection}>
                <Text style={styles.userListItem}>{store.lang.myOrders}</Text>
                <Text style={styles.subUserListItem}>{store.lang.myOrdersSub}</Text>
              </View>
              <Ionicons name="ios-arrow-forward" size={20} color="#000" style={styles.arrowRight} />
            </ListItem>
            <ListItem style={styles.userlist} onPress={() => {
              this.props.navigation.navigate("ContainTabLiked", {
                onGoBack: this.props.onScroll
              })
            }}>
              <FontAwesome5 name="heart" size={24} color="#000" style={styles.arrowLeft} />
              <View style={styles.columnDirection}>
                <Text style={styles.userListItem}>{store.lang.liked}</Text>
                <Text style={styles.subUserListItem}>{store.lang.likedSub}</Text>
              </View>
              <Ionicons name="ios-arrow-forward" size={20} color="#000" style={styles.arrowRight} />
            </ListItem>
            <ListItem style={styles.userlist} onPress={() => {
              this.props.navigation.navigate("Viewed", {
                onGoBack: this.props.onScroll
              })
            }}>
              <FontAwesome5 name="eye" size={24} color="#000" style={styles.arrowLeft} />
              <View style={styles.columnDirection}>
                <Text style={styles.userListItem}>{store.lang.viewed}</Text>
                <Text style={styles.subUserListItem}>{store.lang.viewedSub}</Text>
              </View>
              <Ionicons name="ios-arrow-forward" size={20} color="#000" style={styles.arrowRight} />
            </ListItem>
            <ListItem itemDivider></ListItem>
            <ListItem style={styles.userlist} onPress={() => {
              this.props.navigation.navigate("OrderBox", {
                onGoBack: () => {

                }
              })
            }}>
              <FontAwesome5 name="clipboard" size={24} color="#000" style={styles.arrowLeft} />
              <View style={styles.columnDirection}>
                <Text style={styles.userListItem}>{store.lang.usualorders}</Text>
                <Text style={styles.subUserListItem}>{store.lang.usualordersSub}</Text>
              </View>
              <Ionicons name="ios-arrow-forward" size={20} color="#000" style={styles.arrowRight} />
            </ListItem>
            <ListItem style={styles.userlist} onPress={() => {
              this.setState({ modalVisible: true });
            }}>
              <FontAwesome5 name="globe" size={24} color="#000" style={styles.arrowLeft} />
              <View style={styles.columnDirection}>
                <Text style={styles.userListItem}>{store.lang.changeLang}</Text>
                <Text style={styles.subUserListItem}>{store.lang.changeLangSub}</Text>
              </View>
              <Ionicons name="ios-arrow-forward" size={20} color="#000" style={styles.arrowRight} />
            </ListItem>
          </List>
        </Content>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => { this.setState({ modalVisible: false }) }}>
          <View style={styles.modal}>
            <View style={[styles.modalPanel, { justifyContent: 'center' }]}>
              <TouchableOpacity activeOpacity={0.8} style={styles.btn2} onPress={() => this.selectLang(1)}>
                <Image style={styles.langimage} source={require('../../assets/img/uz.png')} />
                <Text style={styles.btnText}>O'zbek tili</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} style={styles.btn2} onPress={() => this.selectLang(2)}>
                <Image style={styles.langimage} source={require('../../assets/img/ru.png')} />
                <Text style={styles.btnText}>Русский язык</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} style={styles.btn2} onPress={() => this.selectLang(3)}>
                <Image style={styles.langimage} source={require('../../assets/img/en.png')} />
                <Text style={styles.btnText}>English</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Container>

    );
  }
}
