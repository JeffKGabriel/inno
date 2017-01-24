import {getAccessToken, authWithToken} from '../../api/auth'

const AUTHENTICATING = 'AUTHENTICATING'
const NOT_AUTHED = 'NOT_AUTHED'
const IS_AUTHED = 'IS_AUTHED'

function authenticating(){
  return{
    type: AUTHENTICATING,
  }
}

function notAuthed(){
  return{
    type: NOT_AUTHED
  }
}

function isAuthed(uid){
  return{
    type: IS_AUTHED,
    uid,
  }
}


export function handleAuthWithFirebase(){
  return function(dispatch, getState){
    dispatch( authenticating() )
    return getAccessToken()
      .then( ({accessToken})=> authWithToken(accessToken) )
      .catch( (err)=> console.warn('Error in handleAuthWithFirebase: ', err) )
  }
}

export function onAuthChange(user){
  return function(dispatch){
    if (!user){
      dispatch(notAuthed())
    }else{
      const { providerData, uid, } = user
      dispatch(isAuthed(uid))
    }
  }
}





const initialState = {
  isAuthed : false,
  isAuthenticating : false,
  authedId : '',
}

export default function authentication (state = initialState, action){

  switch( action.type){
    case IS_AUTHED:
      return{
        isAuthenticating: false,
        isAuthed: true,
        authedId: action.uid
      }
    case NOT_AUTHED:
      return{
        isAuthenticating: false,
        isAuthed: false,
        authedId: '',
      }
    case AUTHENTICATING:
      return{
        ...state,
        isAuthenticating : true,
      }
    default:
     return state
  }

}
