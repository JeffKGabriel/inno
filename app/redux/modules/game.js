import { ref } from '../../config/constants'
import { findGameAPI,
         joinGameAPI,
          leaveGameAPI,
          updateGameStateAPI,
          addUserToGameAPI,
          removeUserFromGameAPI,
          updatePlayerStateAPI,
          setUserPlayerReadyAPI,
          setUserPlayerCheckAPI,
          setUserPlayerEndAPI,
          getPlayerEndAPI,
          setPlayerRolesAPI,
          setPlayerVotesAPI,
          setTrialStateAPI,

         } from '../../api/games'

import {addMessage} from '../../redux/modules/messages'
import {addMessageUser} from '../../redux/modules/messageUsers'

import {addPlayers} from '../../redux/modules/players'




const JOIN_GAME = "JOIN_GAME"
const LOOKING_FOR_GAME = "LOOKING_FOR_GAME"
const LEAVE_GAME = "LEAVE_GAME"
const FOUND_GAME = "FOUND_GAME"

const UPDATE_GAME_STATE = "UPDATE_GAME_STATE"

const UPDATE_PLAYER_AMOUNT = "UPDATE_PLAYER_AMOUNT"
const SET_PLAYER_LISTENER = "SET_PLAYER_LISTENER"

const SET_MESSAGE_LISTENER = "SET_MESSAGE_LISTENER"

const UPDATE_MESSAGE_UIDS = "UPDATE_MESSAGE_UIDS"

const ADD_ROLES = "ADD_ROLES"

const UPDATE_PLAYER_READY = "UPDATE_PLAYER_READY"

const START_DAY_TIMER = "START_DAY_TIMER"

const START_NIGHT_TIMER = "START_NIGHT_TIMER"
const UPDATE_PLAYER_VOTES = "UPDATE_PLAYER_VOTES"
const UPDATE_PLAYER_ROLES = "UPDATE_PLAYER_ROLES"
const UPDATE_ALIVE_PLAYERS = "UPDATE_ALIVE_PLAYERS"
const UPDATE_TRIAL_STATE = "UPDATE_TRIAL_STATE"
const UPDATE_ALLOWED_TO_TALK = "UPDATE_ALLOWED_TO_TALK"






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

export function addRoles(roles){
  return{
    type: ADD_ROLES,
    roles,
  }
}

export function updateGameState(state){
  return{
    type: UPDATE_GAME_STATE,
    state,
  }
}

export function updateMessageUids(uids){
  return{
    type: UPDATE_MESSAGE_UIDS,
    uids,
  }
}

export function updatePlayerReady(){
  return{
    type: UPDATE_PLAYER_READY
  }
}

export function startDayTimer(){
  return{
    type: START_DAY_TIMER
  }
}

export function startNightTimer(){
  return{
    type: START_NIGHT_TIMER
  }
}

export function updatePlayerRoles(playerRoles){
  return{
    type: UPDATE_PLAYER_ROLES,
    playerRoles
  }
}

export function updatePlayerVotes(playerVotes){
  return{
    type: UPDATE_PLAYER_VOTES,
    playerVotes
  }
}

export function updateAlivePlayers(alivePlayers){
  return{
    type: UPDATE_ALIVE_PLAYERS,
    alivePlayers
  }
}

export function updateTrialState(trialState){
  return{
    type: UPDATE_TRIAL_STATE,
    trialState
  }
}

export function updateAllowedToTalk(allowed){
  return{
    type: UPDATE_ALLOWED_TO_TALK,
    allowed
  }
}



export function getGames(){
  return function (dispatch, getState) {

    let gameID
    let numberOfPlayers
    let listenerNumberOfPlayers = false

    return findGameAPI()
      .then((games) => {

        gameID = Object.keys(games)[0]
        numberOfPlayers = games[gameID].numberOfPlayers

        dispatch(foundGame( gameID ))
        console.log("Found Game, ID : ", gameID)


        if( numberOfPlayers < 7){

          dispatch(joinGame())

          joinGameAPI(gameID,)

          addUserToGameAPI( gameID, getState().authentication.authedId, getState().users, getState().game.gameState )
          setUserPlayerReadyAPI(gameID, getState().authentication.authedId)

          //set listener for Number Of players

          console.log("why is this running twice");

          dispatch( setPlayerListener() )

          ref.child(`games/${gameID}/numberOfPlayers`)
            .on('value', (snapshot) => {
              dispatch( updatePlayerAmount(snapshot.val() ) )
            })

          //set listener for gameState
          dispatch(setGameStateListener(gameID))

          //set listener to own playerReady
          dispatch(setOwnPlayerReadyListener(gameID,getState().authentication.authedId))


          //set listener to game PlayersRoles
          //dispatch(setPlayerRolesListener(gameID))

          //dispatch(setPlayerVotesListener(gameID))



          //dispatch(setMessageListener())

          //get Roles
          dispatch(getRoles(gameID)).then( res =>
            console.log('got roles',res)
          )
          .then( ()=>
            //listener for players
            dispatch(getPlayers(gameID)).then( res => {
              console.log("get Players res",res);
              if( numberOfPlayers === 6 ){
                //updateGameStateAPI(gameID,"Day1")
                //updatePlayerStateAPI(gameID,getState().authentication.authedId,"Day1")
                //dispatch( updateGameState("Day1") )
                console.log("6 players - start")
                //Should check 1 more time that its at 7 players
                return ref.child(`games/${gameID}/numberOfPlayers`)
                  .once('value')
                  .then((snapshot) =>{
                    if(snapshot.val() === 7){
                      dispatch(checkPlayersToAdvance(gameID))
                    }
                  })

              }
            }

            )
          )
          .then( ()=>
            //set listener for messages :)
            dispatch(getMessages(gameID))
          )




        }else{
          console.log("Game is Full - keep looking");
        }

      })

  }
}

export function setGameStateListener(gid){
  return (dispatch, getState) => {
    return  ref.child(`games/${gid}/gameState`)
      .on('value', (snap)=>{
        const newGameState = snap.val()

        dispatch(updateGameState(newGameState))

        if(newGameState === "Day1"){
          dispatch(setPlayerRolesListener(gid))
          dispatch(setPlayerVotesListener(gid))
          dispatch(setTrialStateListener(gid))

          dispatch(updateAlivePlayers(getState().game.numberOfPlayers))
        }

        ref.child(`games/${gid}/playerReady`)
          .off()

        //if day
        if(newGameState.includes("Day")){
          dispatch(startDayTimer())
        }
        if(newGameState.includes("Night")){
          dispatch(startNightTimer())
        }

      })
  }
}

export function setOwnPlayerReadyListener(gid,uid){

  return (dispatch, getState) => {
    return  ref.child(`games/${gid}/playerReady/${uid}`)
      .on('value', (snap)=>{
        const playerReadyValue = snap.val()

        if(playerReadyValue===false){
          setUserPlayerReadyAPI(gid, uid)
        }
        if(playerReadyValue=== true){
          return
        }

        return dispatch(updatePlayerReady())
      })
  }
}

export function setPlayerRolesListener(gid){
  return (dispatch, getState) => {
    return  ref.child(`games/${gid}/playerRoles`)
      .on('value', (snap)=>{
        const playerRoles = snap.val()
        return dispatch(updatePlayerRoles(playerRoles))
      })
  }
}

export function setTrialStateListener(gid){
  return (dispatch, getState) => {
    return  ref.child(`games/${gid}/trialState`)
      .on('value', (snap)=>{
        const trialState = snap.val()
        if(trialState!== "none"){

          //Pause the timers
          dispatch(updateGameState("Trial"))

          //If your name is not "trialState" value, you cannot talk

          //Start Trial Timer

          //Once Trial Timer ends, everyone can talk again, ->
          //& Voting for Hanging Occurs
        }
        return dispatch(updateTrialState(trialState))
      })
  }
}

export function setPlayerVotesListener(gid){
  return (dispatch, getState) => {
    return  ref.child(`games/${gid}/playerVotes`)
      .on('value', (snap)=>{
        const playerVotes = snap.val()

        console.log("playersAliveStill",);

        // run through playerVotes to see if there is a majority
        let votesFor = {}

        Object.keys(playerVotes).map(a=>{

          let voteIsFor = playerVotes[a]

          if( voteIsFor !== "none"){
            if(typeof votesFor[voteIsFor] === "undefined") votesFor[voteIsFor] = 0
            votesFor[voteIsFor] += 1
          }

        })
        console.log("after adding up votes",votesFor);

        let voteThreshold = Math.ceil( getState().game.alivePlayers / 2 )

        Object.keys(playerVotes).map(a=>{
          if(votesFor[a] >= voteThreshold ){
            console.log("person " + a + " is now on TRIAL!!!")
            setTrialStateAPI(gid,a)
          }
        })

        return dispatch(updatePlayerVotes(playerVotes))
      })
  }
}

export function getRoles(gameID){
  return function (dispatch, getState) {

    return  ref.child(`games/${gameID}/roles`)
      .once('value')
      .then( snap =>{
        const roles = snap.val() || {}
        return dispatch(addRoles(roles))
      })

  }
}

export function setPlayerListenerMod(gameID){

  return function (dispatch, getState) {

    return  ref.child(`games/${gameID}/players`)
      .on('value', (snap)=>{
        const players = snap.val() || {}
        return dispatch(addPlayers(players))
      })

  }
}

export function getPlayers(gameID){

  return function (dispatch, getState) {

    return  ref.child(`games/${gameID}/players`)
      .once('value')
      .then(snap =>{
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

export function checkPlayersToAdvance(gameID){
  console.log("inside check players to advance");

  return function (dispatch, getState) {

    //So we need to loop through all exsisting players,
    Object.keys(getState().players).map( (a,k)=>{
      // Change the playerReady var to "check",
      if(a !== "0"){
        setUserPlayerCheckAPI(gameID,a)
      }
    })

    // Set a listener for each of the players' status,
    ref.child(`games/${gameID}/playerReady`)
      .on('value', (snap)=>{
        const playersReady = snap.val() || {}
        //return dispatch(addPlayers(players))

        let readyArr = Object.keys(playersReady).map( a =>{
          return playersReady[a]
        })

        // when playersReady has all values as true ->
        if( readyArr.every( i => i===true  ) ){


          //LOBBY -> DAY1
          if(getState().game.gameState === "Lobby"){
            console.log("Players to assign roles too",Object.keys(playersReady));

            let roleFromArr = getState().game.roles.slice()
            let playerRoles = {}
            let playerVotes = {}
            let roleFromSize = roleFromArr.length

            console.log("roleFromArr",roleFromArr);
            Object.keys(playersReady).map( (a) =>{
              //Assign Random role , put in json
              playerRoles[a] = {
                alive:true,
                role: roleFromArr.splice( Math.floor((Math.random() * roleFromSize)) ,1)[0]
              }
              playerVotes[a] = "none"
              roleFromSize = roleFromSize -1

            })
            console.log("after we got all the roles",playerRoles);
            //Put json into the Firebase
            setPlayerRolesAPI(gameID,playerRoles)
            setPlayerVotesAPI(gameID,playerVotes)
          }





          //change game state to next
          let nextGameState = getNextGameState( getState().game.gameState )
          console.log("next Game State",nextGameState);
          updateGameStateAPI(gameID, nextGameState )
        }else{
          // if 7 seconds runs out first, kick whoever is still false
          //remove that id from players
          //remove that id from playerReady
          //change number of Players to how many you kicked out
        }

        // Turn off listener for each of the players' status after the 7 seconds

      })


  }


  //So we need to loop through all exsisting players,

    // Change the playerReady var to "check",
      //-> their client listener hears it and responds with "ready"
      //-> their client does not hear it and they are disconnected after 7 seconds
        // their uid is removed from the players section

    // Set a listener for each of the players' status,

    // Turn off listener for each of the players' status




    //Gather results of actions from last nights / days activitys
    //Compute the nextGame states player states / actions stuff

    //Everyone is ready to move onto the next gameState
      //Update actions or results of actions if needed
      //Update GameStateAPI
        //-> everyones listeners see that and they will get the new actions / game state objects




}

//
export function putVote(gid,uid,votedFor){

  console.log("put vote for")
  return function (dispatch, getState) {


  ref.child(`games/${gid}/playerVotes/${uid}`)
    .set(votedFor)

  }
}

export function endOfDay(){
  console.log("end of day r u running i kno u r");


  return function (dispatch, getState) {


    setUserPlayerEndAPI( getState().game.id, getState().authentication.authedId )
      .then(()=>{
        console.log("updated end of day");

        getPlayerEndAPI( getState().game.id )
          .then(snap =>{
            const playersEnd = snap.val() || {}
            //return dispatch(addRoles(roles))

            let playerEndArr = Object.keys(playersEnd).map( a =>{
              return playersEnd[a]
            })

            // when playerEndReady has all values as "end" ->
            if( playerEndArr.every( i => i==="end"  ) ){
              //your last one to end
              //if you are tally the votes, change the stuff,
              //then do a player ready check
              console.log("everyone ready and lets do a check");
              dispatch(checkPlayersToAdvance( getState().game.id ) )

            }else{

              console.log("not everyone else day end yet");

            }


          })

      })



  //check if everyone elses is already at end to see if ur the last one
    //if you are tally the votes, change the stuff,
    //then do a player ready check
      //if everyone ready, change game state to next one

  }

}





export function leaveGameLobby(gameID){
  return function (dispatch, getState) {
    console.log("Inside redux module leaving gameID : ", gameID)

    ref.child(`games/${gameID}/numberOfPlayers`).off()

    ref.child(`games/${gameID}/messages`).off()

    leaveGameAPI(gameID)
    removeUserFromGameAPI(gameID,getState().authentication.authedId)
    dispatch(leaveGame())


  }
}

export function getNextGameState(currentState){
  console.log("inside get next Game State",currentState);
  switch(currentState){
    case "Lobby":
      return "Day1"
    case "Day1":
      return "Night1"
    case "Night1":
      return "Day2"
    case "Day2":
      return "Night2"
    case "Night2":
      return "Day3"
    case "Day3":
      return "Night3"
    case "Night3":
      return "Day4"
  }
}



const initialState={
  inGame: false,
  gameState: "none",
  id: null,
  numberOfPlayers: null,
  listenerNumberOfPlayers: false,
  messageUids: [],
  listenerMessages: false,
  roles: [],
  playerReady : true,
  dayDuration: 40,
  nightDuration: 40,
  timerRunning: false,
  activeTimer: "dayTimer",
  playerRoles: null,
  playerVotes: null,
  alivePlayers: null,
  trialState: "none",
  allowedToTalk : true,


}

export default function game (state = initialState, action) {
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
        gameState: "Lobby",
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

    case ADD_ROLES :
      return{
        ...state,
        roles: action.roles
      }

    case UPDATE_PLAYER_ROLES:
      return{
        ...state,
        playerRoles: action.playerRoles,
      }

    case UPDATE_PLAYER_VOTES:
      return{
        ...state,
        playerVotes: action.playerVotes,
      }

    case UPDATE_GAME_STATE :
      return{
        ...state,
        gameState: action.state,
        timerRunning: false,
      }

    case UPDATE_PLAYER_READY:
      return{
        ...state,
        playerReady : true
      }

    case START_DAY_TIMER:
      return{
        ...state,
        timerRunning: true,
        activeTimer: "dayTimer",

      }

    case START_NIGHT_TIMER:
      return{
        ...state,
        timerRunning: true,
        activeTimer: "nightTimer",
      }

    case UPDATE_ALIVE_PLAYERS:
      return{
        ...state,
        alivePlayers : action.alivePlayers,
      }
    case UPDATE_TRIAL_STATE:
      return{
        ...state,
        trialState: action.trialState,
      }

    default :
      return state
  }
}
