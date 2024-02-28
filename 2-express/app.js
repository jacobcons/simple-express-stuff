import express from 'express';
import people from './routes/people.js';
import login from './routes/login.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/login', login);
app.use('/api/people', people);

app.listen(port, () => {
  console.log('app listening on port');
});
