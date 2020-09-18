const express = require ('express');

const router = express.Router();

const burger = require('../models/burger.js');


// router.get('/', function(req,res) {
//     res.redirect('/index');
// });

//Get Route
router.get('/', function(req, res) {
    burger.all(function(data) {
        const hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

//Post Route
router.post('/api/burgers', function(req, res) {
    burger.create([
        'burger_name', 'devoured'
    ], [
        req.body.burger_name, req.body.devoured
    ], function(result) {
        res.json({ id: result.insertId });
    });
});

//Put Route
router.put('/api/burgers/:id', function(req,res) {
    const condition = 'id = ' + req.params.id;

    console.log('condition', condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changeRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//Delete Route
router.delete('/api/burgers/:id', function(req, res) {
    const condition = "id = " + req.params.id;

    burger.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});


// Export routes
module.exports = router;