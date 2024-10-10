const express = require('express');
const todosController = require('../controllers/todosController');

/** Router che gestisce tutte le rotte */
const router = express.Router();

/** MIDDLEWARE */
/** Un middleware ha sempre i parametri req, resp e next in input. Chiamando next() si passa al middleware successivo.
 *  Un middleware si interpone sempre fra una request a una rotta e alla relativa response.
 *
 * Se non viene specificata una rotta allora il middleware viene chiamato prima di ogni change della rotta (riga 33).
 *
 * Un middleware può essere passato tramite una funzione direttamente all'interno della gestione di una rotta come avviene
 * per la rotta /id a cui viene passato il loggerMiddleware. In questo caso, i middleware si scatenano soltanto
 * quando viene intercettata la rotta /id e non in altri casi.
 * Sempre per l'esempio della rotta /id vediamo che possono essere concatenati più middleware utilizzando un array e
 * vengono eseguiti nello stesso ordine nel quale sono inseriti nell'array.
 * */

/** Funzione middleware */
const loggerMiddleware = (req, resp, next) => {
    console.log('Req: ' + req.method, req.url +  ' with params : ', req.params);
    next();
};

/** Funzione middleware che mostra un errore nel caso in cui l'id inserito è > 100 */
const validateIdMiddleware = (req, resp, next) => {
    if (parseInt(req.params.id) > 100) {
        next(new Error('id must be greater than 100'));
    } else {
        next();
    }
};

/** Middleware senza rotta specificata. Si scatena, quindi, prima di ogni cambio di rotta. */
router.use((req, resp, next) => {
    console.log('Middleware before all route change ');
    next();
});

/** FINE MIDDLEWARE */



/** ROTTE */

/** Rotta standard (equivale a 'todos/' */
router.get('/', (req, resp) => {
    resp.json(todosController.getTodos());
});

/** Rotta con l'id (equivale a '/todos/IdDelTodos' ad es. '/todos/3' )'.
 * In questa rotta vengono concatenati due middleware.
 * Con questa get viene restituito il todos che ha id uguale a quello passato come parametro nella request */
router.get('/:id([0-9]+)', [loggerMiddleware, validateIdMiddleware, (req, resp) => {
    resp.json(todosController.getTodoById(req.params.id));
}]);

/** Rotta con l'id (equivale a '/todos/IdDelTodos' ad es. '/todos/3')'.
 * In questa rotta vengono concatenati due middleware.
 * Con questa delete viene restituito il todos che ha id uguale a quello passato come parametro nella request */
router.delete('/:id([0-9]+)', [loggerMiddleware, validateIdMiddleware, (req, resp) => {
    const todoRemoved = todosController.deleteTodoById(req.params.id);
    resp.status(todoRemoved ? 200 : 404).json(todoRemoved ? todoRemoved : null);
}]);

/** FINE ROTTE */



module.exports = router;
