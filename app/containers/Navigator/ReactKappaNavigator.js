import React, {PropTypes, Component} from 'react'
import { Navigator } from 'react-native'
import { SplashContainer, FooterTabContainer } from '../../containers'

export default class ReactKappaNavigator extends Component{

  renderScene= (route, navigator) => {
    //pop() push()

    return <FooterTabContainer navigator={navigator} />

    //return <SplashContainer navigator={navigator} />
  }
  configureScene = (route) =>{

  }

  render(){
    return(
      <Navigator
       renderScene={this.renderScene}
       configureScene={this.configureScene} />
    )
  }
}
