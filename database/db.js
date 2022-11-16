var mysql = require('mysql2')

var connection = mysql.createConnection({
    "host":"localhost",
    "user":"root",
    "password":"mysql",
    "database":"ems"
})

module.exports = connection

connection.connect(function(error){
    if(error){
      console.log(error);
    }else{
      console.log('Connected!:)');
    }
  });