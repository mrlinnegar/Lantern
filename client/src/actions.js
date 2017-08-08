export const SERVER_TOGGLE_LIGHT = 'SERVER_TOGGLE_LIGHT'
export const SERVER_UPDATE_LIGHT = 'SERVER_UPDATE_LIGHT'
export const SERVER_ADD_LIGHT = 'SERVER_ADD_LIGHT'
export const SERVER_REMOVE_LIGHT = 'SERVER_REMOVE_LIGHT'
export const SERVER_LIGHT_COLOR = 'SERVER_LIGHT_COLOR'
export const SERVER_LIGHT_ANIMATION = 'SERVER_LIGHT_ANIMATION'
export const SERVER_ALL_LIGHTS = 'SERVER_ALL_LIGHTS'


export const LOAD_ANIMATIONS = 'LOAD_ANIMATIONS'

export const CONNECT = 'CONNECT'
export const DISCONNECT = 'DISCONNECT'

export const LIGHT_PALETTE_SHOW = 'LIGHT_PALETTE_SHOW'
export const LIGHT_PALETTE_HIDE = 'LIGHT_PALETTE_HIDE'


export const ANIMATION_SHOW = 'ANIMATION_SHOW'
export const ANIMATION_HIDE = 'ANIMATION_HIDE'

export function connect(url){
  return { type: CONNECT, url}
}

export function disconnect(){
  return { type: DISCONNECT }
}

export function toggleLight(id) {
  return { type: SERVER_TOGGLE_LIGHT, id }
}

export function updateLightColor(id, color){
  return { type: SERVER_LIGHT_COLOR, id, color }
}

export function updateLightAnimation(id, animation) {
  return { type: SERVER_LIGHT_ANIMATION, id, animation}
}

export function serverUpdateLight(light) {
  return { type: SERVER_UPDATE_LIGHT, light}
}

export function lightPaletteShow(id){
  return { type: LIGHT_PALETTE_SHOW, id}
}

export function lightPaletteHide(id){
  return { type: LIGHT_PALETTE_HIDE, id}
}

export function animationPanelHide(id) {
  return { type: ANIMATION_HIDE, id}
}

export function animationPanelShow(id, anchorEl) {
  return { type: ANIMATION_SHOW, id, anchorEl }
}

export function addLight(light) {
  return { type: SERVER_ADD_LIGHT, light }
}

export function removeLight(id) {
  return { type: SERVER_REMOVE_LIGHT, id}
}

export function loadAnimations(animations) {
  return { type: LOAD_ANIMATIONS, animations }
}
