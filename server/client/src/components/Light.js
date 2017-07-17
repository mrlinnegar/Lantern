import React from 'react'
import reactCSS from 'reactcss';
import './Light.css'

class Light extends React.Component {

  render() {
    const styles = reactCSS({
          'default': {
            color: {
              width: '50px',
              height: '50px',
              borderRadius: '5px',
              background: `#${ this.props.color}`,
              opacity: `${this.props.status}`
            },
            swatch: {
              padding: '5px',
              background: '#eeeeee',
              borderRadius: '5px',
              boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
              display: 'inline-block',
              cursor: 'pointer',
              borderColor: `#${ this.props.color}`,
              borderWidth: '2px',
              borderStyle: 'solid',
              boxShadow: `0 0 20px #${ this.props.color}`
            }
          },
        });

    return (
      <div className="Light" >
        <div style={ styles.swatch } onClick={this.props.toggleClick}>
          <div style={ styles.color } />
        </div>
      </div>
    )
  }
}

export default Light
