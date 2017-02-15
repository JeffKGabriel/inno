import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { PressableIcon, TimerBar } from '../../components'
import { PlayerListContainer } from '../../containers'




export default function Town (props) {
  return (
    <View style={styles.container}>

      <Text style={{textAlign:'center', fontSize:32, marginTop:4, marginBottom:4,}}>
        {props.gameState}
      </Text>

      <PlayerListContainer />

      <Text style={{textAlign:'center', fontSize:32, marginTop:8, marginBottom:4,}}>
        Roles
      </Text>

      {
        props.roles.map( (a,k)=>(
          <View key={k}>
            <Text>
              {a}
            </Text>
          </View>
        ))
      }

      <TimerBar progress={props.progress} />


      { props.playerRoles === null
        ? null
        :
        <View>
          <Text>
            My Role is : {props.playerRoles[props.myID].role}
          </Text>
        </View>
      }



    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#F00",
  },
})
