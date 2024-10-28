const express = require('express');
const app = express();
const { sequelize } = require('./models');
const {
    redirectToHome,
    redirectToLogin,
    initSession,
    initMethodOverride
} = require('./middlewares/index');

/** BE */

/** Middleware di express che permette di mappare i parametri provenienti dal body di una chiamata al server */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const flash = require('connect-flash');

app.use(initSession());
app.use(flash());
app.use(initMethodOverride());

/** Per identificare le rotte dei singoli servizi BE per i TODOS viene usato il router todosAPIRoutes nel formato '/todos/altreRotte'
 *  Il middleware 'redirectToLogin' reindirizza alla login se non c'è un utente loggato. */
const todosAPIRoutes = require('./routes/api/todosApiRoutes');
app.use('/api/todos', redirectToLogin, todosAPIRoutes);

/** Per identificare le rotte dei singoli servizi BE per le LISTE viene usato il router listsAPIRoutes nel formato '/lists/altreRotte'
 *  Il middleware 'redirectToLogin' reindirizza alla login se non c'è un utente loggato. */
const listsAPIRoutes = require('./routes/api/listsApiRoutes');
app.use('/api/lists', redirectToLogin, listsAPIRoutes);

/** Init delle tabelle a DB a partire dai models creati nell'applicativo */
/** Inizializzazione delle tabelle DB */
const User = require('./models').User;
const List = require('./models').List;
const Todo = require('./models').Todo;

/**
 * Funzione per runnare, in ordine, le sync delle tabelle relative ai model creati lato applicativo.
 * Per la prima volta conviene lanciare la sync dei singoli model. Quando tutte le tabelle sono state create si può
 * abbreviare questo procedimento chiamando il metodo sync() di sequelize.
 * @param isFirstCreation
 */
async function initModelsDBTables(isFirstCreation) {

    if (isFirstCreation) {
        await User.sync();
        await List.sync();
        await Todo.sync();
    } else {
        const created = await sequelize.sync();
        if (created) {console.log('DB TABLES SYNC OK')}
    }

}
// initModelsDBTables(false);

app.listen(4000, () => { console.log('listening on port 4000') });

/** FINE BE */

/** FE */
/** Inizializzazione di express-handlebars per la gestione delle pagine FE */
const {engine} = require('express-handlebars');

/** Aggiunta del riferimento alla cartella public per i file statici */
app.use(express.static(__dirname + '/public'));

/** Express Handlebars */
app.engine(
    'hbs',
    engine({
        extname: 'hbs', /** Estensione dei file FE da gestire */
        layoutsDir: './views/layouts' /** Cartella nella quale si trovano i file da gestire */
    }));
app.set('view engine', 'hbs'); /** Set dell'engine che si occuperà delle views */

/** Routing */

/** Mettere prima il middleware che ritorna alla home se si è loggati e dopo il middleware per
 *  la redirect per la login. Altrimenti si innesca un ciclo infinito. */

/** Per identificare le rotte FE per AUTH viene usato il router authViewRoutes nel formato '/auth/altreRotte'.
 * Il middleware 'redirectToHome' reindirizza l'utente loggato alla homepage. */
const authViewRoutes = require('./routes/auth/authFeRoutes');
app.use('/auth', redirectToHome, authViewRoutes);

/** Per identificare le rotte FE per LISTS viene usato il router listsViewRoutes nel formato '/lists/altreRotte'.
 *  Il middleware 'redirectToLogin' reindirizza alla login se non c'è un utente loggato. */
const listsViewRoutes = require('./routes/feViews/listsViewRoutes');
app.use(['/', '/lists'], redirectToLogin, listsViewRoutes);

/** FINE FE */
