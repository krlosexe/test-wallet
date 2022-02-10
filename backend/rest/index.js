const express = require("express");
const bodyParser = require("body-parser");
const ClientsController = require('./controllers/ClientsController')
const WalletController  = require('./controllers/WalletController')
const cors = require("cors");
const cookieParser = require('cookie-parser');
const morgan = require('morgan')
const app = express();

//configuraciones
app.use(cors({
    origin:['http://localhost:3000'],//direccion del frontend
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('short'))

// ruta de prueba
app.get("/", (req, res) => {
    res.json({ message: "Working!!" });
});

app.use(cookieParser());
app.use('/api/clients', ClientsController)
app.use('/api/wallet', WalletController)

// arranque del servidor rest
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
