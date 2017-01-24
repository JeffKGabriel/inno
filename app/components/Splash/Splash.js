import React, {PropTypes} from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
import {LoginButton} from 'react-native-fbsdk'

const {height} = Dimensions.get('window')

Splash.PropTypes = {
  onLoginFinished : PropTypes.func.isRequired,
}

export default function Splash (props){
    return(
      <View style={styles.container}>
        <View>
          <Image style={styles.image} source={require('../../images/truuu.png')}  />
          <Text style={styles.slogan} > React Kapppa </Text>
        </View>
        <View style={styles.loginContainer} >
          <LoginButton
            style={{
              height:30,
              width: 180,
              marginBottom: 16,

            }}
            onLoginFinished={props.onLoginFinished } />
          <Text style={styles.assuranceText}>
            No worries. We dont post anything to Facebook. :)
          </Text>
        </View>
      </View>
    )
}


const styles = StyleSheet.create({
  image:{
    resizeMode: 'contain',
    height: height * .4 >300 ? 300 : height * .4 ,
    width:300,
  },
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:50,
    paddingBottom:40,
  },
  slogan: {
    color: "#00F",
    fontSize:40,
    margin:20,
    textAlign: 'center',
  },
  loginContainer:{
    paddingLeft:30,
    paddingRight:30,
    alignItems: 'center'
  },
  assuranceText:{
    color: "#777",
    fontSize: 16,
    textAlign: 'center',
  }
})
