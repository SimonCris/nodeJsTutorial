const express = require('express');

/** Router che gestisce tutte le rotte */
const router = express.Router();

/** Rotta standard (equivale a 'todos/' */
router.get('/', (req, resp) => {
    resp.send('todos');
})

/** Rotta con l'id (equivale a '/todos/IdDelTodos' ad es. '/todos/3' )' */
router.get('/:id([0-9]+)', (req, resp) => {
    resp.send('todo with id ' + req.params.id);
})

module.exports = router;
