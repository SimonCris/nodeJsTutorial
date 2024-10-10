const express = require('express');
const app = express();
/** Router che gestisce tutte le rotte */
const todosRoutes = require('./routes/todos');

/** Per tutte le rotte di todos viene utilizzato il router todosRoutes nel formato '/todos/altreRotte' */
app.use('/todos', todosRoutes);

app.listen(4000, () => { console.log('listening on port 4000') });
