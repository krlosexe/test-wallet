const express = require("express");
const router = express.Router();
const clienteValidator = require('../validators/clienteValidator')
const client_mongo    = require('../config/database.js')
const mongo           = client_mongo()


router.post('/', async(request, response) => {
    const { error } = await clienteValidator(request.body);

    if (error) {
        console.log(error)
        return response.status(400).send({
                    status: 'error', data: `Creacion Fallida: error al llenar el campo ${error.details[0].message}`}
    )} else{
        const dbo    = mongo.db("epayco");
        await dbo.collection("clients").insertOne(request.body, function(err, data) {
            CreateWallet(data.insertedId.toString())
            response.status(200).json(response.data)
        });
    }
   
})


router.post('/get', async (request, response) => {
  
    const dbo    = mongo.db("epayco");
    const {identification, phone} = request.body
    if(!identification && !phone) res.status(400).send(
        {status: 'error', data: 'para consultar se necesita número de documento y número de celular'})

    
    var Client = await dbo.collection("clients").findOne({identification, phone});
    var Wallet = await dbo.collection("wallet").findOne({id_client : Client._id.toString()});

    const data = {
        ...Client,
        ...Wallet
    }
    console.log(data, "Wallet")
    response.status(200).json(data)
})


router.get('/', (req, res) => {
    
})


module.exports = router;