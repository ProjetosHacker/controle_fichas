-- ESTANTE definition

-- Drop table

-- DROP TABLE sis_ficha.estante;

CREATE TABLE sis_ficha.estante (
	codlocal INTEGER NOT NULL UNIQUE,
	numestante INTEGER,
	numprateleira INTEGER,
	PRIMARY KEY (codlocal)
);

select * from sis_ficha.estante;
