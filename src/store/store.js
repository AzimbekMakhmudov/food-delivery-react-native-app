import { observable } from 'mobx';
import {
  AsyncStorage
} from 'react-native';
const ru = require('../lang/ru.json');
const uz = require('../lang/uz.json');
const en = require('../lang/en.json');

class store {
  @observable map_key = '108fa0d8-2905-445c-879b-17f8d255ee3b';
  @observable url = "https://oltindiyor.uz";
  @observable init = false;
  @observable lang = ru;
  @observable langId = 2;
  @observable count = {};
  @observable price = {};
  @observable discount = {};
  @observable liked = {};
  @observable viewed = {};
  @observable deviceId = 0;
  @observable orderBook = {};
  @observable addressText = "";
  @observable dateText = "";
  @observable timeText = "";
  @observable date = "";
  @observable time = "";
  @observable userInfo = {
    name: "Unknown",
    surname: "Unknown",
    phone: "",
    email: ""
  };
  @observable mapInfo = {};
  @observable point = 0;
  @observable summa = 0;
  @observable skidka = 0;

  constructor() {
    AsyncStorage.getItem('init').then((value) => {
      if (value != null) {
        this.init = JSON.parse(value);
      } else {
        this.init = false;
      }
    });

    AsyncStorage.getItem('count').then((value) => {
      if (value != null) {
        this.count = JSON.parse(value);
      }
    });

    AsyncStorage.getItem('price').then((value) => {
      if (value != null) {
        this.price = JSON.parse(value);
      }
    });

    AsyncStorage.getItem('liked').then((value) => {
      if (value != null) {
        this.liked = JSON.parse(value);
      }
    });

    AsyncStorage.getItem('viewed').then((value) => {
      if (value != null) {
        this.viewed = JSON.parse(value);
      }
    });

    AsyncStorage.getItem('orderBook').then((value) => {
      if (value != null) {
        this.orderBook = JSON.parse(value);
      }
    });

    AsyncStorage.getItem('userInfo').then((value) => {
      if (value != null) {
        this.userInfo = JSON.parse(value);
      }
    });

    AsyncStorage.getItem('mapInfo').then((value) => {
      if (value != null) {
        this.mapInfo = JSON.parse(value);
      }
    });

    AsyncStorage.getItem('addressText').then((value) => {
      if (value != null) {
        this.addressText = JSON.parse(value);
      }
    });

    AsyncStorage.getItem('summa').then((value) => {
      if (value != null) {
        this.summa = JSON.parse(value);
      }
    });

    AsyncStorage.getItem('skidka').then((value) => {
      if (value != null) {
        this.skidka = JSON.parse(value);
      }
    });

    AsyncStorage.getItem('discount').then((value) => {
      if (value != null) {
        this.discount = JSON.parse(value);
      }
    });
  }
  setPoint(point) {
    this.point = point;
  }
  setDateTime(date, time, date2, time2) {
    this.dateText = date;
    this.timeText = time;
    this.date = date2;
    this.time = time2;
  }
  setAddressText(text) {
    this.addressText = text;
    AsyncStorage.setItem('addressText', JSON.stringify(this.addressText));
  }
  setLang(num) {
    if (num == 1)
      this.lang = uz;
    else if (num == 2)
      this.lang = ru;
    else
      this.lang = en;
    //this.langId = num;
    this.langId = 2;
  }
  setInit() {
    this.init = true;

    AsyncStorage.setItem('init', JSON.stringify(this.init));
  }
  setDeviceId(id) {
    this.deviceId = id;
  }
  setOrderCount(id, count, summa, skidka, type = 1) {
    this.count[id] = count;

    var price = Math.abs(summa);

    this.price[id] = price;
    this.discount[id] = skidka;

    this.summa = this.summa + parseInt(summa);
    this.skidka = parseInt(this.skidka) + parseInt(skidka);
    if (type == 1 && count == 0) {
      delete this.count[id];
    }
    AsyncStorage.setItem('summa', JSON.stringify(this.summa));
    AsyncStorage.setItem('skidka', JSON.stringify(this.skidka));
    AsyncStorage.setItem('count', JSON.stringify(this.count));
    AsyncStorage.setItem('price', JSON.stringify(this.price));
    AsyncStorage.setItem('discount', JSON.stringify(this.discount));
  }
  resetOrderCount() {
    this.count = {};

    this.summa = 0;
    this.skidka = 0;
    AsyncStorage.setItem('summa', JSON.stringify(this.summa));
    AsyncStorage.setItem('skidka', JSON.stringify(this.skidka));
    AsyncStorage.setItem('count', JSON.stringify(this.count));
  }
  removeItem(id, price, skidka) {
    this.summa = this.summa - this.count[id] * price;
    this.skidka = this.skidka - Math.round(this.count[id] * price * (skidka / 100));
    AsyncStorage.setItem('summa', JSON.stringify(this.summa));
    AsyncStorage.setItem('skidka', JSON.stringify(this.skidka));
    delete this.count[id];
    AsyncStorage.setItem('count', JSON.stringify(this.count));
  }
  setLiked(id) {
    if (this.liked[id]) {
      delete this.liked[id];
    } else {
      this.liked[id] = true;
    }
    AsyncStorage.setItem('liked', JSON.stringify(this.liked));
  }
  resetLiked() {
    this.liked = {};
    AsyncStorage.setItem('liked', JSON.stringify(this.liked));
  }
  setViewed(id) {
    if (this.viewed[id]) {
      //delete this.viewed[id];
    } else {
      this.viewed[id] = true;
    }
    AsyncStorage.setItem('viewed', JSON.stringify(this.viewed));
  }
  resetViewed() {
    this.viewed = {};
    AsyncStorage.setItem('viewed', JSON.stringify(this.viewed));
  }
  setOrderBook(name, price, count, summa) {
    this.orderBook[name] = {
      products: count,
      price: price,
      summa: summa
    };
    AsyncStorage.setItem('orderBook', JSON.stringify(this.orderBook));
  }
  deleteOrderBook(name) {
    delete this.orderBook[name];
    AsyncStorage.setItem('orderBook', JSON.stringify(this.orderBook));
  }
  uploadToCart(name) {
    this.count = this.orderBook[name].products;

    var summa = 0;
    var skidka = 0;

    for (let i in this.count) {
      var s = this.count[i] * parseInt(this.price[i]);
      var k = this.count[i] * parseInt(this.discount[i]);
      if (!isNaN(s))
        summa += s;
      if (!isNaN(k))
        skidka += k;
    }
    
    this.summa = summa;
    this.skidka = skidka > 0 ? skidka: -skidka;

    AsyncStorage.setItem('summa', JSON.stringify(this.summa));
    AsyncStorage.setItem('skidka', JSON.stringify(this.skidka));
    AsyncStorage.setItem('count', JSON.stringify(this.count));
  }
  setUserInfo(userInfo) {
    this.userInfo = userInfo;
    AsyncStorage.setItem('userInfo', JSON.stringify(this.userInfo));
  }
  setAddress(data) {
    this.mapInfo = data;
    AsyncStorage.setItem('mapInfo', JSON.stringify(this.mapInfo));
  }
  returnRealCount() {
    var count = 0;
    if (Object.keys(this.count).length > 0) {
      for (let i in this.count) {
        if (this.count[i] > 0) {
          count += 1;
        }
      }
    }
    return count;
  }

  resetDateTime() {
    this.date = "";
    this.time = "";
    this.dateText = "";
    this.timeText = "";
  }

  calculateOrder() {
    var summa = 0;
    for (let i in this.count) {
      var count = this.count[i];
      var price = this.price[i];
      var sum = count * price;
      summa += sum;
    }

    if (summa != this.summa) {
      this.summa = summa;
      AsyncStorage.setItem('summa', JSON.stringify(summa));
    }

  }
}
export default new store();