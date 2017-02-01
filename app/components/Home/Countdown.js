import React, { PropTypes } from 'react'
import { View, StyleSheet, Text } from 'react-native'

Countdown.propTypes = {
  formattedTime: PropTypes.string.isRequired,
}

export default function Countdown (props) {
  return (
    <Text style={styles.textContainer}>
      {props.formattedTime}
    </Text>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    color: "#FFF",
    fontSize: 100,
    textAlign: 'center',
    margin: 30,
    fontWeight: '100',
  },
})
