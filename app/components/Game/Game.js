import React, { PropTypes } from 'react'
import { View, StyleSheet, Text, Image, StatusBar,ListView,TextInput, Keyboard } from 'react-native'
import { PressableIcon } from '../../components'
import {MessageListContainer, TownContainer} from '../../containers'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view'


export default function Game (props) {
  return (
    <ScrollableTabView
      renderTabBar={() => <DefaultTabBar> </DefaultTabBar> }
      prerenderingSiblingsNumber={2} >


      <TownContainer tabLabel="Town" />

      <MessageListContainer tabLabel='Messages' />

    </ScrollableTabView>

  )
}
