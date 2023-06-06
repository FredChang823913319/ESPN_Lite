const express = require('express');
const bodyParser = require('body-parser'); // latest version of exressJS now comes with Body-Parser!
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');

const fifa_search = require('./controllers/fifa_search');
const fifa_search_multi = require('./controllers/fifa_search_multi');

const update_history = require('./controllers/update_history');
const get_history = require('./controllers/get_history');

// databse (2) (1(A)+1)
const db = knex({
  // connect to your own database here:
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'changkehang',
    password : '',
    database : 'fifa-db'
  }
});

const app = express();
// backend routing (1)/5
app.use(cors());
app.use(express.json()); // latest version of exressJS now comes with Body-Parser!

// app.get('/', (req, res)=> { res.send(db.users) })
// equivalent: signin.handleSignin(db, bcrypt)(req, res)
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.post('/fifa_search', (req, res) => { fifa_search.handlePlayerStats(req, res, db)})
app.post('/fifa_search_multi', (req, res) => { fifa_search_multi.handleMutiplePlayerStats(req, res, db)})

app.put('/update_history', (req, res) => { update_history.updatePlayerHistory(req, res, db)})
app.post('/get_history', (req, res) => { get_history.getPlayerHistory(req, res, db)})





app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})