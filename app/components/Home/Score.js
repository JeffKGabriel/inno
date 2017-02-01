import React, { PropTypes } from 'react'
import { StyleSheet, Text } from 'react-native'

Score.propTypes = {
  count: PropTypes.number.isRequired,
}

export default function Score (props) {
  return (
    <Text style={styles.container}>
      Score: {props.count}
    </Text>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignSelf: 'stretch',
    color: '#FFF',
    fontSize: 24,
    textAlign: 'right',
  },
})
