import { z } from 'zod';

const cedulaSchema = z
  .string()
  .regex(/^\d{10}$/, 'La cédula debe tener exactamente 10 dígitos');

const textoSchema = z
  .string()
  .trim()
  .min(2, 'Debe tener al menos 2 caracteres');

export const createPersonaSchema = z.object({
  cedula: cedulaSchema,
  apellidos: textoSchema.max(80),
  nombres: textoSchema.max(80),
  fechaNacimiento: z.string(),
  direccion: z.string().trim().min(5).max(150),
  ciudad: textoSchema.max(80)
});

export const updatePersonaSchema = z.object({
  apellidos: textoSchema.max(80).optional(),
  nombres: textoSchema.max(80).optional(),
  fechaNacimiento: z.string().optional(),
  direccion: z.string().trim().min(5).max(150).optional(),
  ciudad: textoSchema.max(80).optional()
}).refine(
  (data) => Object.keys(data).length > 0,
  {
    message: 'Debe enviar al menos un campo para actualizar'
  }
);