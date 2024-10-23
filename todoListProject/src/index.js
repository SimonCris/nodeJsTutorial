const express = require('express');
const app = express();
const { sequelize } = require('./models');

/** BE */

/** Middleware di express che permette di mappare i parametri provenienti dal body di una chiamata al server */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Per identificare le rotte dei singoli servizi BE per i TODOS viene usato il router todosAPIRoutes nel formato '/todos/altreRotte' */
const todosAPIRoutes = require('./routes/api/todosApiRoutes');
app.use('/api/todos', todosAPIRoutes);

/** Per identificare le rotte dei singoli servizi BE per le LISTE viene usato il router listsAPIRoutes nel formato '/lists/altreRotte' */
const listsAPIRoutes = require('./routes/api/listsApiRoutes');
app.use('/api/lists', listsAPIRoutes);

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
 * @returns {Promise<void>}
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
/** Aggiunta di bootstrap per lo styles FE per i file statici */
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

app.engine(
    'hbs',
    engine({
        extname: 'hbs', /** Estensione dei file FE da gestire */
        layoutsDir: './views/layouts' /** Cartella nella quale si trovano i file da gestire */
    }));
app.set('view engine', 'hbs'); /** Set dell'engine che si occuperà delle views */

/** Routing */
/** Per identificare le rotte FE per LISTS viene usato il router listsViewRoutes nel formato '/lists/altreRotte' */
const listsViewRoutes = require('./routes/feViews/listsViewRoutes');
app.use(['/', '/lists'], listsViewRoutes);

/** FINE FE */
