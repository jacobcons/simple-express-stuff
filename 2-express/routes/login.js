import express from 'express';
import people from '../data.js';

const router = express.Router();

router.post('/login', (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('no name provided');
  }

  const isPersonWithName = people.some((person) => person.name === name);
  if (!isPersonWithName) {
    res.status(401).send("provided name doesn't match any records");
  }

  const { id } = people.find((person) => person.name === name);
  res.send(`Welcome ${name}, your id is ${id}`);
});

export default router;
