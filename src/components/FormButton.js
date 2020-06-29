import React from 'react'
import { Button } from 'react-native-elements'

const FormButton = ({ title, buttonType, buttonColor, ...rest }) => (
  <Button
    {...rest}
    type={buttonType}
    title={title}
    buttonStyle={{ backgroundColor: buttonColor, borderRadius: 30 }}
    titleStyle={{ color: '#fff', fontSize: 20 }}
    containerStyle={{ marginLeft: 20, marginRight: 20 }}
  />
)

export default FormButton
