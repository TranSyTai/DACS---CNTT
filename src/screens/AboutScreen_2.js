import * as React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, Title, Icon } from 'native-base';
import { Paragraph } from 'react-native-paper';

export default class AboutScreen_2 extends React.Component {
    static navigationOptions = {
        title: '',
        headerShown: false,
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
    render() {
        const bmAbout = this.props.navigation.getParam('bmAbout');
        return (
            <Container>
                <View style={{flex: 1/11, backgroundColor: '#3399ff', flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutScreen_1')}>
                        <Icon name='arrow-back' style={{color: 'white', marginLeft: 12, marginTop: 13}}/>
                    </TouchableOpacity>
                    <Title style={{marginTop: 13, marginLeft: 40, marginRight: 60, fontWeight: 'bold'}}>{bmAbout.title}</Title>
                </View>
                <Content>
                    <View style={styles.viewNgangx}/>
                    <View style={styles.view1}>
                        <Text style={{ fontWeight: 'bold' }}>{bmAbout.name}</Text>
                    </View>
                    <View style={styles.viewNgang}/>
                    <View style={styles.view2}>
                        <Paragraph>{bmAbout.description}</Paragraph>
                    </View>
                    <Image source={{uri: bmAbout.image}} style={{width: '90%', height: 150, marginLeft: 15}} />
                    <View style={styles.view2}>
                        <Paragraph>{bmAbout.description2}</Paragraph>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create ({
    viewNgangx: {
        borderBottomColor: '#DDDDDD', 
        borderBottomWidth: 15
    },
    view1: {
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 5  
    },
    viewNgang: {
        marginLeft: 20,
        marginRight: 20,
        borderBottomColor: 'grey', 
        borderBottomWidth: 3 
    },
    view2: {
        marginTop: 5,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})