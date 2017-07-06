
import express from 'express';
import light from './routes/light';

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/lights', light);

app.listen(3001, () => {
  console.log('lantern listening on port 3001');
});
