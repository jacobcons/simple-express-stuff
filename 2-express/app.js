import express from 'express';
import path from 'path';
import people from './data.js';

const app = express();

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/login', (req, res) => {
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

app.get('/api/people', (req, res) => {
  res.json(people);
});

app.post('/api/people', (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: 'Please provide a name!' });
  }
  const maxId = Math.max(...people.map((person) => person.id));
  const personToAdd = { id: maxId + 1, name };
  people.push(personToAdd);
  res.status(201).json(personToAdd);
});

app.put('/api/people/:id(\\d+)', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name } = req.body;

  const personToUpdate = people.find((person) => person.id === id);

  if (!personToUpdate) {
    res.status(404).json({ message: `Person with id ${id} doesn't exist` });
  }

  personToUpdate.name = name;
  res.json(personToUpdate);
});

app.listen(8080, () => {
  console.log('app listening on port');
});
