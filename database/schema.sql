CREATE DATABASE IF NOT EXISTS lab_personas_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE lab_personas_db;

CREATE TABLE IF NOT EXISTS personas (
    cedula VARCHAR(10) NOT NULL,
    apellidos VARCHAR(80) NOT NULL,
    nombres VARCHAR(80) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    direccion VARCHAR(150) NOT NULL,
    ciudad VARCHAR(80) NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (cedula)
);

INSERT INTO personas(
    cedula,
    apellidos,
    nombres,
    fecha_nacimiento,
    direccion,
    ciudad
)
VALUES
(
    '0912345678',
    'Diaz Ayala',
    'Joffre Omar',
    '1985-04-12',
    'Av. Principal 123',
    'Guayaquil'
),
(
    '0923456789',
    'Perez Mora',
    'Ana Lucia',
    '1998-09-25',
    'Cdla. Los Ceibos',
    'Guayaquil'
);