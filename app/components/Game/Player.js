import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Image, Switch, } from 'react-native'
import { PressableIcon } from '../../components'





export default function Player (props) {
  return (
    <View>
      { props.rank === 0
        ? null
        :
        <View style={styles.container}>
          <Text>
             {props.name}
          </Text>
          <Text>
             {props.rank}
          </Text>

          {
            props.isVoteHighlighted
             ? <PressableIcon name='ios-checkmark-circle' size={28} color="#ACD8FA" onPress={props.makeVoteForPlayer} />
             : <PressableIcon name='ios-checkmark-circle' size={28} color="#000" onPress={props.makeVoteForPlayer} />

          }








          <View style={styles.votes}>
            <Text>
               {props.numberOfVotes}
            </Text>
          </View>

        </View>
      }
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    backgroundColor:"#FFF",
    flexDirection:'row',
    height:30,
    marginTop:4,
    justifyContent: 'space-between'
  },
  votes:{
  }
})
