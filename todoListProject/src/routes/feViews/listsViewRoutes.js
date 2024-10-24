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
listsViewRouter.get('/:list_id([0-9]+)/todos', async (req, resp) => {

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

/** Rotta con l'id (equivale a '/lists/IdDellaList/edit' ad es. '/lists/1/edit')'.
 * Con questo metodo viene recuperata la lista che si vuole editare e viene effettuato il redirect al template HTML per la
 * modifica della lista stessa e passando i suoi valori. */
listsViewRouter.get('/:list_id([0-9]+)/edit', async (req, resp) => {

    try {
        const list = await listController.getListById(req.params.list_id);
        /** Il metodo .render permette di graficare il template HTML che vogliamo, in questo caso edit.hbs e
         *  prende in input anche eventuali parametri (che vengono passati come json) come, in questo caso la lista. */
        resp.render('viewTemplates/lists/edit', {list: list});
    } catch (err) {
        resp.status(500).send(err.message);
    }

});

/** Rotta con l'id (equivale a '/lists/IdDellaList/delete' ad es. '/lists/1/delete')'.
 * Con questo metodo viene eliminata una lista. */
listsViewRouter.get('/:list_id([0-9]+)/delete', async (req, resp) => {

    try{
        await listController.deleteListById(req.params.list_id);
        resp.redirect('/');
        // resp.status(deleted ? 200 : 404).json(deleted ? deleted : null);
    } catch (e) {
        // resp.status(500).send(e.toString());
    }

});

/** Rotta con l'id (equivale a '/IdDellaList' ad es. '/1')'.
 * Con questo metodo viene eliminata una lista e viene effettuato il redirect alla sezione delle liste */
listsViewRouter.delete('/:list_id([0-9]+)', async (req,resp) =>{
    try{
        await listController.deleteListById(req.params.list_id);
        resp.redirect('/');
        // resp.status(deleted ? 200 : 404).json(deleted ? deleted : null);
    } catch (e) {
        // resp.status(500).send(e.toString());
    }
});

/** Rotta con l'id (equivale a '/IdDellaList' ad es. '/1')'.
 * Con questo metodo viene aggiornata la lista e viene effettuato il redirect alla sezione delle liste */
listsViewRouter.patch('/:list_id([0-9]+)', async (req,resp) =>{
    try{
        await listController.updateListById(req.params.list_id, {name: req.body.list_name});
        resp.redirect('/');
        // resp.status(deleted ? 200 : 404).json(deleted ? deleted : null);
    } catch (e) {
        // resp.status(500).send(e.toString());
    }
});

/** Rotta con l'id (equivale a '/IdDellaList' ad es. '/1')'.
 * Con questo metodo aggiunge una nuova lista e viene effettuato il redirect alla sezione delle liste */
listsViewRouter.post('/', async (req,resp) =>{
    try{
        await listController.addLists({name: req.body.list_name, user_id: 21});
        resp.redirect('/');
        // resp.status(deleted ? 200 : 404).json(deleted ? deleted : null);
    } catch (e) {
        // resp.status(500).send(e.toString());
    }
});

module.exports = listsViewRouter;
