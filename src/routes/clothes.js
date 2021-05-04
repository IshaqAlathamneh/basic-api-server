'use strict';

const express = require('express');
const router = express.Router();
 // class
const Clothes = require('../models/clothes.js');
//new obj from the class
const clothesInstance = new Clothes(); 

// add my RESTFUL APIs declarations
router.get('/clothes', getClothes);
router.get('/clothes/:id', getOneClothes);
router.post('/clothes', createClothes);
router.put('/clothes/:id', updateClothes);
router.delete('/clothes/:id', deleteClothes);


function getClothes(req, res) {
    // get all items
    let items = clothesInstance.get();
    res.status(200).json(items);
}

function getOneClothes(req, res) {
    let id = parseInt(req.params.id); // from the url its a string
    let oneItem = clothesInstance.get(id);
    res.status(200).json(oneItem);
}

function createClothes(req, res) {
    // use create Method from the class
    let obj = req.body;
    console.log('my obj-->',obj);
    let newItem = clothesInstance.create(obj);
    res.status(201).json(newItem);
}

function updateClothes(req, res) {
    let id = parseInt(req.params.id);
    const obj = req.body;
    
    let updatedThing = clothesInstance.update(id, obj);
    res.status(200).json(updatedThing);
}

function deleteClothes(req, res) {
    let id = parseInt(req.params.id);
    let deleted = clothesInstance.delete(id);
    let msg = deleted ? 'Item is deleted' : 'Item was not Found';
    let statusCode = deleted ? 202 : 204;
    res.status(statusCode).json({
        msg: msg,
        deleted: deleted
    });
}


module.exports = router;