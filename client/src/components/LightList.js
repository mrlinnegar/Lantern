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
    <Grid container spacing={24}>

    {props.lights.map((light) =>
      <Grid item xs={3}>
          <Light
            key={light.id}
            {...light}
            toggleClick={ ()=> props.toggleLightClick(light.id)}

            colorSelect={ (color)=> props.updateLightColor(light.id, color.hex.replace('#','') )}

            openPalette = { ()=> props.openPalette(light.id)}
            closePalette = { ()=> props.closePalette(light.id)}


            animations =  { props.animations }
            handleRequestClose  = { () => props.closeAnimations(light.id) }
            handleClickMenuItem = { (event, value) => props.updateLightAnimation(light.id, value)}
            handleClickListItem = { (event) => props.openAnimations(light.id, event.currentTarget) }
          />
      </Grid>
    )}
    </Grid>
    </div>
  );

}
export default withStyles(styleSheet)(LightList);
