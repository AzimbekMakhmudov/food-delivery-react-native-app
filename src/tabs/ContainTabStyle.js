import { StatusBar, StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import Fonts from '../theme/Fonts';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const styles = StyleSheet.create({
	leftAppBar: {
		width: 70,
		paddingLeft: 10,
		paddingRight: 10
	},
	rightAppBar: {
		width: 70,
		paddingRight: 10,
		paddingLeft: 10
	},
	bodyAppBar: {
		width: width-140,
		//marginLeft: -100
	},
	container: {
		backgroundColor: '#fff',
		flex: 1,
		//height: height - 60
	},
	backImage: {
		width: width,
		height: 200,
		marginTop: -15,
		position: 'absolute'
	},
	searchBar: {
		alignSelf: 'stretch',
		backgroundColor: '#ffcc00',
		height: 32,
		width: width-140,
		alignItems: 'center',
		borderColor: '#000'
	},
	header: {
		backgroundColor: '#ffcc00',
		flexDirection: 'row',
		alignSelf: 'stretch'
	},
	searchBarContainer: {
		marginTop: StatusBar.currentHeight,
		backgroundColor: "#ffcc00"
	},
	searchIcon: {
		marginLeft: 10,
		marginRight: 10,
		width: 27,
		height: 27
	},
	reklamablock: {
		width: width
	},
	pagerItem: {
		height: width / 2,
		width: '100%',
		elevation: 5,
		marginBottom: 7,
		overflow: 'hidden'
	},
	pagerItem1: {
		backgroundColor: '#00DB15',
		height: height,
		width: '100%',
		borderRadius: 10,
		elevation: 5,
		marginBottom: 7
	},
	categoryBlock: {
		width: width,
		marginTop: 5
	},
	slider: {
		width: '100%',
		elevation: 10
	},
	paginationStyle: {
		marginTop: -25,
		marginBottom: -20
	},
	headerText: {
		textAlign: 'center',
		width: '100%',
		fontSize: Fonts.moderateScale(20),
		fontFamily: Fonts.type.sfuiDisplayRegular,
		width: width - 140
	},
	headerTextOther: {
		textAlign: 'center',
		width: width-140,
		fontFamily: Fonts.type.sfuiDisplayLight,
		fontSize: Fonts.moderateScale(15),
		color: '#000',
		marginLeft: 'auto',
		marginRight: 'auto'
	},
	headerSpec: {
		height: 40,
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(240, 240, 240, 0.5)',
		flexDirection: 'row'
	},
	headerSpecText: {
		fontFamily: Fonts.type.base,
		fontSize: Fonts.moderateScale(16),
		paddingLeft: 20,
		fontWeight: '100'
	},
	datapart: {
		paddingRight: 5
	},
	items: {
		borderColor: 'rgba(240, 240, 240, 0.5)',
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		height: 175,
		width: 160,
		//marginLeft: 5,
		//marginTop: 5,
		//borderRadius: 10,
		backgroundColor: '#fff'
	},
	itemsCat: {
		borderColor: 'rgba(240, 240, 240, 0.5)',
		borderRightWidth: 1,
		borderBottomWidth: 1,
		height: (width / 2) * 1.5,
		width: width / 2,
		backgroundColor: '#fff'
	},
	itemsCatImage: {
		height: ((width / 2)-20)*(6/7),
		width: (width / 2)-20,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 10,
		marginBottom: 'auto'
	},
	opImage: {
		height: 40,
		width: 40,
		marginLeft: 10,
		marginRight: 10,
	},
	itemImage: {
		width: 160,
		height: 130,
		marginLeft: 0,
		marginRight: 0,
		marginTop: 0,
		marginBottom: 'auto'
	},
	itemImage2: {
		width: 140,
		height: 120
	},
	heartIcon: {
		position: 'absolute',
		marginLeft: 130,
		marginTop: 10,
		zIndex: 10,
		opacity: 1,
		color: 'red'
	},
	heartIconUnliked: {
		position: 'absolute',
		marginLeft: 130,
		marginTop: 10,
		zIndex: 10,
		opacity: 1,
		color: '#ddd'
	},
	heartIconUnliked2: {
		position: 'absolute',
		marginLeft: (width / 2) - 30,
		marginTop: 10,
		zIndex: 10,
		opacity: 1,
		color: '#ddd'
	},
	heartIcon2: {
		position: 'absolute',
		marginLeft: (width / 2) - 30,
		marginTop: 10,
		zIndex: 10,
		opacity: 1,
		color: 'red'
	},
	itemBottom: {
		width: '100%',
		height: 45,
		flexDirection: 'row',
		paddingTop: 5,
        overflow: 'hidden'
	},
	bottomPrice: {
		fontFamily: Fonts.type.sfuiDisplayRegular,
		paddingLeft: 10,
		paddingTop: 10,
		color: '#000',
		fontSize: Fonts.moderateScale(15)
	},
	bottomPrice2: {
		fontFamily: Fonts.type.sfuiDisplayRegular,
		fontSize: Fonts.moderateScale(15),
		paddingLeft: 10,
		color: '#000'
	},
	basketBtn: {
		width: 30,
		height: 30,
		marginRight: 10,
		marginLeft: 'auto',
		elevation: 10,
		borderRadius: 15,
		justifyContent: 'center',
		overflow: 'hidden'
	},
	basketBtn2: {
		width: 30,
		height: 30,
		marginLeft: 'auto',
		elevation: 10,
		borderRadius: 15,
		justifyContent: 'center',
		marginRight: 10,
		overflow: 'hidden'
	},
	basketBtnExtended: {
		borderBottomRightRadius: 10,
		marginLeft: 'auto',
		flexDirection: 'row',
		height: 40,
		backgroundColor: '#fff'
	},
	bottomCount: {
		width: 40,
		height: 30,
		paddingTop: 3,
		fontFamily: Fonts.type.sfuiDisplayRegular,
		textAlign: 'center',
		fontSize: Fonts.moderateScale(16)
	},
	dialogStyle: { 
		width: 120 ,
		fontSize: Fonts.moderateScale(15),
		fontFamily: Fonts.type.base,
		minWidth: 100
	},
	dialogStyle2: {
		fontSize: Fonts.moderateScale(15),
		fontFamily: Fonts.type.base
	},
	dialogTitle: {
		fontSize: Fonts.moderateScale(16),
		fontFamily: Fonts.type.base
	},
	dialogDetail: {
		fontSize: Fonts.moderateScale(14),
		fontFamily: Fonts.type.base,
		lineHeight: Fonts.moderateScale(18)
	},
	bottomMinus: {
		width: 40,
		height: 30,
		justifyContent: 'center',
		elevation: 5,
		marginBottom: 7,
		borderBottomLeftRadius: 15,
		borderTopLeftRadius: 15, 
		marginLeft: 10,
		overflow: 'hidden'
	},
	extBtn: {
		marginRight: 5,
		borderLeftWidth: 1,
		paddingLeft: 6,
		borderLeftColor: '#fff'
	},
	extAdd: {
		marginLeft: 10,
	},
	extMinus: {
		marginLeft: 20
	},
	aksiyaBlock: {
		width: width,
		marginTop: 10
	},
	saleBlock: {
		marginTop: 5
	},
	pagerItem2: {
		height: width / 2 - 40,
		width: '100%',
		elevation: 3,
		marginBottom: 5,
		borderWidth: 1,
		borderColor: '#ddd'
	},
	pagerItem3: {
		height: 200,
		width: '100%',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ddd',
		elevation: 3,
		backgroundColor: '#fff',
		marginBottom: 5
	},
	slideStyle: {
		paddingRight: 2,
		paddingLeft: 2
	},
	saleCount: {
		position: 'absolute',
		marginLeft: 10,
		marginTop: 10,
		zIndex: 10,
		backgroundColor: 'red',
		color: '#fff',
		fontSize: Fonts.moderateScale(10),
		fontFamily: Fonts.type.sfuiDisplayRegular,
		paddingTop: 2,
		paddingBottom: 2,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 5
	},
	salePrice: {
		flexDirection: 'column'
	},
	oldPrice: {
		fontSize: Fonts.moderateScale(10),
		fontFamily: Fonts.type.sfuiDisplayRegular,
		paddingLeft: 10,
		lineHeight: 10,
		color: '#929292',
		textDecorationLine: "line-through",
		textDecorationColor: '#929292'

	},
	services: {
		marginTop: 10,
		borderWidth: 1,
		borderColor: 'rgba(240, 240, 240, 0.5)',
		marginLeft: 5,
		marginRight: 5,
		borderRadius: 10,
		elevation: 3,
		marginBottom: 5,
		backgroundColor: '#fff'
	},
	listItem: {
		marginRight: 0,
		flexDirection: 'row',
		marginBottom: -1,
	},
	listItem3: {
		flexDirection: 'row',
		marginBottom: -1
	},
	listItemText: {
		fontFamily: Fonts.type.base,
		fontSize: Fonts.moderateScale(15)
	},
	listItemText10: {
		fontFamily: Fonts.type.bold,
		fontSize: Fonts.moderateScale(13),
		color: '#000'
	},
	listRightIcon: {
		marginLeft: 'auto'
	},
	colorful: {
		width: 30,
		height: 30,
		marginBottom: -5,
		marginRight: 10
	},
	listLeftIcon: {
		marginRight: 10,
		width: 30
	},
	otzivPart: {
		height: '65%',
		marginLeft: 10,
		marginRight: 10,
		paddingTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#929292'
	},
	productPart: {
		height: '35%',
		flexDirection: 'row',
		marginRight: 10
	},
	otzivTop: {
		height: 30,
		width: '100%',
		flexDirection: 'row'
	},
	datepart: {
		height: '100%',
		width: '50%'
	},
	starpart: {
		height: '100%',
		width: '50%',
		flexDirection: 'row',
	},
	dateparttext: {
		fontSize: Fonts.moderateScale(12),
		color: '#777',
		fontFamily: Fonts.type.helveticaRegular,
		marginLeft: 'auto'
	},
	star: {
		marginLeft: 1
	},
	otzivBottom: {
		fontFamily: Fonts.type.base,
		paddingLeft: 10,
		paddingRight: 10,
		fontSize: Fonts.moderateScale(14),
		marginBottom: 5
	},
	otzivauthor: {
		fontSize: Fonts.moderateScale(14),
		fontFamily: Fonts.type.sfuiDisplaySemibold,
		marginLeft: 'auto',
		marginTop: 'auto',
		marginBottom: 5
	},
	itemImageOtziv: {
		height: '80%',
		marginTop: 'auto',
		marginBottom: 'auto',
		marginLeft: 10,
		width: '30%'
	},
	otzivproductname: {
		fontSize: Fonts.moderateScale(14),
		marginLeft: 10,
		marginTop: 'auto',
		marginBottom: 'auto',
		marginLeft: 'auto',
		fontFamily: Fonts.type.sfuiDisplayMedium
	},
	bottom: {
		width: '100%',
		height: 320,
		marginTop: 20,
		borderTopWidth: 1,
		borderTopColor: '#ddd',
		paddingTop: 10,
		marginBottom: 10
	},
	listItem2: {
		borderBottomWidth: 0,
		flexDirection: 'row',
		height: 50
	},
	iconButton: {
		padding: 5,
		marginRight: 10,
		borderRadius: 3,
		width: 30,
		justifyContent: 'center',
		alignItems: 'center'
	},
	listItemText2: {
		fontSize: Fonts.moderateScale(16),
		fontFamily: Fonts.type.robotoMedium,
		fontWeight: '100'
	},
	listItemText3: {
		fontSize: Fonts.moderateScale(16),
		fontFamily: Fonts.type.sfuiDisplayRegular,
		marginLeft: 10,
		color: '#000'
	},
	listItemText4: {
		fontSize: Fonts.moderateScale(15),
		fontFamily: Fonts.type.sfuiDisplayLight,
		marginLeft: 10,
		color: '#000'
	},
	listRightIcon2: {
		marginLeft: 'auto',
		marginRight: 30,
		borderWidth: 1,
		borderColor: '#ffcc00',
		paddingTop: 3,
		paddingBottom: 3,
		paddingLeft: 15,
		paddingRight: 15,
		marginBottom: 10,
		justifyContent: 'center',
		borderRadius: 5,
		backgroundColor: '#ffcc00',
		elevation: 3
	},
	listRightIcon2Text: {
		fontSize: Fonts.moderateScale(12),
		fontFamily: Fonts.type.sfuiDisplayRegular,
		color: '#000'
	},
	plusIcon: {
		width: 29,
		height: 30,
		justifyContent: 'center',
		elevation: 5,
		marginBottom: 7,
        overflow: 'hidden'
	},
	basketIcon: {
		width: 30,
		height: 30,
		justifyContent: 'center',
		elevation: 5,
		marginBottom: 7,
		borderBottomRightRadius: 15,
		borderTopRightRadius: 15,
		marginRight: 10,
		overflow: 'hidden'
	},
	animatible: {
		flexDirection: 'row'
	},
	cart: {
		backgroundColor: '#fff',
		marginLeft: 10,
		marginRight: 10,
		elevation: 5,
		marginBottom: 10,
		paddingTop: 20,
		paddingBottom: 20,
		marginTop: 5,
		borderRadius: 10
	},
	body: {
		minHeight: height - getStatusBarHeight() - 110,
		width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto'
	},
	bodyWithoutFooter: {
		height: height - getStatusBarHeight() - 50,
		width: '100%',
        marginLeft: 'auto',
		marginRight: 'auto',
		paddingBottom: 20
	},
	cartConfirmBtn: {
		width: width - 100,
		position: 'absolute',
		elevation: 10,
		marginBottom: 7,
		marginLeft: 5,
		marginRight: 5,
		alignSelf: 'center',
		height: 40,
		borderRadius: 20,
		marginTop: height - getStatusBarHeight() - 160,
		overflow: 'hidden',
		justifyContent: 'center',
        bottom: 10
	},
	cartConfirmBtn2: {
		width: width - 100,
		position: 'absolute',
		elevation: 10,
		marginBottom: 7,
		marginLeft: 5,
		marginRight: 5,
		alignSelf: 'center',
		height: 40,
		borderRadius: 20,
		marginTop: height - getStatusBarHeight() - 116,
		overflow: 'hidden',
		justifyContent: 'center',
        bottom: 7
	},
	cartConfirmBtnText: {
		color: '#fff',
		fontSize: Fonts.moderateScale(16),
		fontFamily: Fonts.type.sfuiDisplayRegular,
		width: '100%',
		textAlign: 'center',
		position: 'absolute',
		zIndex: 1000
	},
	bottomCard2: {
		width: 158,
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: 'auto',
		backgroundColor: '#fff'
	},
	listFooterContent: {
		backgroundColor: '#fff',
		width: '100%'
	},
	totalprice: {
		width: '100%',
		paddingLeft: 20,
		paddingRight: 10,
		paddingBottom: 10,
		flexDirection: 'row'
	},
	totalprice2: {
		width: '100%',
		flexDirection: 'row'
	},
	totalPrices: {
		fontSize: Fonts.moderateScale(20),
		fontFamily: Fonts.type.sfuiDisplayRegular,
		color: '#000',
		width: '40%',
		textAlign: 'right'
	},
	totalPricesText: {
		paddingTop: 5,
		width: '60%',
		fontSize: Fonts.moderateScale(16)
	},
	itogoText: {
		width: '60%',
		fontSize: Fonts.moderateScale(16),
		color: '#000',
		paddingTop: 10
	},
	itogoCount: {
		marginLeft: 'auto',
		fontSize: Fonts.moderateScale(16),
		color: '#000',
		paddingTop: 10
	},
	itogoConut: {
		width: '40%',
		fontFamily: Fonts.type.sfuiDisplayRegular,
		color: '#000',
		fontSize: Fonts.moderateScale(24),
		textAlign: 'right'
	},
	hr: {
		marginTop: 10,
		marginBottom: 10,
		height: 1,
		marginLeft: 10,
		marginRight: 10,
		backgroundColor: '#ddd'
	},
	categoryList: {
		flexDirection: 'row'
	},
	productName: {
		marginTop: 'auto',
		marginBottom: 'auto',
		fontSize: Fonts.moderateScale(14),
		fontFamily: Fonts.type.base,
		color: '#000',
		textAlign: 'center'
	},
	productName2: {
		textAlign: 'center',
		fontSize: Fonts.moderateScale(14),
		fontFamily: Fonts.type.base,
		marginBottom: 5,
		color: '#000',
		paddingLeft: 3,
		paddingRight: 3
	},
	panel: {
		width: '100%',
		height: 200,
		backgroundColor: '#ffcc00'
	},
	userImage: {
		height: 100,
		width: 100,
		alignSelf: 'center',
		borderWidth: 1,
		borderColor: '#000',
		borderRadius: 50,
		backgroundColor: '#fff',
		justifyContent: 'center'
	},
	userIcon: {
		alignSelf: 'center'
	},
	userName: {
		marginTop: 10,
		alignSelf: 'center',
		fontSize: Fonts.moderateScale(18),
		fontFamily: Fonts.type.sfuiDisplaySemibold,
		color: '#000'
	},
	userTel: {
		marginTop: 5,
		alignSelf: 'center',
		fontSize: Fonts.moderateScale(14),
		fontFamily: Fonts.type.sfuiDisplayLight
	},
	userlist: {
		marginLeft: 10,
		marginRight: 10
	},
	userListItem: {
		fontSize: Fonts.moderateScale(18),
		fontFamily: Fonts.type.base,
		marginLeft: 20,
		color: '#000'
	},
	arrowRight: {
		marginLeft: 'auto'
	},
	arrowLeft: {
		marginLeft: 10,
		width: 40,
		alignSelf: 'center'
	},
	totalHeader: {
		marginLeft: 20,
		marginBottom: 10,
		color: '#000',
		fontSize: Fonts.moderateScale(18),
		fontFamily: Fonts.type.sfuiDisplaySemibold
	},
	itemsCart: {
		height: 140,
		marginLeft: width > 400?'auto':3,
		marginRight: 'auto',
		backgroundColor: '#fff',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	rowDirection: {
		flexDirection: 'row',
		marginTop: 10,
		marginRight: 10
	},
	cartList: {
		paddingTop: 10,
		width: '100%'
	},
	footer: {
		borderTopWidth: 1,
		borderColor: '#ddd',
		width: '100%',
		paddingBottom: 50,
		paddingTop: 30,
		marginTop: 10
	},
	floatRight: {
		marginLeft: 'auto',
		flexDirection: 'row'
	},
	cartBtns: {
		height: 25,
		width: 50,
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#dddd',
		marginLeft: 5,
        padding: 0
	},
	cartBtns2: {
		height: 25,
		justifyContent: 'center',
		marginLeft: 5,
		flexDirection: 'row',
		width: '100%',
      padding: 0
	},
	cartRemoveBtns: {
		height: 25,
		width: 50,
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#dddd',
		marginLeft: 'auto',
		marginRight: 10,
		marginTop: 10,
		padding: 0
	},
	cartBottom: {
		width: 158,
		marginLeft: 'auto',
		marginBottom: 10,
		marginTop: 'auto',
		overflow: 'visible'
	},
	detailedPart: {
		flexDirection: 'column',
		width: width - 180
	},
	imageBox: {
		marginLeft: 0,
		marginRight: 5,
		marginTop: 10,
		marginBottom: 'auto',
		borderRadius: 20,
		borderWidth: 1,
		borderColor: 'rgba(240, 240, 240, 0.5)',
		overflow: 'hidden'
	},
	filterPart: {
		height: 40,
		backgroundColor: '#fff',
		borderBottomWidth: 1,
		borderBottomColor: '#f0f0f0',
		justifyContent: 'center',
		flexDirection: 'row'
	},
	filterText: {
		fontSize: Fonts.moderateScale(16),
		fontFamily: Fonts.type.helveticaRegular,
		color: '#929292',
		marginRight: 10
	},
	filterHeader: {
		flexDirection: 'row',
		marginLeft: 'auto',
		marginTop: 10,
		marginRight: 10
	},
	stars: {
		flexDirection: 'row',
		marginBottom: 5,
		justifyContent: 'center'
	},
	question: {
		fontFamily: Fonts.type.helveticaBold,
		fontSize: Fonts.moderateScale(16),
		color: '#000',
		fontWeight: '700',
		paddingLeft: 10,
		paddingBottom: 10,
		paddingTop: 10
	},
	question2: {
		fontFamily: Fonts.type.helveticaBold,
		fontSize: Fonts.moderateScale(16),
		color: '#000',
		fontWeight: '500',
		paddingTop: 10
	},
	question3: {
		fontFamily: Fonts.type.helveticaRegular,
		fontSize: Fonts.moderateScale(14),
		color: '#000',
		paddingLeft: 10,
		paddingTop: 10,
		paddingBottom: 10,
		width: '100%',
		borderBottomWidth: 2,
		borderColor: 'green',
		color: 'green',
		fontWeight: '500'
	},
	accordion: {
		width: width,
		padding: 5,
		backgroundColor: '#fff'
	},
	inputTextCat: {
		fontFamily: Fonts.type.base,
		fontSize: Fonts.moderateScale(16),
	},
	acHead: {
		backgroundColor: '#fff', 
		padding: 0,
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 10,
		marginBottom: 0,
		fontFamily: Fonts.type.helveticaBold,
		fontSize: Fonts.moderateScale(14),
	},
	answer: {
		fontFamily: Fonts.type.helveticaBold,
		fontSize: Fonts.moderateScale(14),
		color: '#555',
		paddingLeft: 10
	},
	answer2: {
		fontFamily: Fonts.type.helveticaBold,
		fontSize: Fonts.moderateScale(14),
		color: '#929292',
		width: width - 60,
		paddingBottom: 20,
		paddingRight: 5
	},
	columnDirection: {
		flexDirection: "column"
	},
	subUserListItem: {
		fontSize: Fonts.moderateScale(12),
		fontFamily: Fonts.type.base,
		marginLeft: 20,
	},
	badge: {
		position: 'absolute',
		fontSize: Fonts.moderateScale(10),
		backgroundColor: '#ff9900',
		width: 16,
		height: 16,
		paddingLeft: 0,
		paddingRight: 0,
		textAlign: 'center',
		paddingTop: 2,
		borderRadius: 8,
		marginLeft: width > 400 ? 139:134,
		color: '#fff',
		elevation: 11,
		marginTop: 0,
		fontFamily: Fonts.type.helveticaNeueLight,
		overflow: 'hidden'
	},
	roundedBox: {
		height: width * 2 / 3,
		width: width * 2 / 3,
		borderRadius: width / 3,
		overflow: 'hidden',
		marginLeft: 'auto',
		marginRight: 'auto',
		backgroundColor: '#fff'
	},
	activityIndicator: {
		marginTop: 30,
		height: 50
	},
	emptyBox: {
		width: width,
		height: height - getStatusBarHeight() - 120,
		justifyContent: 'center',
        alignItems: 'center'
	},
	backetImage: {
		height: width / 3,
		width: width / 3,
		alignSelf: 'center'
	},
	emptyHeaderText: {
		width: '100%',
		textAlign: 'center',
		fontSize: Fonts.moderateScale(20),
		fontFamily: Fonts.type.bold,
		marginBottom: 10
	},
	emptySubHeaderText: {
		textAlign: 'center',
		fontSize: Fonts.moderateScale(14),
		fontFamily: Fonts.type.sfuiDisplayLight,
		width: width * 2 / 3,
		marginTop: 30,
		alignSelf: 'center'
	},
	emptySubHeaderText2: {
		textAlign: 'center',
		fontSize: Fonts.moderateScale(14),
		fontFamily: Fonts.type.sfuiDisplayLight,
		width: width * 2 / 3,
		alignSelf: 'center'
	},
	emptySubHeaderText3: {
		textAlign: 'center',
		fontSize: Fonts.moderateScale(14),
		fontFamily: Fonts.type.sfuiDisplayLight,
		width: '100%'
	},
	input: {
		borderColor: '#ddd',
		borderWidth: 1,
		borderRadius: 5,
		fontSize: Fonts.moderateScale(14),
		backgroundColor: '#ededed'
	},
	inputBox: {
		minHeight: 70,
		margin: 2,
		marginTop: 10
	},
	inputBox2: {
		minHeight: 100,
		margin: 2,
		marginTop: 10
	},
	modal: {
		backgroundColor: 'rgba(0,0,0,0.3)',
		height: '100%',
		width: '100%'
	},
	modalPanel: {
		marginLeft: 30,
		marginRight: 30,
		minHeight: 300,
		backgroundColor: '#fff',
		marginTop: 'auto',
		marginBottom: 'auto',
		elevation: 10,
		borderRadius: 10,
		padding: 10
	},
	langblock: {
		position: 'absolute',
		height: 200,
		width: width,
		marginTop: height / 3
	},
	btn: {
		backgroundColor: '#fff',
		width: 250,
		backgroundColor: '#e5293e',
		flexDirection: 'row',
		borderColor: '#e5293e',
		borderRadius: 30,
		marginLeft: (width - 250) / 2,
		justifyContent: 'center',
		marginTop: 10
	},
	btn2: {
		backgroundColor: '#fff',
		backgroundColor: '#e5293e',
		flexDirection: 'row',
		borderColor: '#e5293e',
		borderRadius: 30,
		marginLeft: 'auto',
		marginRight: 'auto',
		justifyContent: 'center',
		marginTop: 10,
		paddingLeft: 20,
		paddingRight: 20
	},
	langimage: {
		height: 20,
		width: 30,
		marginTop: 'auto',
		marginBottom: 'auto'
	},
	btnText: {
		color: '#fff',
		fontSize: Fonts.moderateScale(22),
		fontFamily: Fonts.type.base,
		marginLeft: 10,
		paddingTop: 10,
		paddingBottom: 10
	},
	bottomModal: {
		marginTop: 'auto',
		flexDirection: 'row'
	},
	bottomBtn: {
		width: '50%'
	},
	bottomBtnText: {
		color: '#000',
		fontSize: Fonts.moderateScale(18),
		fontFamily: Fonts.type.sfuiDisplayLight,
		width: '100%',
		textAlign: 'center'
	},
	inputLabel: {
		fontSize: Fonts.moderateScale(14),
		fontFamily: Fonts.type.base,
		marginBottom: 2,
		marginTop: 3,
		color: '#000'
	},
	keyboardcontainer: {
		paddingLeft: 10,
		marginTop: 10,
		backgroundColor: '#fff',
		paddingRight: 10,
		borderRadius: 5,
		minHeight: height - 100
	},
	keyboardcontainer2: {
		paddingLeft: 10,
		backgroundColor: '#fff',
		paddingRight: 10,
		borderRadius: 5
	},
	userInfoBtn: {
		marginTop: 'auto',
		width: '100%',
		backgroundColor: '#ffcc00'
	},
	connectBtn: {
		marginTop: 20,
		width: '100%',
		backgroundColor: '#ffcc00'
	},
	userInfoBtn2: {
		marginTop: 'auto',
		width: '100%',
		backgroundColor: '#e5e5e5'
	},
	userInfoBtnText: {
		width: '100%',
		textAlign: 'center',
		fontSize: Fonts.moderateScale(15),
		fontFamily: Fonts.type.sfuiDisplayRegular,
		color: '#000'
	},
	statusContainer: {
		marginLeft: 5,
		marginRight: 5,
		paddingLeft: 10,
		paddingRight: 10,
		marginTop: 10,
		borderColor: '#ddd',
		borderWidth: 1,
		borderRadius: 5,
		backgroundColor: '#fff',
		elevation: 3
	},
	head: {
		fontSize: Fonts.moderateScale(20),
		fontFamily: Fonts.type.sfuiDisplayMedium,
		marginTop: 5
	},
	situationBox: {
		width: '33.333333333%'
	},
	situationLine: {
		borderTopWidth: 1,
		width: '100%'
	},
	row: {
		flexDirection: 'row',
		marginBottom: 10
	},
	leftCircle: {
		marginTop: -15
	},
	simpleText: {
		fontSize: Fonts.moderateScale(12),
		fontFamily: Fonts.type.sfuiDisplayLight
	},
	simpleText2: {
		fontSize: Fonts.moderateScale(10),
		fontFamily: Fonts.type.sfuiDisplayLight,
		width: 50,
		textAlign: 'center'
	},
	imojiBtn: {
		width: 50,
		height: 50,
		marginRight: 2,
		flexDirection: 'column'
	},
	imojis: {
		width: 30,
		height: 30,
		alignSelf: 'center'
	},
	circle: {
		width: 30,
		height: 30,
		borderWidth: 1,
		borderRadius: 15,
		backgroundColor: '#fff',
		marginBottom: 10,
		elevation: 3
	},
	inlineCircle: {
		width: 24,
		height: 24,
		borderRadius: 15,
		backgroundColor: '#929292',
		margin: 2
	},
	statusCount: {
		color: '#000',
		fontSize: Fonts.moderateScale(16),
		fontFamily: Fonts.type.sfuiDisplayLight
	},
	statusProduct: {
		color: '#000',
		fontSize: Fonts.moderateScale(14),
		fontFamily: Fonts.type.sfuiDisplayLight,
		marginLeft: 20,
		width: width / 2
	},
	statusSumma: {
		color: '#000',
		fontSize: Fonts.moderateScale(16),
		fontFamily: Fonts.type.sfuiDisplayLight,
		textAlign: 'right',
		marginLeft: 10,
		marginLeft: 'auto'
	},
	statusStatus: {
		color: 'green',
		fontSize: Fonts.moderateScale(16),
		fontFamily: Fonts.type.sfuiDisplayLight,
		textAlign: 'right',
		marginLeft: 10,
		marginLeft: 'auto'
	},
	statusStatus2: {
		color: 'red',
		fontSize: Fonts.moderateScale(16),
		fontFamily: Fonts.type.sfuiDisplayLight,
		textAlign: 'right',
		marginLeft: 10,
		marginLeft: 'auto'
	},
	statusTotal: {
		color: '#000',
		fontSize: Fonts.moderateScale(16),
		fontFamily: Fonts.type.sfuiDisplayLight,
		fontWeight: '900'
	},
	statusTotalSumma: {
		color: '#000',
		fontSize: Fonts.moderateScale(16),
		fontFamily: Fonts.type.sfuiDisplayLight,
		fontWeight: '500',
		marginLeft: 'auto'
	},
	deliveryBtn: {
		width: '100%',
		marginBottom: 10,
		backgroundColor: '#ffcc00'
	},
	deliveryBtnText: {
		width: '100%',
		textAlign: 'center',
		fontSize: Fonts.moderateScale(14),
		fontFamily: Fonts.type.sfuiDisplayLight,
		color: '#000'
	},
	map: {
		width: width,
		height: height - 56 - getStatusBarHeight(),
		marginTop: 1
	},
	mapView: {
		position: 'absolute',
		backgroundColor: 'transparent',
		alignSelf: 'flex-end',
		width: 36,
		height: 36,
		top: 10,
		right: 10,
		borderRadius: 18,
		backgroundColor: 'rgba(255, 255, 255, .9)',
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 7
	},
	markerCenter: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent'
	},
	mapButton: {
		position: 'absolute',
		backgroundColor: '#ffcc00',
		left: 20,
		right: 20,
		bottom: 7,
		elevation: 7
	},
	mapButtonText: {
		width: '100%',
		textAlign: 'center',
		color: '#000',
		fontSize: Fonts.moderateScale(14),
		fontFamily: Fonts.type.sfuiDisplayLight
	},
	loadinIndicatorMap: {
		width: 40,
		height: 40,
		backgroundColor: '#fff',
		borderRadius: 20,
		marginTop: -120,
		opacity: 0.9
	},
	mapTitle: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent'
	},
	titleCont: {
		width: 180,
		minHeight: 30,
		backgroundColor: '#fff',
		opacity: 0.9,
		borderRadius: 5,
		elevation: 5,
		bottom: 60
	},
	triangleTitle: {
		width: 0,
		height: 0,
		borderTopWidth: 10,
		borderLeftWidth: 5,
		borderRightWidth: 5,
		borderTopColor: '#fff',
		borderLeftColor: 'transparent',
		borderRightColor: 'transparent',
		bottom: 60,
		elevation: 5
	},
	titleText: {
		fontSize: Fonts.moderateScale(12),
		fontFamily: Fonts.type.sfuiDisplayLight,
		color: '#000',
		padding: 3
	},
	aksiyaDate: {
		fontSize: Fonts.moderateScale(14),
		fontFamily: Fonts.type.sfuiDisplayMedium,
		textShadowColor: 'rgba(0,0,0,0.75)',
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
		color: '#fff',
		position: 'absolute',
		bottom: 5,
		left: 10
	},
	advertImage: {
		width: width,
		height: width / 2,
		borderBottomWidth: 1,
		borderColor: '#ddd'
	},
	shablonCart: {
		width: width - 10,
		borderWidth: 1,
		borderColor: '#ddd',
		margin: 5,
		borderRadius: 5,
		backgroundColor: '#fff',
		elevation: 3
	},
	tabHeadMainText: {
		fontSize: Fonts.moderateScale(16),
		fontFamily: Fonts.type.base,
		paddingLeft: 20,
		paddingRight: 20
	},
	tabSubText: {
		color: '#929292',
		fontSize: Fonts.moderateScale(12),
		fontFamily: Fonts.type.helveticaNeueLight
	},
	times: {
		color: '#000',
		fontSize: Fonts.moderateScale(16),
		fontFamily: Fonts.type.sfuiDisplayRegular,
		paddingTop: 2
	},
	contactInfo: {
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 10,
		backgroundColor: '#fff',
		paddingTop: 10
	},
	number: {
		backgroundColor: '#000',
		color: '#fff',
		width: 25,
		height: 25,
		borderRadius: 25 / 2,
		fontSize: Fonts.moderateScale(14),
		fontFamily: Fonts.type.sfuiDisplayLight,
		textAlign: 'center',
		paddingTop: 3,
      overflow: 'hidden'
	},
	contactHead: {
		lineHeight: 25,
		fontFamily: Fonts.type.robotoMedium,
		marginLeft: 10,
		fontSize: Fonts.moderateScale(16)
	},
	divider: {
		backgroundColor: '#ededed',
		height: 20,
		width: width
	},
	inputREf: {
		margin: 2,
		marginTop: 10,
		flexDirection: 'row'
	},
	IconColor: {
		color: "green",
		fontSize: Fonts.moderateScale(18)
	},
	textColor: {
		fontSize: Fonts.moderateScale(18),
		fontFamily: Fonts.type.base,
		marginBottom: 2,
		marginTop: 3,
		color: 'green',
		marginBottom: 10
	},
	filterModal: {
		backgroundColor: '#fff',
		marginLeft: 10,
		marginRight: 10,
		marginTop: 30,
		marginBottom: 10,
		width: width - 20,
		borderRadius: 5
	},
	modal: {
		backgroundColor: 'rgba(0,0,0,0.3)',
		height: '100%',
		width: '100%'
	},
	priceText: {
		fontSize: Fonts.moderateScale(10),
		color: '#5e5e5e',
		marginLeft: 10,
		width: '30%'
	},
	priceText1: {
		fontSize: Fonts.moderateScale(10),
		color: '#5e5e5e',
		alignSelf: 'flex-start'
	},
	priceText2: {
		fontSize: Fonts.moderateScale(10),
		color: '#5e5e5e',
		alignSelf: 'flex-end',
		marginLeft: 'auto'
	},
	close: {
		fontSize: Fonts.moderateScale(18),
		color: '#929292',
		width: '100%',
		textAlign: 'center'
	},
	apply: {
		lineHeight: 30,
		fontSize: Fonts.moderateScale(16),
		fontFamily: Fonts.type.base,
		color: 'red'
	},
	dropdown: {
		backgroundColor: '#fff',
		minHeight: 40,
		elevation: 10,
		marginBottom: 20,
		marginLeft: 20,
		marginRight: 3,
		alignSelf: 'flex-end',
		marginTop: 30
	},
	paymentIcon: {
		width: 60,
		paddingTop: 10,
		paddingLeft: 15
	},
	aoView: {
		height: height-getStatusBarHeight()-100
	},
	aoIconView: {
		width: width, 
		height: 250,
		justifyContent: 'center'
	},
	deliveryBlock: {
		width: width/2,
		height: width/2,
		marginLeft: 7,
		marginRight: 7,
		marginBottom: 20,
		elevation: 5,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		marginTop: -5
	},
	detailed: {
		fontSize: Fonts.moderateScale(16),
		fontFamily: Fonts.type.helveticaRegular,
		marginLeft: 15,
		marginBottom: 10,
		fontWeight: '700',
		color: 'green'
	},
	deliveryMainText: {
		fontSize: Fonts.moderateScale(22),
		fontFamily: Fonts.type.base,
		marginLeft: 15,
		marginRight: 15,
		marginTop: 'auto',
		marginBottom: 'auto',
		textAlign: 'center'
	},
	deliveryModal: {
		width: width-40,
		marginLeft: 20,
		marginRight: 20,
		marginTop: 'auto',
		marginBottom: 'auto',
		minHeight: 300,
		backgroundColor: '#fff',
		borderRadius: 10
	},
	deliveryModal: {
		width: width-60,
		marginLeft: 30,
		marginRight: 30,
		marginTop: 'auto',
		marginBottom: 'auto',
		minHeight: 200,
		backgroundColor: '#fff',
		borderRadius: 10
	},
	deliveryModalText: {
		padding: 15,
		fontFamily: Fonts.type.helveticaBold,
		fontSize: Fonts.moderateScale(16),
		color: '#000',
		textAlign: 'center'
	},
	succesOrder: {
		fontFamily: Fonts.type.helveticaBold,
		fontSize: Fonts.moderateScale(16),
		color: '#000',
		textAlign: 'center',
		padding: 30
	}
});

export default styles;
