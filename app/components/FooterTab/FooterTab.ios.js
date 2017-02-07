import React, {PropTypes} from 'react'
import { View, StyleSheet, Text, TabBarIOS, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {HomeContainer, LeaderboardContainer, ProfileContainer} from '../../containers'

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

      <Icon.TabBarItem
        iconSize={35}
        iconName='ios-warning-outline'
        title='Profile'
        selected={props.activeFooterTab === 'profile'}
        onPress={ ()=> props.onTabSelect('profile') }>
          <ProfileContainer navigator={props.navigator}/>
      </Icon.TabBarItem>

    </TabBarIOS>
  )
}
