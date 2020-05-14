const  mongoClient = require("mongodb").MongoClient
const ObjectId = require("mongodb").ObjectId 
mongoClient.connect("mongodb://localhost:27017/reinaparasempre")

    .then(conn => global.conn = conn.db("reinaparasempre"))
    .catch(err => console.log(err))


function findAllCategories(callback){
    //global.conn.collection("categoria").find({}).toArray(callback);
        global.conn.collection("artigos").distinct("categoria",callback)

}

function findAllArticles(callback){
    global.conn.collection("artigos").find({status:"publicado"}).toArray(callback);
}

function readArticles(id, callback){
    global.conn.collection("artigos").findOne(new ObjectId(id),callback);
}


function sendComment(comentario, callback){
    
    global.conn.collection("comentarios").insertOne(comentario,callback);            
}


function readComment(id, callback){
    global.conn.collection("comentarios").find({post:id}).toArray(callback);
}
module.exports = {findAllCategories, findAllArticles, readArticles, sendComment, readComment}