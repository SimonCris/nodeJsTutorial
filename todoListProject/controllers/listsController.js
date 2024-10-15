const mockData = require('../mocks/data.json');

/** FUNZIONI PER LA GESTIONE DEI DATI */

/** Funzione che aggiunge una list all'array delle liste */
function addLists(listsParams) {
    const newList = {
        name: listsParams.name,
        id: mockData.lists.length + 1,
    };
    mockData.lists.unshift(newList);
    return newList;
}

/** Funzione che ritorna l'array delle liste */
function getLists() {
    return mockData.lists;
}

/** Funzione che ritorna dall'array delle liste, la lista che ha id uguale all'id passato in input */
function getListById(id) {
    return mockData.lists.find(list => list.id === +id);
}

/** Funzione che elimina dall'array delle liste, la lista che ha id uguale all'id passato in input */
function deleteListById(id) {
    const index = mockData.lists.findIndex(list => list.id === +id);
    if (index !== -1) {
        const listRemoved = mockData.lists.splice(index, 1);
        return listRemoved[0];
    } else {
        return null;
    }
}

/** Funzione che modifica la lista che ha id uguale all'id passato in input */
function updateListById(idList, listUpdated) {
    const index = mockData.lists.findIndex(list => list.id === +idList);

    if (index !== -1) {
        const oldList = mockData.lists[index];
        /** Con questa sintassi si specifica che vengono aggiornati solamente i campi dell'oggetto listUpdated che sono
         *  effettivamente cambiati rispetto all'oldList. */
        mockData.lists[index] = {...oldList, ...listUpdated};
        return mockData.lists[index];
    } else {
        return null;
    }
}

module.exports = {
    addLists,
    getLists,
    getListById,
    deleteListById,
    updateListById
};
