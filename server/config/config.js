//====================================
//    Port
//====================================
process.env.PORT = process.env.PORT || 3000;

//====================================
//    Environment
//====================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//====================================
//    Database
//====================================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/node_course';
} else {
    urlDB = process.env.MONGO_URLDB;
}

process.env.URLDB = urlDB;