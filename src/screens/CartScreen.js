import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Button } from 'react-native';
import { Container } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import InputSpinner from "react-native-input-spinner";

export default class CartScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Giỏ Hàng',  
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
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            cart: {
                products: [],
                totalPrice: 0,
            },
            nameInput: '',
            phoneInput: '',
            addressInput: '',
        };
    }
    //----------------------------------------------------------------------------
    async setCart(cart) {
        try {
            await AsyncStorage.setItem('@Cart', JSON.stringify(cart));

            this.setState({
                cart: cart
            });
        } catch (e) {
            // save error
        }
    }
    async getCart() {
        try {
            let cart = await AsyncStorage.getItem('@Cart');

            if (cart != null) {
                this.setState({
                    cart: JSON.parse(cart)
                });
            }
        } catch (e) {
            // read error
        }
    }
    async removeCart() {
        try {
            await AsyncStorage.removeItem('@Cart');
        } catch (e) {
            // read error
        }
    }
    //----------------------------------------------------------------------------
    /** Thêm vào giỏ hàng */
    addItemCart(product) {
        // Get current list of products
        let products = this.state.cart.products;

        let idx = this.search(product, this.state.cart.products);

        // Update the total price by quantity * price of the added product
        let totalPrice = this.state.cart.totalPrice + (product.price * product.quantity);

        if (idx > -1) {
            products[id].quantity += 1;
        } else {
            products.push(product);
        }

        // Update the state
        let cart = {
            products: products,
            totalPrice: totalPrice,
        };

        this.setCart(cart);
    }
    /** Chỉnh sửa item trong giỏ hàng */
    editItemCart(product, operation) {
        // Get current list of products
        let products = this.state.cart.products;

        let idx = this.search(product, products);

        let totalPrice = parseInt(this.state.cart.totalPrice);

        if (operation == 'add') {
            totalPrice += parseInt(product.price);
            products[idx].quantity += 1;
        } else if (operation == 'sub') {

            if (products[idx].quantity > 1) {
                totalPrice -= parseInt(product.price);
                products[idx].quantity -= 1;
            }
        }

        // Update the state
        let cart = {
            products: products,
            totalPrice: totalPrice,
        };
        this.setCart(cart);

    }
    /** Xóa item trong giỏ hàng */
    removeItemCart(product) {
        let products = this.state.cart.products;

        let idx = this.search(product, products);

        let totalPrice = this.state.cart.totalPrice - (product.price * product.quantity);

        // Remove single item
        products.splice(idx, 1);

        // Update the state
        let cart = {
            products: products,
            totalPrice: totalPrice,
        };
        this.setCart(cart);
    }
    //------------------------------------------------------------------------------
    search(product, products) {
        for (var i = 0; i < products.length; i++) {
            if (products[i].id === product.id) {
                return i;
            }
        }
        return -1;
    }
    //-----------------------------------------------------------------------------
    componentDidMount() {
        //get Cart
        this.getCart().then(() => {
        let product = this.props.navigation.getParam('product');
            if (product != null) {
                this.addItemCart(product);
            }
        });
    }
    /** Tạo bill gửi lên localhost------------------------------------------------ */
    createBill() {
        // Biến data giỏ hàng
        var cartBill = this.state.cart;
        // Biến navigation
        var navigation = this.props.navigation;
        if (this.state.phoneInput != '' && this.state.nameInput != '' && this.state.addressInput != '' && this.state.cart.products != '') {
        // Xóa giỏ hàng khỏi AsynStorage
        this.removeCart();
        // Gửi thông tin lên server 192.168.64.2
        fetch('http://10.0.2.2:8080/createBill.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.nameInput,
                phone: this.state.phoneInput,
                address: this.state.addressInput,
                bill_detail: JSON.stringify(this.state.cart)
            }),
        }).then((response) => response.json())
            .then(function (data) {
                // Thông báo đặt hàng thành công
                alert('Cám ơn bạn đã đặt hàng ! Chúng tôi sẽ liên hệ bạn sớm nhất có thể');
                // Chuyển qua trang Cám ơn sau khi đã lưu đơn hàng thành công
                navigation.navigate('ThanksScreen', {
                    dataBill: data,
                    cartBill : cartBill
                });
            }).catch((error) => {
                console.error(error);
            });
        } else if (this.state.phoneInput != '' && this.state.nameInput != '' && this.state.addressInput != '' && this.state.cart.products == ''){
            // Báo lỗi
            alert('Giỏ hàng rỗng, cần thêm sản phẩm vào giỏ để thực hiện đặt hàng!!!');
        } else {
            // Báo lỗi
            alert('Vui lòng không bỏ trống ô nào!!!');
        }
    }
    //=============================================================================
    render() {
        return (
            <Container>
                <ScrollView style={styles.cartScroll}>
                    <View style={styles.cartAddress}>
                        <View style={styles.cartCoverInput}>
                            <TextInput
                                style={styles.cartInput}
                                multiline={true}
                                selectionColor='#922C88'
                                placeholder=' Vui lòng nhập Họ tên '
                                onChangeText={(text) => this.setState({
                                    nameInput: text
                                })}
                                value={this.state.nameInput} />
                        </View>
                        <View style={styles.cartCoverInput}>
                            <TextInput
                                style={styles.cartInput}
                                multiline={true}
                                selectionColor='#922C88'
                                placeholder=' Vui lòng nhập số điện thoại'
                                onChangeText={(text) => this.setState({
                                    phoneInput: text
                                })}
                            value={this.state.phoneInput} />
                        </View>
                        <View style={styles.cartCoverInput}>
                            <TextInput
                                style={styles.cartInput}
                                multiline={true}
                                selectionColor='#922C88'
                                placeholder=' Vui lòng nhập địa chỉ'
                                onChangeText={(text) => this.setState({
                                    addressInput: text
                                })}
                                value={this.state.addressInput} />
                        </View>
                    </View>
                    <View style={styles.cartReceipt}>
                        {this.state.cart.products != null && this.state.cart.products.length > 0 ? (this.state.cart.products.map((item, key) => {
                            return (
                                <View key={key} style={styles.cartTag}>
                                    <View style={styles.cartCloseTag}>

                                    </View>
                                    <View style={styles.cartContent}>
                                        <View style={styles.cartImageView}>
                                            <Image source={{ uri: item.image}} style={styles.cartImage}  />
                                        </View>
                                        <View style={styles.cartInfo}>
                                            <Text style={styles.cartName}>{item.name}</Text>
                                            <View style={styles.row}>
                                                <Text style={styles.cartPrice}>{item.price} VNĐ</Text>
                                                <InputSpinner
                                                    min={1}
                                                    step={1}
                                                    rounded={false}
                                                    showBorder={true}
                                                    fontSize={12}
                                                    inputStyle={{
                                                        paddingVertical: 5
                                                    }}
                                                    width={100}
                                                    height={30}
                                                    value={item.quantity}
                                                    onIncrease={(increased) => {
                                                        this.editItemCart(item,'add')
                                                    }}
                                                    onDecrease={(decreased) => {
                                                        this.editItemCart(item,'sub')
                                                    }}
                                                    style={styles.cartSpinner}
                                                />
                                            </View>
                                        </View>
                                        <View>
                                            <Button
                                                title='x'
                                                onPress={() => { this.removeItemCart(item) }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            );
                        })) : 
                            <Image style={{ width: '70%', height: 220, marginLeft: 60 }}
                                  source={require('../assets/images/bannerCart.jpg')}/>}
                    </View>
                </ScrollView>
                <View style={styles.cartExtraInfo}>
                    <View style={styles.cartProductInfo}>
                        <View style={styles.cartProductRight}>
                            <View style={styles.cartQuantity}>
                                <Text style={styles.cartProductTitle}>Số sản phẩm trong giỏ: </Text>
                                <Text style={styles.cartProductNum}>{this.state.cart.products.length}</Text>
                            </View>
                            <View style={styles.cartPriceTotal}>
                                <Text style={styles.cartProductTitle}>Thành tiền:</Text>
                                <Text style={[styles.cartProductNum, { color: '#B22222' }]}>
                                    {this.state.cart.totalPrice} VNĐ
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.cartOrder}>
                        <TouchableOpacity style={styles.cartOrderTouch} onPress={() => { this.createBill() }}>
                            <Text style={styles.cartOrderText}>Đặt hàng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    cartScroll: {
        flex: 2/8,
        backgroundColor: '#eee'
    },
    cartProductText: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 12,
        textTransform: 'uppercase',
    },
    /* Cart address */
    cartAddress: {
        padding: 15,
        backgroundColor: '#fff',
        marginTop: 10
    },
    cartCoverInput: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#eee',
        marginTop: 3,
        marginBottom: 3,
    },
    cartAddressIcon: {
        padding: 10,
        backgroundColor: '#f1f1f1',
    },
    cartInput: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#f1f1f1',
        color: '#424242',
        },
    /* Cart tag */
    cartTag: {
        position: 'relative',
        backgroundColor: '#fff',
        marginBottom: 10,
        marginHorizontal: 5,
        elevation: 2,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowColor: '#eee',
        shadowOpacity: 0.8
    },
    cartCloseTag: {
        position: 'absolute',
        right: '3%',
        top: '6%'
    },
    cartContent: {
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 10,
    },
    cartImageView: {
        flex: 2,
    },
    cartImage: {
        resizeMode: 'cover',
        width: 80,
        height: 100,
    },
    cartInfo: {
        flex: 4
    },
    cartName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cartPrice: {
        color: '#B22222',
        fontSize: 16,
        fontWeight: 'bold'
    },
    /* Cart Extra Info */
    cartExtraInfo: {
        paddingTop: 8,
        paddingBottom: 15,
        borderTopColor: '#ddd',
        borderTopWidth: 1
    },
    cartProductInfo: {
        flexDirection: 'row',
        marginBottom: 15
    },
    cartProductRight: {
        flex: 4,
        marginHorizontal: 10
    },
    cartProductTitle: {
        fontStyle: 'italic',
        fontSize: 14
    },
    cartProductNum: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    cartQuantity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    cartPriceTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cartSale: {
        flex: 2,
        marginHorizontal: 10
    },
    cartSaleInput: {
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 5,
        backgroundColor: '#f1f1f1',
        textAlign: 'center',
        paddingVertical: 3,
        paddingHorizontal: 10,
    },
    cartOrder: {
        marginHorizontal: 10,
        borderRadius: 4,
        shadowOpacity: 0.8,
        shadowColor: '#eee',
        shadowOffset: {
            width: 0,
            height: 2
        },
        elevation: 3
    },
    cartOrderText: {
        backgroundColor: 'red',
        textAlign: 'center',
        color: '#fff',
        paddingVertical: 10,
        fontSize: 17,
        fontWeight: 'bold'
    },
})