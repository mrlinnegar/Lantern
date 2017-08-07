import React from 'react'
import Light from './Light'
import Grid from 'material-ui/Grid';
import { withStyles, createStyleSheet } from 'material-ui/styles';

const styleSheet = createStyleSheet(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
    padding: '0 30px',
  }
}));

function LightList(props) {

  const classes = props.classes;

  return (
    <div className={classes.root}>
    <Grid container>
      <Grid item xs={4}>
        {props.lights.map((light) =>
          <Light
            key={light.id}
            {...light}
            toggleClick={ ()=> props.toggleLightClick(light.id)}
            colorClick={ (color)=> props.updateLightColor(light.id, color.hex.replace('#','') )}
            removeClick={ ()=> props.removeLightClick(light.id)}
            closePalette = { ()=> props.closePalette(light.id)}
            openPalette = { ()=> props.openPalette(light.id)}
            animationClick = { (event, value) => props.updateLightAnimation(light.id, value)}
            animations = { props.animations }
          />
        )}
      </Grid>
    </Grid>
    </div>
  );

}
export default withStyles(styleSheet)(LightList);
