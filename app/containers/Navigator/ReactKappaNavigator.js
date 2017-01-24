import React, {PropTypes, Component} from 'react'
import { Navigator } from 'react-native'
import { SplashContainer, FooterTabContainer } from '../../containers'

export default class ReactKappaNavigator extends Component{

  static propTypes={
    isAuthed : PropTypes.bool.isRequired,
    
  }

  renderScene= (route, navigator) => {
    //pop() push()

    if(this.props.isAuthed === false){
      return <SplashContainer navigator={navigator} />
    }else{
      return <FooterTabContainer navigator={navigator} />
    }



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
