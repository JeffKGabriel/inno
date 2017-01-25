import React, {PropTypes} from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import {ReactKappaNavBar, Close} from '../../components'
import Slider from 'react-native-slider'


Settings.propTypes = {
  onBack: PropTypes.func.isRequired,
  timerDuration: PropTypes.number.isRequired,
  restDuration: PropTypes.number.isRequired,
  onTimerChange: PropTypes.func.isRequired,
  onRestChange: PropTypes.func.isRequired,
  onTimerComplete: PropTypes.func.isRequired,
  onRestComplete: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
}

export default function Settings (props){

  console.log(props);

  return(
    <View style={styles.container}>
      <ReactKappaNavBar
        title="Settings"
        leftButton={<Close onPress={props.onBack} />}
      />

      <View style={styles.sliderContainer}>
        <Text style={styles.titleText}>Timer Duration</Text>
        <Text style={styles.valueText}>{props.timerDuration}</Text>
        <Text style={styles.minutes}>{props.timerDuration === 1 ? 'Minute' : 'Minutes'}</Text>
        <Slider
          minimumValue={1}
          maximumValue={60}
          onSlidingComplete={props.onTimerComplete}
          thumbTintColor={'#0f0'}
          step={1}
          minimumTrackTintColor={"#00F"}
          value={props.timerDuration}
          onValueChange={props.onTimerChange}
        />
      </View>

      <View style={styles.sliderContainer}>
       <Text style={styles.titleText}>Rest Duration</Text>
       <Text style={styles.valueText}>{props.restDuration}</Text>
       <Text style={styles.minutes}>{props.restDuration === 1 ? 'Minute' : 'Minutes'}</Text>
       <Slider
         minimumValue={1}
         maximumValue={60}
         onSlidingComplete={props.onRestComplete}
         thumbTintColor={'#0f0'}
         step={1}
         minimumTrackTintColor={"#00F"}
         value={props.restDuration}
         onValueChange={props.onRestChange}
        />
      </View>

      <TouchableOpacity onPress={props.onLogout} style={styles.logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>



    </View>
  )
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sliderContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    color: "#333",
    textAlign: 'center',
  },
  valueText: {
    fontSize: 50,
    color: "#00F",
    textAlign: 'center',
    padding: 15,
  },
  minutes: {
    color: "#F00",
    textAlign: 'center',
  },
  logout: {
    backgroundColor: "#00F",
    alignItems: 'stretch',
    borderRadius: 25,
    margin: 25,
    padding: 10,
  },
  logoutText: {
    color: "#FFF",
    fontSize: 18,
    textAlign: 'center',
  },
})
