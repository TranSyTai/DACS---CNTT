import * as React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon, ListItem } from 'react-native-elements';

export default class DetailScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '',
            headerShown: true,
            headerStyle: {
              height: 60,
              backgroundColor: '#3399FF',
            },
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: 'bold',
            }, 
            headerTitle: () => (
                <TouchableOpacity style={{ marginLeft: 250 }}>
                    <Icon
                        name='search'
                        color='#fff'
                        size={33}
                        onPress={ () => navigation.navigate('SearchScreen') }
                    />
                </TouchableOpacity>
            ),    
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 15 }}>
                    <Icon
                        name='shopping-cart'
                        color='#fff'
                        size={33}
                        onPress={ () => navigation.navigate('CartScreen') }
                    />
                </TouchableOpacity>
            ),                      
        };
    };
    //------------------------------------------------------------------------
    constructor(props) {
        super(props);
    }
    //Thêm sản phẩm vào giỏ---------------------------------------------------
    addToCart(product) {
        let productAdd = {
            id : product.id,
            name : product.name,
            image : product.image,
            price : product.price,
            quantity : 1,
        }
        this.props.navigation.navigate('CartScreen', { product: productAdd });
    }
    //Hiển thị hình ảnh-------------------------------------------------------
    openGallery = (pos) => {
        Actions.imageGallery({ images: this.state.product.image, position: pos });
    }
    _renderItem = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback
                key={index}
                onPress={() => this.openGallery(index)}
            >
                <Image
                source={{ uri: item }}
                style={{ width: Dimensions.get('window').width, height: 350 }}
                resizeMode="cover"
                />
            </TouchableWithoutFeedback>
        );
    }
    //========================================================================
    render() {
        const bmDetail = this.props.navigation.getParam('bmDetail');
        return (
            <View style={styles.container}>
                <ScrollView style={styles.productDetail}>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={{ uri: bmDetail.image }} style={styles.productDetailImg} />
                    </View>
                    <View style={styles.productDetailContent0}>
                        <Text style={styles.productDetailName}>{bmDetail.name} </Text>
                        <Text style={styles.productDetailPrice}>{bmDetail.price} VNĐ</Text>
                    </View>
                    <TouchableOpacity style={styles.cartTouch} onPress={() => this.addToCart(bmDetail)}>
                        <Text style={styles.txtBuy}>Thêm Vào Giỏ</Text>
                    </TouchableOpacity>

                    <View style={{height: 6, backgroundColor: '#CCCCCC'}} />

                    <View style={styles.content1}>
                        <View style={styles.contentView}>
                            <Image style={styles.img} source={require('../assets/icons/security.png')} />
                            <Text style={styles.txt}>Bồi thường 111% nếu hàng giả</Text>
                        </View>
                        <View style={styles.contentView}>
                            <Image style={styles.img} source={require('../assets/icons/verified.png')} />
                            <Text style={styles.txt}>Kiểm tra hàng hóa khi nhận hàng</Text>
                        </View>
                        <View style={styles.contentView}>
                            <Image style={styles.img} source={require('../assets/icons/return-of-investment.png')} />
                            <Text style={styles.txt}>Đổi trả trong 30 ngày nếu sản phẩm lỗi</Text>
                        </View>
                    </View>

                    <View style={{height: 6, backgroundColor: '#CCCCCC'}} />

                    <View style={styles.productDetailContent}>
                        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Thông Tin Chi Tiết</Text>
                        <Text style={styles.productDetailInfo}>{bmDetail.description}</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
       flex: 1,
       backgroundColor: '#fff'
    },
    productDetail: {
        flex: 2/8,
    },
    productDetailImg: {
        resizeMode: 'cover',
        width: '100%',
        height: 300
    },
    productDetailContent0: {
        marginVertical: 10,
        paddingHorizontal: 30,
        marginTop: 20,
    },
    productDetailName: {
        fontSize: 20,
        marginBottom: 7,
        justifyContent: 'center',
        alignItems: 'center',  
    },
    productDetailPrice: {
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 10
    },
    productDetailInfo: {
        marginVertical: 10,
        paddingHorizontal: 15,
        fontSize: 19
    },
    cartTouch: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        backgroundColor: '#FF3300',
        borderRadius: 6,
        marginLeft: 25,
        marginRight: 25,
        bottom: 10
    },
    txtBuy: {
        color: '#fff',
        fontSize: 16
    },
    productDetailContent: {
        marginVertical: 20,
        paddingHorizontal: 30,
        marginTop: 10,
        justifyContent: 'center',
    },
    content1: {
        height: 110,
        top: 2,
        flexDirection: 'row'
    },
    contentView: {
        width: '22%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginRight: 40
    },
    img: {
        width: 35, 
        height: 35,
        left: 30
    },
    txt: {
        left: 30,
        textAlign: 'center'
    },
    content2: {
        height: 70,
        top: 2,
    },
    txtSale: {
        marginLeft: 35, 
        top: 10
    }
});