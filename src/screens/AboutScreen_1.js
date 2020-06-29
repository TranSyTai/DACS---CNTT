import * as React from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { support } from '../data/dataArrays';

export default class AboutScreen_1 extends React.Component {
    static navigationOptions = {
        title: 'Hỗ Trợ',
        headerShown: true,
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
    }
    constructor(props) {
        super(props);
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutScreen_2', { bmAbout:item })}>
            <ListItem
                title={item.name}
                bottomDivider
                chevron
            />
        </TouchableOpacity>    
    )
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.banner}>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={support}
                        renderItem={this.renderItem}
                    />
                </View>
                <View style={{width: '100%', height: 7, backgroundColor: '#EEE9E9'}} />
                <View style={styles.version}>
                    <Text style={{fontSize: 15}}>Phiên bản</Text>
                    <Text style={{fontSize: 15, color: '#8B8989'}}>0.0.1</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    version: {
        flex: 1/9,
        paddingLeft: 16,
        paddingRight: 16,
        flexDirection: 'row',
        backgroundColor: '#fdfdfd',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})