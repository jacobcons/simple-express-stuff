import express from 'express';
import people from '../data.js';
import {
  getPeople,
  createPerson,
  getPerson,
  updatePerson,
  deletePerson,
} from '../controllers/people.js';

const router = express.Router();

router.route('/').get(getPeople).post(createPerson);

const checkPersonExists = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const personWithId = people.find((person) => person.id === id);
  if (!personWithId) {
    return res
      .status(404)
      .json({ message: `Person with id ${id} doesn't exist` });
  }
  req.id = id;
  req.personWithId = personWithId;
  return next();
};

router
  .route('/:id(\\d+)')
  .all(checkPersonExists)
  .get(getPerson)
  .put(updatePerson)
  .delete(deletePerson);

export default router;
