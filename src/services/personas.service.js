import { pool } from '../config/database.js';

function mapPersona(row) {
  return {
    cedula: row.cedula,
    apellidos: row.apellidos,
    nombres: row.nombres,
    fechaNacimiento: row.fecha_nacimiento,
    direccion: row.direccion,
    ciudad: row.ciudad,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export async function findAllPersonas() {
  const [rows] = await pool.execute(
    'SELECT * FROM personas ORDER BY apellidos ASC'
  );

  return rows.map(mapPersona);
}

export async function findPersonaByCedula(cedula) {
  const [rows] = await pool.execute(
    'SELECT * FROM personas WHERE cedula = ? LIMIT 1',
    [cedula]
  );

  return rows.length ? mapPersona(rows[0]) : null;
}

export async function createPersona(data) {
  await pool.execute(
    `INSERT INTO personas(
      cedula,
      apellidos,
      nombres,
      fecha_nacimiento,
      direccion,
      ciudad
    )
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.cedula,
      data.apellidos,
      data.nombres,
      data.fechaNacimiento,
      data.direccion,
      data.ciudad
    ]
  );

  return findPersonaByCedula(data.cedula);
}

export async function updatePersona(cedula, data) {

  const current = await findPersonaByCedula(cedula);

  if (!current) {
    return null;
  }

  const next = {
    apellidos: data.apellidos ?? current.apellidos,
    nombres: data.nombres ?? current.nombres,
    fechaNacimiento: data.fechaNacimiento ?? current.fechaNacimiento,
    direccion: data.direccion ?? current.direccion,
    ciudad: data.ciudad ?? current.ciudad
  };

  await pool.execute(
    `UPDATE personas
     SET apellidos = ?,
         nombres = ?,
         fecha_nacimiento = ?,
         direccion = ?,
         ciudad = ?
     WHERE cedula = ?`,
    [
      next.apellidos,
      next.nombres,
      next.fechaNacimiento,
      next.direccion,
      next.ciudad,
      cedula
    ]
  );

  return findPersonaByCedula(cedula);
}

export async function deletePersona(cedula) {

  const [result] = await pool.execute(
    'DELETE FROM personas WHERE cedula = ?',
    [cedula]
  );

  return result.affectedRows > 0;
}