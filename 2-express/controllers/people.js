import people from '../data.js';

const getPeople = (req, res) => {
  res.json(people);
};

const createPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ message: 'Please provide a name!' });
  }
  const maxId =
    people.length === 0 ? 0 : Math.max(...people.map((person) => person.id));
  const personToAdd = { id: maxId + 1, name };
  people.push(personToAdd);
  res.status(201).json(personToAdd);
};

const getPerson = (req, res) => {
  res.json(req.personWithId);
};

const updatePerson = (req, res) => {
  const { name } = req.body;
  req.personWithId.name = name;
  res.json(req.personWithId);
};

const deletePerson = (req, res) => {
  people = people.filter((person) => person.id !== req.id);
  res.status(204).end();
};

export { getPeople, createPerson, getPerson, updatePerson, deletePerson };
