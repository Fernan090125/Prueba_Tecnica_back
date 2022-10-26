const express = require("express");
var bodyParser = require('body-parser')
const api_routes = require('./Routes/api_routes');
const cors = require('cors');

const corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200
};

require('./dbConection');
app = express();
puerto = process.env.PORT || 3002;

app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(api_routes);



app.listen(puerto, err => {
    if (err) {
        console.error("Error escuchando: ", err);
        return;
    }
    console.log(`Escuchando en el puerto :${puerto}`);
});