
import express from 'express';
import api from './light-routes';

const app = express();

app.use('/light', api);

app.listen(3000, () => {
  console.log('lantern listening on port 3000');
});
