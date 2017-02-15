import React, {PropTypes} from 'react'
import {ListView, ScrollView, View, Text, Keyboard, StyleSheet, TextInput} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import KeyboardSpacer from 'react-native-keyboard-spacer';




export default function MessageList (props){

  return(

    <View style={{flexGrow:1}}>


          <View style={{flex:1}}>


              <ListView
                onLayout = {(ev) => {
                  this.layoutHeight = ev.nativeEvent.layout.height
                  //console.log("onLayout");
                  //let contentHeight = this.listView.getMetrics().contentLength
                  //this.listView.scrollTo({x:0,y: (contentHeight - this.layoutHeight), animated: true})
                }}
                renderRow={props.messageRenderRow}
                dataSource={props.messageDataSource}
                ref={(ref) => this.listView = ref}
                onContentSizeChange={(width, height) => {
                  //console.log(height);
                  //console.log(this.layoutHeight);
                  if(height>this.layoutHeight){
                    this.listView.scrollTo({x:0,y: (height - this.layoutHeight), animated: false})
                  }
                }}
                onChangeVisibleRows={ ()=> {
                  //this.listView.scrollResponderKeyboardDidShow()
                }}
                />





            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              ref={(ref) => this.textInput = ref}
              blurOnSubmit={false}
              placeholder={""}
              onSubmitEditing={(event)=> {
                props.onTextSubmit(event.nativeEvent.text)
                this.textInput.clear(0)
              }}
            />
            <KeyboardSpacer />


          </View>


    </View>

  )
}


const styles = StyleSheet.create({
  lobbyMessages:{
    alignSelf:'stretch',
    backgroundColor:"#DDD"
  }
})
