import React, { Component } from 'react';
import {
    StatusBar,
    Platform,
    FlatList,
    TouchableOpacity,
    View,
    Modal
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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import store from '../store/store.js';
import { observer } from 'mobx-react';

@observer
export default class AboutDelivery extends Component {
    data = [
        {
            text: "Доставка всегда БЕСПЛАТНО",
            icon: "truck"
        }, {
            text: "Доставка в день оформления заказа",
            icon: "dropbox"
        }
    ]

    state = {
        modalVisible: false,
        text: ""
    }

    constructor(props) {
        super(props);

        this._render = this._render.bind(this);
    }

    _render({ item }) {
        return (<View style={styles.deliveryBlock}>
            <Text style={styles.deliveryMainText}>{item.text}</Text>
            <TouchableOpacity activeOpacity={1} onPress={() => {
                this.setState({modalVisible: true});
                this.setState({text: item.text});
            }} style={{ marginTop: 'auto', flexDirection: 'row' }}>
                <Text style={styles.detailed}>{store.lang.detailed}</Text>
                <FontAwesome name={item.icon} size={18} color="green" style={{ marginLeft: 'auto', marginRight: 15 }} />
            </TouchableOpacity>
        </View>);
    }

    _keyExtractor = (item, index) => "c_" + item.text;

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
                    <Text style={styles.headerTextOther}>{store.lang.aboutDelivery}</Text>
                </Body>
                <Right style={styles.rightAppBar}>

                </Right>
            </Header>
            <Content>
                <FlatList
                    horizontal
                    onScroll={this.onScroll}
                    extraData={this.state}
                    showsHorizontalScrollIndicator={false}
                    data={this.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._render}
                    removeClippedSubviews
                    contentContainerStyle={{ marginTop: 20, paddingRight: 3, paddingLeft: 3 }}
                    disableVirtualization />
            </Content>
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => { this.setState({ modalVisible: false }) }}>
                    <View style={{width: '100%',height: '100%', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                        <View style={styles.deliveryModal}>
                            <Text style={styles.deliveryModalText}>{this.state.text}</Text>
                        </View>
                    </View>
            </Modal>
        </Container>)
    }
}