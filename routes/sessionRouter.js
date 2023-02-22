const express = require('express')
const passport = require('passport')
require('../middlewares/auth')

const { Router } = express   
const sessionRouter = Router() 


sessionRouter.get('/', (req, res) => {
  if (req.session.passport) {
    console.log (req.session)
    
    res.status(200).send({ user: req.session.passport.user })
  } else {
    res.status(401).send({ user: '' })
  }
})


sessionRouter.post(
  '/login', 
  passport.authenticate('login'),
  function(req, res) {
     res.status(200).send({ message: 'Autenticación exitosa.' });
  }
)

sessionRouter.post(
  '/register',
  passport.authenticate('register'),
  function(req, res) {
    res.status(200).send({ rlt: true, msg: 'Usuario creado correctamente'})
  }
)


sessionRouter.post('/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send(`Something terrible just happened!!!`)
    } else {
      res.redirect('/')
    }
  })
})


module.exports = sessionRouter