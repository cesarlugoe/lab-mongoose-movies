'use strict';
const express = require('express');
const router = express.Router();
const Celebrity = require('../modules/celebrity.js');

/*------------ Home Page ----------------- */

router.get('/', (req, res, next) => {
  Celebrity.find()
  .then(celebrity => {
    res.render('celebrities/index', {celebrity});
  })
  .catch(error => {
    console.log('error', error);
  })
});

/* --------- Add a new Celebrity ----------*/

router.get('/new', (req, res, next) => {
  res.render('celebrities/add')
});

router.post('/add', (req, res, next) => {
  const celebrity = req.body;
  Celebrity.create(celebrity)
  .then(() => {
    res.redirect('/celebrities');
  })
  .catch(error => { 
    console.log('Error', error);
  })
})

/*--------- Edit a Celebrity ----------*/

router.post('/:_id/delete', (req, res, next) => {
  const id = req.params._id;
  Celebrity.findByIdAndDelete(id)
  .then(() => {
    res.redirect('/celebrities');
  })
  .catch(error => {
    console.log('error', error);
  })
})


/*------- Find Celebrity by ID --------*/

router.get('/:_id', (req, res, next) => {
  const id = req.params._id;
  Celebrity.findById(id)
  .then(celebrity => {
    res.render('celebrities/show', {celebrity});
  })
  .catch(error=>{
    console.log('error', error);
  })
});

module.exports = router;