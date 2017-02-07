import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Image,ListView,TextInput, Keyboard } from 'react-native'
import { PressableIcon } from '../../components'
import {MessageListContainer} from '../../containers'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



Profile.propTypes = {
  onJoinGame: PropTypes.func.isRequired,
  onLeaveGame: PropTypes.func.isRequired,
  gameState: PropTypes.string.isRequired,
  playersInLobby : PropTypes.number,
}


export default function Profile (props) {
  return (
    <View style={styles.container} scrollEnabled={false}>

      <KeyboardAwareScrollView>

        <View style={{flex:1, backgroundColor:"#F00"}}>
          {props.gameState === "none"
            ?
              <View style={styles.joinGame}>
                <PressableIcon name='ios-nuclear-outline' color="#00F" onPress={props.onJoinGame} />
              </View>
            : null
          }

          {props.gameState === "lobby"
            ? <View style={{flex:1,flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                  <View style={styles.leaveGame}>
                    <PressableIcon name='ios-close-circle-outline' color="#00F" onPress={props.onLeaveGame} />
                  </View>
                  <View>
                    <Text style={styles.playersInLobby}>{props.playersInLobby} / 7</Text>
                  </View>
              </View>
            : null
          }

        </View>



        <View style={{flex:3, backgroundColor:"#0F0",}}>
            {props.listenerMessages === true
              ?
                <MessageListContainer />
              :
                null
            }
        </View>

      </KeyboardAwareScrollView>



    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFBBFF'
  },
  playerInfo:{
    height: 10,
    alignSelf: 'stretch',
    backgroundColor:'#F00',
    marginTop:10,
  },
  joinGame:{
    height:100,
    width:100,
    marginTop:10,
    backgroundColor:"#CCC",
  },
  playersInLobby:{

  },
  leaveGame:{
    height:100,
    width:100,
    marginTop:10,
    backgroundColor:"#CCC",
  },
})
