import { connect } from 'react-redux'

import { toggleLight,
         updateLightColor,
         updateLightAnimation,
         removeLight,
         lightPaletteHide,
         lightPaletteShow,
         animationPanelShow,
         animationPanelHide } from '../actions'

import LightList from '../components/LightList'


const mapStateToProps = (state) => {
  return {
    lights: state.lights,
    animations: state.animations
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
    },
    closePalette: ( id ) => {
      dispatch(lightPaletteHide( id ))
    },
    openPalette: ( id ) => {
      dispatch(lightPaletteShow( id ))
    },
    updateLightAnimation: ( id, animation ) => {
      dispatch(updateLightAnimation( id, animation ));
      dispatch(animationPanelHide( id ));
    },
    openAnimations: ( id, anchorEl ) => {
      dispatch(animationPanelShow( id, anchorEl ));
    },
    closeAnimations: ( id ) => {
      dispatch(animationPanelHide( id ));
    },
  }
}

const AvailableLights  = connect(
  mapStateToProps,
  mapDispatchToProps
)(LightList)


export default AvailableLights;
