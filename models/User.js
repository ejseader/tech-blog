const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../config/connection');

class User extends Model {
  async validatePass(provided_password) {
    const is_valid = await bcrypt.compare(provided_password, this.password);

    return is_valid;
  }
}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: {
      args: true,
      msg: 'That email is already in use.'
    },
    validate: {
      isEmail: {
        args: true,
        msg: 'Please enter a valid email address.'
    }
  },
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      len: {
        args: 8,
        msg: 'Passwords must be a minimum of 8 characters.'
      }
    },
    allowNull: false
  }
},
  {
    sequelize: db,
    modelName: 'user',
    freezeTableName: true,
    hooks: {
      async beforeCreate(user) {
        const encrypted_pass = await bcrypt.hash(user.password, 10);

        user.password = encrypted_pass;
    }
  }
});

module.exports = User;