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
    Button,
    Accordion
} from 'native-base';
import styles from '../tabs/ContainTabStyle';
import Ionicons from "react-native-vector-icons/Ionicons";
import store from '../store/store.js';
import { observer } from 'mobx-react';

const header = [
    {
        name: "To'lov"
    },
    {
        name: "Оплата"
    },
    {
        name: "Оплата"
    }
]

const dataArray = [
    [
        { title: "Men qanday qilib to'lovni amalga oshirishim mumkin?", content: "Siz to'lovni mahsulotni qabul olgan paytingizda naqd pul yoki bank plastik kartochkasi orqali amalga oshirishingiz mumkin" },
        { title: "Kompaniya tovar yetkazib berilganligini \n tasdiqlovchi qanday chek taqdim qiladi?", content: "“Oltindiyor.uz” Chirchiqdagi mobil kassani ishda qo'llagan birinchi intenet-supermarket bo'ldi. Yetkazib beruvchi xodim sizga siz buyurtma qilgan barcha mahsulotlarning ro'yxati va narxi tushirilgan mahsulot chekini taqdim etadi." }
    ],
    [
        { title: "Как я могу оплатить?", content: "Совершить оплату вы сможете наличными средствами,а так же банковской картой при получении товара." },
        { title: "Какой чек предоставляет \n компания по факту доставки?", content: "“Oltindiyor.uz” стал первым интернет—супермаркетом в Чирчике,который принял в работу мобильные кассы. Курьер предоставит вам товарный чек,где будут перечислены все товары заказанные Вами,указано их количество и сумма." }
    ],
    [
        { title: "Как я могу оплатить?", content: "Совершить оплату вы сможете наличными средствами,а так же банковской картой при получении товара." },
        { title: "Какой чек предоставляет \n компания по факту доставки?", content: "“Oltindiyor.uz” стал первым интернет—супермаркетом в Чирчике,который принял в работу мобильные кассы. Курьер предоставит вам товарный чек,где будут перечислены все товары заказанные Вами,указано их количество и сумма." }
    ]
  ];

  const header2 = [
    {
        name: "Yetkazib berish"
    },
    {
        name: "Доставка"
    },
    {
        name: "Доставка"
    }
]

const dataArray2 = [
    [
        { title: "Yetkazib berish necha pul turadi?", content: "Yetkazib berish mutlaqo bepul." },
        { title: "Buyurtmaning minimal qiymati\n qanchani tashkil etadi?", content: "Buyurtma qilishning eng kam summasi 50.000 so'm." },
        { title: "“Oltindiyor.uz” ning yetkazib berish\n hududini qayerdan bilsa bo'ladi?", content: "“Oltindiyor.uz”ning yetkazib berish hududi faqat Chirchiq shahri bo'ylab joylashgan." },
        { title: "Qancha vaqt oralig'ida buyurtmani\n yetkazib berish amalga oshiriladi?", content: "Oziq-ovqat mahsulotlariga buyurtma ro'yxatdan o'tganidan keyin 1.30 minut ichida etkazib beriladi. Issiq ovqatlar va qandolat mahsulotlari buyurtma berilganidan keyin 60 minut ichida yetkazib beriladi." }
    ],
    [
        { title: "Сколько стоит доставка?", content: "Доставка абсолютно бесплатная." },
        { title: "Сколько составляет\n минимальная сумма заказа?", content: "Минимальная сумма заказа должна составлять 50.000сум." },
        { title: "Где можно посмотреть\n территорию доставки “Oltindiyor.uz”?", content: "Зона доставки “Oltindiyor.uz” распространена только по городу Чирчик." },
        { title: "В течении какого времени\n заказ будет доставлен?", content: "Заказ с продуктами питания будет доставлен в течении 1.30 минут после оформления.Заказ горячих блюд и кондитерских изделий  в течении 60 минут после оформления заказа."
         }
    ],
    [
        { title: "Сколько стоит доставка?", content: "Доставка абсолютно бесплатная." },
        { title: "Сколько составляет\n минимальная сумма заказа?", content: "Минимальная сумма заказа должна составлять 50.000сум." },
        { title: "Где можно посмотреть\n территорию доставки “Oltindiyor.uz”?", content: "Зона доставки “Oltindiyor.uz” распространена только по городу Чирчик." },
        { title: "В течении какого времени\n заказ будет доставлен?", content: "Заказ с продуктами питания будет доставлен в течении 1.30 минут после оформления.Заказ горячих блюд и кондитерских изделий  в течении 60 минут после оформления заказа." }
    ]
  ];

@observer
export default class Qa extends Component {
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
                    <Text style={styles.headerTextOther}>{store.lang.qa}</Text>
                </Body>
                <Right style={styles.rightAppBar}>

                </Right>
            </Header>
            <Content style={{backgroundColor: '#efefef'}}>
                <Text style={styles.question}>{header[store.langId-1].name}</Text>
                <Accordion dataArray={dataArray[store.langId-1]} contentStyle={styles.answer} headerStyle={styles.acHead} style={styles.accordion}/>
                <Text style={styles.question}>{header2[store.langId-1].name}</Text>
                <Accordion dataArray={dataArray2[store.langId-1]} contentStyle={styles.answer} headerStyle={styles.acHead} style={styles.accordion}/>
            </Content>
        </Container>)
    }
}