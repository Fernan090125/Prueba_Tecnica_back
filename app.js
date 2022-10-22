const express = require("express");
const api_routes = require('./Routes/api_routes');
app = express();
puerto = 3000;

app.use(api_routes);

app.listen(puerto, err => {
    if (err) {
        console.error("Error escuchando: ", err);
        return;
    }
    console.log(`Escuchando en el puerto :${puerto}`);
});