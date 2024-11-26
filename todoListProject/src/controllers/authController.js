const User = require('../models').User;
const bcrypt = require('bcrypt');

/**
 * Metodo che verifica se esiste un utente nel DB. Se si, permette la login
 * @param emailAddress
 * @param password
 */
async function login({emailAddress, password}) {

    const userFounded = await User.findOne({where: {email: emailAddress}});

    if (!userFounded.id) {
        throw new Error('User email not found');
    }

    if (!bcrypt.compareSync(password, userFounded.password)) {
        throw new Error('Invalid password');
    }

    return userFounded;
}

/**
 * Metodo che aggiunge al DB un nuovo utente
 * @param name
 * @param email
 * @param password
 */
async function registerUser({name, email, password}) {
    return await User.create({
        name: name, email: email, password: password
    });
}

module.exports = {
    registerUser,
    login
}
