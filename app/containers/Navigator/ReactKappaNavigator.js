import React, {PropTypes, Component} from 'react'
import { Navigator, Platform } from 'react-native'
import { SplashContainer, FooterTabContainer, SettingsContainer } from '../../containers'

export default class ReactKappaNavigator extends Component{

  static propTypes={
    isAuthed : PropTypes.bool.isRequired,

  }

  renderScene= (route, navigator) => {
    //pop() push()





    if(this.props.isAuthed === false){
      return <SplashContainer navigator={navigator} />
    }else if (route.settings === true) {
      return <SettingsContainer navigator={navigator} />
    }
    else{
      return <FooterTabContainer navigator={navigator} />
    }




  }

  configureScene = (route) =>{
    if(Platform.OS === 'android'){
      return Navigator.SceneConfigs.FloatFromBottomAndroid
    }

    if(route.settings === true){
      return Navigator.SceneConfigs.FloatFromBottom
    }

    return Navigator.SceneConfigs.FloatFromRight
  }

  render(){
    console.log("in Navigator");
    return(
      <Navigator
        initialRoute={{}}
        renderScene={this.renderScene}
        configureScene={this.configureScene} />
    )
  }
  
}
