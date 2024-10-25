const express = require('express');

/** Router che gestisce tutte le rotte */
const authRouter = express.Router();

/** Rotta equivalente a '/auth/signup' */
authRouter.get('/signup', async (req, resp) => {

    resp.render('viewTemplates/login', {
        signup: true /** True nel caso di login come in questo caso */
    });

});




module.exports = authRouter;
