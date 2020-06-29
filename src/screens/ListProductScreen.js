import React from 'react';
import { Image, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { View } from 'native-base';
import { Icon } from 'react-native-elements';
import { getProducts } from '../data/MockDataAPI';

export default class ListProductScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('title'),
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
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 15 }}>
          <Icon type="cart" name="shopping-cart" color='#fff' size={33} onPress={ () => navigation.navigate('CartScreen')} />
        </TouchableOpacity>
      ),

    };
  };
  constructor(props) {
    super(props);
  }
  //Thêm vào giỏ hàng------------------------------------------------
  addToCart(product) {
    let productAdd = {
        id : product.id,
        name : product.name,
        image : product.image,
        price : product.price,
        quantity : 1,
    }
    this.props.navigation.navigate('CartScreen', {product : productAdd});
  }  
  //--------------------------------------------------
  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('category');
    const productsArray = getProducts(item.typeCode);
    return (
      <View style={styles.container}>
        <View style={styles.listProduct}>
          <FlatList 
            vertical
            showsVerticalScrollIndicator={false}
            data={ productsArray } 
            renderItem={({ item }) => (
              <View style={styles.productView}>
                <TouchableOpacity style={styles.productTouch} onPress={() => { this.props.navigation.navigate('DetailScreen', {bmDetail: item}) }}>
                  <Image style={styles.productImage} source={{uri: item.image}} />
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text style={styles.productPrice}>{item.price} VNĐ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cartTouch} onPress={() => this.addToCart(item)}>
                  <Text>Thêm Vào Giỏ</Text>
                </TouchableOpacity>
              </View>
            )}
            numColumns={3}
            keyExtractor={item => `${item.id}`}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#EEEEEE'
  },
  btnIcon: {
    height: 14,
    width: 14
  },  
  /* List product */
  listProduct: {
      
  },
  productView: {
      borderRadius: 2,
      marginTop: 10,
      backgroundColor: '#fff',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 3,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 7,
  },
  productTouch: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
  },
  productImage: {
      width: 80,
      height: 100,
      marginTop: 15,
      marginBottom: 20
  },
  productName: {
      fontSize: 13,
  },
  productPrice: {
      color: 'red',
      fontSize: 16,
      fontWeight: 'bold',
      marginVertical: 10,
  },
  cartTouch: {
      flex: 1/5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderTopColor: '#eee',
      backgroundColor: '#FF9933',
      borderRadius: 20,
  },
})