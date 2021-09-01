var express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

import UserController from '../controllers/userController';
import {authorizate as auth} from '../../services/jwt/index';

module.exports.listen = () => {

    app.listen(4018, () => {
        console.log('Backend listen at port 4018!');
    });

    app.get('/users', auth, UserController.index);
    app.post('/users', auth, UserController.create);
    app.put('/users/', auth, UserController.upsert);
    app.get('/users/:id', auth, UserController.indexOne);

    app.post('/auth', UserController.auth);


};