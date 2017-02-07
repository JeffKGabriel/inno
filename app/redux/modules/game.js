import { ref } from '../../config/constants'
import { findGameApi, joinGameApi, leaveGameApi, startGameApi, addUserToGameApi, removeUserFromGameApi } from '../../api/games'

import {addMessage} from '../../redux/modules/messages'
import {addMessageUser} from '../../redux/modules/messageUsers'

import {addPlayers} from '../../redux/modules/players'




const JOIN_GAME = "JOIN_GAME"
const LOOKING_FOR_GAME = "LOOKING_FOR_GAME"
const LEAVE_GAME = "LEAVE_GAME"
const FOUND_GAME = "FOUND_GAME"
const GAME_STARTED = "GAME_STARTED"

const UPDATE_PLAYER_AMOUNT = "UPDATE_PLAYER_AMOUNT"
const SET_PLAYER_LISTENER = "SET_PLAYER_LISTENER"

const SET_MESSAGE_LISTENER = "SET_MESSAGE_LISTENER"

const UPDATE_MESSAGE_UIDS = "UPDATE_MESSAGE_UIDS"






export function joinGame () {
  return {
    type: JOIN_GAME
  }
}

export function lookingForGame () {
  return {
    type: LOOKING_FOR_GAME,
  }
}

export function updatePlayerAmount(amount){
  return{
    type: UPDATE_PLAYER_AMOUNT,
    amount
  }
}

export function setPlayerListener(){
  return{
    type: SET_PLAYER_LISTENER
  }
}

export function setMessageListener(){
  return{
    type: SET_MESSAGE_LISTENER
  }
}

export function leaveGame () {
  return {
    type: LEAVE_GAME,
  }
}

export function foundGame(id){
  return{
    type: FOUND_GAME,
    id,
  }
}

export function gameStarted(){
  return{
    type: GAME_STARTED,
  }
}

export function updateMessageUids(uids){
  return{
    type: UPDATE_MESSAGE_UIDS,
    uids,
  }
}


export function getGames(){
  return function (dispatch, getState) {

    let gameID
    let numberOfPlayers
    let listenerNumberOfPlayers = false

    return findGameApi()
      .then((games) => {

        gameID = Object.keys(games)[0]
        numberOfPlayers = games[gameID].numberOfPlayers

        dispatch(foundGame( gameID ))
        console.log("Found Game, ID : ", gameID)


        if( numberOfPlayers < 7){

          joinGameApi(gameID)
          addUserToGameApi(gameID, getState().authentication.authedId)

          if( numberOfPlayers === 6 ){
            startGameApi(gameID)
            dispatch(gameStarted())
          }

          dispatch( joinGame() )

          //set listener for Number Of players

          console.log("why is this running twice");

          dispatch( setPlayerListener() )

          ref.child(`games/${gameID}/numberOfPlayers`)
            .on('value', (snapshot) => {
              console.log(snapshot.val() );
              dispatch( updatePlayerAmount(snapshot.val() ) )
            })

          //set listenr for gameState

          //listener for players
          dispatch(getPlayers(gameID))

          //set listener for messages :)
          dispatch(getMessages(gameID))
          //dispatch(setMessageListener())






        }else{
          console.log("Game is Full - keep looking");
        }

      })

  }
}


export function getPlayers(gameID){
  return function (dispatch, getState) {
    return  ref.child(`games/${gameID}/players`)
      .on('value', (snap)=>{
        console.log("add players",snap.val())
        const players = snap.val() || {}
        return dispatch(addPlayers(players))
      })
  }
}




export function getMessages(gameID){
  return function (dispatch, getState) {

    let listenerSet = false

    return  ref.child(`games/${gameID}/messages`)
        .on('value', (snap)=>{
          console.log("messagesss",snap.val())
          const messages = snap.val() || {}
          const messageUids = Object.keys(messages)
          const { justMessages, players } = messageUids.reduce( (prev,uid)=>{

            prev.justMessages[uid] = messages[uid].words
            /*
            prev.players[uid] = {
              name: messages[uid].user,
            }
            */
            prev.players[uid] = messages[uid].user
            return prev
          }, {justMessages: {}, players: {}})


          //update players
          dispatch(addMessageUser(players))
          //update messages
          dispatch(addMessage(justMessages))
          //update messageUids
          dispatch(updateMessageUids(messageUids))

          if(listenerSet === false){
            dispatch(setMessageListener())
            listenerSet = true
          }

        })
  }
}



export function leaveGameLobby(gameID){
  return function (dispatch, getState) {
    console.log("Inside redux module leaving gameID : ", gameID)

    ref.child(`games/${gameID}/numberOfPlayers`).off()

    ref.child(`games/${gameID}/messages`).off()

    leaveGameApi(gameID)
    removeUserFromGameApi(gameID,getState().authentication.authedId)
    dispatch(leaveGame())


  }
}




const initialState={
  inGame: false,
  gameState: "none",
  id: null,
  numberOfPlayers: null,
  listenerNumberOfPlayers: false,
  messageUids: [],
  listenerMessages: false
}

export default function users (state = initialState, action) {
  switch (action.type) {
    case LOOKING_FOR_GAME :
      return {
        ...state,
        inGame:false,
        gameState:"looking",
      }

    case LEAVE_GAME :
      return {
        ...state,
        inGame:false,
        gameState:"none",
        numberOfPlayers: null,
        id: null,
        listenerMessages:false,
        listenerNumberOfPlayers: false,
        messageUids: [],

      }

    case FOUND_GAME :
      return{
        ...state,
        inGame: false,
        id: action.id,
      }

    case JOIN_GAME :
      return{
        ...state,
        inGame: true,
        gameState: "lobby",
      }

    case UPDATE_PLAYER_AMOUNT :
      return{
        ...state,
        numberOfPlayers: action.amount
      }

    case SET_PLAYER_LISTENER :
      return{
        ...state,
          listenerNumberOfPlayers : true,
      }

      case SET_MESSAGE_LISTENER :
        return{
          ...state,
            listenerMessages : true,
        }


    case UPDATE_MESSAGE_UIDS:
      return{
        ...state,
        messageUids: action.uids
      }

/*
    case ADD_MESSAGES:
      return{
        ...state,
        ...messages: action.messages,
      }
      */


    case GAME_STARTED :
      return{
        ...state,
        gameState: "started"
      }

    default :
      return state
  }
}
