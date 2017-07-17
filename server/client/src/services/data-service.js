import request from 'superagent'
import { POST_LIGHT
      } from '../actions'

const dataService = store => next => action => {
  next (action)
  switch (action.type){
    case POST_LIGHT:
      request
        .post('/api/lights/'+ action.id)
        .set('Content-Type', 'application/json')
        .send(action.light)
        .end(function(err, res){
        });

      break;
    default:
      break
  }
}


export default dataService
