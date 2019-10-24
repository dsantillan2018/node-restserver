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
    urlDB = 'mongodb+srv://dsantillan:48Pbx00LuUOYGCul@cluster0-uprl2.mongodb.net/node_course';
}

process.env.URLDB = urlDB;