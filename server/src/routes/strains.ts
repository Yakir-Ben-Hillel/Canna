import { Router } from 'express';
import {
  add,
  get,
  list,
  remove,
  update,
} from '../models/strainStore';
import { classifyStrain } from '../services/chatgpt';

const router = Router();

router.get('/', (_req, res) => {
  res.json(list());
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const strain = get(id);
  if (!strain) {
    res.status(404).send('Not found');
  } else {
    res.json(strain);
  }
});

router.post('/', async (req, res) => {
  const { name, description } = req.body;
  const classification = await classifyStrain(description || '');
  const strain = add({ name, description, classification });
  res.status(201).json(strain);
});

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { name, description } = req.body;
  const classification = await classifyStrain(description || '');
  const strain = update(id, { name, description, classification });
  if (!strain) {
    res.status(404).send('Not found');
  } else {
    res.json(strain);
  }
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (remove(id)) {
    res.status(204).send();
  } else {
    res.status(404).send('Not found');
  }
});

export default router;
