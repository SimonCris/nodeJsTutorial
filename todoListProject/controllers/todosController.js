const mockData = require('../mocks/data.json');

/** Import dell'istanza della connessione al DB */
const dbConnection = require('../dbConfig');

/** FUNZIONI PER LA GESTIONE DEI DATI */

/** Funzione che aggiunge un todos alla tabella dei todos */
async function addTodos(todosParams) {
    /** Il metodo query restituisce un array chiamato "result" contenente i dati recuperati dalla query.
     * In questo caso viene passato un array con i placeholder da sostituire nella query al posto del carattere ? e
     * vengono sostituiti nello stesso ordine in cui sono inseriti nell'array.*/
    const [result] = await dbConnection.query('INSERT INTO todos (list_id, todo, completed, created_at) VALUES (?,?,?,?)', [todosParams.list_id, todosParams.todo, todosParams.completed, new Date()]);
    return await getTodoById(result.insertId);
}

/** Funzione che ritorna tutti i todos */
async function getTodos() {
    /** Il metodo query restituisce un array chiamato "result" contenente i dati recuperati dalla query. Ritorna anche
     * un altro array chiamato "fields" contenente le colonne della tabella */
    const [result] = await dbConnection.query('SELECT * FROM todos');
    return result;
}

/** Funzione che ritorna dalla tabella dei todos, il todos che ha id uguale all'id passato in input */
async function getTodoById(id) {
    /** Il metodo query restituisce un array chiamato "result" contenente i dati recuperati dalla query.
     * In questo caso viene passato un array con i placeholder da sostituire nella query al posto del carattere ? e
     * vengono sostituiti nello stesso ordine in cui sono inseriti nell'array. */
    const [result] = await dbConnection.query('SELECT * FROM todos WHERE id = ?', [id]);
    return result[0];
}

/** Funzione che elimina dalla tabella dei todos, il todos che ha id uguale all'id passato in input */
async function deleteTodoById(id) {
    /** In questo caso viene passato un array con i placeholder da sostituire nella query al posto del carattere ? e
     *  vengono sostituiti nello stesso ordine in cui sono inseriti nell'array. */
    const [result] = await dbConnection.query('DELETE FROM todos WHERE id = ?', [id]);
    return result.affectedRows;
}

/** Funzione che modifica il todos che ha id uguale all'id passato in input */
async function updateTodoById(idTodo, todoUpdated) {
    /** In questo caso viene passato un array con i placeholder da sostituire nella query al posto del carattere ? e
     *  vengono sostituiti nello stesso ordine in cui sono inseriti nell'array. */
    const [result] = await dbConnection.query('UPDATE todos SET list_id = ?, todo = ?, completed = ?, updated_at = ? WHERE id = ?', [todoUpdated.list_id, todoUpdated.todo, todoUpdated.completed, new Date(), idTodo]);
    return result.info;
}

module.exports = {
    addTodos,
    getTodos,
    getTodoById,
    deleteTodoById,
    updateTodoById
};
