import React, {PropTypes, Component} from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'
import { Player } from '../../components'
import {putVote} from '../../redux/modules/game'
import {pushMessage} from '../../api/games'





class PlayerListContainer extends Component{

  static propTypes = {
  }

  state={
  }

  getVotesForPlayer=(playerVotes,playerID)=>{
    let votes = 0;
    if(playerVotes === null){
      return "-"
    }else{
      Object.keys(playerVotes).map(a=>{
        if(playerVotes[a] === playerID) votes += 1
      })
      return votes
    }
  }

  makeVoteForPlayer=(playerVotedFor)=>{

    console.log("playerVotedFor", playerVotedFor)
    console.log("myID",this.props.myID)

    if(this.props.playerVotes[this.props.myID] === playerVotedFor){
      this.props.dispatch(putVote(this.props.gid,this.props.myID,"none"))
      pushMessage(this.props.gid,0,this.props.myID+" retracted")
    }else{
      this.props.dispatch(putVote(this.props.gid,this.props.myID,playerVotedFor))
      pushMessage(this.props.gid,0,this.props.myID+" voted for "+playerVotedFor)

    }

  }

  isVoteHighlighted(a){
    if(this.props.playerVotes === null){
      return false
    }
    else if(this.props.playerVotes[this.props.myID] === a){
      return true
    }else{
      return false
    }
  }


  render(){
    return(
        <View style={{}}>
          {
            Object.keys(this.props.playerList).map( (a,k)=> (

                <Player
                  key={k}
                  playerID={a}
                  name={this.props.playerList[a].displayName}
                  rank={this.props.playerList[a].rank}
                  numberOfVotes={this.getVotesForPlayer(this.props.playerVotes,a)}
                  makeVoteForPlayer={()=>{this.makeVoteForPlayer(a)}}
                  isVoteHighlighted={this.isVoteHighlighted(a)}
                  />

              )
            )
          }
        </View>
    )
  }

}


mapStateToProps = ({authentication, players,game}) =>{
  return{
    gid:game.id,
    playerList:players,
    playerVotes : game.playerVotes,
    myID: authentication.authedId,
    playerVotes: game.playerVotes,
  }
}

export default connect(
  mapStateToProps
)(PlayerListContainer)
