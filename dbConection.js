var mysql = require('mysql');
require('dotenv').config()

var pool= mysql.createPool({
    host : 'localhost',
    database : 'aimedgeapps',
    user : process.env.DATABASEUSER,
    password : process.env.DATABASEPASS,
});


pool.getConnection((err,connection)=> {
    if(err)
    throw err;
    console.log('Database connected successfully');
    connection.release();
  });

module.exports = pool;