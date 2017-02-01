import React, { PropTypes } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

SkipRest.propTypes = {
  onSkipRest: PropTypes.func.isRequired ,
}

export default function SkipRest (props) {
  return (
    <TouchableOpacity onPress={props.onSkipRest}>
      <Text style={styles.skipText}>Skip Rest</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  skipText: {
    color: '#FFF',
    fontSize: 32,
    textAlign: 'center',
  }
})
