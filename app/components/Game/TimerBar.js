import React, { PropTypes } from 'react'
import { View, StyleSheet, Text } from 'react-native'

TimerBar.propTypes = {
}

TimerBar.defaultProps = {
  incompleteBackgroundColor: '#fff'
}

export default function TimerBar (props) {
  console.log("Timer",props.progress)
  return (
    <View style={styles.container}>
      <View style={{flex: props.progress}}></View>
      <View style={{flex: 1 - props.progress, backgroundColor: "#F00"}}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#4A90E2'
  }
})
