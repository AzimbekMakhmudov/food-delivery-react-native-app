import React, { Component } from 'react';
import {
    StatusBar,
    Platform,
    View
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
import store from '../store/store.js';
import { observer } from 'mobx-react';

@observer
export default class AboutPayment extends Component {
    render() {
        StatusBar.setBarStyle('light-content', true);
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('#ffbb00', true);
            StatusBar.setTranslucent(true);
        }

        return (<Container>
            <Header style={styles.searchBarContainer}>
                <Left style={styles.leftAppBar}>
                    <Button transparent onPress={() => {
                        this.props.navigation.goBack()
                    }}>
                        <Ionicons name="ios-arrow-back" size={24} color="#000" />
                    </Button>
                </Left>
                <Body style={styles.bodyAppBar}>
                    <Text style={styles.headerTextOther}>{store.lang.aboutPayment}</Text>
                </Body>
                <Right style={styles.rightAppBar}>

                </Right>
            </Header>
            <Content>
                <View style={{ flexDirection: 'row', backgroundColor: '#fff', marginTop: 10 }}>
                    <View style={styles.paymentIcon}>
                        <Ionicons name="md-cash" color="green" size={30} />
                    </View>
                    <View style={{borderBottomWidth: 1, borderColor: '#ddd'}}>
                        <Text style={styles.question2}>Наличные</Text>
                        <Text style={styles.answer2}>
                        Оплата осуществляется после того, как Вы ознако
мились с товарами и приняли решение о покупке. Деньги передаются сотрудники службы доставки интернет-магазин ,
 который предоставляет кассовый и товарный чеки.                       </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: '#fff', marginTop: 10 }}>
                <View style={styles.paymentIcon}>
                        <Ionicons name="md-card" color="green" size={30} />
                    </View>
                    <View>
                        <Text style={styles.question2}>Банковские карты</Text>
                        <Text style={styles.answer2}>
                        Оплата осуществляется после того, как Вы ознако
мились с товарами и приняли решение о покупке. Деньги передаются сотрудники службы доставки интернет-магазин ,
 который предоставляет кассовый и товарный чеки. 
                        </Text>
                    </View>
                </View>
            </Content>
        </Container>)
    }
}