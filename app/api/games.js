import {ref} from '../config/constants'


export function findGameApi(){
  return ref.child(`games/`)
    .limitToFirst(1)
    .once('value')
    .then((snapshot) => snapshot.val())
}

export function joinGameApi(id){
  return ref.child(`games/${id}/numberOfPlayers`)
    .transaction( (numberOfPlayers) => numberOfPlayers += 1)
}

export function startGameApi(id){
  return ref.child(`games/${id}/gameState`)
    .set("started")
}

export function addUserToGameApi(id,uid){
  return ref.child(`games/${id}/players/${uid}`)
    .set({
      displayName: "john",
      photoURL: "ewqwewqewqasfd",
      rank:420,
    })
}


export function leaveGameApi(id){
  return ref.child(`games/${id}/numberOfPlayers`)
    .transaction( (numberOfPlayers) => numberOfPlayers -= 1)
}

export function removeUserFromGameApi(id,uid){
  return ref.child(`games/${id}/players/${uid}`)
    .remove()
}


export function pushMessage(id,uid,message){
  return ref.child(`games/${id}/messages/`)
    .push({
      user:uid,
      words:message
    })
}
