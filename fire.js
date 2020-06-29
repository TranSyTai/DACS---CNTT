import firebase from 'firebase'
import configFirebase from './src/config/firebase'

const config = configFirebase || {}
firebase.initializeApp(config)

export default () => firebase