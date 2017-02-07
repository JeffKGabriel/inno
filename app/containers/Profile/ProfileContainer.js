import React, {PropTypes, Component} from 'react'
import {ListView, View, Text, Keyboard, StatusBar, Navigator,Platform} from 'react-native'
import {connect} from 'react-redux'
import {Profile, Message} from '../../components'

import {GameContainer} from '../../containers'


import {joinGame, lookingForGame, leaveGameLobby, getGames} from '../../redux/modules/game'

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';



class ProfileContainer extends Component{

  static propTypes = {

  }

  state={
    text: "",
  }

  renderScene= (route, navigator) => {

    if(this.props.listenerMessages === true){
      return <GameContainer />
    }else{
      return <Profile
                onJoinGame={this.handleJoinGame}
                onLeaveGame={this.handleLeaveGame}
                gameState={this.props.gameState}
                playersInLobby={this.props.numberOfPlayers}
                listenerMessages = {this.props.listenerMessages}
                />
    }

  }

  configureScene = (route) =>{
    if(Platform.OS === 'android'){
      return Navigator.SceneConfigs.FloatFromBottomAndroid
    }

    if(route.settings === true){
      return Navigator.SceneConfigs.FloatFromBottom
    }

    return Navigator.SceneConfigs.FloatFromRight
  }


  handleJoinGame =() =>{
    console.log("Were Gonna Join A Game");
    this.props.dispatch(lookingForGame())


    this.props.dispatch(getGames())

    //console.log("gameSate Redux : ", this.props.gameState);

  }

  handleLeaveGame=()=>{
    console.log("Leaving Da Game # ", this.props.gameID)
    this.props.dispatch( leaveGameLobby(this.props.gameID) )
  }



  render(){
    return(
      <Navigator
        initialRoute={{}}
        renderScene={this.renderScene}
        configureScene={this.configureScene} />
    )
  }

}


mapStateToProps = ({authentication,game}) =>{
  return{
    myID: authentication.authedId,
    gameID : game.id,
    gameState : game.gameState,
    numberOfPlayers: game.numberOfPlayers,
    listenerMessages: game.listenerMessages,
  }
}

export default connect(
  mapStateToProps
)(ProfileContainer)
