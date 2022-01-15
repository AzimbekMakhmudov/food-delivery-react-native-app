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
export default class AboutClientStatus extends Component {
    state = {
        status: 0,
        point: 0
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getPoints();
    }

    getPoints() {
        /*return fetch('https://xumsan.uz/web/api/order/points?deviceId=' + store.deviceId)
            .then((response) => response.json())
            .then((responseJson) => {
                var json = JSON.parse(responseJson);
                store.setPoint(json.data);
                this.setState({
                    point: json.data
                });
                if (json.data >= 500) {
                    this.setState({ status: 1 });
                } else if (json.data >= 1000) {
                    this.setState({ status: 2 });
                } else if (json.data >= 2000) {
                    this.setState({ status: 3 });
                }
            })
            .catch((error) => {

            });*/
    }

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
                <Body style={{width:'80%'}}>
                    <Text style={styles.headerTextOther}>{store.lang.clientStatus}</Text>
                </Body>
                <Right style={styles.rightAppBar}>

                </Right>
            </Header>
            <Content style={{ margin: 10 }}>
                <View style={[styles.statusContainer, {marginBottom: 10, padding: 5}]}>
                    <View style={styles.row}>
                        <Left>
                            <Text style={styles.productName}>{store.lang.status}:</Text>
                        </Left>
                        <Right>
                            <Text style={styles.productName}>"{statusName[this.state.status]}"</Text>
                        </Right>
                    </View>
                    <View style={styles.row}>
                        <Left>
                            <Text style={styles.productName}>{store.lang.points}:</Text>
                        </Left>
                        <Right>
                            <Text style={styles.productName}>{store.point}</Text>
                        </Right>
                    </View>
                </View>
            </Content>
        </Container>)
    }
}