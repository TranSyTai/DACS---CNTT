import * as React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

/** IMPORT SCREENS */
import SplashScreen from '../screens/SplashScreen';
import IntroScreen from '../screens/IntroScreen';
import HomeScreen from '../screens/HomeScreen';
import NowScreen from '../screens/NowScreen';
import DetailScreen from '../screens/DetailScreen';
import CartScreen from '../screens/CartScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import ListProductScreen from '../screens/ListProductScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InfoScreen from '../screens/InfoScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ConfirmSendPasswordScreen from '../screens/ConfirmSendPasswordScreen';
import AboutScreen_1 from '../screens/AboutScreen_1';
import AboutScreen_2 from '../screens/AboutScreen_2';
import ContactScreen from '../screens/ContactScreen';
import ThanksScreen from '../screens/ThanksScreen';

/** ----------------------------STACK NAVIGATION---------------------------- */
const HomeStack = createStackNavigator({
  HomeScreen: { screen: HomeScreen },
  DetailScreen: { screen: DetailScreen, params: {tabBarVisible: false}},
  CartScreen: { screen: CartScreen, params: {tabBarVisible: false}},
  NowScreen: { screen: NowScreen, params: {tabBarVisible: false}}
},
{
  headerMode: 'screen',
  initialRouteName: 'HomeScreen',
})  

const CategoryStack = createStackNavigator({
  CategoriesScreen: { screen: CategoriesScreen },
  ListProductScreen: { screen: ListProductScreen,  params: {tabBarVisible: false}},
  DetailScreen: { screen: DetailScreen, params: {tabBarVisible: false}},
  CartScreen: { screen: CartScreen, params: {tabBarVisible: false}},
},
{
  headerMode: 'screen',
  initialRouteName: 'CategoriesScreen'
});

const SearchStack = createStackNavigator({
  SearchScreen: { screen: SearchScreen },
  DetailScreen: { screen: DetailScreen, params: {tabBarVisible: false}},
  CartScreen: { screen: CartScreen, params: {tabBarVisible: false}},
},
{
  headerMode: 'screen',
  initialRouteName: 'SearchScreen'
});

const ProfileStack = createStackNavigator({
  ProfileScreen: { screen: ProfileScreen },
  InfoScreen:  { screen: InfoScreen, params: {tabBarVisible: false}},
  ContactScreen: { screen: ContactScreen, params: {tabBarVisible: false}},
  AboutScreen_1: { screen: AboutScreen_1, params: {tabBarVisible: false}},
  AboutScreen_2: { screen: AboutScreen_2, params: {tabBarVisible: false}},
  CartScreen: { screen: CartScreen, params: {tabBarVisible: false}},
},
{
  headerMode: 'screen',
  initialRouteName: 'ProfileScreen'
})


const ThanksStack = createStackNavigator({
  ThanksScreen: ThanksScreen
})

/** ----------------------------MATERIAL TOP TAB NAVIGATION---------------------------- */
const AuthTabNavigator = createMaterialTopTabNavigator ({
  SignInScreen: { screen: SignInScreen },
  SignUpScreen:  { screen: SignUpScreen },
},
{
  defaultNavigationOptions: {
    tabBarOptions: {
      labelStyle: {
        fontSize: 12,
        color: 'black'
      },
      style: {
        backgroundColor: '#EEEEEE',
        paddingTop: 123
      },
    }
  }
});

/** ----------------------------STACK NAVIGATION---------------------------- */
const AuthStack = createStackNavigator({
  SignInScreen: {
    screen: AuthTabNavigator,
    navigationOptions: ({ navigation }) => {
      return {
        title: '',
        headerBackground: () => (
          <Image style={{width: '100%', height: '320%'}} source={require('../assets/images/banner3.jpg')}/>
        ),
        headerLeft: () => (
          <TouchableOpacity>
            <Ionicons 
              name='ios-return-left'
              size={35}
              color={'#fff'}
              style={{marginLeft: 15}}
              onPress={() => navigation.navigate('ProfileScreen')}
            />
          </TouchableOpacity>
        )
      };  
    }
  },
  SignUpScreen: { screen: SignUpScreen },
  ForgotPasswordScreen: { screen: ForgotPasswordScreen },
  ConfirmSendPasswordScreen: { screen: ConfirmSendPasswordScreen }
},
{
  initialRouteName: 'SignInScreen',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#3399FF',
    },
    headerTitleAlign: 'center',
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 22,
      fontWeight: 'bold',
    }
  }
});  

/** ----------------------------BOTTOM TAB NAVIGATION---------------------------- */
const TabNavigator = createBottomTabNavigator({
  'Trang Chủ': {
    screen: HomeStack,
    navigationOptions: ({ navigation }) => {
      const {params = {}} = navigation.state.routes[navigation.state.index];
      const tabBarVisible = params.tabBarVisible === false ? params.tabBarVisible : true;
      return { tabBarVisible }
    }
  },
  'Danh Mục': {
    screen: CategoryStack,
    navigationOptions: ({ navigation }) => {
      const {params = {}} = navigation.state.routes[navigation.state.index];
      const tabBarVisible = params.tabBarVisible === false ? params.tabBarVisible : true;
      return { tabBarVisible }
    }
  },
  'Tìm Kiếm': {
    screen: SearchStack,
    navigationOptions: ({ navigation }) => {
      const {params = {}} = navigation.state.routes[navigation.state.index];
      const tabBarVisible = params.tabBarVisible === false ? params.tabBarVisible : true;
      return { tabBarVisible }
    }
  },
  'Cá Nhân': {
    screen: ProfileStack,
    navigationOptions: ({ navigation }) => {
      const {params = {}} = navigation.state.routes[navigation.state.index];
      const tabBarVisible = params.tabBarVisible === false ? params.tabBarVisible : true;
      return { tabBarVisible }
    }
  }
}, 
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Trang Chủ') {
        iconName = 'ios-home';
      } else if (routeName === 'Danh Mục') {
        iconName = 'md-apps';
      } else if (routeName === 'Tìm Kiếm') {
        iconName = 'ios-search';
      } else if (routeName === 'Cá Nhân') {
        iconName = 'ios-person';
      }
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    }
  })
});

/** ----------------------------SWITCH NAVIGATION---------------------------- */
const InitialNavigator = createSwitchNavigator({
  SplashScreen: SplashScreen,
  IntroScreen: IntroScreen,
  App: TabNavigator,
  AuthStack: AuthStack,
  ThanksStack: ThanksStack,
});

/** =============================APP CONTAINER============================= */
export default createAppContainer(InitialNavigator);

/** DISABLE YELLOW BOX */
console.disableYellowBox = true;