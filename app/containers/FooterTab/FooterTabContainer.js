
import {connect} from 'react-redux'

import {FooterTab} from '../../components'
import {setFooterTab} from '../../redux/modules/activeFooterTab'


function mapStateToProps ({activeFooterTab, game}, {navigator}){
  return{
    listenerMessages: game.listenerMessages,
    activeFooterTab,
    navigator,
  }
}

function mapDispatchToProps(dispatch){
  return{
    onTabSelect: (tab)=> dispatch(setFooterTab(tab))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FooterTab)
