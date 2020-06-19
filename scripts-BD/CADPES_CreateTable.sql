-- CADPES definition

-- Drop table

-- DROP TABLE CADPES;
-- FIREBIRD
-- --------------------------------------------------------------------------------------------------------------
-- ==============================================================================================================
CREATE TABLE CADPES (
	CODPES INTEGER NOT NULL AUTO_INCREMENT,
	MATRICULA NUMERIC(12,2),
	CPF VARCHAR(14),
	NOME VARCHAR(60),
	MAE VARCHAR(60),
	DTNASC VARCHAR(10),
	PRIMARY KEY (CODPES)
);

-- MYSQL
-- --------------------------------------------------------------------------------------------------------------
-- ==============================================================================================================
CREATE TABLE CADPES (
	CODPES INTEGER NOT NULL,
	MATRICULA NUMERIC(12,2),
	CPF VARCHAR(14),
	NOME VARCHAR(60),
	MAE VARCHAR(60),
	DTNASC VARCHAR(10),
	CONSTRAINT "PK_CADPES" PRIMARY KEY (CODPES)
);
