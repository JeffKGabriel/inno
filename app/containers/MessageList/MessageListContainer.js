import React, {PropTypes, Component} from 'react'
import {ListView, View, Text, Keyboard} from 'react-native'
import {connect} from 'react-redux'
import {MessageList, Message} from '../../components'
import {pushMessage} from '../../api/games'



class MessageListContainer extends Component{


  static propTypes = {}

  state={
    text: "",
    players: this.props.players
  }


  constructor(props){
    super(props)
    console.log("state beforehand" , this.state);
    this.ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2})

    this.state ={
      ...this.state,
      dataSource : this.ds.cloneWithRows(this.props.messages)
    }
  }

  componentWillReceiveProps (nextProps){
    console.log("What are these nextProps", nextProps);
    if(nextProps.messages !== this.props.messages){
      this.setState({
        ...this.state,
        dataSource: this.ds.cloneWithRows(nextProps.messages)
      })
    }
  }

  handleTextInput=(text)=>{
    this.setState({text})
  }

  handleTextSubmit=(text)=>{
   //Keyboard.dismiss()
   //console.log("text submit",text);
/*
   this.setState({
     ...state,
     text:""
   })
   */

   pushMessage(this.props.gameID,this.props.myID,text)
  }

  renderRow = ({name, text}) =>{
    //console.log("RenderRow name: " +name+ " text: " +text);
    return (
      <Message
        name={this.state.players[name].displayName}
        text={text}
        />
    )
  }


  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }


  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow () {
    this.listView.scrollTo({x:0,y: (this.listView.getMetrics().contentLength - this.layoutHeight), animated: true})
    console.log("keyboard Show");
  }

  _keyboardDidHide () {
    this.listView.scrollTo({x:0,y: (this.listView.getMetrics().contentLength - this.layoutHeight), animated: true})
    console.log("keyboard hide");
  }


/*



  <View>
    <Text>
      MessageListContainer
    </Text>
  </View>
*/


  render(){

    return(
      <MessageList
        messageDataSource={this.state.dataSource}
        messageRenderRow={this.renderRow}

        onTextInput={this.handleTextInput}
        onTextSubmit={this.handleTextSubmit}

        textbox = {this.state.text}

        focusOnBottom = {this.focusOnBottom}
        />
    )
  }
}

mapStateToProps = ({authentication, game, messages, messageUsers, players}) =>{
  return{
    myID: authentication.authedId,
    gameID : game.id,
    gameState : game.gameState,
    numberOfPlayers: game.numberOfPlayers,
    listenerMessages: game.listenerMessages,
    players: players,

    messages: game.messageUids.map( (uid)=>{
      //console.log("inside messages mapping");
      return{
        ...messages,
        name: messageUsers[uid],
        text: messages[uid],
      }
    }),
  }
}

export default connect(
  mapStateToProps
)(MessageListContainer)
