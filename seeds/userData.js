const { User } = require('../models');

const userData = [
  {
    name: 'Joe Razz',
    email: 'joerazz@joerazz.com',
    password: 'password'
  },
  {
    name: 'Eric Seader',
    email: 'ejseader@gmail.com',
    password: 'password'
  },
  {
    name: 'Farah Monk',
    email: 'monkeyf@gmail.com',
    password: 'password'
  }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;