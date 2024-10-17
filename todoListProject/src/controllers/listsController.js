const mockData = require('../mocks/data.json');

/** Import dell'istanza della connessione al DB */
const dbConnection = require('../dbConfig');

/** FUNZIONI PER LA GESTIONE DEI DATI */

/** Funzione che aggiunge una list alla tabella delle liste */
async function addLists(listsParams) {
    /** Il metodo query restituisce un array chiamato "result" contenente i dati recuperati dalla query.
     * In questo caso viene passato un array con i placeholder da sostituire nella query al posto del carattere ? e
     * vengono sostituiti nello stesso ordine in cui sono inseriti nell'array.*/
    const [result] = await dbConnection.query('INSERT INTO lists (user_id, name, created_at) VALUES (?,?,?)', [listsParams.user_id, listsParams.name, new Date()]);
    return await getListById(result.insertId);
}

/** Funzione che ritorna tutte le liste */
async function getLists() {
    /** Il metodo query restituisce un array chiamato "result" contenente i dati recuperati dalla query. Ritorna anche
     * un altro array chiamato "fields" contenente le colonne della tabella */
    const [result] = await dbConnection.query('SELECT * FROM lists');
    return result;
}

/** Funzione che ritorna dalla tabella delle liste, la lista che ha id uguale all'id passato in input */
async function getListById(id) {
    /** Il metodo query restituisce un array chiamato "result" contenente i dati recuperati dalla query.
     * In questo caso viene passato un array con i placeholder da sostituire nella query al posto del carattere ? e
     * vengono sostituiti nello stesso ordine in cui sono inseriti nell'array. */
    const [result] = await dbConnection.query('SELECT * FROM lists WHERE id = ?', [id]);
    return result[0];
}

/** Funzione che elimina dalla tabella delle liste, la lista che ha id uguale all'id passato in input */
async function deleteListById(id) {
    /** In questo caso viene passato un array con i placeholder da sostituire nella query al posto del carattere ? e
     *  vengono sostituiti nello stesso ordine in cui sono inseriti nell'array. */
    const [result] = await dbConnection.query('DELETE FROM lists WHERE id = ?', [id]);
    return result.affectedRows;
}

/** Funzione che modifica la lista che ha id uguale all'id passato in input */
async function updateListById(idList, listUpdated) {
    /** In questo caso viene passato un array con i placeholder da sostituire nella query al posto del carattere ? e
     *  vengono sostituiti nello stesso ordine in cui sono inseriti nell'array. */
    const [result] = await dbConnection.query('UPDATE lists SET name = ?, updated_at = ? WHERE id = ?', [listUpdated.name, new Date(), idList]);
    return result.info;
}

module.exports = {
    addLists,
    getLists,
    getListById,
    deleteListById,
    updateListById
};
