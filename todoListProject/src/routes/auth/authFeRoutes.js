const express = require('express');
const authController = require("../../controllers/authController");

/** Router che gestisce tutte le rotte */
const authRouter = express.Router();

/** Rotta equivalente a '/auth/login' */
authRouter.get('/login', async (req, resp) => {
    resp.render('viewTemplates/login', {
        signup: false /** True nel caso di login come in questo caso */
    });
});

/** Rotta equivalente a '/auth/signup' */
authRouter.get('/signup', async (req, resp) => {
    resp.render('viewTemplates/login', {
        signup: true /** True nel caso di login come in questo caso */
    });
});

/** Rotta equivalente a '/auth/register' */
authRouter.post('/register', async (req, resp) => {
    try{
        /** Dopo la registrazione, l'utente registrato viene memorizzato nella session e sarà quindi accessibile in ogni rotta */
        req.session.user = await authController.registerUser({
                                name: req.body.name,
                                email: req.body.email,
                                password: req.body.password
                           });

        /** Set del messaggio nella sessione lato server */
        req.flash('successMessages', 'User registered successfully!');

        /** Dopo l'avvenuta aggiunta di un utente, avviene il redirect alla home page */
        resp.redirect('/');
    } catch (error) {
        const errorMessages = error.errors.map(errorMessage => errorMessage.message);
        resp.status(500).send(errorMessages);
    }
});

module.exports = authRouter;
