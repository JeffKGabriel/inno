import React, { PropTypes } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

PressableIcon.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default function PressableIcon (props) {


  return (
    <TouchableOpacity onPress={props.onPress} style={{padding: 0}}>
      <Icon name={props.name} color={props.color ? props.color : "#FFF"} size={props.size ? props.size : 40} />
    </TouchableOpacity>
  )
}
