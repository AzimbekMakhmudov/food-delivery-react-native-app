
import { Platform, StyleSheet, Dimensions } from 'react-native';
import Fonts from '../theme/Fonts';
const { width, height } = Dimensions.get('window')
const Metrics = {
  WIDTH: width,
  HEIGHT: height
}


const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  footer: {
		height: 60
	},
  navigationItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  tabIcon: {
    height: (Metrics.HEIGHT * 0.03),
    width: (Metrics.HEIGHT * 0.03),
    resizeMode: 'contain',
    justifyContent: 'center',
  },

  activeTabText: {
    fontSize: Fonts.moderateScale(12),
    color:'#00bff3'
  },

  normalTabText: {
    fontSize: Fonts.moderateScale(12),
    color:'#929292'
  },

  searchInput: {
    color: "#a0a0a0",
    fontSize: Fonts.moderateScale(16),
    //fontFamily: Fonts.type.sfuiDisplayRegular,
    width: (Metrics.WIDTH * 0.75),
    marginLeft: (Metrics.WIDTH * 0.02),
    textAlignVertical: 'top',
    ...Platform.select({
      ios: {

      },
      android: {
        paddingTop: 5,
        paddingBottom: 0
			}
    }),
  },

  searchIcon: {
    marginLeft: (Metrics.WIDTH) * 0.02
  },

  cartImgBg: {
    width:(Metrics.WIDTH * 0.15),
    marginBottom: (Metrics.HEIGHT * 0.01),
    alignItems: 'center',
    justifyContent: 'center'
  },

  cartImage: {
    width: Metrics.WIDTH * 0.075,
    height: Metrics.WIDTH * 0.075,
    resizeMode: 'contain',
    alignSelf: 'center'
  },

  searcgBarBg: {
    alignItems: 'center',
    flexDirection: 'row',
    width: Metrics.WIDTH * 0.82,
    backgroundColor: '#f3f3f3',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    marginLeft: (Metrics.WIDTH * 0.03),
    marginBottom: (Metrics.HEIGHT * 0.01)
  },

  footerTabBg: {
    backgroundColor: '#f7f7f7',
    height: 60
  },
  tabActive: { 
    justifyContent: "center", 
    backgroundColor: 'red',
     width: 44, 
     height: 44,
     paddingLeft: 12,
     paddingRight: 12,
     paddingTop: 10,
     borderRadius: 22,
    overflow: 'hidden'
    },
    tabNormal: {
      justifyContent: "center", 
    },
    orderCount: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      textAlign: 'center',
      fontSize: Fonts.moderateScale(10),
      fontFamily: Fonts.type.helveticaNeueLight,
      position: 'absolute',
      top: 27,
      height: 12,
      width: 12,
      borderRadius: 6,
      lineHeight: 12
    },
    wb: {
      color: '#000',
      backgroundColor: '#fff'
    },
    bw: {
      color: '#fff',
      backgroundColor: '#000'
    },
    badge: {
      height: 18,
      width: 18,
      borderRadius: 9,
      position: 'absolute',
      marginLeft: width/2 + 5,
      marginTop: 5,
      elevation: 5,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    },
    badgeText: {
      fontFamily: Fonts.type.helveticaRegular,
      fontSize: Fonts.moderateScale(12),
      textAlign: 'center'
    }
});

export default styles;
