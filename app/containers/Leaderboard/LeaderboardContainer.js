import React, {PropTypes, Component} from 'react'
import {ListView} from 'react-native'
import {Leaderboard} from '../../components'
import {Leader} from '../../components'

import {connect} from 'react-redux'
import {fetchAndSetScoresListener} from '../../redux/modules/scores'

class LeaderboardContainer extends Component{

  static propTypes={
    listenerSet: PropTypes.bool.isRequired,
    leaders: PropTypes.array.isRequired,
  }

  constructor(props){
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2})
    this.state = {
      dataSource : this.ds.cloneWithRows(this.props.leaders)
    }
  }

  componentDidMount(){
    if(this.props.listenerSet === false){
      this.props.dispatch(fetchAndSetScoresListener())
      console.log("LeaderBoard Container Component did mounttt");
    }
  }

  componentWillReceiveProps (nextProps){
    console.log("we received props yooo : ", nextProps);
    if( nextProps.leaders !== this.props.leaders ){
      console.log("newLeaders : ", nextProps.leaders);
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.leaders)
      })
    }
  }

  renderRow = ({displayName,photoURL,score}) =>{
    return <Leader name={displayName} avatar={photoURL} score={score}/>
  }

  render(){
    return(
      <Leaderboard
        listenerSet = {this.props.listenerSet}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        />
    )
  }
}

function mapStateToProps ({scores, users}) {
  return {
    listenerSet: scores.listenerSet,
    leaders: scores.leaderboardUids.map((uid) => {
      return {
        score: scores.usersScores[uid],
        ...users[uid],
      }
    })
  }
}

export default connect(
  mapStateToProps
)(LeaderboardContainer)
