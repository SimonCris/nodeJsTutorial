const express = require('express');
const listController = require('../controllers/listsController');

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

/** Rotta standard (equivale a 'lists/') */
router.get('/', loggerMiddleware, async (req, resp) => {

    try {
        const lists = await listController.getLists();
        resp.json(lists);
    } catch (err) {
        resp.status(500).send(err.message);
    }

});

/** Rotta standard (equivale a 'lists/') */
router.post('/', loggerMiddleware, async (req, resp) => {
    
    try {
        const listAdded = await listController.addLists(req.body);
        resp.json(listAdded);
    } catch (err) {
        resp.status(500).send(err.message);
    }
});

/** Rotta con l'id (equivale a '/lists/IdDellaList' ad es. '/lists/1' )'.
 * Con questa get viene restituita la lista che ha id uguale a quello passato come parametro nella request */
router.get('/:id([0-9]+)', loggerMiddleware, async (req, resp) => {

    try {
        const list = await listController.getListById(req.params.id);
        resp.json(list ? list : 'List not found');
    } catch (err) {
        resp.status(500).send(err.message);
    }

});

/** Rotta con l'id (equivale a '/lists/IdDellaList' ad es. '/lists/1')'.
 * Con questa delete viene restituita la lista che ha id uguale a quello passato come parametro nella request */
router.delete('/:id([0-9]+)', loggerMiddleware, async (req, resp) => {

    try {
        const listsDeletedNumber = await listController.deleteListById(req.params.id);
        resp.json(listsDeletedNumber);
    } catch (err) {
        resp.status(500).send(err.message);
    }

});

/** Rotta con l'id (equivale a '/lists/IdDellaList' ad es. '/lists/1')'.
 * Con questa update viene modificata e restituita la lista che ha id uguale a quello passato come parametro nella request */
router.patch('/:id([0-9]+)', loggerMiddleware, async (req, resp) => {

    try {
        const listId = req.params.id;
        const listToPatch = req.body;
        const listUpdated = await listController.updateListById(listId, listToPatch);
        resp.status(listUpdated ? 200 : 404).json(listUpdated ? listUpdated : 'Record not found');
    } catch (err) {
        resp.status(500).send(err.message);
    }
});

/** FINE ROTTE */

module.exports = router;
