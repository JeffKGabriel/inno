import React, {PropTypes} from 'react'
import { View, StyleSheet, Text, ActivityIndicator, ListView } from 'react-native'
import { ReactKappaNavBar } from '../../components'
import { Leader } from '../../components'


Leaderboard.propTypes = {
  listenerSet : PropTypes.bool.isRequired,
  dataSource: PropTypes.object.isRequired,
  renderRow: PropTypes.func.isRequired,
}


export default function Leaderboard (props){

  return(
    <View style={styles.container}>
        <ReactKappaNavBar
          title='Leaderboard'/>

        { props.listenerSet === false
          ? <ActivityIndicator size='small' style={styles.activityIndicator} color="#F00" />
          : <ListView renderRow={props.renderRow} dataSource={props.dataSource} />
        }

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    marginBottom: 50,
  },
  activityIndicator: {
    marginTop: 30,
  },
})
