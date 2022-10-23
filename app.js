const express = require("express");
var bodyParser = require('body-parser')
const api_routes = require('./Routes/api_routes');

require('./dbConection');
app = express();
puerto = process.env.PORT || 3002;

app.use(bodyParser.json())
app.use(api_routes);


app.listen(puerto, err => {
    if (err) {
        console.error("Error escuchando: ", err);
        return;
    }
    console.log(`Escuchando en el puerto :${puerto}`);
});