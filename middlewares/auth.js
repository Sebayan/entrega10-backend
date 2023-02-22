const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local').Strategy

const { users } = require('../class/userContainer')


passport.use('login', new LocalStrategy(
  async function( username, password, done ) {
    const validateUser = await users.checkUser (username, password)
    if ( validateUser.result ) {
      return done( null, { username: username } )
    } else {
      return done( null, false )
    }
  }
))


passport.use('register', new LocalStrategy(
  async function( username, password, done ) {
    if ( await users.addUser (username, password ) ) {
      return done( null, { username: username } )
    } else {
      return done( null, false )
    }
  }
))


passport.serializeUser(function(user, done) {
  done(null, user.username)
})

passport.deserializeUser(function(username, done) {
  done(null, { username: username })
})