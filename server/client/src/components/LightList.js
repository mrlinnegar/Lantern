import React from 'react'
import Light from './Light'
import './LightList.css'


class LightList extends React.Component {


  render() {
    return (
      <div className="App">
        <div className="App-intro">

        {this.props.lights.map((light) =>
          <Light
            key={light.id}
            {...light}
            toggleClick={ ()=> this.props.toggleLightClick(light.id)}
            colorClick={ (color)=> this.props.updateLightColor(light.id, color.hex.replace('#','') )}
            removeClick={ ()=> this.props.removeLightClick(light.id)}
            closePalette = { ()=> this.props.closePalette(light.id)}
            openPalette = { ()=> this.props.openPalette(light.id)}
          />
        )}

        </div>
      </div>
    );
  }
}


export default LightList
