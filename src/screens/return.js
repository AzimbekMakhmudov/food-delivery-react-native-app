import React, { Component } from 'react';
import {
    StatusBar,
    Platform
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
export default class Return extends Component {
    render() {
        StatusBar.setBarStyle('light-content', true);
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('#ffbb00', true);
            StatusBar.setTranslucent(true);
        }

        return (<Container>
            <Header style={styles.searchBarContainer}>
                <Left>
                    <Button transparent onPress={() => {
                        this.props.navigation.goBack()
                    }}>
                        <Ionicons name="ios-arrow-back" size={24} color="#000" />
                    </Button>
                </Left>
                <Body>
                    <Text style={styles.headerTextOther}>{store.lang.return}</Text>
                </Body>
                <Right>

                </Right>
            </Header>
            <Content style={{ margin: 10 }}>
                <Text style={styles.answer}>
                Если вы приняли заказ, и мы вам пробили чек, то продовольственные товары надлежащего качества, в неповрежденной упаковке и с действующим сроком годности возврату и обмену не подлежат согласно закону «О защите прав потребителей». Также вы не можете обменять и вернуть товары надлежащего качества следующих категорий: предметы личной гигиены (зубные щетки, расчески, заколки, бигуди для волос, парики, шиньоны и другие аналогичные товары), парфюмерно-косметические товары, товары бытовой химии. 
Напоминаем, что при самовывозе или доставке вы можете проверить скомплектованный заказ и до того, как курьер пробил вам кассовый чек, отказаться от любого товара.
                </Text>
            </Content>
        </Container>)
    }
}