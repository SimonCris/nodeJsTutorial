const express = require('express');
const app = express();

/** Middleware di express che permette di mappare i parametri provenienti dal body di una chiamata al server */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Per tutte le rotte di todos viene utilizzato il router todosRoutes nel formato '/todos/altreRotte' */
const todosRoutes = require('./routes/todosRoutes');
app.use('/todos', todosRoutes);

/** Per tutte le rotte di lists viene utilizzato il router listsRoutes nel formato '/lists/altreRotte' */
const listsRoutes = require('./routes/listsRoutes');
app.use('/lists', listsRoutes);

/** Init delle tabelle a DB a partire dai models creati nell'applicativo */
/** Inizializzazione delle tabelle DB */
const User = require('./models').User;
const List = require('./models').List;
const Todo = require('./models').Todo;

/** Funziona per runnare, in ordine, le sync delle tabelle */
async function initModelsDBTables() {
    await User.sync();
    await List.sync();
    await Todo.sync();
}
initModelsDBTables();

app.listen(4000, () => { console.log('listening on port 4000') });
