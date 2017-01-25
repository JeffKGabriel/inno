import React, {PropTypes, Component} from 'react'
import {Home} from '../../components'

export default class HomeContainer extends Component{

  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }


  handleToSettings= () => {
    this.props.navigator.push({
      settings:true
    })
  }

  render(){
    return(
      <Home
        handleToSettings = {this.handleToSettings} />
    )
  }
}
