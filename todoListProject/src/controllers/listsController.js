/** Dati mockati */
const mockData = require('../mocks/data.json');

/** Import dell'istanza della connessione al DB */
const dbConnection = require('../dbConfig');

const Todo = require('../models').Todo;
const List = require('../models').List;

/** FUNZIONI PER LA GESTIONE DEI DATI */

/** Funzione che aggiunge una list alla tabella delle liste */
async function addLists(listsParams) {
    /** Il metodo query restituisce un array chiamato "result" contenente i dati recuperati dalla query.
     * In questo caso viene passato un array con i placeholder da sostituire nella query al posto del carattere ? e
     * vengono sostituiti nello stesso ordine in cui sono inseriti nell'array.*/
    // const [result] = await dbConnection.query('INSERT INTO lists (user_id, name, created_at) VALUES (?,?,?)', [listsParams.user_id, listsParams.name, new Date()]);
    // return await getListById(result.insertId);

    /** Aggiunta dei dati utilizzando i metodi sequelize */
    return await List.create({
        user_id: listsParams.user_id,
        name: listsParams.name,
        created_at: new Date()
    })

}

/** Funzione che ritorna tutte le liste */
async function getLists() {
    /** Il metodo query restituisce un array chiamato "result" contenente i dati recuperati dalla query. Ritorna anche
     * un altro array chiamato "fields" contenente le colonne della tabella */
    // const [result] = await dbConnection.query('SELECT * FROM lists');

    /** Passando include possiamo creare una funzione nella query (ad es. COUNT, SUM, ecc).
     * In questo caso vogliamo ritornare il numero totale dei todos attribuiti ad una lista.
     * - Bisogna specificare la funzione (fn) da chiamare
     * - La tabella su cui applicarla (lists)
     * - La colonna da contare e in questo caso per specificare la colonna dei todos dobbiamo puntare alla tabella todos e specificando il campo id
     * - Inserire l'alias con cui vogliamo chiamare la variabile derivata dal COUNT, in questo caso "total" */
    const queryAttributes = {
        include: [ /** Colonne e altri campi da includere nel result della query */
            [
                List.sequelize.fn('COUNT', List.sequelize.col('Todos.id')), 'total'
            ]
        ],
        exclude: [ /** Colonne da escludere dal result della query */
            'created_at', 'updated_at'
        ]
    }

    /** Recupero dei dati utilizzando i metodi sequelize */
    return await List.findAll({
        attributes: queryAttributes, /** Attributi che vogliamo siano ritornati dalla query.
                                         Se non specifigo questo campo vengono mandati tutti. */
        limit: 20, /** Quanti record deve ritornare la query */
        /** offset: 10 Da quale posizione iniziare a ritornare i record. Se voglio restituire 20 record ed ho impostato
                       l'offeset a 10, ritorna i record a partire dalla posizione 10 per un massimo di 20. */
        /** where: { Esempio di clausola where da passare alla query
            id: 1
        } */
        subQuery: false, /** Non permette sotto-query e quindi troppe colonne in caso di join */
        include: [ /** array che contiene i model che servono per la query in caso di join (in questo caso la tabella todos) */
            {
                model: Todo,
                attributes: [] /** Array vuoto significa che in questa join non vogliamo attributi */
            }
        ],
        group: [
            'List.id'
        ]

    });
}

/** Funzione che ritorna dalla tabella delle liste, la lista che ha id uguale all'id passato in input */
async function getListById(id) {
    /** Il metodo query restituisce un array chiamato "result" contenente i dati recuperati dalla query.
     * In questo caso viene passato un array con i placeholder da sostituire nella query al posto del carattere ? e
     * vengono sostituiti nello stesso ordine in cui sono inseriti nell'array. */
    // const [result] = await dbConnection.query('SELECT * FROM lists WHERE id = ?', [id]);
    // return result[0];

    /** Colonne che vogliamo siano restituite nella query */
    const queryAttributes = ['id', 'name', 'user_id'];

    /** Recupero dei dati utilizzando i metodi sequelize */
    return await List.findByPk(id, {
        attributes: queryAttributes
    });
}

/** Funzione che elimina dalla tabella delle liste, la lista che ha id uguale all'id passato in input */
async function deleteListById(id) {
    /** In questo caso viene passato un array con i placeholder da sostituire nella query al posto del carattere ? e
     *  vengono sostituiti nello stesso ordine in cui sono inseriti nell'array. */
    // const [result] = await dbConnection.query('DELETE FROM lists WHERE id = ?', [id]);
    // return result.affectedRows;

    /** Delete dei dati utilizzando i metodi sequelize */
    return await List.destroy({
        attributes: [],
        where: {
            id: id
        }
    });
}

/** Funzione che modifica la lista che ha id uguale all'id passato in input */
async function updateListById(idList, listUpdated) {
    /** In questo caso viene passato un array con i placeholder da sostituire nella query al posto del carattere ? e
     *  vengono sostituiti nello stesso ordine in cui sono inseriti nell'array. */
    // const [result] = await dbConnection.query('UPDATE lists SET name = ?, updated_at = ? WHERE id = ?', [listUpdated.name, new Date(), idList]);
    // return result.info;

    /** Update dei dati utilizzando i metodi sequelize */
    return List.update({
        name: listUpdated.name, /** Dati da aggiornare */
        updated_at: new Date()
    },
    {
        where: {
            id: idList /** Id dell'elemento da aggiornare */
        }
    });

}

module.exports = {
    addLists,
    getLists,
    getListById,
    deleteListById,
    updateListById
};
