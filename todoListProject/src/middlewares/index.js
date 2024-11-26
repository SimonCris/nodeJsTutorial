/** MIDDLEWARE che inizializza la session */
const session = require("express-session");
const MAX_AGE = process.env.MAX_AGE || 60*60*1000;
const SECRET_KEY = process.env.SECRET_KEY || 'Our secret';
const DEFAULT_ENV = process.env.DEFAULT_ENV || 'Development';

const initSession = () => {
    return session({
           cookie: {
               /** Impostazioni del cookie che viene creato dal server */
               maxAge: MAX_AGE, /** Scadenza del cookie */
               secure: DEFAULT_ENV === 'production' /** Specifica se il cookie deve essere inviato tramite HTTPS (in questo caso questo avviene solo in produzione) */
           },
           secret: SECRET_KEY, /** Secret key con la quale il server firma il cookie */
           resave: false,
           /** Campo che specifica se la sessione deve essere risalvata per ogni richiesta effettuata (chiamata ai servizi) */
           saveUninitialized: false /** Campo che specifica se la sessione deve venire salvata anche quando non ci sono dati */
    })
}

/** -------------------------------------------------- */

/** Method-Override crea una nuova funzione MIDDLEWARE per sovrascrivere la proprietà req.method con un nuovo valore.
 * Se ad esempio il type di un form è "post", possiamo sovrascriverlo cambiandolo in "delete" in modo tale
 * che venga fatta una chiamata con un metodo DELETE e venga intercettata da una determinata rotta. (esempio di override in edit.hbs) */
const methodOverride = require('method-override');
const initMethodOverride = () => {
    return methodOverride(function (req) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {

            const method = req.body._method
            delete req.body._method
            return method
        }
    })
}

/** -------------------------------------------------- */

/**
 * MIDDLEWARE Per il check sull'utente loggato.
 * Se l'utente è loggato e non è il caso di click sul button "logout", viene eseguita una redirect alla Home (Lista delle liste)
 * @param req
 * @param resp
 * @param next
 */
const redirectToHome = (req, resp, next) => {
    if (req.session.user && !req.path === '/auth/logout') {
        resp.redirect('/');
    } else {
        next();
    }
}

/**
 * MIDDLEWARE Per il check sull'utente loggato.
 * Se l'utente non è loggato viene eseguita una redirect alla login
 * @param req
 * @param resp
 * @param next
 */
const redirectToLogin = (req, resp, next) => {
    if (req.session.user) {
        next();
    } else {
        resp.redirect('/auth/login');
    }
}

/** -------------------------------------------------- */

module.exports = {
    redirectToHome,
    redirectToLogin,
    initSession,
    initMethodOverride
}
