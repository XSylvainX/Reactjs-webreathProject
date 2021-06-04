const express = require('express');
const router = express.Router();
const { db } = require("../conf");



router.get('/', (req, res) => {
    db.query('SELECT temperature,running_time,data_sent,operating_condition FROM etatmodule',
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



module.exports = router;