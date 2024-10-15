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

app.listen(4000, () => { console.log('listening on port 4000') });
