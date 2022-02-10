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

const CreateWallet = async (id_client)=>{
    const dbo    = mongo.db("epayco");

    const data = {
        id_client,
        balance : 0
    }
    await dbo.collection("wallet").insertOne(data, function(err, data) {});
}


router.get('/', (req, res) => {
    console.log(request.body)
})


module.exports = router;