const express = require('express');
const cors = require('cors');
const app = express();         
const bodyParser = require('body-parser');
const port = 3002; //porta padrão
const mysql = require('mysql');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configurando connexão com o banco de dados
function execSQLQuery(sqlQry, res, req){
    const connection = mysql.createConnection({
        host     : 'localhost',
        port     : 3306,
        user     : 'root',
        password : '',
        database : 'sis_ficha'
    });
  
    connection.query(sqlQry, function(error, results, fields){
        if (error) {
            res.status(400).json(error);
          console.log(error,"ERROR");
        } else {
            console.log(res,"RESOLVE");
          res.json(results);         
        connection.end();
        console.log('executou!');
    }});
  }

//definindo as rotas
const router = express.Router();


router.get('/', (req, res) => res.json({ message: 'Tela inicial sisficha!' }));
app.use('/', router);

/* rotas ficha */

 //inserir ficha
 router.post('/inserir/ficha', (req, res) =>{
    //const NUMFICHA = parseInt(req.params.id);
    console.log(JSON.stringify(req.body) + "log numficha");
    const MATRICULA = req.body.matricula;
    const NOMESERVIDOR = req.body.nomeServidor;
    const NOMEMAE = req.body.nomeMae;
    const DTNASC = req.body.dtNasc;
    const CPF = req.body.cpf;
    const CODLOCAL = req.body.codLocal;
    const RG = req.body.rg;
    const ORGAOEXP = req.body.orgaoExp;
     const UF = req.body.uf;
    execSQLQuery(`INSERT INTO ficha (MATRICULA,
                  NOMESERVIDOR,
                  NOMEMAE,
                   DTNASC,
                   CPF,
                   CODLOCAL,
                   RG,
                   ORGAOEXP,
                   UF)
                    VALUES
                   ('${MATRICULA}',
                    '${NOMESERVIDOR}',
                    '${NOMEMAE}',
                    '${DTNASC}',
                    '${CPF}',
                    '${CODLOCAL}',
                    '${RG}',
                    '${ORGAOEXP}',
                    '${UF}')`,
                   res);
})

 // alterar ficha 
router.patch('/alterar/fichas/:id', (req, res) =>{
    const NUMFICHA = parseInt(req.params.id);
    const MATRICULA = req.body.matricula.substring(0,12);
    const NOMESERVIDOR = req.body.nomeServidor.substring(0,60);
    const NOMEMAE = req.body.nomeMae.substring(0,60);
    const DTNASC = req.body.dtNasc.substring(0,10);
    const CPF = req.body.cpf.substring(0,11);
    const CODLOCAL = req.body.codLocal.substring(0,3);
    const RG = req.body.rg.substring(0,15);
    const ORGAOEXP = req.body.orgaoExp.substring(0,3);
     const UF = req.body.uf.substring(0,2);
    execSQLQuery(`UPDATE ficha SET MATRICULA='${MATRICULA}',
                  NOMESERVIDOR='${NOMESERVIDOR}',
                  NOMEMAE='${NOMEMAE}',
                   DTNASC='${DTNASC}',
                   CPF='${CPF}',
                   CODLOCAL='${CODLOCAL}',
                   RG='${RG}',
                   ORGAOEXP='${ORGAOEXP}',
                   UF='${UF}' 
                   WHERE NUMFICHA='${NUMFICHA}'`,                  
                   res);
})

//deletar ficha
router.delete('/delete/fichas/:id', (req, res) =>{
    execSQLQuery('DELETE FROM ficha WHERE NUMFICHA=' + parseInt(req.params.id), res);
}) 
//pesquisa ficha por termo passado .
router.get('/search/fichas/:field/:query', (req, res) =>{
    let filter = '';
    if(req.params.field) filter = ` WHERE ${req.params.field} REGEXP '${req.params.query}'`;
    execSQLQuery('SELECT * FROM ficha' + filter, res);
})

//pesquisa ficha por letra inicial ou se vazio retorna todas as fichas .
router.get('/fichas/:letter?', (req, res) =>{
    let filter = '';
    if(req.params.letter) filter = ` WHERE nomeservidor REGEXP '^[${req.params.letter}].*$'`;
    execSQLQuery('SELECT * FROM ficha' + filter, res);
})

//filtra por id da prateleira .
router.get('/fichas/prateleira/:id', (req, res) => {
    let filter = '';
    if(req.params.id) filter = ' WHERE PRATELEIRA=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM ficha' + filter, res);
})

//filtra por id da prateleira e id da estante .
router.get('/fichas/prateleira/:id/estante/:id2', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE PRATELEIRA=' + parseInt(req.params.id) + ' AND ESTANTE=' + parseInt(req.params.id2) ;
    execSQLQuery('SELECT * FROM ficha' + filter, res);
})

//Lista de Estantes e Prateleiras cadastradas no Bd .
router.get('/estantes/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE CODLOCAL=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM estante' + filter, res);
})

 //inserir estante
 router.post('/inserir/estante', (req, res) =>{
    //const NUMFICHA = parseInt(req.params.id);
    const CODLOCAL = req.body.CODLOCAL;
    const NUMESTANTE = req.body.NUMESTANTE;
    const NUMPRATELEIRA = req.body.NUMPRATELEIRA;
 
    execSQLQuery(`INSERT INTO estante (CODLOCAL,NUMESTANTE,NUMPRATELEIRA)
                    VALUES
                   ('${CODLOCAL}',
                    '${NUMESTANTE}',
                    '${NUMPRATELEIRA}')`,
                   res);
})

 // alterar estante 
router.patch('/alterar/estante/:codlocal', (req, res) =>{
    const CODLOCAL = parseInt(req.params.codlocal);
    const NUMESTANTE = req.body.NUMESTANTE;
    const NUMPRATELEIRA = req.body.NUMPRATELEIRA;
    execSQLQuery(`UPDATE estante SET NUMESTANTE='${NUMESTANTE}',
                         NUMPRATELEIRA='${NUMPRATELEIRA}'
                         WHERE CODLOCAL='${CODLOCAL}'`,                   
                   res);
})

//deletar estante
router.delete('/delete/estante/:id', (req, res) =>{
    execSQLQuery('DELETE FROM estante WHERE CODLOCAL=' + parseInt(req.params.id), res);
}) 


//inicia o servidor
app.listen(port);
console.log('API funcionando!');

