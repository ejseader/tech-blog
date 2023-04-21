require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3001;
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const db = require('./config/connection');
const helpers = require('./utils/helpers');
const { engine } = require('express-handlebars');

const app = express();

app.use(express.static('public'));

app.engine('hbs', engine({
  extname: '.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true
  }
}));
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: db
  }),
}));

app.use(routes);

db.sync({force: false}).then(() => {
  app.listen(PORT, () => console.log('Server started on port %s', PORT))
});