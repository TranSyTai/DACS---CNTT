import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Container, View, Item, Icon, Button, Input } from 'native-base';

export default class ContactScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Gửi mail hỗ trợ',
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
    };
  }
  //-------------------------------------------------------
  constructor(props) {
      super(props);
      this.state = {
        email: '',
        name: '',
        subject: '',
        message: ''
      }
  }
  //=======================================================
  render() {
    return(
      <Container style={{backgroundColor: '#fdfdfd'}}>
        <View style={styles.inputText}>
          <Item>
            <Icon active name='ios-person' />
            <Input placeholder='Your name' onChangeText={(text) => this.setState({name: text})}/>          
          </Item>
          <Item>
            <Icon active name='ios-mail' />
            <Input placeholder='Your email address' onChangeText={(text) => this.setState({email: text})}/>
          </Item>
          <Item>
            <Icon active name='ios-filing' />
            <Input placeholder='Subject' onChangeText={(text) => this.setState({subject: text})}/>
          </Item>
          <Item>
            <Icon active name='ios-paper-plane' style={{marginTop: -20}}/>
            <Input
              placeholder='Message'
              multiline={true}
              style={{height: 100, marginTop: -20}}
              onChangeText={(text) => this.setState({message: text})}/>
          </Item>
          <View style={{alignItems: 'center'}}>
            <Button onPress={() => this.send()} style={styles.sendButton}>
              <Text style={styles.sendTitle}>Send</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
  send() {
    alert('Send email');
  }
}
const styles = StyleSheet.create({
  title: {
      fontWeight: 'bold'
  },
  inputText: {
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      paddingLeft: 50, 
      paddingRight: 50,
  },
  sendButton: {
      backgroundColor: '#3399ff', 
      marginTop: 20, 
      width: 150, 
      justifyContent: 'center',
      fontSize: 22
  },
  sendTitle: {
      fontSize: 18,
      color: '#fdfdfd',
      fontWeight: 'bold'
  }
})