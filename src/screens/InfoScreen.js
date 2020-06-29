import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Input, CheckBox, Icon } from 'react-native-elements';

export default class InfoScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Thông tin cá nhân',
            headerStyle: {
                height: 60,
                backgroundColor: '#3399FF',
            },
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontSize: 24,
                fontWeight: 'bold',
            },
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 15 }}>
                <Icon 
                    type="save" 
                    name="save" 
                    color='#fff'
                    size={33}
                    onPress={ () => {}}
                />
                </TouchableOpacity>
            )
        };
    };
    //=================================================================
    render() {
        return (
            <View style={ styles.container }>
                <View style={styles.banner}>
                    <Input placeholder='Họ Tên' />     
                    <Input placeholder='Số Điện Thoại' />   
                    <Input placeholder='Email' /> 
                    <View style={styles.checkbox}>
                        <CheckBox
                            center
                            title='Nam'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            //checked={this.state.checked}
                        />     
                        <CheckBox
                            center
                            title='Nữ'
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            //checked={this.state.checked}
                        />      
                    </View> 
                    <CheckBox
                            left
                            title='Đổi Mật Khẩu'
                            checkedIcon='dot-circle-o'
                            //checked={this.state.checked}
                        />      

                </View>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    banner: {
        flex: 2/4,
        marginTop: 15
    },
    checkbox: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 5
    },
    infoCancel1: {
        marginRight: 80,
        marginTop: 15,
        marginLeft: 10
    },
    title: {
        fontWeight: 'bold', 
        fontSize: 22, 
        color: 'white',
        marginTop: 15
    },
    infoCancel2: {
        marginRight: 80,
        marginTop: 15,
        marginLeft: 70
    }
})
