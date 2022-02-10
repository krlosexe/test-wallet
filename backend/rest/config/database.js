const MongoClient = require('mongodb').MongoClient;

function ConnecMongo() {
    
   // const uri = "mongodb://krlosexe:ad17urca@127.0.0.1:27017/prp";
    const uri = "mongodb+srv://krlosexe:ad17urca@cluster0.gqm0w.mongodb.net/epayco?retryWrites=true&w=majority"
    let mongoOptions = {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
    mongo = new MongoClient(uri, mongoOptions);
    try {
        let db = mongo.connect()
        return mongo
    } catch (error) {
        console.log(error)
    }

}


module.exports = ConnecMongo;