const mockData = require('../mocks/data.json');

/** FUNZIONI PER LA GESTIONE DEI DATI */

/** Funzione che aggiunge un todos all'array dei todos */
function addTodos(todosParams) {
    const newTodo = {
        todo: todosParams.todo,
        completed: todosParams.completed,
        list: todosParams.list,
        id: mockData.todos.length + 1
    };
    mockData.todos.unshift(newTodo);
    return newTodo;
}

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

/** Funzione che modifica il todos che ha id uguale all'id passato in input */
function updateTodoById(idTodo, todoUpdated) {
    const index = mockData.todos.findIndex(todo => todo.id === +idTodo);

    if (index !== -1) {
        const oldTodo = mockData.todos[index];
        /** Con questa sintassi si specifica che vengono aggiornati solamente i campi dell'oggetto todoUpdated che sono
         *  effettivamente cambiati rispetto all'oldTodo. */
        mockData.todos[index] = {...oldTodo, ...todoUpdated};
        return mockData.todos[index];
    } else {
        return null;
    }
}

module.exports = {
    addTodos,
    getTodos,
    getTodoById,
    deleteTodoById,
    updateTodoById
};
