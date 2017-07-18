import React from 'react'
import reactCSS from 'reactcss';
import './Light.css'
import { GithubPicker } from 'react-color';

const tinycolor = require('tinycolor2');

class Light extends React.Component {

  render() {

    let classNames = 'Switch';
    if(this.props.status)
      classNames = classNames + " on";


    const styles = reactCSS({
          'default': {
            swatch: {
              backgroundColor: `#${ this.props.color}`,
            },
            selector: {
              color: tinycolor(this.props.color).isDark()? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'
            },
            popover: {
              position: 'absolute',
              zIndex: '2',
              top: '55px',
              left: '70px',
            },
            cover: {
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
              backgroundColor: 'rgba(0,0,0,0.1)'
            },
          },

        });

    return (
      <div className="Light"  style={ styles.swatch }>
        <div className="LightControls">
        <div>
          <div className={classNames} onClick={this.props.toggleClick}>
            <div className="slider" />
          </div>
        </div>
        <div>
          <div className="ColorSelect" style={ styles.selector} onClick={this.props.openPalette}  >
            <span>#{ this.props.color.toUpperCase()}</span>
          </div>
        </div>
        </div>
        { this.props.palette ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.props.closePalette }/>
            <GithubPicker
              width='100px'
              colors={['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#FEFEFF', '#1273DE', '#0000FF', '#5300EB']}
              color={ this.props.color }
              onChangeComplete={ this.props.colorClick }
            />
        </div> : null }
      </div>
    )
  }
}

export default Light
