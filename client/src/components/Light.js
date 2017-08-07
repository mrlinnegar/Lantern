import React from 'react'
import reactCSS from 'reactcss';
import { GithubPicker } from 'react-color';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';


const tinycolor = require('tinycolor2');


const styleSheet = createStyleSheet(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
    padding: '0 30px',
  }
}));


function Light(props){
  const classes = props.classes;

  const styles = reactCSS({
    'default': {
      swatch: {
        backgroundColor: `#${ props.color}`
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
      <div>
        <Card>
          <CardContent>
            <Typography type="headline" onClick={props.openPalette}>#{props.color.toUpperCase()}</Typography>
            <div style={ styles.swatch }>


              { props.palette ? <div style={ styles.popover }>
                <div style={ styles.cover } onClick={ props.closePalette }/>
                  <GithubPicker
                    width='100px'
                    colors={['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#FFFFFF', '#1273DE', '#0000FF', '#5300EB']}
                    color={ props.color }
                    onChangeComplete={ props.colorClick }
                  />
              </div> : null }
            </div>
            <FormControl>
              <FormLabel>Animation</FormLabel>
              <RadioGroup
                aria-label="animation"
                name="animation"
                className={classes.group}
                selectedValue={props.animation}
                onChange={props.animationClick}
              >
              {props.animations.map( (animation, index) =>
                <FormControlLabel key={index} value={animation} control={<Radio />} label={animation} />
              )}
              </RadioGroup>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={props.status === 1}
                  onChange={props.toggleClick}
                />
              }
              label={ (props.status === 1) ? 'On' : 'Off'}
            />

          </CardContent>
        </Card>
      </div>
    )
}

export default withStyles(styleSheet)(Light);
