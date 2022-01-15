import React, { Component } from 'react';
import {
    View
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from '../tabs/ContainTabStyle';
import FastImage from 'react-native-fast-image';
import { Text } from 'native-base';

export default class OtzivCart extends Component {
    state = {
        text: "",
        star: 5,
        date: "",
        productId: -1,
        name: '',
        image_url: "",
        userName: ""
    }
    componentWillReceiveProps(nextProps) {
        const {
            text,
            star,
            date,
            productId,
            name,
            image_url,
            userName
        } = nextProps;
        this.setState({
            text,
            star,
            date,
            productId,
            name,
            image_url,
            userName
        });
    }
    render() {
        return (
            <View style={styles.pagerItem3}>
                <View style={styles.otzivPart}>
                    <View style={styles.otzivTop}>
                        <View style={styles.starpart}>
                            <Ionicons name="ios-star" size={16} color={this.state.star > 0?"#ffee00":"#ddd"} style={styles.star} />
                            <Ionicons name="ios-star" size={16} color={this.state.star > 1?"#ffee00":"#ddd"} style={styles.star} />
                            <Ionicons name="ios-star" size={16} color={this.state.star > 2?"#ffee00":"#ddd"} style={styles.star} />
                            <Ionicons name="ios-star" size={16} color={this.state.star > 3?"#ffee00":"#ddd"} style={styles.star} />
                            <Ionicons name="ios-star" size={16} color={this.state.star > 4?"#ffee00":"#ddd"} style={styles.star} />
                        </View>
                        <View style={styles.datepart}>
                            <Text style={styles.dateparttext}>{this.state.date}</Text>
                        </View>
                    </View>
                    <Text style={styles.otzivBottom}>
                        {this.state.text}
                    </Text>
                    <Text style={styles.otzivauthor}>{this.state.userName}</Text>
                </View>
                <View style={styles.productPart}>
                    <FastImage style={styles.itemImageOtziv} source={{ uri: 'https://xumsan.uz/web' + this.state.image_url}} priority={FastImage.priority.normal} resizeMode={FastImage.resizeMode.contain} />
                    <Text style={styles.otzivproductname}>{this.state.name}</Text>
                </View>
            </View>)
    }
}