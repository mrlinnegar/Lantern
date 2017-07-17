import { connect } from 'react-redux'
import { toggleLight, updateLightColor, removeLight } from '../actions'
import LightList from '../components/LightList'


const mapStateToProps = (state) => {
  return {
    lights: state.lights
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLightClick: ( id ) => {
      dispatch(toggleLight(id))
    },
    updateLightColor: (id, color) => {
      dispatch(updateLightColor(id, color))
    },
    removeLightClick: ( id ) => {
      dispatch(removeLight( id ))
    }
  }
}

const AvailableLights  = connect(
  mapStateToProps,
  mapDispatchToProps
)(LightList)


export default AvailableLights;
