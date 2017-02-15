import {ref} from '../config/constants'

import {players} from '../redux/modules/players'


export function findGameAPI(){
  return ref.child(`games/`)
    .limitToFirst(1)
    .once('value')
    .then((snapshot) => snapshot.val())
}

export function joinGameAPI(gid){
  return ref.child(`games/${gid}/numberOfPlayers`)
    .transaction( (numberOfPlayers) => numberOfPlayers += 1)
}

export function leaveGameAPI(gid){
  return ref.child(`games/${gid}/numberOfPlayers`)
    .transaction( (numberOfPlayers) => numberOfPlayers -= 1)
}

export function updateGameStateAPI(gid,state){
  return ref.child(`games/${gid}/gameState`)
    .set(state)
}

export function addUserToGameAPI(gid,uid,user,state){
  return ref.child(`games/${gid}/players/${uid}`)
    .set({
      currentState: state,
      displayName: user[uid].displayName,
      photoURL: user[uid].photoURL,
      rank:420,
    })
}

export function setUserPlayerReadyAPI(gid,uid){
  return ref.child(`games/${gid}/playerReady/${uid}`)
    .set(true)
}

export function setUserPlayerCheckAPI(gid,uid){
  return ref.child(`games/${gid}/playerReady/${uid}`)
    .set(false)
}

export function setPlayerRolesAPI(gid,playerRoles){
  return ref.child(`games/${gid}/playerRoles`)
    .set(playerRoles)
}

export function setPlayerVotesAPI(gid,playerVotes){
  return ref.child(`games/${gid}/playerVotes`)
    .set(playerVotes)
}

export function setUserPlayerEndAPI(gid,uid){
  return ref.child(`games/${gid}/playerReady/${uid}`)
    .set("end")
}

export function getPlayerEndAPI(gid){
  return ref.child(`games/${gid}/playerReady/`)
    .once('value')
}

export function updatePlayerStateAPI(gid,uid,state){
  return ref.child(`games/${gid}/players/${uid}/gameState`)
    .set(state)
}

export function setTrialStateAPI(gid,trialPerson){
  return ref.child(`games/${gid}/trialState`)
    .set(trialPerson)
}




export function removeUserFromGameAPI(gid,uid){
  return ref.child(`games/${gid}/players/${uid}`)
    .remove()
}


export function pushMessage(gid,uid,message){
  return ref.child(`games/${gid}/messages/`)
    .push({
      user:uid,
      words:message
    })
}
