const express = require('express');
const listController = require('../../controllers/listsController');
const todosController = require('../../controllers/todosController');

/** Router che gestisce tutte le rotte */
const router = express.Router();

/** MIDDLEWARE */

/** Funzione middleware */
const loggerMiddleware = (req, resp, next) => {
    console.log('Lists routes --> ' + 'Req: ' + req.method, ' Url: ' + req.url);
    next();
};

/** FINE MIDDLEWARE */


/** ROTTE */

/** Rotta standard (equivale a '/api/lists/') */
router.get('/', loggerMiddleware, async (req, resp) => {

    try {
        const lists = await listController.getLists();
        resp.json(lists);
    } catch (err) {
        resp.status(500).send(err.message);
    }

});

/** Rotta standard (equivale a '/api/lists/') */
router.post('/', loggerMiddleware, async (req, resp) => {
    
    try {
        const listAdded = await listController.addLists(req.body);
        resp.json(listAdded);
    } catch (err) {
        resp.status(500).send(err.message);
    }

});

/** Rotta con l'id (equivale a '/api/lists/IdDellaList' ad es. '/api/lists/1' )'.
 * Con questa get viene restituita la lista che ha id uguale a quello passato come parametro nella request */
router.get('/:id([0-9]+)', loggerMiddleware, async (req, resp) => {

    try {
        const list = await listController.getListById(req.params.id);
        resp.status(list ? 200 : 404).json(list ? list : 'List not found');
    } catch (err) {
        resp.status(500).send(err.message);
    }

});

/** Rotta con l'id (equivale a '/api/lists/IdDellaList' ad es. '/api/lists/1')'.
 * Con questa delete viene restituita la lista che ha id uguale a quello passato come parametro nella request */
router.delete('/:id([0-9]+)', loggerMiddleware, async (req, resp) => {

    try {
        const listsDeletedNumber = await listController.deleteListById(req.params.id);
        resp.status(listsDeletedNumber ? 200 : 404).json(listsDeletedNumber ? listsDeletedNumber : 'List not found');
    } catch (err) {
        resp.status(500).send(err.message);
    }

});

/** Rotta con l'id (equivale a '/api/lists/IdDellaList' ad es. '/api/lists/1')'.
 * Con questa update viene modificata e restituita la lista che ha id uguale a quello passato come parametro nella request */
router.patch('/:id([0-9]+)', loggerMiddleware, async (req, resp) => {

    try {
        const listId = req.params.id;
        const listToPatch = req.body;
        const listUpdated = await listController.updateListById(listId, listToPatch);
        resp.status(listUpdated > 0 ? 200 : 404).json(listUpdated > 0 ? listUpdated : 'List not found');
    } catch (err) {
        resp.status(500).send(err.message);
    }

});

/** Rotta con l'id (equivale a '/api/lists/IdDellaList/todos' ad es. '/api/lists/1/todos')'.
 * Con questa get vengono restituiti i todos che fanno parte della lista che ha id uguale a quello passato come parametro nella request */
router.get('/:list_id([0-9]+/todos)', loggerMiddleware, async (req, resp) => {

    try {
        const todosByList = await todosController.getTodosByList(req.params.list_id);
        resp.status(todosByList ? 200 : 404).json(todosByList ? todosByList : 'Not found');
    } catch (err) {
        resp.status(500).send(err.message);
    }

});

/** FINE ROTTE */

module.exports = router;
