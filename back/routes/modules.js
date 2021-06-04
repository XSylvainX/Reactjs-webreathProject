const express = require('express');
const router = express.Router();
const { db } = require("../conf");


router.get('/', (req, res) => {
    db.query('SELECT name FROM modules',
        (err, results) => {
            if (err) {
                res.status(500).send("there is a problem ");
                console.log(err.message);
                console.log(err.sql);
                return;
            }
            if (!results) {
                res.status(400).send("there is no data ");
                return;
            }
            res.send(results);
        });
});




router.post('/', (req, res) => {



    const { name, number, description, type } = req.body;
    console.log(req.body)
    db.query('INSERT into modules (name,number,description,type) values (?,?,?,?)', [name, number, description, type],
        (err, results) => {
            if (err) {
                res.status(500).send("there is a problem");
                console.log(err.message);
                console.log(err.sql);
                return;
            }
            res.send(results);
        });

});


module.exports = router;


