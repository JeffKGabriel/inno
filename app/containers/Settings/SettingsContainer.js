import React, {PropTypes, Component} from 'react'
import { Navigator } from 'react-native'
import {Settings} from '../../components'


export default class SettingsContainer extends Component{

  static propTypes={
    navigator :  PropTypes.object.isRequired,
  }

  state={
    timerDuration: 20,
    restDuration: 5,
  }

  handleTimerChange = (timerDuration) =>{
    this.setState({timerDuration})
  }
  handleRestChange = (restDuration) =>{
    this.setState({restDuration})
  }
  handleTimerComplete = () =>{
    console.log("finised sliding timer");
  }
  handleRestComplete = () =>{
    console.log("finised sliding rest");
  }
  handleLogout= () =>{
    console.log("Logging out");
  }

  render(){
    console.log("in SettingsContainer")
    return(
      <Settings
        onBack={this.props.navigator.pop}
        onLogout={this.handleLogout}
        onRestComplete={this.handleRestComplete}
        onTimerComplete={this.handleTimerComplete}
        onTimerChange={this.handleTimerChange}
        onRestChange={this.handleRestChange}
        timerDuration={this.state.timerDuration}
        restDuration={this.state.restDuration}
      />
    )
  }
}
