var express = require("express");
var router = express.Router();
const mysql = require("mysql2");

const cors = require("cors");
router.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "therese",
});
// kolla vilken användare det är som loggar in och hämtar dennes uppgifter
router.get("/:userId", function (req, res, next) {
  try {
   //hämtar notes från checklist där avnändaren är params id:et
    connection.execute(" SELECT * FROM checklist WHERE user IN ('"+req.params.userId +"')", (err, result) => {
      if (err) {
        console.log("funkade inte", err);
      }
          res.json(result);
    });
  } catch (error) {
    console.log("fel", error);
    res.json(error);
  }
});


//////////////// lägga till en ny note //////////////////////////
router.post("/add", function async(req, res) {
  let list = { ...req.body };
  try {
    console.log("lista ", list);
    connection.execute(
      "INSERT INTO checklist (user, title, content) VALUES ('" + list.user + "', '" + list.title + "', '" + list.content + "')",

      (err, result) => {
        if (err) {
          console.log("funkade inte", err);
        }
        res.json("sparad");
      }
    );
  } catch (error) {
    console.log("fel", error);
    res.json(error);
  }
});
////////////////////// Uppdatera en note //////////////////////////

router.post("/uppdate", function (req, res) {
  let uppdateNote = {...req.body}

  try {
    connection.execute(
      "UPDATE checklist SET content='"+ uppdateNote.content +"' WHERE id='"+ uppdateNote.id+"'",
      console.log(uppdateNote.id),
      (err, result) => {
        if (err) {
          console.log("funkade ej", err);
        }
        res.json("ändringen är sparad");
      }
    );
  } catch (error) {
    console.log("fel", error);
    res.json(error);
  }  
});
///////////////// Radera en note //////////////////////

router.delete("/:id", function (req, res) {

  // let uppdateNote = {...req.params}
  // res.send(uppdateNote)


  try {
    connection.execute(
    "DELETE FROM checklist WHERE id='"+ req.params.id +"'",
  
      (err, result) => {
      
        if (err) {
          console.log("funkade ej", err);
        }
        console.log(result)
        res.json("raderad");
      }
    );
  } catch (error) {
    console.log("fel", error);
    res.json(error);
  }  
});


module.exports = router;
