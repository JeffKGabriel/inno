import React, {PropTypes} from 'react'
import { View, StyleSheet, Text, TabBarIOS } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {HomeContainer, LeaderboardContainer} from '../../containers'

FooterTab.propTypes = {
  activeFooterTab: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
  onTabSelect: PropTypes.func.isRequired,

}

export default function FooterTab (props){

  console.log('Here!', props)

  return(
    <TabBarIOS>

      <Icon.TabBarItem
        iconSize={35}
        iconName='ios-home-outline'
        title='Home'
        selected={props.activeFooterTab === 'home'}
        onPress={ ()=> props.onTabSelect('home') }>
          <HomeContainer navigator={props.navigator}/>
      </Icon.TabBarItem>

      <Icon.TabBarItem
        iconSize={35}
        iconName='ios-trophy-outline'
        title='Leaderboard'
        selected={props.activeFooterTab === 'leaderboard'}
        onPress={ ()=> props.onTabSelect('leaderboard') }>
          <LeaderboardContainer navigator={props.navigator}/>
      </Icon.TabBarItem>

    </TabBarIOS>

  )
}
