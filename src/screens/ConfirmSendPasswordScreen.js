import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

export default class ConfirmSendPasswordScreen extends React.Component {
    static navigationOptions = {
        title: 'Quên Mật Khẩu',
        headerShown: true
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.banner}>
                    <Icon 
                        name='check-circle'
                        color='#00FF00'
                        size={100}
                    />
                    <Text style={styles.text1}>Mật khẩu đã được gửi</Text>
                    <Text style={styles.text2}>Vui lòng kiểm tra email để cập nhật thông tin</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.cartOrderTouch} onPress={() => { this.props.navigation.navigate('HomeScreen')}}>
                        <Text style={styles.cartOrderText}>Tiếp tục mua sắm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50
    },
    text1: {
        fontSize: 17,
        marginLeft: 115,
        color: '#00CC00'
    },
    text2: {
        marginTop: 20,
        marginLeft: 30  
    },
    cartOrderTouch: {
        marginTop: 300,
        marginHorizontal: 15,
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
        backgroundColor: '#f4511e',
        textAlign: 'center',
        color: '#fff',
        paddingVertical: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },
})