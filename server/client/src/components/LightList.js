import React from 'react'
import Light from './Light'



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
            colorClick={ ()=> this.props.updateLightColor(light.id, '0000FF')}
            removeClick={ ()=> this.props.removeLightClick(light.id)}
          />
        )}

        </div>
      </div>
    );
  }
}


export default LightList
