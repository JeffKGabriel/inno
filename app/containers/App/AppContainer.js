import React, {PropTypes, Component} from 'react'
import { View, Text } from 'react-native'
import { ReactKappaNavigator } from '../../containers'

export default class AppContainer extends Component{

  render(){
    return(
      <View style={{flex:1}}>
        <ReactKappaNavigator />
      </View>
    )
  }
}
