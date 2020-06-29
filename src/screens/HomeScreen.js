import * as React from 'react';
import { View,Text, StyleSheet, ScrollView, FlatList, Animated, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import Swiper from 'react-native-swiper';
import { Icon } from 'react-native-elements';
import { sanpham, loaisanpham, banner, dataSearch } from '../data/dataArrays';

var { width } = Dimensions.get('window');
export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Trang Chủ',
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        scrollY: new Animated.Value(0),
        };
    }
    //Thêm vào giỏ hàng------------------------------------------------
    addToCart(product) {
        let productAdd = {
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: 1,
        }
        this.props.navigation.navigate('CartScreen', {product : productAdd});
    }
    //Xử lý btn danh mục sản phẩm-------------------------------------------------------------
    onPressCategory = item => {
        const title = item.typeName;
        const category = item;
        this.props.navigation.navigate('ListProductScreen', { category, title });
    };
    showAlert = () => 
    Alert.alert(
        'Thông Báo', 
        'Chúng tôi sẽ sớm cập nhật tính năng Minigame. Mong bạn quay lại sau!',
        [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
    )
    //==================================================================
    render() {
        const HEADER_MAX_HEIGHT = 70;
        const HEADER_MIN_HEIGHT = 60;
        const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
        const headerHeight = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
        });
        const headerTitleBottom = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE, HEADER_SCROLL_DISTANCE + 35, HEADER_SCROLL_DISTANCE + 45],
        outputRange: [-30, -30, -30, 10],
        extrapolate: 'clamp',
        })
        return (
            <View style={styles.container}>
                <Animated.View style={[styles.header, {height: headerHeight}]}>
                <Animated.View style={{height: headerHeight, top: 2, flexDirection: 'row'}}>
                    <Text style={styles.title}>BMApp</Text>
                    <View style={{top: 10, left: 120}}>
                    <Icon 
                        name='shopping-cart'
                        color='white'
                        size={30}
                        onPress={() => this.props.navigation.navigate('CartScreen')}
                    />
                    </View>
                </Animated.View>
                <Animated.View style={[styles.btnSearch, {bottom: headerTitleBottom}]}>
                    <TouchableOpacity style={styles.searchContainer} onPress={() => this.props.navigation.navigate('SearchScreen')}>
                    <Icon name="search" size={24} color="#969696" />
                    <Text style={styles.txtSearch}>Bạn tìm gì hôm nay ?</Text>          
                    </TouchableOpacity>
                </Animated.View>
                </Animated.View>

                <ScrollView 
                    style={{flex: 1, paddingTop: 85, zIndex: 1}}
                    scrollEventThrottle={16}
                    onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}], {useNativeDriver: false})}
                >
                {/** BANNER CHUYỂN ẢNH */}
                <Swiper style={{height: 170}} showsButtons={false} autoplay={true} autoplayTimeout={2}>
                    {
                    banner.map((itemBanner) => {
                        return (
                        <Image style={styles.imageBanner} source={{uri: itemBanner.url}} />
                        );
                    })
                    }
                </Swiper>

                {/** MENU */}
                <View style={{height: 20}} />
                <View style={styles.menuTouch}>
                    {/*Nút Danh Mục*/}
                    <View style={styles.touch}>
                    <TouchableOpacity style={styles.btn1} onPress={() => { this.props.navigation.navigate('CategoriesScreen') }}>
                        <Icon type="categories" name='apps' size={30} color={'white'} />
                    </TouchableOpacity>
                    <Text style={{marginTop: 4, fontSize: 14, color: 'black'}}>Danh Mục</Text>
                    </View>
                    {/*Nút Minigame*/}
                    <View style={styles.touch}>
                        <TouchableOpacity style={styles.btn2} onPress={this.showAlert}>
                        <Icon type="game" name='games' size={27} color={'white'} />
                        </TouchableOpacity>
                    <Text style={{marginTop: 4, fontSize: 14, color: 'black'}}>Minigame</Text>
                    </View>
                    {/*Nút Giao Dịch Ship Now*/}
                    <View style={styles.touch}>
                    <TouchableOpacity style={styles.btn3} onPress={() => this.props.navigation.navigate('NowScreen')}>
                        <Image style={{width: '55%', height: '55%'}} source={require('../assets/icons/startup_white.png')} />              
                    </TouchableOpacity>
                    <Text style={{marginTop: 4, fontSize: 14, color: 'black'}}>BM Now</Text>
                    </View>
                </View>
                <View style={{height: 8, backgroundColor: '#eee'}}/>
                <View style={styles.body1}>
                    {/** LIST DANH MỤC */}
                    <Text style={styles.txtDanhMuc}>Danh Mục Sản Phẩm</Text>
                    <ScrollView horizontal={true} style={styles.listDanhMuc}>
                        {loaisanpham.map((item) => {
                            return (
                                <View style={styles.typeProductView}>
                                    <TouchableOpacity style={styles.productTouch} onPress={() => this.onPressCategory(item)}>
                                        <Image style={styles.typeProductImage} source={{uri: item.typeImage}} />
                                        <Text style={styles.typeProductName} numberOfLines={2}>{item.typeName}</Text>
                                    </TouchableOpacity>
                                </View>                
                            );
                        })}
                    </ScrollView>
                </View>
                <View style={{height: 8, backgroundColor: '#eee'}}/>
                <View style={styles.body2}>
                    {/** LIST DANH MỤC */}
                    <Text style={styles.txtDanhMuc}>Tìm Kiếm Nổi Bật</Text>
                    <ScrollView horizontal={true} style={styles.listDanhMuc}>
                        {dataSearch.map((item) => {
                            return (
                                <View style={styles.dataSearchView}>
                                    <TouchableOpacity style={styles.touchSearch}>
                                        <Icon name="search" size={20} color="#CCCCCC"/>
                                        <Text style={styles.txtDataSearch}>{item.keyword}</Text>
                                    </TouchableOpacity>
                                </View>                
                            );
                        })}
                    </ScrollView>
                </View>
                <View style={{height: 8, backgroundColor: '#eee'}}/>
                <View style={styles.body3}>
                    {/** LIST SẢN PHẨM */}
                    <Text style={styles.txtDanhMuc}>Tất Cả Sản Phẩm</Text>
                    <ScrollView horizontal={true} style={styles.listSanPham}>
                        {sanpham.map((item) => {
                            return (
                                <View style={styles.productView}>
                                    <TouchableOpacity style={styles.productTouch} onPress={() => this.props.navigation.navigate('DetailScreen', {bmDetail:item})}>
                                        <Image source={{uri: item.image}} style={styles.productImage} />
                                        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                                        <Text style={styles.productPrice}>{item.price} đ</Text>
                                    </TouchableOpacity>
                                        <TouchableOpacity style={styles.cartTouch} onPress={() => this.addToCart(item)}>
                                        <Text>Thêm vào giỏ</Text>
                                    </TouchableOpacity>
                                </View>                
                            );
                        })}
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3399ff'
    },
    /**header */
    header: {
        flex: 1/6,
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0,
        zIndex: 2,
        backgroundColor: '#3399ff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnSearch: {
        width: '93%',
        position: 'absolute', 
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 3,
        marginTop: 13
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 5,
        left: 14
    },
    searchContainer: {
        flexDirection: 'row',
    },
    txtSearch: {
        color: '#969696',
        fontSize: 16,
        marginLeft: 8,
        fontWeight: '500',
    },
    /**banner chuyển ảnh */
    imageBanner: {
        height: width/2.8,
        width: width-30,
        borderRadius: 10,
        marginHorizontal: 15,
        marginVertical: 23,
    }, 
    /**menu */
    menuTouch: {
        marginTop: -21,
        flexDirection: 'row',
        backgroundColor: '#fff'
    },  
    touch: {
        paddingTop: 15,
        paddingBottom: 8,
        paddingLeft: 57,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn1: {
        width: 45, 
        height: 45, 
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00FF33', 
    },
    btn2: {
        width: 45, 
        height: 45, 
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF0066', 
    },
    btn3: {
        width: 45, 
        height: 45, 
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3366ff', 
    },
    /**body */
    body1: {
        height: 180, 
        backgroundColor: '#fff'
    },
    body2: {
        height: 90,
        backgroundColor: '#fff'
    },
    body3: {
        height: 390,
        backgroundColor: '#fff'
    },
    /**list type product */
    listDanhMuc: {
        height: 50,
    },
    typeProductView: {
        width: 100,
        height: 200,
        borderRadius: 10,
        top: 23,
        margin: 6,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4
    },
    txtDanhMuc: {
        top: 10,
        left: 18,
        fontSize: 17,
        fontWeight: 'bold'
    },
    typeProductImage: {
        width: '70%',
        height: 70,
        borderRadius: 18
    },
    typeProductName: {
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'center'
    },
    /**list data search */
    dataSearchView: {
        top: 15,
        left: 15,
        margin: 5
    },
    touchSearch: {
        width: 130,
        height: 25,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeeeee'
    },
    txtDataSearch: {
        color: '#aaaaaa',
        marginLeft: 5,
        textAlign: 'center'
    },
    /**list product */
    listSanPham: {
        height: 50, 
        top: 15,
        paddingLeft: 4, 
        backgroundColor: '#fff'
    },
    productView: {
        width: 150,
        height: 250,
        borderRadius: 10,
        margin: 3,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4
    },
    productTouch: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    productImage: {
        width: '90%',
        height: 130,
        marginTop: 5,
        marginBottom: 15,
        borderRadius: 15
    },
    productName: {
        fontSize: 15,
        marginLeft: 8,
        marginRight: 8,
        textAlign: 'center'
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5
    },
    cartTouch: {
        height: 40,
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#FF9933',
        borderRadius: 20,
    }
})