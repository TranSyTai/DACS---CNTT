import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import ErrorMessage from '../components/ErrorMessage';
import { passwordReset } from '../services/APIServices';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default class ForgotPasswordScreen extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Quên Mật Khẩu',
            headerShown: true
        };
    };
    handlePasswordReset = async (values, actions) => {
        const { email } = values
      
        try {
          await passwordReset(email)
          console.log('Password reset email sent successfully')
          this.props.navigation.navigate('ConfirmSendPasswordScreen')
        } catch (error) {
          actions.setFieldError('general', error.message)
        }
    }
    render() {
        const validationSchema = Yup.object().shape({
            email: Yup.string()
                .label('Email')
                .email('Enter a valid email')
                .required('Please enter a registered email')
        })        
        return (
            <View style={ styles.container }>
                <Formik
                    initialValues={{ email: '' }}
                    onSubmit={(values, actions) => {
                        this.handlePasswordReset(values, actions)
                    }}
                    validationSchema={validationSchema}
                >
                    {({ handleChange, values, handleSubmit, errors, isValid, touched, handleBlur, isSubmitting }) => (
                        <Fragment>
                            <FormInput  
                                type="text"
                                placeholder="Email..." 
                                placeholderTextColor="#003f5c"
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                onChangeText={handleChange('email')}
                                value={values.email}
                            />        
                            <ErrorMessage errorValue={touched.email && errors.email} />
                            <FormButton
                                title="Lấy Lại Mật Khẩu"
                                buttonType='outline'
                                onPress={handleSubmit}
                                buttonColor='#FF3300'
                                //disabled={!isValid || isSubmitting}
                                />
                            <Text style={styles.note}>Vui lòng cung cấp email hoặc số điện thoại đăng nhập đề lấy lại mật khẩu</Text>
                            <ErrorMessage errorValue={errors.general} />
                        </Fragment>
                    )}
                </Formik>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    text: {
        color: '#333',
        fontSize: 24,
        marginLeft: 110
    },
    buttonContainer: {
        marginTop: 10
    },
    note: {
            fontSize: 15,
            marginLeft: 29,
            marginRight: 15,
            marginTop: 10
    }
})