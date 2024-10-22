/** Dati mockati */
const mockData = require('../mocks/data.json');

/** Import dell'istanza della connessione al DB */
const dbConnection = require('../dbConfig');
const {List} = require("../models");

const Todo = require('../models').Todo;
const queryAttributes = ['id', 'list_id', 'todo', 'completed', 'created_at', 'updated_at'];

/** FUNZIONI PER LA GESTIONE DEI DATI */

/** Funzione che aggiunge un todos alla tabella dei todos */
async function addTodos(todosParams) {
    /** Il metodo query restituisce un array chiamato "result" contenente i dati recuperati dalla query.
     * In questo caso viene passato un array con i placeholder da sostituire nella query al posto del carattere ? e
     * vengono sostituiti nello stesso ordine in cui sono inseriti nell'array.*/
    // const [result] = await dbConnection.query('INSERT INTO todos (list_id, todo, completed, created_at) VALUES (?,?,?,?)', [todosParams.list_id, todosParams.todo, todosParams.completed, new Date()]);
    // return await getTodoById(result.insertId);

    /** Aggiunta dei dati utilizzando i metodi sequelize */
    return await Todo.create({
        list_id: todosParams.list_id,
        todo: todosParams.todo,
        completed: todosParams.completed,
        created_at: new Date()
    })
}

/** Funzione che ritorna tutti i todos */
async function getTodos() {
    /** Il metodo query restituisce un array chiamato "result" contenente i dati recuperati dalla query. Ritorna anche
     * un altro array chiamato "fields" contenente le colonne della tabella */
    // const [result] = await dbConnection.query('SELECT * FROM todos');
    // return result;

    /** Recupero dei dati utilizzando i metodi sequelize */
    return await Todo.findAll({
        attributes: queryAttributes, /** Attributi che vogliamo siano ritornati dalla query.
         Se non specifigo questo campo vengono mandati tutti. */
        limit: 20, /** Quanti record deve ritornare la query */
        /** offset: 10 Da quale posizione iniziare a ritornare i record. Se voglio restituire 20 record ed ho impostato
         l'offeset a 10, ritorna i record a partire dalla posizione 10 per un massimo di 20. */
        /** where: { Esempio di clausola where da passare alla query
         id: 1
         } */

    });
}

/** Funzione che ritorna dalla tabella dei todos, il todos che ha id uguale all'id passato in input */
async function getTodoById(id) {
    /** Il metodo query restituisce un array chiamato "result" contenente i dati recuperati dalla query.
     * In questo caso viene passato un array con i placeholder da sostituire nella query al posto del carattere ? e
     * vengono sostituiti nello stesso ordine in cui sono inseriti nell'array. */
    // const [result] = await dbConnection.query('SELECT * FROM todos WHERE id = ?', [id]);
    // return result[0];

    /** Recupero dei dati utilizzando i metodi sequelize */
    return await Todo.findByPk(id, {
        attributes: queryAttributes
    });
}

/** Funzione che elimina dalla tabella dei todos, il todos che ha id uguale all'id passato in input */
async function deleteTodoById(id) {
    /** In questo caso viene passato un array con i placeholder da sostituire nella query al posto del carattere ? e
     *  vengono sostituiti nello stesso ordine in cui sono inseriti nell'array. */
    // const [result] = await dbConnection.query('DELETE FROM todos WHERE id = ?', [id]);
    // return result.affectedRows;

    /** Delete dei dati utilizzando i metodi sequelize */
    return await Todo.destroy({
        attributes: queryAttributes,
        where: {
            id: id
        }
    });
}

/** Funzione che modifica il todos che ha id uguale all'id passato in input */
async function updateTodoById(idTodo, todoUpdated) {
    /** In questo caso viene passato un array con i placeholder da sostituire nella query al posto del carattere ? e
     *  vengono sostituiti nello stesso ordine in cui sono inseriti nell'array. */
    // const [result] = await dbConnection.query('UPDATE todos SET list_id = ?, todo = ?, completed = ?, updated_at = ? WHERE id = ?', [todoUpdated.list_id, todoUpdated.todo, todoUpdated.completed, new Date(), idTodo]);
    // return result.info;

    /** Update dei dati utilizzando i metodi sequelize */
    return Todo.update({
            todo: todoUpdated.todo, /** Dati da aggiornare */
            list_id: todoUpdated.list_id,
            completed: todoUpdated.completed,
            updated_at: new Date()
        },
        {
            where: {
                id: idTodo /** Id dell'elemento da aggiornare */
            }
        });
}

/** Funzione che ritorna dalla tabella delle liste, la lista che ha id uguale all'id passato in input */
async function getTodosByList(idList) {
    /** Il metodo query restituisce un array chiamato "result" contenente i dati recuperati dalla query.
     * In questo caso viene passato un array con i placeholder da sostituire nella query al posto del carattere ? e
     * vengono sostituiti nello stesso ordine in cui sono inseriti nell'array. */
    // const [result] = await dbConnection.query('SELECT * FROM todos WHERE list_id = ?', [idList]);
    // return result;

    /** Recupero dei dati utilizzando i metodi sequelize */
    return await Todo.findAll({
        attributes: queryAttributes,
        where: {
            list_id: idList
        }
    });
}

module.exports = {
    addTodos,
    getTodos,
    getTodoById,
    getTodosByList,
    deleteTodoById,
    updateTodoById
};
