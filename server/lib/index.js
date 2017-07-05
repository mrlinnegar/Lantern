
import express from 'express';
import light from './routes/light';

const app = express();

app.use('/light', light);

app.listen(3000, () => {
  console.log('lantern listening on port 3001');
});
