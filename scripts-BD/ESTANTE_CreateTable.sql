-- ESTANTE definition

-- Drop table

-- DROP TABLE ESTANTE;

CREATE TABLE ESTANTE (
	CODLOCAL INTEGER NOT NULL unique,
	NUMESTANTE INTEGER,
	NUMPRATELEIRA INTEGER,
	PRIMARY KEY (CODLOCAL)
);

select * from estante
