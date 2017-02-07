

const ADD_MESSAGE_USER = "ADD_MESSAGE_USER"

export function addMessageUser (players) {
  return {
    type: ADD_MESSAGE_USER,
    players,
  }
}


export default function messageUsers (state = {}, action) {
  switch (action.type) {
    case ADD_MESSAGE_USER :
      return {
        ...state,
        ...action.players,
      }
    default :
      return state
  }
}
