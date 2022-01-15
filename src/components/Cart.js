import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native';
import Fonts from '../theme/Fonts';
import Ionicons from "react-native-vector-icons/Ionicons";
import store from '../store/store.js';
import { observer } from 'mobx-react';

@observer
export default class BottomCart extends Component {
    constructor(props) {
        super(props);

        this.calculate = this.calculate.bind(this);
    }

    calculate() {
        var count = 0;
        if(Object.keys(store.count).length > 0)
          for(let i in store.count) {
            count += store.count[i];
          }
          return count;
    }

    calculateSumma() {
        var summa = 0;
        if(Object.keys(store.count).length > 0 && typeof store.price !== 'undefined' && Object.keys(store.price).length > 0)
          for(let i in store.count) {
              var s = store.count[i]*parseInt(store.price[i]);
              if(!isNaN(s))
                summa += s;
          }
          if(summa > 0)
            return summa;
          else
            return store.summa;  
        }

    changeToString = (val) => {
        var str = "";
        if (Math.floor(val / 1000) > 0) {
            var v = val / 1000;
            var dec1 = val - Math.floor(v) * 1000;
            if (dec1 > 0) {
                if (dec1 < 10)
                    dec1 = "00" + dec1;
                else if (dec1 < 100)
                    dec1 = "0" + dec1;

                str = str + dec1;
            } else
                str = str + "000";
            var dec2 = Math.floor(v / 1000);
            if (dec2 > 0) {
                var dec3 = Math.floor(v) - dec2 * 1000;
                if (dec3 < 10)
                    dec3 = "00" + dec3;
                else if (dec3 < 100)
                    dec3 = "0" + dec3;
                if (dec3 > 0)
                    str = dec3 + " " + str;
                else
                    str = "000 " + str;
                str = dec2 + " " + str;
            } else {
                str = Math.floor(v) + " " + str;
            }
        } else {
            str = val;
        }
        return str;
    }

    render() {
        return (<View style={{bottom: 0, marginTop: 'auto'}}>
            <TouchableOpacity activeOpacity={1} style={styles.basket} onPress={() => {
                this.props.go();
            }}>
                <View style={{ justifyContent: 'center', marginTop: 5, marginBottom: 5, borderRightWidth: 1, borderColor: '#ddd' }}>
                    <Text style={styles.basketMainText}>{this.changeToString(this.calculateSumma())}</Text>
                    {
                        store.skidka > 0 && (<Text style={styles.basketSkidka}>
                            {store.lang.ekonomiya}: {this.changeToString(store.skidka)}
                        </Text>)
                    }
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={styles.basketCountText}>
                        {this.calculate()} {store.lang.productsCount}
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} style={styles.basketRound} onPress={() => {
                 this.props.go();
            }}>
                <Ionicons name="ios-basket" size={32} color="#fff" style={{position: 'absolute', zIndex: 1000, marginLeft: 16}} />
                <Image source={require('../../assets/img/green.jpg')} style={{ width: '100%' }} />
            </TouchableOpacity>
        </View>);
    }
}

var { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    basketSkidka: {
        fontSize: Fonts.moderateScale(12),
        fontFamily: Fonts.type.helveticaRegular,
        color: 'red',
        paddingLeft: 10,
        paddingRight: 10,
        lineHeight: Fonts.moderateScale(12)
    },
    basketCountText: {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: Fonts.moderateScale(14),
        fontFamily: Fonts.type.helveticaRegular,
        color: '#000'
    },
    basketMainText: {
        fontSize: Fonts.moderateScale(20),
        fontFamily: Fonts.type.base,
        paddingLeft: 10,
        paddingRight: 10,
        color: '#000'
    },
    basketRound: {
        height: 60,
        width: 60,
        marginLeft: width - 70,
        marginRight: 10,
        borderRadius: 30,
        justifyContent: 'center',
        position: 'absolute',
        elevation: 10,
        marginTop: -30,
        overflow: 'hidden'
    },
    basket: {
        width: width,
        minHeight: 50,
        backgroundColor: '#f7f7f7',
        elevation: 7,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#ddd'
    },
});