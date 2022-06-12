var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const cors = require("cors")
router.use(cors())

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'therese',
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//kolla om det finns rätt användarnamn och lösenord, skickar tillbaka status och id
router.post('/', function(req, res, next) {
  try{
    connection.execute(
        " SELECT * FROM user",
        

    (err, result) => {

        if(err){console.log("error", err)}

        for (let i = 0; i < result.length; i++) {
          const user = result[i];
      
          if (req.body.userName === user.username && req.body.passWord === user.password) {

          res.json({
            "status": "loggedIn",
            "user": user.id
        })
              return
          }
      }
    })
  } 
  catch(error){
    console.log("kunde inte hämta user", error)
    res.json(error)
  }
});

module.exports = router;
