'use strict';

const express = require('express');
const router = express.Router();
 // class
const Food = require('../models/food.js');
//new obj from the class
const foodInstance = new Food(); 

// add my RESTFUL APIs declarations
router.get('/food', getFood);
router.get('/food/:id', getOneFood);
router.post('/food', createFood);
router.put('/food/:id', updateFood);
router.delete('/food/:id', deleteFood);


function getFood(req, res) {
    // get all items
    let items = foodInstance.get();
    res.status(200).json(items);
}

function getOneFood(req, res) {
    let id = parseInt(req.params.id); // from the url its a string
    let oneItem = foodInstance.get(id);
    res.status(200).json(oneItem);
}

function createFood(req, res) {
    // use create Method from the class
    let obj = req.body;
    let newItem = foodInstance.create(obj);
    res.status(201).json(newItem);
}

function updateFood(req, res) {
    let id = parseInt(req.params.id);
    const obj = req.body;
    let updatedThing = foodInstance.update(id, obj);
    res.status(200).json(updatedThing);
}

function deleteFood(req, res) {
    let id = parseInt(req.params.id);
    let deleted = foodInstance.delete(id);
    let msg = deleted ? 'Item is deleted': 'Item was not Found'
    let statusCode = deleted ? 202 : 204;
    res.status(statusCode).json({
        msg: msg,
        deleted: deleted
    });
}


module.exports = router;