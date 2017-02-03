import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

Leader.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
}

export default function Leader (props) {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image style={styles.image} source={{uri: props.avatar}}/>
        <Text style={styles.nameText}>{props.name}</Text>
      </View>
      <Text style={styles.scoreText}>Score: {props.score}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#000",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    padding: 10,
    fontSize: 32,
    color: "#F00",
  },
  scoreText: {
    color: "#F00",
  },
})
