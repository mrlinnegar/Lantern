import React, { Component } from 'react';
import reactCSS from 'reactcss';
import { GithubPicker } from 'react-color';
import './Light.css';
class Light extends Component {

  state = {
    color:'000000',
    status:'0',
    displayColorPicker: false
  };

  constructor(props){
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  componentDidMount() {
    fetch('/api/lights/'+this.props.id)
      .then(res => res.json())
      .then(data => this.setState( data ))
  }

  _handleClick(e) {
    console.log(this.props.id);

    const url = (this.state.status)? "off":"on";
    fetch('/api/lights/'+this.props.id+'/'+url,
      {method:'POST'}
    )
    .then(res => res.json())
    .then(data => this.setState( data ))
  }

  handleChangeComplete = (color) => {
    this.setState({  color: color.hex.replace('#','') });
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };


  render() {

    const style = {
      color: '#ffffff',
      backgroundColor: "#" + this.state.color
    };

    const styles = reactCSS({
          'default': {
            color: {
              width: '36px',
              height: '14px',
              borderRadius: '2px',
              background: `#${ this.state.color}`,
            },
            swatch: {
              padding: '5px',
              background: '#fff',
              borderRadius: '1px',
              boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
              display: 'inline-block',
              cursor: 'pointer',
            },
            popover: {
              position: 'absolute',
              zIndex: '2',
            },
            cover: {
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            },
          },
        });

    return (
      <div className="Light">

        <button onClick={this._handleClick}>{this.state.status}</button>

        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <GithubPicker
            color={ this.state.color }
            onChangeComplete={ this.handleChangeComplete }
          />
        </div> : null }


      </div>
    );
  }
}

export default Light;
