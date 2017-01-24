import React, {PropTypes, Component} from 'react'
import { View, Text } from 'react-native'
import { Splash } from '../../components'

export default class SplashContainer extends Component{

  handleLoginFinished = (err, result) =>{
    if(err){
      console.warn('error')
    } else if(result.isCancelled === true){
      console.log("auth cancelled");
    } else {
      console.log("Auth Success");
    }
  }

  render(){
    return(
      <Splash onLoginFinished = {this.handleLoginFinished}/>
    )
  }
}
