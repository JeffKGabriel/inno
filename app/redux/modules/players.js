

const ADD_PLAYERS = "ADD_PLAYERS"

export function addPlayers (players) {
  return {
    type: ADD_PLAYERS,
    players,
  }
}


export default function messages (state = {}, action) {
  switch (action.type) {
    case ADD_PLAYERS :
      return {
        ...state,
        ...action.players,
      }
    default :
      return state
  }
}
