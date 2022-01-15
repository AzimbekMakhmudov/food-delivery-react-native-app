import React, { Component } from 'react';
import {
    StatusBar,
    Platform
} from 'react-native';
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Content,
    Button,
    Tabs,
    Tab,
    Text,
    ScrollableTab,
    TabHeading,
    ListItem,
    Radio,
    View
} from 'native-base';
import styles from '../tabs/ContainTabStyle';
import Ionicons from "react-native-vector-icons/Ionicons";
import store from '../store/store.js';
import { observer } from 'mobx-react';

@observer
export default class SelectTime extends Component {
    dayOfWeek = {
        0: ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"],
        1: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        2: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    }

    monthsOfYear = {
        0: ["Yanvar", "Fevral", "Mart", "April", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"],
        1: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        2: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Desember"]
    }

    state = {
        index: 0,
        checkBox: [],
        date: new Date(),
        time: 0
    }

    constructor(props) {
        super(props);

    }


    render() {
        StatusBar.setBarStyle('light-content', true);
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor('#ffbb00', true);
            StatusBar.setTranslucent(true);
        }

        var today = new Date();
        var tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        var afterTom = new Date();
        afterTom.setDate(today.getDate() + 2);

        return (<Container>
            <Header hasTabs style={styles.searchBarContainer}>
                <Left style={styles.leftAppBar}>
                    <Button transparent onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                        <Ionicons name="ios-arrow-back" size={24} color="#000" />
                    </Button>
                </Left>
                <Body style={styles.bodyAppBar}>
                    <Text style={styles.headerTextOther}>{store.lang.selectTime}</Text>
                </Body>
                <Right style={styles.rightAppBar}>
                    
                </Right>
            </Header>
            <Content>
                <Tabs onChangeTab={({ i, ref }) => {
                    this.setState({ index: i });
                    if (i == 0) {
                        this.setState({ date: today });
                        this.setState({ time: "" });
                    } else if (i == 1) {
                        this.setState({ date: tomorrow });
                        this.setState({ time: "" });
                    } else {
                        this.setState({ date: afterTom });
                        this.setState({ time: "" });
                    }
                }} initialPage={0} renderTabBar={() => <ScrollableTab />} tabBarBackgroundColor="#ffcc00" tabBarUnderlineStyle={{ backgroundColor: 'red', height: 2 }}>
                    <Tab heading={<TabHeading style={{ backgroundColor: '#fff', flexDirection: 'column'}}>
                        <Text style={[styles.tabHeadMainText, this.state.index == 0 ? { color: 'red' } : { color: '#929292' }]}>
                            {today.getDate()} {this.monthsOfYear[store.langId - 1][today.getMonth()]}
                        </Text>
                        <Text style={styles.tabSubText}>
                            {this.dayOfWeek[store.langId - 1][today.getDay()]}
                        </Text>
                    </TabHeading>}>
                        <ListItem style={{ borderColor: "#fff" }} disabled={today.getHours() >= 10?true:false} onPress={() => {
                            this.setState({ time: 11 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 11 ? true : false}
                            />
                            <Body>
                                <Text style={[styles.times,today.getHours() >=10?{opacity:0.3}:{opacity: 1}]}>10:00-11:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} disabled={today.getHours() >= 11?true:false} onPress={() => {
                            this.setState({ time: 12 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 12 ? true : false}
                            />
                            <Body>
                                <Text style={[styles.times,today.getHours() >= 11?{opacity:0.3}:{opacity: 1}]}>11:00-12:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} disabled={today.getHours() >= 12?true:false} onPress={() => {
                            this.setState({ time: 13 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 13 ? true : false}
                            />
                            <Body>
                                <Text style={[styles.times,today.getHours() >= 12?{opacity:0.3}:{opacity: 1}]}>12:00-13:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} disabled={today.getHours() >= 13?true:false} onPress={() => {
                            this.setState({ time: 14 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 14 ? true : false}
                            />
                            <Body>
                                <Text style={[styles.times,today.getHours() >= 13?{opacity:0.3}:{opacity: 1}]}>13:00-14:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} disabled={today.getHours() >= 14?true:false} onPress={() => {
                            this.setState({ time: 15 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 15 ? true : false}
                            />
                            <Body>
                                <Text style={[styles.times,today.getHours() >= 14?{opacity:0.3}:{opacity: 1}]}>14:00-15:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} disabled={today.getHours() >= 15?true:false} onPress={() => {
                            this.setState({ time: 16 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 16 ? true : false}
                            />
                            <Body>
                                <Text style={[styles.times,today.getHours() >= 15?{opacity:0.3}:{opacity: 1}]}>15:00-16:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} disabled={today.getHours() >= 16?true:false} onPress={() => {
                            this.setState({ time: 17 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 17 ? true : false}
                            />
                            <Body>
                                <Text style={[styles.times,today.getHours() >= 16?{opacity:0.3}:{opacity: 1}]}>16:00-17:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} disabled={today.getHours() >= 17?true:false} onPress={() => {
                            this.setState({ time: 18 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 18 ? true : false}
                            />
                            <Body>
                                <Text style={[styles.times,today.getHours() >= 17?{opacity:0.3}:{opacity: 1}]}>17:00-18:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} disabled={today.getHours() >= 18?true:false} onPress={() => {
                            this.setState({ time: 19 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 19 ? true : false}
                            />
                            <Body>
                                <Text style={[styles.times,today.getHours() >= 18?{opacity:0.3}:{opacity: 1}]}>18:00-19:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} disabled={today.getHours() >= 19?true:false} onPress={() => {
                            this.setState({ time: 20 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 20 ? true : false}
                            />
                            <Body>
                                <Text style={[styles.times,today.getHours() >= 19?{opacity:0.3}:{opacity: 1}]}>19:00-20:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} disabled={today.getHours() >= 20?true:false} onPress={() => {
                            this.setState({ time: 21 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 21 ? true : false}
                            />
                            <Body>
                                <Text style={[styles.times,today.getHours() >= 20?{opacity:0.3}:{opacity: 1}]}>20:00-21:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} disabled={today.getHours() >= 21?true:false} onPress={() => {
                            this.setState({ time: 22 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 22 ? true : false}
                            />
                            <Body>
                                <Text style={[styles.times,today.getHours() >= 21?{opacity:0.3}:{opacity: 1}]}>21:00-22:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} disabled={today.getHours() >= 22?true:false} onPress={() => {
                            this.setState({ time: 23 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 23 ? true : false}
                            />
                            <Body>
                                <Text style={[styles.times,today.getHours() >= 22?{opacity:0.3}:{opacity: 1}]}>22:00-23:00</Text>
                            </Body>
                        </ListItem>
                    </Tab>
                    <Tab heading={<TabHeading style={{ backgroundColor: '#fff', flexDirection: 'column' }}>
                        <Text style={[styles.tabHeadMainText, this.state.index == 1 ? { color: 'red' } : { color: '#929292' }]}>
                            {tomorrow.getDate()} {this.monthsOfYear[store.langId - 1][tomorrow.getMonth()]}
                        </Text>
                        <Text style={styles.tabSubText}>
                            {this.dayOfWeek[store.langId - 1][tomorrow.getDay()]}
                        </Text>
                    </TabHeading>}>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 11 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 11 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>10:00-11:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 12 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 12 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>11:00-12:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 13 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 13 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>12:00-13:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 14 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 14 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>13:00-14:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 15 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 15 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>14:00-15:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 16 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 16 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>15:00-16:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 17 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 17 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>16:00-17:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 18 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 18 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>17:00-18:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 19 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 19 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>18:00-19:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 20 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 20 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>19:00-20:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 21 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 21 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>20:00-21:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 22 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 22 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>21:00-22:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 23 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 23 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>22:00-23:00</Text>
                            </Body>
                        </ListItem>
                    </Tab>
                    <Tab heading={<TabHeading style={{ backgroundColor: '#fff', flexDirection: 'column' }}>
                        <Text style={[styles.tabHeadMainText, this.state.index == 2 ? { color: 'red' } : { color: '#929292' }]}>
                            {afterTom.getDate()} {this.monthsOfYear[store.langId - 1][afterTom.getMonth()]}
                        </Text>
                        <Text style={styles.tabSubText}>
                            {this.dayOfWeek[store.langId - 1][afterTom.getDay()]}
                        </Text>
                    </TabHeading>}>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 11 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 11 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>10:00-11:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 12 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 12 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>11:00-12:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 13 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 13 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>12:00-13:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 14 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 14 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>13:00-14:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 15 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 15 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>14:00-15:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 16 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 16 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>15:00-16:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 17 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 17 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>16:00-17:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 18 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 18 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>17:00-18:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 19 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 19 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>18:00-19:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 20 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 20 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>19:00-20:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 21 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 21 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>20:00-21:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 22 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 22 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>21:00-22:00</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ borderColor: "#fff" }} onPress={() => {
                            this.setState({ time: 23 });
                        }}>
                            <Radio
                                color={"#929292"}
                                selectedColor={"#ffcc00"}
                                selected={this.state.time == 23 ? true : false}
                            />
                            <Body>
                                <Text style={styles.times}>22:00-23:00</Text>
                            </Body>
                        </ListItem>
                    </Tab>
                </Tabs>
                <Button style={this.state.time > 0?styles.userInfoBtn:[styles.userInfoBtn, {backgroundColor: '#ddd'}]} onPress={() => {
                        if (this.state.time > 0) {
                            var date = "";
                            var date2 = "";
                            if (this.state.index == 0) {
                                date = today.getDate() + " " + this.monthsOfYear[store.langId - 1][today.getMonth()] + ", " + today.getFullYear();
                                date2 = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
                            } else if (this.state.index == 1) {
                                date = tomorrow.getDate() + " " + this.monthsOfYear[store.langId - 1][tomorrow.getMonth()] + ", " + tomorrow.getFullYear();
                                date2 = tomorrow.getFullYear() + "-" + (tomorrow.getMonth() + 1) + "-" + tomorrow.getDate();
                            } else {
                                date = afterTom.getDate() + " " + this.monthsOfYear[store.langId - 1][afterTom.getMonth()] + ", " + afterTom.getFullYear();
                                date2 = afterTom.getFullYear() + "-" + (afterTom.getMonth() + 1) + "-" + afterTom.getDate();
                            }
                            var time = (this.state.time - 1) + ":00 - " + this.state.time + ":00";
                            store.setDateTime(date, time, date2, this.state.time + ":" + "00:00");
                            this.props.navigation.goBack();
                        }
                    }}>
                        <Text style={styles.userInfoBtnText}>{store.lang.save}</Text>
                    </Button>
            </Content>
        </Container>)
    }
}