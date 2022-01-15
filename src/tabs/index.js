import React, { Component } from "react";
import {
  StatusBar,
  Platform,
  Dimensions,
  View
} from "react-native";
import {
  Container,
  Button,
  Content,
  Footer,
  FooterTab,
  Text
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";


import styles from "./styles";
import ContainTabCategory from "./ContainTabCategory";
import ContainTabHome from "./ContainTabHome";
import ContainTabCart from "./ContainTabCart";
import ContainTabProfile from "./ContainTabProfile";
import SearchModal from '../screens/searchModal';
import store from '../store/store.js';
import { observer } from 'mobx-react';

const { width, height } = Dimensions.get('window')
const Metrics = {
  WIDTH: width
}

@observer
export default class AppTabNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "Home",
      change: true
    };

    this.onSroll = this.onSroll.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#ffbb00', true);
      StatusBar.setTranslucent(true);
    }
  }

  onSroll() {
    this.setState({change: !this.state.change});
  }

  calculate() {
    var count = 0;
    if(Object.keys(store.count).length > 0)
      for(let i in store.count) {
        count += store.count[i];
      }
      return count;
}

  renderSelectedTab() {
    switch (this.state.selectedTab) {
      case "Home":
        return <ContainTabHome {...this.props} onScroll={this.onSroll} />;
        break;
      case "Category":
        return <ContainTabCategory {...this.props} onScroll={this.onSroll} />;
        break;
      case "Search":
        return <SearchModal {...this.props} isMain={true} onScroll={this.onSroll} />;
        break;
      case "Cart":
        return <ContainTabCart {...this.props} onScroll={this.onSroll} isMain={true} />;
        break;
      case "Profile":
        return <ContainTabProfile {...this.props} onScroll={this.onSroll} />;
        break;
      default:
    }
  }

  render() {
    return (
      <Container style={styles.main}>
        {this.renderSelectedTab()}
        <Footer style={styles.footer}>
          <FooterTab style={styles.footerTabBg}>
          {
            Object.keys(store.count).length > 0 && (<View style={[styles.badge, this.state.selectedTab == "Cart"?{backgroundColor: '#fff', zIndex: 1000}:{backgroundColor: 'red'}]}>
            <Text style={[styles.badgeText, this.state.selectedTab == "Cart"?{color: 'red'}:{color: '#fff'}]}>{this.calculate()}</Text>
        </View>)
          }
            <Button
              vertical
              rounded
              style={{ height: '100%' }}
              onPress={() => this.setState({ selectedTab: "Home" })}
            >
              {this.state.selectedTab == "Home" ? (
                <Ionicons
                  name="ios-home"
                  size={24}
                  color="#fff"
                  style={styles.tabActive}
                />
              ) : (
                  <Ionicons name="ios-home" size={24} color="#000" />
                )}
            </Button>
            <Button
              vertical
              rounded
              style={{ height: '100%' }}
              onPress={() => this.setState({ selectedTab: "Category" })}
            >
              {this.state.selectedTab == "Category" ? (
                <Ionicons
                  name="ios-list"
                  size={24}
                  color="#fff"
                  style={styles.tabActive}
                />
              ) : (
                  <Ionicons name="ios-list" size={24} color="#000" />
                )}
            </Button>
            <Button
              vertical
              rounded
              style={{ height: '100%' }}
              onPress={() => this.setState({ selectedTab: "Cart" })}
            >
              {this.state.selectedTab == "Cart" ? (
                <Ionicons
                  name="ios-basket"
                  size={24}
                  color="#fff"
                  style={styles.tabActive}
                />
              ) : (
                  <Ionicons name="ios-basket" size={24} color="#000" />
                )}
                {
                  false && Object.keys(store.count).length > 0 && (<Text style={[styles.orderCount,this.state.selectedTab == "Cart"?styles.bw:styles.wb]}>{this.calculate}</Text>)
                }
            </Button>
            <Button
              vertical
              rounded
              style={{ height: '100%' }}
              onPress={() => this.setState({ selectedTab: "Search" })}
            >
              {this.state.selectedTab == "Search" ? (
                <Ionicons
                  name="ios-search"
                  size={24}
                  color="#fff"
                  style={styles.tabActive}
                />
              ) : (
                  <Ionicons name="ios-search" size={24} color="#000" />
                )}
            </Button>
            <Button
              vertical
              rounded
              style={{ height: '100%' }}
              onPress={() => this.setState({ selectedTab: "Profile" })}
            >
              {this.state.selectedTab == "Profile" ? (
                <Ionicons name="ios-person" size={24} color="#fff" style={styles.tabActive} />
              ) : (
                  <Ionicons name="ios-person" size={24} color="#000" />
                )}
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
