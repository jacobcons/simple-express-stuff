import express from 'express';
import tasks from './tasks/tasks.routes.js';

const app = express();

app.use(express.static('./public'));
app.use(express.json());
app.use('/api/v1/tasks', tasks);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

export { app };
