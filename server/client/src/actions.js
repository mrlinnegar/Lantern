export const SERVER_TOGGLE_LIGHT = 'SERVER_TOGGLE_LIGHT'
export const SERVER_UPDATE_LIGHT = 'SERVER_UPDATE_LIGHT'
export const SERVER_ADD_LIGHT = 'SERVER_ADD_LIGHT'
export const SERVER_REMOVE_LIGHT = 'SERVER_REMOVE_LIGHT'
export const GET_LIGHT_DATA_RECIEVED = 'GET_LIGHT_DATA_RECIEVED'
export const SERVER_LIGHT_COLOR = 'SERVER_LIGHT_COLOR'

export function toggleLight(id) {
  return { type: SERVER_TOGGLE_LIGHT, id }
}

export function updateLightColor(id, color){
  return { type: SERVER_LIGHT_COLOR, id, color }
}

export function serverUpdateLight(light) {
  return { type: SERVER_UPDATE_LIGHT, light}
}

export function addLight(light) {
  return { type: SERVER_ADD_LIGHT, light }
}

export function removeLight(id) {
  return { type: SERVER_REMOVE_LIGHT, id}
}
