const express = require('express');
const authController = require("../../controllers/authController");

/** Router che gestisce tutte le rotte */
const authRouter = express.Router();

/** Rotta equivalente a '/auth/signup' */
authRouter.get('/signup', async (req, resp) => {
    resp.render('viewTemplates/login', {
        signup: true /** True nel caso di login come in questo caso */
    });
});

/** Rotta equivalente a '/auth/register' */
authRouter.post('/register', async (req, resp) => {
    try{
        const result = await authController.registerUser({
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.password
                       });

        /** Dopo l'avvenuta aggiunta di un utente, avviene il redirect alla home page */
        resp.redirect('/');
    } catch (error) {
        const errorMessages = error.errors.map(errorMessage => errorMessage.message);
       resp.status(500).send(errorMessages);
    }
});

module.exports = authRouter;
