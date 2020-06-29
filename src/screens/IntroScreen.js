import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
      key: 's1',
      text: 'Building Material App',
      title: 'Chào Mừng Đến Với BMApp',
      image: require('../assets/icons/shopping-bag.png'),
      backgroundColor: '#3399FF',
    },
    {
      key: 's2',
      title: 'Thanh Toán An Toàn',
      text: 'Chúng Tôi Luôn Hỗ Trợ Các Ví Điện Tử',
      image: require('../assets/icons/credit-card.png'),
      backgroundColor: '#3399FF',
    },
    {
      key: 's3',
      title: 'Hỗ Trợ Khách Hàng 24/7',
      text: 'Hỗ Trợ Khách Hàng Nhanh Và Tốt',
      image: require('../assets/icons/telephone.png'),
      backgroundColor: '#3399FF',
    },
    {
      key: 's4',
      title: 'Miễn Phí Giao Hàng',
      text: 'Giao Hàng Nhanh Và Miễn Phí Vận Chuyển',
      image: require('../assets/icons/delivery.png'),
      backgroundColor: '#3399FF',
    },
];
export default class Intro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showRealApp: false,
        };
    }
    //------------------------------------------------------------------
    _onDone = () => {
        this.setState({ showRealApp: true });
    };
    _onSkip = () => {
        this.setState({ showRealApp: true });
    };
    _renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, backgroundColor: item.backgroundColor, alignItems: 'center', justifyContent: 'space-around', paddingBottom: 100 }}>        
                <Text style={styles.title}>{item.title}</Text>
                <Image style={styles.image} source={item.image} />
                <Text style={styles.text}>{item.text}</Text>
            </View>
        );
    };
    //=====================================================================
    render() {
        //If false show the Intro Slides
        if (this.state.showRealApp) {
            //Real Application
            return this.props.navigation.navigate('HomeScreen');        
        } else {
            //Intro slides
            return (
                <AppIntroSlider
                    slides={slides}
                    renderItem={this._renderItem}
                    onDone={this._onDone}
                    showSkipButton={true}
                    onSkip={this._onSkip}
                />
            );
        }
    }
}

const styles = StyleSheet.create({
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 25, 
        fontWeight: 'bold',
        color: '#fdfdfd'
    },
    text: {
        fontSize: 16,
        color: '#fdfdfd',
    }
  });