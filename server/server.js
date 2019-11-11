require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');

//Declaracion del body parser (app.use siempre se ejecutara)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Global routes configuration
app.use(require('./routes/index'));

//DB connection
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {
        if (err) throw err;

        console.log("Database ONLINE");
    });

app.listen(process.env.PORT, () => {
    console.log("Listen port: ", process.env.PORT);
});