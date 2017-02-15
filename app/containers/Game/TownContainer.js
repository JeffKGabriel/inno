import React, {PropTypes, Component} from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'
import {Town} from '../../components'

import {endOfDay} from '../../redux/modules/game'



class TownContainer extends Component{

  static propTypes = {
  }

  componentWillReceiveProps(nextProps){
    console.log("town container nextProps",nextProps);
    if(this.props.timerRunning !== nextProps.timerRunning){

       if(nextProps.timerRunning === true){
         this.startTimer("start")
       }else{
         this.startTimer("pause")
       }
    }
  }

  state={
    timerRunning : this.props.timerRunning,
    dayTimer : this.props.dayDuration,
    nightTimer : this.props.nightDuration,
    activeTimer : "dayTimer",
  }






  startTimer = (timerCommand) => {


    if(timerCommand === "start"){
    console.log("startTimer");

      //for every second, countdown the timer
      this.interval = setInterval( ()=> {

        const activeTimer = this.state.activeTimer
        const nextSecond = this.state[activeTimer] - 1

        //if timer over
        if(nextSecond <= 0){

          this.setState({
            [activeTimer] : activeTimer === "dayTimer" ? this.props.dayDuration : this.props.nightDuration, //this.props.ActiveTimeDuration,
          //  countdownRunning : true
          })
          this.props.dispatch(endOfDay())
          clearInterval(this.interval)


        } else{
          this.setState({
            [activeTimer] : nextSecond,
          //  countdownRunning : true
          })
        }

      },1000)

    }else{
      console.log("pause the timer")

      return window.clearInterval(this.interval)
    }


  }




  getProgress = () => {
    return this.state.activeTimer === 'dayTimer'
      ? 1 - (this.state.dayTimer / this.props.dayDuration)
      : 1 - (this.state.nightTimer / this.props.nightDuration)
  }




  render(){
    return(
        <Town
          gameState={this.props.gameState}
          roles={this.props.roles}
          dayTimer={this.state.dayTimer}
          nightTimer={this.state.nightTimer}
          activeTimer={this.state.activeTimer}
          progress={this.getProgress()}
          playerRoles={this.props.playerRoles}
          myID={this.props.myID}
          playerVotes={this.props.playerVotes}
          />
    )
  }

}


mapStateToProps = ({authentication,game,players}) =>{
  return{
    playerList:players,
    inGame: game.inGame,
    myID: authentication.authedId,
    gameID : game.id,
    gameState : game.gameState,
    numberOfPlayers: game.numberOfPlayers,
    listenerMessages: game.listenerMessages,
    roles: game.roles,
    dayDuration: game.dayDuration,
    nightDuration: game.nightDuration,
    activeTimer: game.activeTimer,
    timerRunning: game.timerRunning,
    playerRoles: game.playerRoles,
    playerVotes: game.playerVotes,
  }
}

export default connect(
  mapStateToProps
)(TownContainer)
