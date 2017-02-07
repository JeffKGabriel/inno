

const ADD_MESSAGE = "ADD_MESSAGE"

export function addMessage (message) {
  return {
    type: ADD_MESSAGE,
    message,
  }
}


export default function messages (state = {}, action) {
  switch (action.type) {
    case ADD_MESSAGE :
      return {
        ...state,
        ...action.message,
      }
    default :
      return state
  }
}
