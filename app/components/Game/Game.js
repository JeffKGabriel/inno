import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Image, StatusBar,ListView,TextInput, Keyboard } from 'react-native'
import { PressableIcon } from '../../components'
import {MessageListContainer} from '../../containers'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view'


export default function Game (props) {
  return (
    <ScrollableTabView
      renderTabBar={() => <DefaultTabBar> </DefaultTabBar> }
      prerenderingSiblingsNumber={3} >

      <View
        tabLabel='Tab #1'
        style={{height:200, width:200, backgroundColor:'#F00'}}>
          <Text>My</Text>
      </View>

      <Text tabLabel='Tab #2'>favorite</Text>

      <MessageListContainer tabLabel='Messages' />

    </ScrollableTabView>

  )
}
