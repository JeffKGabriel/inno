import React, {PropTypes, Component} from 'react'
import {ListView, View, Text, Keyboard, StatusBar, Navigator,Platform} from 'react-native'
import {connect} from 'react-redux'
import {Profile, Message,Game} from '../../components'

import {joinGame, lookingForGame, leaveGameLobby, getGames} from '../../redux/modules/game'

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';

class GameContainer extends Component{

  static propTypes = {

  }

  state={
    text: "",
  }


  render(){
    return(
        <Game />
    )
  }

}

mapStateToProps = ({authentication,game}) =>{
  return{
    inGame: game.inGame,
    myID: authentication.authedId,
    gameID : game.id,
    gameState : game.gameState,
    numberOfPlayers: game.numberOfPlayers,
    listenerMessages: game.listenerMessages,
  }
}

export default connect(
  mapStateToProps
)(GameContainer)
