import React, { Component } from 'react';

import {
    createStackNavigator
} from 'react-navigation';

import AppTabNavigator from '../tabs/index';
import ProductDetail from '../screens/ProductDetail';
import Loading from '../screens/Loading';
import Qa from '../screens/qa';
import Return from '../screens/return';
import AboutPayment from '../screens/aboutPayment';
import AboutDelivery from '../screens/aboutDelivery';
import AboutOrder from '../screens/aboutOrder';
import SearchModal from '../screens/searchModal';
import UserInfo from '../screens/UserInfo';
import AddressBook from '../screens/AddressBook';
import OrderStatus from '../screens/OrderStatus';
import OrderHistory from '../screens/OrderHistory';
import Viewed from '../screens/Viewed';
import OrderBox from '../screens/OrderBox';
import Category from '../screens/Category';
import SelectTime from '../screens/SelectTime';
import Maps from '../screens/Map';
import OrderConfirm from '../screens/OrderConfirm';
import AboutClientStatus from '../screens/aboutClientStatus';
import ContainTabLiked from '../tabs/ContainTabLiked';
import ContainTabCart from '../tabs/ContainTabCart';
import Connect from '../screens/connect';
import Contacts from '../screens/contacts';
import Rekviziti from '../screens/rekviziti';

const Stack = createStackNavigator({
    Home: {
        screen: AppTabNavigator
    },
    ProductDetail: {
        screen: ProductDetail
    },
    Loading: {
        screen: Loading
    },
    Qa: {
        screen: Qa
    },
    Return: {
        screen: Return
    },
    AboutPayment: {
        screen: AboutPayment
    },
    AboutDelivery: {
        screen: AboutDelivery
    },
    AboutOrder: {
        screen: AboutOrder
    },
    SearchModal: {
        screen: SearchModal
    },
    UserInfo: {
        screen: UserInfo
    },
    AddressBook: {
        screen: AddressBook
    },
    OrderStatus: {
        screen: OrderStatus
    },
    OrderHistory: {
        screen: OrderHistory
    },
    Viewed: {
        screen: Viewed
    },
    OrderBox: {
        screen: OrderBox
    },
    Category: {
        screen: Category
    },
    SelectTime: {
        screen: SelectTime
    },
    Maps: {
        screen: Maps
    },
    OrderConfirm: {
        screen: OrderConfirm
    },
    AboutClientStatus: {
        screen: AboutClientStatus
    },
    ContainTabLiked: {
        screen: ContainTabLiked
    },
    ContainTabCart: {
        screen: ContainTabCart
    },
    Connect: {
        screen: Connect
    },
    Rekviziti: {
        screen: Rekviziti
    },
    Contacts: {
        screen: Contacts
    }
}, {
        mode: 'modal',
        headerMode: 'none',
        initialRouteName: 'Home'
    });

export default class AppNavigator extends Component {
    render() {
        return (<Stack />);
    }
}