import * as React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Header, Content, Right, Title } from 'native-base';
import { Icon } from 'react-native-elements';
import { loaisanpham } from '../data/dataArrays';
import { getNumberOfProducts } from '../data/MockDataAPI';

export default class CategoriesScreen extends React.Component {
  static navigationOptions = {
    title: 'Danh Mục',
    headerShown: false
  }
  constructor(props) {
    super(props);
  }
  onPressCategory = item => {
    const title = item.typeName;
    const category = item;
    this.props.navigation.navigate('ListProductScreen', { category, title });
  };
  //========================================================================================
  render() {
    return (
      <Container>
        <Header style={{backgroundColor: '#3399ff'}}>
          <Title style={{ fontSize: 25, fontWeight: 'bold', marginTop: 10, marginLeft: 140 }}>Danh Mục</Title>
          <Right>
            <Icon name='shopping-cart' color='white' size={31} onPress={() => this.props.navigation.navigate('CartScreen')} />
          </Right>
        </Header>
        <Content>
          <View style={styles.banner}>
            {loaisanpham.map((item) => 
              <TouchableOpacity style={styles.productTouch} onPress={() => this.onPressCategory(item) }>
                <Image style={styles.categoriesPhoto} source={{ uri: item.typeImage }} />
                <Text style={styles.categoriesName}>{item.typeName}</Text>
                <Text style={styles.categoriesInfo}>{getNumberOfProducts(item.typeCode)} Sản Phẩm</Text>
              </TouchableOpacity>
            )}
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  productTouch: {
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      height: 215,
      borderColor: '#cccccc',
      borderWidth: 0.5,
      borderRadius: 20,
  },
  categoriesPhoto: {
      width: '100%',
      height: 155,
      borderRadius: 20,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      shadowColor: 'blue',
      shadowOffset: {
      width: 0,
      height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 1.0,
      elevation: 3
  },
  categoriesName: {
      flex: 1,
      fontFamily: 'FallingSky',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333333',
      marginTop: 8
  },
  categoriesInfo: {
      marginTop: 3,
      marginBottom: 5
  }
});