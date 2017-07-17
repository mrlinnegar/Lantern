import { SERVER_TOGGLE_LIGHT,
         SERVER_LIGHT_COLOR,
         SERVER_REMOVE_LIGHT,
         SERVER_UPDATE_LIGHT,
         SERVER_ADD_LIGHT,
         GET_LIGHT_DATA_RECIEVED} from './actions'

import { combineReducers } from 'redux'

function lights( state = [], action ){
  console.log(action);
  switch(action.type){
    case SERVER_TOGGLE_LIGHT:
      return state.map((light) => {
        if(light.id === action.id) {
          return Object.assign({}, light, {
            status: (light.status ? 0 : 1)
          })
        }
        return light;
      })

    case SERVER_LIGHT_COLOR:
      return state.map((light) => {
        if(light.id === action.id) {
          return Object.assign({}, light, {
            color: action.color
          })
        }
        return light
      })

    case SERVER_UPDATE_LIGHT:
      return state.map((light) => {
        if(light.id === action.light.id) {
          return Object.assign({}, light, action.light)
        }
        return light;
      })

    case SERVER_ADD_LIGHT:
      return [
        ...state,
        action.light
      ]

    case SERVER_REMOVE_LIGHT:
      return state.filter(light => light.id !== action.id);

    case GET_LIGHT_DATA_RECIEVED:
      return action.data

    default:
      return state
  }
}


const lightsApp = combineReducers({
    lights
})

export default lightsApp;
