import React, {PropTypes} from 'react'
import { View, StyleSheet, Text } from 'react-native'
import {ReactKappaNavBar, Gear} from '../../components'


Home.propTypes = {
  handleToSettings : PropTypes.func.isRequired,
}

export default function Home (props){

  console.log('Home', props)

  return(
    <View>
      <ReactKappaNavBar
        title='Home'
        rightButton={<Gear onPress={ props.handleToSettings} />}/>
      <Text>
        Home
      </Text>
    </View>
  )
}
