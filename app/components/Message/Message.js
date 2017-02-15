import React, {PropTypes} from 'react'
import {ListView, View, Text, Keyboard, StyleSheet} from 'react-native'



Message.propTypes = {
}

Message.defaultProps = {
  size: 30,
}

export default function Message (props){


  return(
    <View style={styles.container}>
      <View style={styles.nameView}>
        <Text style={styles.nameText}>{props.name} : </Text>
      </View>

      <View style={styles.message}>
        <Text style={styles.messageText}>{props.text}</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor:"#F00",
    borderColor: '#527FE4',
    borderWidth: 1,
  },
  nameView:{
    backgroundColor: "#8fa",
    width: 100,
    height:30,
    flexDirection:'row',
    alignSelf:'flex-start',
    alignItems:"center",
    justifyContent:'flex-end',
  },
  nameText:{
    fontSize: 16,

  },
  message:{
    backgroundColor: "#0F0",
  },
  messageText:{
    fontSize: 16,
    lineHeight: 20,
  },
})
