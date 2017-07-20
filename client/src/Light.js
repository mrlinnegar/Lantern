import React, { Component } from 'react';
import reactCSS from 'reactcss';
import { GithubPicker } from 'react-color';
import './Light.css';
class Light extends Component {

  state = {
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
    const toggle = (this.state.status===0)?1:0;
    this.setState({ status : toggle }, this.updateLight);
  }

  updateLight(){
    fetch('/api/lights/'+this.props.id,
      {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                "status": this.state.status,
                "color": this.state.color
              })
    })
    .then(res => res.json())
    .then(data => this.setState( data ))
  }
  handleChangeComplete = (color) => {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker,
      color: color.hex.replace('#','')
    }, this.updateLight);
  };

  toggleColorPicker = (e) => {
    e.stopPropagation();
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };


  render() {

    const styles = reactCSS({
          'default': {
            color: {
              width: '50px',
              height: '50px',
              borderRadius: '5px',
              background: `#${ this.state.color}`,
              opacity: `${this.state.status}`
            },
            swatch: {
              padding: '5px',
              background: '#eeeeee',
              borderRadius: '5px',
              boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
              display: 'inline-block',
              cursor: 'pointer',
              borderColor: `#${ this.state.color}`,
              borderWidth: '1px',
              borderStyle: 'solid'
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



        <div style={ styles.swatch } onClick={ this._handleClick }>
          <div style={ styles.color } />

          <button onClick={this.toggleColorPicker}>Color</button>
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
