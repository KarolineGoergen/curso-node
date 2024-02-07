//const express = require('express');
import express from 'express';
import cors from 'cors';
import routes from './routers';
import connection from './configurations/database';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const port = 3000;

connection.then(() => {
    console.log('Banco de dados ok')
    app.listen(port,() => {
        console.log('Aplicação ok na porta: ',port);
    });
});