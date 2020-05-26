const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configurando connexão com o banco de dados
function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
        host     : 'localhost',
        port     : 3306,
        user     : 'root',
        password : '',
        database : 'sis_ficha'
    });
  
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
        console.log('executou!');
    });
  }

//definindo as rotas
const router = express.Router();


router.get('/', (req, res) => res.json({ message: 'Tela inicial sisficha!' }));
app.use('/', router);

/* rotas ficha */

 //inserir
/* router.post('/fichas', (req, res) =>{
    const nome = req.body.nome.substring(0,150);
    const cpf = req.body.cpf.substring(0,11);
    execSQLQuery(`INSERT INTO ficha(Nome, CPF) VALUES('${nome}','${cpf}')`, res);
});  */

/* //alterar
router.patch('/fichas/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const nome = req.body.nome.substring(0,150);
    const cpf = req.body.cpf.substring(0,11);
    execSQLQuery(`UPDATE ficha SET Nome='${nome}', CPF='${cpf}' WHERE NUMFICHA=${id}`, res);
}) */

/* //delete
router.delete('/fichas/:id', (req, res) =>{
    execSQLQuery('DELETE FROM ficha WHERE NUMFICHA=' + parseInt(req.params.id), res);
}) */


//pesquisa ficha por id ou se vazio retorna todas as fichas .
router.get('/fichas/:id?', (req, res) =>{
    let filter = '';
    if(req.params.id) filter = ' WHERE NUMFICHA=' + parseInt(req.params.id);
    execSQLQuery('SELECT * FROM ficha' + filter, res);
})

//filtra por id da prateleira .
router.get('/fichas/prateleira/:id', (req, res) =>{
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
//inicia o servidor
app.listen(port);
console.log('API funcionando!');

