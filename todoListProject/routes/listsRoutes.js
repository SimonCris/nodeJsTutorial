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
router.get('/', loggerMiddleware, (req, resp) => {
    resp.json(listController.getLists());
});

/** Rotta standard (equivale a 'lists/') */
router.post('/', loggerMiddleware, (req, resp) => {
    resp.json(listController.addLists(req.body));
});

/** Rotta con l'id (equivale a '/lists/IdDellaList' ad es. '/lists/1' )'.
 * Con questa get viene restituita la lista che ha id uguale a quello passato come parametro nella request */
router.get('/:id([0-9]+)', loggerMiddleware, (req, resp) => {
    const list = listController.getListById(req.params.id);
    resp.status(list ? 200 : 404).json(list ? list : 'Record not found');
});

/** Rotta con l'id (equivale a '/lists/IdDellaList' ad es. '/lists/1')'.
 * Con questa delete viene restituita la lista che ha id uguale a quello passato come parametro nella request */
router.delete('/:id([0-9]+)', loggerMiddleware, (req, resp) => {
    const listRemoved = listController.deleteListById(req.params.id);
    resp.status(listRemoved ? 200 : 404).json(listRemoved ? listRemoved : 'Record not found');
});

/** Rotta con l'id (equivale a '/lists/IdDellaList' ad es. '/lists/1')'.
 * Con questa update viene modificata e restituita la lista che ha id uguale a quello passato come parametro nella request */
router.patch('/:id([0-9]+)', loggerMiddleware, (req, resp) => {
    const listId = req.params.id;
    const listToPatch = req.body;
    const listUpdated = listController.updateListById(listId, listToPatch);
    resp.status(listUpdated ? 200 : 404).json(listUpdated ? listUpdated : 'Record not found');
});

/** FINE ROTTE */

module.exports = router;
