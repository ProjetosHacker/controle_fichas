 DROP TABLE sis_ficha.ficha;
 -- 1 
CREATE TABLE sis_ficha.ficha (
	numficha INTEGER NOT NULL AUTO_INCREMENT,
	matricula BIGINT(12),
	nomeservidor VARCHAR(60),
	nomemae VARCHAR(60),
	dtnasc VARCHAR(11),
	cpf VARCHAR(14),
	rg BIGINT(20),
	orgaoexp CHAR(3),
	uf CHAR(2),
    codlocal INTEGER,
	PRIMARY KEY (numficha)
);

--  2 - Adicionando relacionamento com a tabela estantes 
ALTER TABLE sis_ficha.ficha 
ADD FOREIGN KEY (codlocal)
REFERENCES estante(codlocal);

-- 3- IMPORTE O ARQUIVO CSV COM OS DADOS .
-- 3.1 RENOMEANDO A TABELA 
RENAME TABLE sis_ficha.FICHA_202007141819 TO sis_ficha.ficha;
-- 4-  Ajusta a data de nascimento para 0000 onde data for vazio. 
UPDATE sis_ficha.ficha SET dtnasc= "0000-00-00" WHERE dtnasc="1000-01-01";
-- 4.1-  Ajusta a cpf para 000.000.000-00 onde cpf for vazio. 
UPDATE sis_ficha.ficha SET cpf= "0000.000.000-00" WHERE cpf="" ;
-- 4.2-  Ajusta a rg para 000.000.000-00 onde rg for vazio. 
UPDATE sis_ficha.ficha SET rg= "0" WHERE rg="" ;
-- 4.3-  Ajusta a matricula para 000.000.000-00 onde matricula for vazio. 
UPDATE sis_ficha.ficha SET matricula= "0" WHERE matricula="" ;
-- 4.4 Apagar column MyUnknownColumn caso exista;
ALTER TABLE sis_ficha.ficha DROP MyUnknownColumn;
-- 5 - ALTERANDO O TIPO DE DADO DA DA COLUNA NASCIMENTO APOS OS DADOS SEREM IMPORTADOS
ALTER TABLE sis_ficha.ficha MODIFY DTNASC DATE;

-- 6 - Ajustar o CPF PARA TIRAR OS PONTOS
SET SQL_SAFE_UPDATES=0;
UPDATE sis_ficha.ficha SET CPF = REPLACE( REPLACE( CPF, '.', '' ), '-', '' );

-- 7 - AJUSTA O CODLOCAL PARA ZERO ONDE FOR VAZIO.
UPDATE sis_ficha.ficha SET codlocal= "0" WHERE codlocal="" ;
