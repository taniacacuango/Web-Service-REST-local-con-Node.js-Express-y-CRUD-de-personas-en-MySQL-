import { Router } from 'express';

import {
  createPersona,
  deletePersona,
  findAllPersonas,
  findPersonaByCedula,
  updatePersona
} from '../services/personas.service.js';

import {
  createPersonaSchema,
  updatePersonaSchema
} from '../schemas/personas.schema.js';

const router = Router();

router.get('/', async (req, res) => {

  const personas = await findAllPersonas();

  res.json({
    data: personas
  });
});

router.get('/:cedula', async (req, res) => {

  const persona = await findPersonaByCedula(
    req.params.cedula
  );

  if (!persona) {
    return res.status(404).json({
      error: 'Persona no encontrada'
    });
  }

  res.json({
    data: persona
  });
});

router.post('/', async (req, res) => {

  const result = createPersonaSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'Datos inválidos'
    });
  }

  const existe = await findPersonaByCedula(
    result.data.cedula
  );

  if (existe) {
    return res.status(409).json({
      error: 'Ya existe una persona con esa cédula'
    });
  }

  const persona = await createPersona(result.data);

  res.status(201).json({
    data: persona
  });
});

router.patch('/:cedula', async (req, res) => {

  const result = updatePersonaSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'Datos inválidos'
    });
  }

  const persona = await updatePersona(
    req.params.cedula,
    result.data
  );

  if (!persona) {
    return res.status(404).json({
      error: 'Persona no encontrada'
    });
  }

  res.json({
    data: persona
  });
});

router.delete('/:cedula', async (req, res) => {

  const deleted = await deletePersona(
    req.params.cedula
  );

  if (!deleted) {
    return res.status(404).json({
      error: 'Persona no encontrada'
    });
  }

  res.status(204).send();
});

export default router;