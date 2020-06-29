import React, {Component} from 'react'
import {View, StyleSheet, Button} from 'react-native'
import {logout} from "../services/AuthServices"

export default class LogoutButton extends Component {
    _handlePressLogout = () => {
        logout()
    }

    render() {
        return (
            <View style={styles.container}>
                <Button color='#0099FF' title='Đăng Xuất' onPress={this._handlePressLogout}/>            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        marginTop: 10,
        marginLeft: 10,
        justifyContent: 'center',
    },
})