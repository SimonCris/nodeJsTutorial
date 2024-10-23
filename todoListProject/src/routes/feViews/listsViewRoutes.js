const express = require('express');
const listController = require('../../controllers/listsController');
const todosController = require('../../controllers/todosController');

/** Router che gestisce tutte le rotte */
const listsViewRouter = express.Router();

/** Routing FE per le rotte relative alle LISTE */

/** Rotta equivalente a '/lists/' */
listsViewRouter.get('/', async (req, resp) => {

    try {
        const lists = await listController.getLists();
        /** Il metodo .render permette di graficare il template HTML che vogliamo, in questo caso index.hbs e
         *  prende in input anche eventuali parametri (che vengono passati come json) come, in questo caso, l'array delle liste. */
        resp.render('viewTemplates/index', {lists: lists});
    } catch (err) {
        resp.status(500).send(err.message);
    }

});

/** Rotta con l'id (equivale a '/lists/IdDellaList/todos' ad es. '/lists/1/todos')'.
 * Con questa get vengono restituiti i todos che fanno parte della lista che ha id uguale a quello passato come parametro nella request */
listsViewRouter.get('/:list_id([0-9]+/todos)', async (req, resp) => {

    try {
        const todosByList = await todosController.getTodosByList(req.params.list_id);
        const list = await listController.getListById(req.params.list_id);
        /** Il metodo .render permette di graficare il template HTML che vogliamo, in questo caso todos.hbs e
         *  prende in input anche eventuali parametri (che vengono passati come json) come, in questo caso, l'array dei todos che hanno un determinato list_id. */
        resp.render('viewTemplates/todos', {todosList: todosByList, list_name: list.name});
    } catch (err) {
        resp.status(500).send(err.message);
    }

});


module.exports = listsViewRouter;
