import React from 'react'
import reactCSS from 'reactcss';
import { GithubPicker, BlockPicker } from 'react-color';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';


import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';

import Switch from 'material-ui/Switch';



const tinycolor = require('tinycolor2');


const styleSheet = createStyleSheet(theme => ({
  root: {
    width: '100%',
    background: theme.palette.background.paper
  },
  color: {
    position: 'relative',
    cursor: 'pointer'
  },
  colorSample: {
    width: 20,
    height: 20,
    display: 'inline-block',
    marginRight: 5,
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
        zIndex: '2'
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
            <div className={classes.color} onClick={props.openPalette}>

              <Typography type="headline" >
                <span className={classes.colorSample} style={styles.swatch}></span>
                #{props.color.toUpperCase()}
              </Typography>
              { props.palette ? <div style={ styles.popover }>
                <div style={ styles.cover } onClick={ props.closePalette }/>
                  <GithubPicker
                    width='100px'
                    colors={['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#FFFFFF', '#1273DE', '#0000FF', '#5300EB']}
                    color={ props.color }
                    triangle='hide'
                    onChangeComplete={ props.colorSelect }
                  />
              </div> : null }
            </div>

            <div className={ classes.root }>
              <List>
                <ListItem
                  button
                  aria-controls="animation-menu"
                  aria-haspopup="true"
                  aria-label="Animation"
                  onClick={props.handleClickListItem}
                >
                  <ListItemText
                    primary="Animation"
                    secondary={props.animation}
                  />
                </ListItem>
              </List>

              <Menu
                id="animation-menu"
                anchorEl={props.anchorEl}
                open={props.animationPanel}
                onRequestClose={props.handleRequestClose}
              >
                {props.animations.map((animation, index) =>
                   <MenuItem
                     key={animation}
                     selected={animation === props.animation}
                     onClick = { event => props.handleClickMenuItem(event, animation) }
                   >
                     {animation}
                   </MenuItem>,
                 )}
              </Menu>
            </div>
            <FormControlLabel
              label={ (props.status === 1) ? 'On' : 'Off'}
              control={
                <Switch
                  checked={props.status === 1}
                  onChange={props.toggleClick}
                />
              }
            />

          </CardContent>
        </Card>
      </div>
    )
}

export default withStyles(styleSheet)(Light);
