const mockData = require('../mocks/data.json');

/** FUNZIONI PER LA GESTIONE DEI DATI */

/** Funzione che ritorna l'array dei todos */
function getTodos() {
    return mockData.todos;
}

/** Funzione che ritorna dall'array dei todos, il todos che ha id uguale all'id passato in input */
function getTodoById(id) {
    return mockData.todos.find(todo => todo.id === +id);
}

/** Funzione che elimina dall'array dei todos, il todos che ha id uguale all'id passato in input */
function deleteTodoById(id) {
    const index = mockData.todos.findIndex(todo => todo.id === +id);
    if (index !== -1) {
        const todoRemoved = mockData.todos.splice(index, 1);
        return todoRemoved[0];
    } else {
        return null;
    }
}


module.exports = {
    getTodos,
    getTodoById,
    deleteTodoById
};
