import React, { Component } from 'react';
import {
    StatusBar,
    Platform,
    Dimensions,
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
import Carousel, { Pagination } from 'react-native-snap-carousel';

@observer
export default class AboutOrder extends Component {
    state = {
        index: 0
    }

    data = [{
        icon: "ios-timer",
        text: [
            "Manzil va yetkazib berish vaqtini tanlang",
            "Выберите адрес и время доставки",
            "Выберите адрес и время доставки"
        ],
        subText: [
            "На экране выбора доставки выберите место и время",
            "На экране выбора доставки выберите место и время",
            "На экране выбора доставки выберите место и время"
        ]
    }, {
        icon: "ios-cart",
        text: [
            "Найдите товары более подходящие для вас и добавьте их в корзину",
            "Найдите товары более подходящие для вас и добавьте их в корзину",
            "Найдите товары более подходящие для вас и добавьте их в корзину"
        ],
        subText: [
            "Переходите по соответствующим разделам и нажимайте кнопки корзина на тех товарах, которые Вас заинтересовали",
            "Переходите по соответствующим разделам и нажимайте кнопки корзина на тех товарах, которые Вас заинтересовали",
            "Переходите по соответствующим разделам и нажимайте кнопки корзина на тех товарах, которые Вас заинтересовали"
        ]
    }, {
        icon: "md-checkmark",
        text: [
            "Оформите заказ",
            "Оформите заказ",
            "Оформите заказ"
        ],
        subText: [
            "Проверьте,все ли в заказе Вас устраивает.После того,как убедитесь,что комплектность заказа Вам подходит,нажмите на кнопку «Оформить заказ».",
            "Проверьте,все ли в заказе Вас устраивает.После того,как убедитесь,что комплектность заказа Вам подходит,нажмите на кнопку «Оформить заказ».",
            "Проверьте,все ли в заказе Вас устраивает.После того,как убедитесь,что комплектность заказа Вам подходит,нажмите на кнопку «Оформить заказ»."
        ]
    }];

    constructor(props) {
        super(props);

        this._renderItem = this._renderItem.bind(this);
    }

    _renderItem({ item, index }) {
        const { width, height } = Dimensions.get('window');

        return (<View style={styles.aoView}>
            <View style={styles.aoIconView}>
                <Ionicons name={item.icon} size={200} color="#ddd" style={{ alignSelf: 'center' }} />
            </View>
            <View style={{marginLeft: 10, marginRight: 10}}>
                <Text style={styles.emptyHeaderText}>{item.text[store.langId-1]}</Text>
                {
                   item.subText[store.langId-1].length > 0 && (<Text style={styles.emptySubHeaderText3}>{item.subText[store.langId - 1]}</Text>)
                }
            </View>
        </View>);
    }

    render() {
        const { width, height } = Dimensions.get('window');

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
                    <Text style={styles.headerTextOther}>{store.lang.aboutOrder}</Text>
                </Body>
                <Right style={styles.rightAppBar}>

                </Right>
            </Header>
            <Content>
                <Carousel
                    ref={(c) => {
                        this._carousel = c;
                    }}
                    data={this.data}
                    renderItem={this._renderItem}
                    sliderWidth={width}
                    itemWidth={width}
                    firstItem={this.state.index}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    onSnapToItem={(index) => { this.setState({ index: index }); }}
                />
                <Pagination
                    dotsLength={3}
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
            </Content>
        </Container>)
    }
}