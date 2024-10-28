const User = require('../models').User;

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
    registerUser
}
